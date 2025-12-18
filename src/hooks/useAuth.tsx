/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UserRole = "student" | "teacher";

interface Profile {
  id: string;
  full_name: string;
  nickname: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, nickname: string, role: UserRole) => Promise<{ error: Error | null }>;
  signIn: (nickname: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer fetching profile data
        if (session?.user) {
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchUserData(userId: string) {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (roleError) throw roleError;
      setRole(roleData?.role as UserRole ?? null);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function signUp(
    email: string,
    password: string,
    fullName: string,
    nickname: string,
    role: UserRole
  ): Promise<{ error: Error | null }> {
    try {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) throw error;

      if (data.user) {
        // Insert profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: fullName,
            nickname: nickname,
          });

        if (profileError) throw profileError;

        // Insert role
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({
            user_id: data.user.id,
            role: role,
          });

        if (roleError) throw roleError;
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function signIn(nickname: string, password: string): Promise<{ error: Error | null }> {
    try {
      // First, find the user by nickname
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("nickname", nickname);

      if (profileError) throw profileError;
      if (!profiles || profiles.length === 0) {
        throw new Error("User not found with that nickname");
      }

      // Get the user's email from auth (we need to use a workaround since we can't query auth.users directly)
      // For now, we'll require users to sign in with their email, but display nickname in the UI
      // Alternative: Store email in profiles table
      throw new Error("Please sign in with your email address for now. Nickname login coming soon!");
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function signInWithEmail(email: string, password: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRole(null);
  }

  // Update the context to include signInWithEmail
  const value: AuthContextType = {
    user,
    session,
    profile,
    role,
    loading,
    signUp,
    signIn: async (email: string, password: string) => signInWithEmail(email, password),
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
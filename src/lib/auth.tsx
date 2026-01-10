import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: 'student' | 'teacher' | null;
  profile: {
    full_name: string;
    nickname: string;
    section_id: string | null;
    avatar_url: string | null;
  } | null;
  signUp: (email: string, password: string, fullName: string, nickname: string, role: 'student' | 'teacher', sectionId?: string) => Promise<{ error: Error | null }>;
  signIn: (identifier: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);
  const [profile, setProfile] = useState<AuthContextType['profile']>(null);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (roleData) {
        setUserRole(roleData.role as 'student' | 'teacher');
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, nickname, section_id, avatar_url')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserData(user.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlocks
          setTimeout(() => fetchUserData(session.user.id), 0);
        } else {
          setUserRole(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    nickname: string,
    role: 'student' | 'teacher',
    sectionId?: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user returned');

      // Normalize nickname and create profile (store email for login lookup)
      const normalizedNickname = nickname.toLowerCase().replace(/\s+/g, '');
      // Try inserting profile with email; if the DB schema doesn't have the `email` column,
      // fall back to inserting without it to remain compatible with older schemas.
      let profileError = null;
      try {
        const res = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            full_name: fullName,
            nickname: normalizedNickname,
            email,
            section_id: role === 'student' ? sectionId : null,
          });
        profileError = (res as any).error ?? null;
        // If error indicates missing column, fall through to retry without email
        const msg = profileError?.message ?? '';
        if (profileError && /email|column.*email|Could not find the 'email'/i.test(msg)) {
          profileError = null;
          await supabase.from('profiles').insert({
            user_id: data.user.id,
            full_name: fullName,
            nickname: normalizedNickname,
            section_id: role === 'student' ? sectionId : null,
          });
        }
      } catch (err) {
        // supabase client may throw; attempt fallback insert without email
        try {
          await supabase.from('profiles').insert({
            user_id: data.user.id,
            full_name: fullName,
            nickname: normalizedNickname,
            section_id: role === 'student' ? sectionId : null,
          });
        } catch (err2) {
          throw err2;
        }
      }

      if (profileError) throw profileError;

      // Create role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: data.user.id,
          role,
        });

      if (roleError) throw roleError;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (identifier: string, password: string) => {
    try {
      // If the identifier looks like an email, use it directly
      if (/@/.test(identifier)) {
        console.debug('signIn: using identifier as email', identifier);
        const { data: signInData, error } = await supabase.auth.signInWithPassword({
          email: identifier,
          password,
        });
        console.debug('signIn: result', { signInData, error });
        if (error) throw error;
        return { error: null };
      }

      // Otherwise treat as nickname and find the user's email by nickname (prefer stored email)
      const normalizedNickname = identifier.toLowerCase().replace(/\s+/g, '');
      // Attempt to read email from profiles; if the column doesn't exist, retry without it
      let profileData: any = null;
      let profileError: any = null;
      try {
        const res = await supabase
          .from('profiles')
          .select('user_id, email')
          .eq('nickname', normalizedNickname)
          .maybeSingle();
        profileData = (res as any).data;
        profileError = (res as any).error ?? null;
        if (profileError && /email|column.*email|Could not find the 'email'/i.test(profileError.message)) {
          // retry without email
          const res2 = await supabase
            .from('profiles')
            .select('user_id')
            .eq('nickname', normalizedNickname)
            .maybeSingle();
          profileData = (res2 as any).data;
          profileError = (res2 as any).error ?? null;
        }
      } catch (err) {
        // If anything throws, try a simple select without email
        const res2 = await supabase
          .from('profiles')
          .select('user_id')
          .eq('nickname', normalizedNickname)
          .maybeSingle();
        profileData = (res2 as any).data;
        profileError = (res2 as any).error ?? null;
      }

      console.debug('signIn: profile lookup', { normalizedNickname, profileData, profileError });

      if (profileError || !profileData) {
        throw new Error('User not found');
      }

      // Use stored profile email if present, otherwise fall back to derived email
      const emailToUse = profileData.email ?? `${normalizedNickname}@educross.app`;

      console.debug('signIn: attempting auth with email', emailToUse);

      const { data: signInData, error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password,
      });

      console.debug('signIn: result', { signInData, error });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserRole(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        userRole,
        profile,
        signUp,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

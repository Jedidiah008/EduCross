import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { EduCrossLogo } from '@/components/EduCrossLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserPlus, Eye, EyeOff, GraduationCap, BookOpen, ChevronLeft } from 'lucide-react';

type Role = 'student' | 'teacher' | null;

interface Section {
  id: string;
  name: string;
}

export default function Signup() {
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [role, setRole] = useState<Role>(null);
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSections = async () => {
      const { data } = await supabase.from('sections').select('*');
      if (data) setSections(data);
    };
    fetchSections();
  }, []);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    setLoading(true);

    // Validate email field and use provided email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    const { error } = await signUp(
      email,
      password,
      fullName,
      nickname,
      role,
      role === 'student' ? selectedSection : undefined
    );

    if (error) {
      toast.error(error.message || 'Signup failed. Please try again.');
    } else {
      toast.success('Account created successfully! Welcome to EduCross!');
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="mb-8 flex justify-center">
          <EduCrossLogo size="md" />
        </div>

        <div className="game-card">
          <AnimatePresence mode="wait">
            {step === 'role' && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 text-center font-display text-3xl font-bold text-foreground">
                  Join EduCross
                </h2>
                <p className="mb-8 text-center text-muted-foreground">
                  Choose your role to get started
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleSelect('student')}
                    className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-muted/50 p-8 transition-all hover:border-secondary hover:bg-secondary/10"
                  >
                    <div className="rounded-2xl bg-gradient-to-br from-secondary to-secondary/60 p-4">
                      <GraduationCap size={48} className="text-secondary-foreground" />
                    </div>
                    <span className="font-display text-xl font-bold text-foreground">
                      Student
                    </span>
                    <span className="text-center text-sm text-muted-foreground">
                      Learn through interactive games and lessons
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleSelect('teacher')}
                    className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-muted/50 p-8 transition-all hover:border-accent hover:bg-accent/10"
                  >
                    <div className="rounded-2xl bg-gradient-to-br from-accent to-accent/60 p-4">
                      <BookOpen size={48} className="text-accent-foreground" />
                    </div>
                    <span className="font-display text-xl font-bold text-foreground">
                      Teacher
                    </span>
                    <span className="text-center text-sm text-muted-foreground">
                      Track student progress and performance
                    </span>
                  </motion.button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-muted-foreground">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      Log In
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setStep('role')}
                  className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>

                <h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground">
                  Create Your Account
                </h2>
                <p className="mb-6 text-center">
                  <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-bold ${
                    role === 'student' 
                      ? 'bg-secondary/20 text-secondary' 
                      : 'bg-accent/20 text-accent'
                  }`}>
                    {role === 'student' ? <GraduationCap size={16} /> : <BookOpen size={16} />}
                    {role === 'student' ? 'Student' : 'Teacher'}
                  </span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-foreground">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname" className="text-foreground">
                      Nickname
                    </Label>
                    <Input
                      id="nickname"
                      type="text"
                      placeholder="Choose a unique nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {role === 'student' && (
                    <div className="space-y-2">
                      <Label htmlFor="section" className="text-foreground">
                        Section
                      </Label>
                      <select
                        id="section"
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        required
                        className="flex h-12 w-full rounded-xl border-2 border-border bg-muted px-4 py-3 text-foreground ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary"
                      >
                        <option value="">Select your section</option>
                        {sections.map((section) => (
                          <option key={section.id} value={section.id}>
                            {section.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="game"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Creating account...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <UserPlus size={20} />
                        Create Account
                      </span>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

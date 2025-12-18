-- Create enum for user roles (student or teacher)
CREATE TYPE public.user_role AS ENUM ('student', 'teacher');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  nickname TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create game_scores table to track student performance
CREATE TABLE public.game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  unit TEXT NOT NULL,
  topic TEXT NOT NULL,
  game TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  time_taken INTEGER, -- in seconds
  played_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Teachers can view all profiles
CREATE POLICY "Teachers can view all profiles" 
ON public.profiles FOR SELECT 
USING (public.has_role(auth.uid(), 'teacher'));

-- User roles policies
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles" 
ON public.user_roles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Teachers can view all roles
CREATE POLICY "Teachers can view all roles" 
ON public.user_roles FOR SELECT 
USING (public.has_role(auth.uid(), 'teacher'));

-- Game scores policies
CREATE POLICY "Users can view their own scores" 
ON public.game_scores FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scores" 
ON public.game_scores FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Teachers can view all scores
CREATE POLICY "Teachers can view all scores" 
ON public.game_scores FOR SELECT 
USING (public.has_role(auth.uid(), 'teacher'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
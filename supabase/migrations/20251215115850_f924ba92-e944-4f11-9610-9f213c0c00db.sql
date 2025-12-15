-- Add 'lms' role to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'lms';

-- Create LMS Courses table
CREATE TABLE public.lms_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL DEFAULT 'Jain Philosophy',
  level TEXT NOT NULL DEFAULT 'Beginner',
  language TEXT DEFAULT 'Hindi',
  instructor_id UUID REFERENCES auth.users(id),
  instructor_name TEXT,
  duration TEXT,
  course_mode TEXT NOT NULL DEFAULT 'Online',
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT false,
  is_restricted BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create LMS Lectures table
CREATE TABLE public.lms_lectures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  lecture_type TEXT NOT NULL DEFAULT 'Online',
  video_url TEXT,
  stream_url TEXT,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  venue TEXT,
  speaker TEXT,
  notes TEXT,
  references_text TEXT,
  duration_minutes INTEGER,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create LMS Enrollments table
CREATE TABLE public.lms_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'active',
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- Create LMS Lecture Progress table
CREATE TABLE public.lms_lecture_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lecture_id UUID REFERENCES public.lms_lectures(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending',
  watched_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lecture_id)
);

-- Create LMS Study Materials table
CREATE TABLE public.lms_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  lecture_id UUID REFERENCES public.lms_lectures(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create LMS Attendance table (for offline sessions)
CREATE TABLE public.lms_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lecture_id UUID REFERENCES public.lms_lectures(id) ON DELETE CASCADE NOT NULL,
  attended_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  marked_by UUID,
  notes TEXT,
  UNIQUE(user_id, lecture_id)
);

-- Enable RLS on all tables
ALTER TABLE public.lms_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_lecture_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_attendance ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lms_courses
CREATE POLICY "Anyone can view published courses" ON public.lms_courses
FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all courses" ON public.lms_courses
FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Instructors can manage their courses" ON public.lms_courses
FOR ALL USING (instructor_id = auth.uid());

-- RLS Policies for lms_lectures
CREATE POLICY "Anyone can view published lectures" ON public.lms_lectures
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.lms_courses WHERE id = course_id AND is_published = true)
);

CREATE POLICY "Admins can manage all lectures" ON public.lms_lectures
FOR ALL USING (is_admin(auth.uid()));

-- RLS Policies for lms_enrollments
CREATE POLICY "Users can view their own enrollments" ON public.lms_enrollments
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll themselves" ON public.lms_enrollments
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all enrollments" ON public.lms_enrollments
FOR ALL USING (is_admin(auth.uid()));

-- RLS Policies for lms_lecture_progress
CREATE POLICY "Users can manage their own progress" ON public.lms_lecture_progress
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress" ON public.lms_lecture_progress
FOR SELECT USING (is_admin(auth.uid()));

-- RLS Policies for lms_materials
CREATE POLICY "Anyone can view materials for published courses" ON public.lms_materials
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.lms_courses WHERE id = course_id AND is_published = true)
  OR EXISTS (SELECT 1 FROM public.lms_lectures l JOIN public.lms_courses c ON l.course_id = c.id WHERE l.id = lecture_id AND c.is_published = true)
);

CREATE POLICY "Admins can manage all materials" ON public.lms_materials
FOR ALL USING (is_admin(auth.uid()));

-- RLS Policies for lms_attendance
CREATE POLICY "Users can view their own attendance" ON public.lms_attendance
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all attendance" ON public.lms_attendance
FOR ALL USING (is_admin(auth.uid()));

-- Update trigger for courses
CREATE TRIGGER update_lms_courses_updated_at
BEFORE UPDATE ON public.lms_courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update trigger for lectures
CREATE TRIGGER update_lms_lectures_updated_at
BEFORE UPDATE ON public.lms_lectures
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update trigger for progress
CREATE TRIGGER update_lms_lecture_progress_updated_at
BEFORE UPDATE ON public.lms_lecture_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
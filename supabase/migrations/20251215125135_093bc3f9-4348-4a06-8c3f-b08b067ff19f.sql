-- Create programs table (bundle of courses)
CREATE TABLE public.lms_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  duration TEXT,
  level TEXT DEFAULT 'Beginner',
  is_published BOOLEAN DEFAULT false,
  is_paid BOOLEAN DEFAULT false,
  price DECIMAL(10,2) DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create batches table (cohorts of learners)
CREATE TABLE public.lms_batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.lms_programs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  max_students INTEGER DEFAULT 50,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create program-course mapping
CREATE TABLE public.lms_program_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES public.lms_programs(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE NOT NULL,
  order_index INTEGER DEFAULT 0,
  UNIQUE(program_id, course_id)
);

-- Create quizzes table
CREATE TABLE public.lms_quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  lecture_id UUID REFERENCES public.lms_lectures(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  time_limit_minutes INTEGER,
  passing_score INTEGER DEFAULT 60,
  max_attempts INTEGER DEFAULT 3,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz questions table
CREATE TABLE public.lms_quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID REFERENCES public.lms_quizzes(id) ON DELETE CASCADE NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'multiple_choice',
  options JSONB,
  correct_answer TEXT,
  points INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0
);

-- Create quiz attempts table
CREATE TABLE public.lms_quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID REFERENCES public.lms_quizzes(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  answers JSONB,
  score INTEGER,
  passed BOOLEAN DEFAULT false,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create assignments table
CREATE TABLE public.lms_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  lecture_id UUID REFERENCES public.lms_lectures(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  max_score INTEGER DEFAULT 100,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assignment submissions table
CREATE TABLE public.lms_assignment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES public.lms_assignments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  submission_text TEXT,
  file_url TEXT,
  score INTEGER,
  feedback TEXT,
  graded_by UUID,
  status TEXT DEFAULT 'submitted',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  graded_at TIMESTAMP WITH TIME ZONE
);

-- Create certificates table
CREATE TABLE public.lms_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE SET NULL,
  program_id UUID REFERENCES public.lms_programs(id) ON DELETE SET NULL,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE,
  certificate_url TEXT
);

-- Create notifications table
CREATE TABLE public.lms_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create announcements table
CREATE TABLE public.lms_announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.lms_courses(id) ON DELETE CASCADE,
  batch_id UUID REFERENCES public.lms_batches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  is_pinned BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create batch enrollments
CREATE TABLE public.lms_batch_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID REFERENCES public.lms_batches(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'active',
  UNIQUE(batch_id, user_id)
);

-- Add price column to courses if not exists
ALTER TABLE public.lms_courses ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 0;
ALTER TABLE public.lms_courses ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT false;

-- Enable RLS on all new tables
ALTER TABLE public.lms_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_program_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_batch_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public access for demo mode
CREATE POLICY "Anyone can view programs" ON public.lms_programs FOR SELECT USING (true);
CREATE POLICY "Anyone can manage programs" ON public.lms_programs FOR ALL USING (true);

CREATE POLICY "Anyone can view batches" ON public.lms_batches FOR SELECT USING (true);
CREATE POLICY "Anyone can manage batches" ON public.lms_batches FOR ALL USING (true);

CREATE POLICY "Anyone can view program courses" ON public.lms_program_courses FOR SELECT USING (true);
CREATE POLICY "Anyone can manage program courses" ON public.lms_program_courses FOR ALL USING (true);

CREATE POLICY "Anyone can view quizzes" ON public.lms_quizzes FOR SELECT USING (true);
CREATE POLICY "Anyone can manage quizzes" ON public.lms_quizzes FOR ALL USING (true);

CREATE POLICY "Anyone can view questions" ON public.lms_quiz_questions FOR SELECT USING (true);
CREATE POLICY "Anyone can manage questions" ON public.lms_quiz_questions FOR ALL USING (true);

CREATE POLICY "Anyone can view attempts" ON public.lms_quiz_attempts FOR SELECT USING (true);
CREATE POLICY "Anyone can manage attempts" ON public.lms_quiz_attempts FOR ALL USING (true);

CREATE POLICY "Anyone can view assignments" ON public.lms_assignments FOR SELECT USING (true);
CREATE POLICY "Anyone can manage assignments" ON public.lms_assignments FOR ALL USING (true);

CREATE POLICY "Anyone can view submissions" ON public.lms_assignment_submissions FOR SELECT USING (true);
CREATE POLICY "Anyone can manage submissions" ON public.lms_assignment_submissions FOR ALL USING (true);

CREATE POLICY "Anyone can view certificates" ON public.lms_certificates FOR SELECT USING (true);
CREATE POLICY "Anyone can manage certificates" ON public.lms_certificates FOR ALL USING (true);

CREATE POLICY "Anyone can view notifications" ON public.lms_notifications FOR SELECT USING (true);
CREATE POLICY "Anyone can manage notifications" ON public.lms_notifications FOR ALL USING (true);

CREATE POLICY "Anyone can view announcements" ON public.lms_announcements FOR SELECT USING (true);
CREATE POLICY "Anyone can manage announcements" ON public.lms_announcements FOR ALL USING (true);

CREATE POLICY "Anyone can view batch enrollments" ON public.lms_batch_enrollments FOR SELECT USING (true);
CREATE POLICY "Anyone can manage batch enrollments" ON public.lms_batch_enrollments FOR ALL USING (true);
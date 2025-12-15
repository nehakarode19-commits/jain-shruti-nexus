-- Create visitor feedback table
CREATE TABLE public.visitor_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  feedback_type TEXT DEFAULT 'general',
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visitor_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can submit feedback (public form)
CREATE POLICY "Anyone can submit feedback"
ON public.visitor_feedback
FOR INSERT
WITH CHECK (true);

-- Only admins can read feedback
CREATE POLICY "Admins can read all feedback"
ON public.visitor_feedback
FOR SELECT
USING (is_admin(auth.uid()));

-- Admins can update feedback (mark as read)
CREATE POLICY "Admins can update feedback"
ON public.visitor_feedback
FOR UPDATE
USING (is_admin(auth.uid()));

-- Admins can delete feedback
CREATE POLICY "Admins can delete feedback"
ON public.visitor_feedback
FOR DELETE
USING (is_admin(auth.uid()));
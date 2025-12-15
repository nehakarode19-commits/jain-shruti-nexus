-- Add permissive RLS policies for LMS tables to allow demo mode access

-- lms_courses: Allow anyone to insert/update/delete for demo mode
CREATE POLICY "Anyone can insert lms_courses" 
ON public.lms_courses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update lms_courses" 
ON public.lms_courses 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete lms_courses" 
ON public.lms_courses 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can view all lms_courses" 
ON public.lms_courses 
FOR SELECT 
USING (true);

-- lms_lectures: Allow anyone to insert/update/delete for demo mode
CREATE POLICY "Anyone can insert lms_lectures" 
ON public.lms_lectures 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update lms_lectures" 
ON public.lms_lectures 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete lms_lectures" 
ON public.lms_lectures 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can view all lms_lectures" 
ON public.lms_lectures 
FOR SELECT 
USING (true);

-- lms_materials: Allow anyone to insert/update/delete for demo mode
CREATE POLICY "Anyone can insert lms_materials" 
ON public.lms_materials 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update lms_materials" 
ON public.lms_materials 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete lms_materials" 
ON public.lms_materials 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can view all lms_materials" 
ON public.lms_materials 
FOR SELECT 
USING (true);

-- lms_attendance: Allow anyone to insert/update/delete for demo mode
CREATE POLICY "Anyone can insert lms_attendance" 
ON public.lms_attendance 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update lms_attendance" 
ON public.lms_attendance 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete lms_attendance" 
ON public.lms_attendance 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can view all lms_attendance" 
ON public.lms_attendance 
FOR SELECT 
USING (true);

-- lms_enrollments: Allow anyone to insert/update/delete for demo mode
CREATE POLICY "Anyone can insert lms_enrollments" 
ON public.lms_enrollments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update lms_enrollments" 
ON public.lms_enrollments 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete lms_enrollments" 
ON public.lms_enrollments 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can view all lms_enrollments" 
ON public.lms_enrollments 
FOR SELECT 
USING (true);

-- lms_lecture_progress: Allow anyone to insert/update/delete for demo mode
CREATE POLICY "Anyone can insert lms_lecture_progress" 
ON public.lms_lecture_progress 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update lms_lecture_progress" 
ON public.lms_lecture_progress 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete lms_lecture_progress" 
ON public.lms_lecture_progress 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can view all lms_lecture_progress" 
ON public.lms_lecture_progress 
FOR SELECT 
USING (true);
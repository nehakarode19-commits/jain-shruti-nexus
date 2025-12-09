-- Allow authenticated users to insert profiles (needed for user creation)
CREATE POLICY "Authenticated users can insert profiles" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to read all profiles (for admin user list)
CREATE POLICY "Authenticated users can read all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Allow authenticated users to manage user_roles for demo
CREATE POLICY "Authenticated users can insert user_roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can read all user_roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (true);
-- Create ticket categories table
CREATE TABLE public.ticket_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.ticket_categories(id),
  description TEXT,
  sla_hours INTEGER DEFAULT 24,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.ticket_categories(id),
  sub_category TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'on_hold', 'resolved', 'closed')),
  tags TEXT[],
  attachment_url TEXT,
  created_by UUID,
  assigned_to UUID,
  resolved_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE,
  sla_deadline TIMESTAMP WITH TIME ZONE,
  sla_breached BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ticket comments table
CREATE TABLE public.ticket_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  user_id UUID,
  comment TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ticket activity log table
CREATE TABLE public.ticket_activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  user_id UUID,
  action TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create SLA configurations table
CREATE TABLE public.ticket_sla_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.ticket_categories(id),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  response_hours INTEGER NOT NULL DEFAULT 24,
  resolution_hours INTEGER NOT NULL DEFAULT 72,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(category_id, priority)
);

-- Enable RLS
ALTER TABLE public.ticket_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_sla_configs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ticket_categories (anyone can view, admins can manage)
CREATE POLICY "Anyone can view ticket categories" ON public.ticket_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can manage ticket categories" ON public.ticket_categories FOR ALL USING (true);

-- RLS Policies for tickets
CREATE POLICY "Anyone can view tickets" ON public.tickets FOR SELECT USING (true);
CREATE POLICY "Anyone can create tickets" ON public.tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update tickets" ON public.tickets FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete tickets" ON public.tickets FOR DELETE USING (true);

-- RLS Policies for ticket_comments
CREATE POLICY "Anyone can view comments" ON public.ticket_comments FOR SELECT USING (true);
CREATE POLICY "Anyone can create comments" ON public.ticket_comments FOR INSERT WITH CHECK (true);

-- RLS Policies for ticket_activity_log
CREATE POLICY "Anyone can view activity log" ON public.ticket_activity_log FOR SELECT USING (true);
CREATE POLICY "Anyone can create activity log" ON public.ticket_activity_log FOR INSERT WITH CHECK (true);

-- RLS Policies for ticket_sla_configs
CREATE POLICY "Anyone can view SLA configs" ON public.ticket_sla_configs FOR SELECT USING (true);
CREATE POLICY "Anyone can manage SLA configs" ON public.ticket_sla_configs FOR ALL USING (true);

-- Create function to generate ticket number
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ticket_number := 'TKT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for auto ticket number
CREATE TRIGGER set_ticket_number
  BEFORE INSERT ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_ticket_number();

-- Create trigger for updated_at
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ticket_categories_updated_at
  BEFORE UPDATE ON public.ticket_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ticket_sla_configs_updated_at
  BEFORE UPDATE ON public.ticket_sla_configs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.ticket_categories (name, description, sla_hours) VALUES
  ('Library', 'Issues related to library books, manuscripts, and circulation', 24),
  ('LMS', 'Learning Management System related issues', 48),
  ('Research', 'Research access and tools related issues', 48),
  ('Guruvani', 'Guruvani content and access issues', 24),
  ('Technical', 'Technical and system issues', 12),
  ('Content', 'Content quality and corrections', 72),
  ('Vendor', 'Vendor and external service issues', 72);

-- Insert default SLA configs
INSERT INTO public.ticket_sla_configs (priority, response_hours, resolution_hours) VALUES
  ('critical', 1, 4),
  ('high', 4, 24),
  ('medium', 8, 48),
  ('low', 24, 72);
-- RightSense CXO Hub Database Setup for Supabase
-- Run this script in your Supabase SQL Editor

-- Enable Row Level Security (RLS)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create CXOs table
CREATE TABLE IF NOT EXISTS public.cxos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  expertise VARCHAR(255) NOT NULL,
  experience VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Active', 'Pending', 'Inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Business Requests table
CREATE TABLE IF NOT EXISTS public.business_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  requirement TEXT NOT NULL,
  budget VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Completed', 'Closed')),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for auto-updating updated_at
CREATE TRIGGER update_cxos_updated_at BEFORE UPDATE ON public.cxos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_requests_updated_at BEFORE UPDATE ON public.business_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.cxos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin access)
CREATE POLICY "Enable read access for authenticated users" ON public.cxos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON public.cxos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON public.business_requests
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON public.business_requests
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO public.cxos (name, email, expertise, experience, status) VALUES
  ('Sarah Johnson', 'sarah@example.com', 'Technology', '15 years', 'Active'),
  ('Michael Chen', 'michael@example.com', 'Marketing', '12 years', 'Pending'),
  ('Emily Rodriguez', 'emily@example.com', 'Operations', '18 years', 'Active')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.business_requests (company, requirement, budget, status, date) VALUES
  ('TechCorp Inc', 'Digital Transformation Strategy', '$50,000', 'Open', '2024-01-15'),
  ('Growth Solutions', 'Marketing Automation Setup', '$25,000', 'In Progress', '2024-01-14'),
  ('Innovation Labs', 'Product Strategy Review', '$75,000', 'Completed', '2024-01-13')
ON CONFLICT DO NOTHING;

-- Create an admin user (you'll need to create this user in Supabase Auth)
-- Email: cloudcxo@rightsense.in
-- Password: @R1ghts2025
-- This should be done through the Supabase dashboard under Authentication > Users
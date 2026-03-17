-- Run this SQL in your Supabase SQL Editor to create the necessary tables.

-- 1. Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  time TEXT NOT NULL,
  days TEXT NOT NULL,
  img TEXT NOT NULL,
  education TEXT NOT NULL,
  experience TEXT NOT NULL,
  bio TEXT NOT NULL,
  fees TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Staff Table
CREATE TABLE IF NOT EXISTS staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  img TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Blood Donors Table
CREATE TABLE IF NOT EXISTS blood_donors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  "bloodGroup" TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  "lastDonation" TEXT,
  img TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  message TEXT NOT NULL,
  doctor_name TEXT,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read doctors" ON doctors FOR SELECT USING (true);
CREATE POLICY "Allow public read staff" ON staff FOR SELECT USING (true);
CREATE POLICY "Allow public read blood_donors" ON blood_donors FOR SELECT USING (true);
CREATE POLICY "Allow public insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read messages" ON messages FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for authenticated full access (Admin)
CREATE POLICY "Allow authenticated full access doctors" ON doctors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access staff" ON staff FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access blood_donors" ON blood_donors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access messages" ON messages FOR ALL USING (auth.role() = 'authenticated');

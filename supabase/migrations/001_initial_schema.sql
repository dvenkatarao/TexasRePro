-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'basic' CHECK (subscription_tier IN ('basic', 'professional', 'enterprise')),
  confidence_score INTEGER DEFAULT 0,
  phone_number TEXT,
  investment_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Properties table
CREATE TABLE properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT DEFAULT 'TX',
  zip_code TEXT,
  property_type TEXT CHECK (property_type IN ('single_family', 'duplex', 'triplex', 'fourplex')),
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  square_feet INTEGER,
  lot_size INTEGER,
  year_built INTEGER,
  purchase_price DECIMAL(12,2),
  current_value DECIMAL(12,2),
  rental_income DECIMAL(10,2),
  property_tax DECIMAL(10,2),
  insurance DECIMAL(10,2),
  hoa_fees DECIMAL(10,2),
  images TEXT[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'pending')),
  cap_rate DECIMAL(5,2),
  cash_flow DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Property analysis records
CREATE TABLE property_analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  analysis_data JSONB NOT NULL,
  monthly_cash_flow DECIMAL(10,2),
  cap_rate DECIMAL(5,2),
  cash_on_cash_return DECIMAL(5,2),
  total_investment DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Service providers
CREATE TABLE service_providers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('mortgage', 'management', 'insurance', 'closing', 'contractors', 'agents')),
  specialty TEXT,
  description TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  service_areas TEXT[],
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  fee_structure TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- User saved properties
CREATE TABLE saved_properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, property_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Users can only read/write their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Properties: Users can read all, but only modify their own
CREATE POLICY "Anyone can view properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Users can insert own properties" ON properties FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own properties" ON properties FOR UPDATE USING (auth.uid() = user_id);

-- Property analyses: Users can only access their own analyses
CREATE POLICY "Users can view own analyses" ON property_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analyses" ON property_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Service providers: Public read, admin write
CREATE POLICY "Anyone can view service providers" ON service_providers FOR SELECT USING (true);

-- Saved properties: Users can only access their own saved properties
CREATE POLICY "Users can view own saved properties" ON saved_properties FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own saved properties" ON saved_properties FOR ALL USING (auth.uid() = user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
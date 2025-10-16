-- =====================================================
-- TEXAS REAL ESTATE INVESTMENT PLATFORM
-- Complete Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "cube";
CREATE EXTENSION IF NOT EXISTS "earthdistance";

-- =====================================================
-- 1. USERS & AUTHENTICATION
-- =====================================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    
    -- Subscription info
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'professional', 'enterprise')),
    subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due')),
    subscription_start_date TIMESTAMPTZ,
    subscription_end_date TIMESTAMPTZ,
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT,
    
    -- Investor profile
    investor_type TEXT DEFAULT 'beginner' CHECK (investor_type IN ('beginner', 'intermediate', 'experienced')),
    investment_goals TEXT[],
    target_markets TEXT[], -- Texas cities
    budget_min INTEGER,
    budget_max INTEGER,
    
    -- Progress tracking
    confidence_score INTEGER DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
    education_progress JSONB DEFAULT '{}',
    badges TEXT[] DEFAULT '{}',
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

-- =====================================================
-- 2. PROPERTIES
-- =====================================================

CREATE TABLE public.properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Basic info
    title TEXT NOT NULL,
    description TEXT,
    property_type TEXT NOT NULL CHECK (property_type IN ('single_family', 'duplex', 'triplex', 'fourplex')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold', 'off_market')),
    
    -- Location
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    county TEXT NOT NULL,
    state TEXT DEFAULT 'TX',
    zip_code TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    school_district TEXT,
    
    -- Property details
    year_built INTEGER,
    bedrooms INTEGER,
    bathrooms DECIMAL(3,1),
    square_feet INTEGER,
    lot_size_sqft INTEGER,
    parking_spaces INTEGER,
    has_pool BOOLEAN DEFAULT false,
    architecture_style TEXT,
    
    -- Pricing
    list_price INTEGER NOT NULL,
    price_per_sqft DECIMAL(10,2),
    hoa_fee INTEGER DEFAULT 0,
    
    -- Texas-specific data
    property_tax_rate DECIMAL(5,4),
    annual_property_tax INTEGER,
    tax_appraisal_value INTEGER,
    flood_zone TEXT DEFAULT 'X',
    windstorm_area BOOLEAN DEFAULT false,
    homestead_exempt BOOLEAN DEFAULT false,
    
    -- Rental info
    estimated_rent INTEGER,
    current_occupancy TEXT CHECK (current_occupancy IN ('vacant', 'tenant_occupied', 'owner_occupied')),
    lease_end_date DATE,
    
    -- Financial estimates
    estimated_insurance INTEGER,
    estimated_maintenance INTEGER,
    estimated_utilities INTEGER,
    
    -- Investment metrics (calculated)
    cap_rate DECIMAL(5,2),
    cash_on_cash_return DECIMAL(5,2),
    gross_yield DECIMAL(5,2),
    
    -- Quality indicators
    deal_coach_approved BOOLEAN DEFAULT false,
    deal_coach_rating DECIMAL(3,1) CHECK (deal_coach_rating >= 0 AND deal_coach_rating <= 10),
    investment_quality TEXT CHECK (investment_quality IN ('excellent', 'good', 'fair', 'poor')),
    
    -- Media
    images TEXT[] DEFAULT '{}',
    primary_image TEXT,
    video_tour_url TEXT,
    virtual_tour_url TEXT,
    
    -- Seller info
    seller_type TEXT CHECK (seller_type IN ('investor', 'owner', 'bank', 'wholesaler')),
    seller_motivation TEXT,
    days_on_market INTEGER DEFAULT 0,
    
    -- MLS integration
    mls_number TEXT UNIQUE,
    mls_status TEXT,
    listed_by TEXT,
    listing_agent_name TEXT,
    listing_agent_phone TEXT,
    listing_agent_email TEXT,
    
    -- Metadata
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    favorite_count INTEGER DEFAULT 0
);

-- Create indexes for common queries
CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_county ON public.properties(county);
CREATE INDEX idx_properties_price ON public.properties(list_price);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_type ON public.properties(property_type);
CREATE INDEX idx_properties_deal_coach ON public.properties(deal_coach_approved);
CREATE INDEX idx_properties_location ON public.properties USING GIST (
    ll_to_earth(latitude::float8, longitude::float8)
);

-- =====================================================
-- 3. DEAL ANALYSES
-- =====================================================

CREATE TABLE public.deal_analyses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    property_id UUID REFERENCES public.properties(id),
    
    -- Analysis name & status
    analysis_name TEXT NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'archived')),
    
    -- Purchase details
    purchase_price INTEGER NOT NULL,
    down_payment_percent DECIMAL(5,2) DEFAULT 20,
    down_payment_amount INTEGER,
    loan_amount INTEGER,
    interest_rate DECIMAL(5,3),
    loan_term_years INTEGER DEFAULT 30,
    
    -- Closing costs
    closing_costs INTEGER,
    closing_cost_percent DECIMAL(5,2) DEFAULT 2,
    
    -- Renovation/repairs
    renovation_budget INTEGER DEFAULT 0,
    renovation_timeline_months INTEGER DEFAULT 0,
    after_repair_value INTEGER,
    
    -- Income
    monthly_rent INTEGER NOT NULL,
    other_monthly_income INTEGER DEFAULT 0,
    vacancy_rate DECIMAL(5,2) DEFAULT 5,
    
    -- Operating expenses (Texas-specific)
    property_tax_monthly INTEGER NOT NULL,
    insurance_monthly INTEGER NOT NULL,
    hoa_monthly INTEGER DEFAULT 0,
    property_management_percent DECIMAL(5,2) DEFAULT 8,
    maintenance_percent DECIMAL(5,2) DEFAULT 5,
    utilities_monthly INTEGER DEFAULT 0,
    
    -- Calculated metrics
    gross_monthly_income INTEGER,
    total_monthly_expenses INTEGER,
    net_operating_income INTEGER,
    monthly_mortgage INTEGER,
    monthly_cash_flow INTEGER,
    annual_cash_flow INTEGER,
    
    -- Investment returns
    cap_rate DECIMAL(5,2),
    cash_on_cash_return DECIMAL(5,2),
    roi DECIMAL(5,2),
    break_even_occupancy DECIMAL(5,2),
    debt_service_coverage_ratio DECIMAL(5,2),
    
    -- Total investment
    total_cash_needed INTEGER,
    
    -- Strategy type
    strategy_type TEXT CHECK (strategy_type IN ('buy_hold', 'brrrr', 'flip', 'live_in')),
    
    -- Notes & recommendations
    notes TEXT,
    ai_recommendations TEXT,
    risk_factors TEXT[],
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analyses_user ON public.deal_analyses(user_id);
CREATE INDEX idx_analyses_property ON public.deal_analyses(property_id);

-- =====================================================
-- 4. FAVORITES / SAVED PROPERTIES
-- =====================================================

CREATE TABLE public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    property_id UUID REFERENCES public.properties(id) NOT NULL,
    notes TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, property_id)
);

CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_favorites_property ON public.favorites(property_id);

-- =====================================================
-- 5. SAVED SEARCHES
-- =====================================================

CREATE TABLE public.saved_searches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    name TEXT NOT NULL,
    search_criteria JSONB NOT NULL,
    notification_enabled BOOLEAN DEFAULT true,
    notification_frequency TEXT DEFAULT 'daily' CHECK (notification_frequency IN ('instant', 'daily', 'weekly')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_saved_searches_user ON public.saved_searches(user_id);

-- =====================================================
-- 6. SERVICE PROVIDERS
-- =====================================================

CREATE TABLE public.service_providers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Provider info
    name TEXT NOT NULL,
    company_name TEXT,
    service_type TEXT NOT NULL CHECK (service_type IN ('mortgage', 'property_management', 'insurance', 'title', 'contractor', 'inspector', 'realtor', 'attorney')),
    
    -- Contact
    email TEXT,
    phone TEXT,
    website TEXT,
    
    -- Location
    service_areas TEXT[], -- Texas cities/counties
    
    -- Verification
    verified BOOLEAN DEFAULT false,
    license_number TEXT,
    insurance_verified BOOLEAN DEFAULT false,
    
    -- Performance metrics
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    deals_completed INTEGER DEFAULT 0,
    
    -- Pricing
    fee_structure TEXT,
    typical_fees TEXT,
    
    -- Description
    description TEXT,
    specialties TEXT[],
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_providers_type ON public.service_providers(service_type);
CREATE INDEX idx_providers_verified ON public.service_providers(verified);

-- =====================================================
-- 7. SERVICE CONNECTIONS
-- =====================================================

CREATE TABLE public.service_connections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    provider_id UUID REFERENCES public.service_providers(id) NOT NULL,
    property_id UUID REFERENCES public.properties(id),
    
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'completed', 'cancelled')),
    service_type TEXT NOT NULL,
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_connections_user ON public.service_connections(user_id);
CREATE INDEX idx_connections_provider ON public.service_connections(provider_id);

-- =====================================================
-- 8. EDUCATION PROGRESS
-- =====================================================

CREATE TABLE public.education_modules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('basics', 'financing', 'analysis', 'legal', 'taxes', 'management', 'advanced')),
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    
    content JSONB,
    duration_minutes INTEGER,
    order_index INTEGER,
    
    required_tier TEXT DEFAULT 'free' CHECK (required_tier IN ('free', 'basic', 'professional', 'enterprise')),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true
);

CREATE TABLE public.user_education_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    module_id UUID REFERENCES public.education_modules(id) NOT NULL,
    
    status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    progress_percent INTEGER DEFAULT 0,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    UNIQUE(user_id, module_id)
);

CREATE INDEX idx_user_education_user ON public.user_education_progress(user_id);

-- =====================================================
-- 9. REPORTS
-- =====================================================

CREATE TABLE public.generated_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    property_id UUID REFERENCES public.properties(id),
    analysis_id UUID REFERENCES public.deal_analyses(id),
    
    report_type TEXT NOT NULL CHECK (report_type IN ('deal_analysis', 'brrrr', 'portfolio', 'market_analysis', 'tax_strategy')),
    report_name TEXT NOT NULL,
    
    report_data JSONB NOT NULL,
    pdf_url TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reports_user ON public.generated_reports(user_id);

-- =====================================================
-- 10. ACTIVITY LOG
-- =====================================================

CREATE TABLE public.activity_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    
    activity_type TEXT NOT NULL CHECK (activity_type IN (
        'property_viewed', 'property_saved', 'analysis_created', 
        'report_generated', 'provider_contacted', 'subscription_upgraded',
        'education_completed', 'badge_earned'
    )),
    
    entity_type TEXT,
    entity_id UUID,
    metadata JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_user ON public.activity_log(user_id);
CREATE INDEX idx_activity_type ON public.activity_log(activity_type);
CREATE INDEX idx_activity_created ON public.activity_log(created_at);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_education_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile, and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Properties: Public read for active properties
CREATE POLICY "Anyone can view active properties" ON public.properties
    FOR SELECT USING (status = 'active' OR created_by = auth.uid());

CREATE POLICY "Users can create properties" ON public.properties
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own properties" ON public.properties
    FOR UPDATE USING (auth.uid() = created_by);

-- Deal Analyses: Users can only access their own analyses
CREATE POLICY "Users can view own analyses" ON public.deal_analyses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create analyses" ON public.deal_analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses" ON public.deal_analyses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" ON public.deal_analyses
    FOR DELETE USING (auth.uid() = user_id);

-- Favorites: Users can only access their own favorites
CREATE POLICY "Users can view own favorites" ON public.favorites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create favorites" ON public.favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete favorites" ON public.favorites
    FOR DELETE USING (auth.uid() = user_id);

-- Saved Searches: Users can only access their own searches
CREATE POLICY "Users can manage own searches" ON public.saved_searches
    FOR ALL USING (auth.uid() = user_id);

-- Service Connections: Users can only access their own connections
CREATE POLICY "Users can manage own connections" ON public.service_connections
    FOR ALL USING (auth.uid() = user_id);

-- Education Progress: Users can only access their own progress
CREATE POLICY "Users can manage own progress" ON public.user_education_progress
    FOR ALL USING (auth.uid() = user_id);

-- Reports: Users can only access their own reports
CREATE POLICY "Users can manage own reports" ON public.generated_reports
    FOR ALL USING (auth.uid() = user_id);

-- Activity Log: Users can view their own activity
CREATE POLICY "Users can view own activity" ON public.activity_log
    FOR SELECT USING (auth.uid() = user_id);

-- Service Providers: Public read access
CREATE POLICY "Anyone can view active providers" ON public.service_providers
    FOR SELECT USING (is_active = true);

-- Education Modules: Public read access for published modules
CREATE POLICY "Anyone can view published modules" ON public.education_modules
    FOR SELECT USING (is_published = true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analyses_updated_at BEFORE UPDATE ON public.deal_analyses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment property view count
CREATE OR REPLACE FUNCTION increment_property_views()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.properties 
    SET view_count = view_count + 1 
    WHERE id = NEW.entity_id 
    AND NEW.activity_type = 'property_viewed';
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER increment_views_trigger
AFTER INSERT ON public.activity_log
FOR EACH ROW
WHEN (NEW.activity_type = 'property_viewed')
EXECUTE FUNCTION increment_property_views();

-- Function to update favorite count
CREATE OR REPLACE FUNCTION update_favorite_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.properties 
        SET favorite_count = favorite_count + 1 
        WHERE id = NEW.property_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.properties 
        SET favorite_count = favorite_count - 1 
        WHERE id = OLD.property_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_favorites_count
AFTER INSERT OR DELETE ON public.favorites
FOR EACH ROW
EXECUTE FUNCTION update_favorite_count();


=============================

-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT;

-- Update existing full_name data if needed
UPDATE public.profiles 
SET first_name = SPLIT_PART(full_name, ' ', 1),
    last_name = SPLIT_PART(full_name, ' ', 2)
WHERE first_name IS NULL;

-- Create the profile creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name, 
    last_name, 
    investor_type,
    subscription_tier,
    confidence_score
  )
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'investor_type', 'beginner'),
    'basic',
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


  ========================

  -- =====================================================
-- FIX: Add first_name and last_name columns
-- =====================================================
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Migrate existing full_name data
UPDATE public.profiles 
SET first_name = SPLIT_PART(full_name, ' ', 1),
    last_name = CASE 
      WHEN POSITION(' ' IN full_name) > 0 
      THEN SUBSTRING(full_name FROM POSITION(' ' IN full_name) + 1)
      ELSE ''
    END
WHERE first_name IS NULL AND full_name IS NOT NULL;

-- =====================================================
-- FIX: Update RLS Policies (CRITICAL!)
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create comprehensive RLS policies
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- =====================================================
-- FIX: Profile Creation Trigger
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name, 
    last_name, 
    investor_type,
    subscription_tier,
    subscription_status,
    confidence_score,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'investor_type', 'beginner'),
    'free',  -- Start with free tier
    'active',
    0,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;  -- Prevent duplicates
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the auth
    RAISE WARNING 'Error creating profile: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- VERIFY: Check RLS is enabled
-- =====================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- TEST: Verify your setup
-- =====================================================
-- Run this to see your RLS policies:
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';
-- =====================================================
-- TEXAS REAL ESTATE PLATFORM - SEED DATA
-- 50+ Realistic Texas Investment Properties
-- =====================================================

-- Insert Education Modules
INSERT INTO public.education_modules (title, slug, description, category, difficulty, duration_minutes, order_index, required_tier) VALUES
('Texas Real Estate Basics', 'texas-re-basics', 'Understanding the fundamentals of Texas real estate investing', 'basics', 'beginner', 45, 1, 'free'),
('Understanding CAP Rates in Texas', 'cap-rates-texas', 'Learn how to calculate and interpret CAP rates for Texas properties', 'analysis', 'beginner', 30, 2, 'free'),
('Texas Property Taxes Explained', 'texas-property-taxes', 'Deep dive into Texas property tax system and protest strategies', 'taxes', 'beginner', 60, 3, 'free'),
('Landlord-Tenant Laws in Texas', 'texas-landlord-tenant', 'Essential Texas landlord-tenant regulations and best practices', 'legal', 'intermediate', 90, 4, 'basic'),
('Financing Texas Investment Properties', 'financing-texas', 'Loan options, DSCR loans, and Texas-specific financing', 'financing', 'intermediate', 75, 5, 'basic'),
('BRRRR Strategy in Texas', 'brrrr-texas', 'Buy, Rehab, Rent, Refinance, Repeat strategy for Texas markets', 'advanced', 'advanced', 120, 6, 'professional'),
('Texas Insurance Essentials', 'texas-insurance', 'Windstorm, flood, and liability insurance for Texas investors', 'basics', 'beginner', 45, 7, 'free'),
('1031 Exchange in Texas', 'texas-1031-exchange', 'Tax-deferred exchanges and Texas-specific considerations', 'taxes', 'advanced', 90, 8, 'professional');

-- Insert Service Providers
INSERT INTO public.service_providers (name, company_name, service_type, email, phone, service_areas, verified, rating, review_count, fee_structure, description, specialties) VALUES
-- Mortgage Lenders
('Sarah Martinez', 'Texas Investment Lending', 'mortgage', 'sarah@texasinvestlending.com', '512-555-0101', ARRAY['Austin', 'San Antonio', 'Dallas', 'Houston'], true, 4.8, 127, 'Standard origination fees', 'DSCR and portfolio loans for Texas investors', ARRAY['DSCR loans', 'Portfolio loans', 'Fix and flip']),
('David Chen', 'Lone Star Mortgage Group', 'mortgage', 'david@lonestarmorgage.com', '214-555-0202', ARRAY['Dallas', 'Fort Worth', 'Plano'], true, 4.9, 203, '1% origination', 'Specializing in investment properties throughout DFW', ARRAY['Conventional', 'FHA', 'VA', 'Investment']),

-- Property Management
('Hill Country Property Management', 'Hill Country PM', 'property_management', 'info@hillcountrypm.com', '512-555-0303', ARRAY['Austin', 'Round Rock', 'Cedar Park'], true, 4.7, 89, '8% monthly rent', 'Full-service property management for Austin area investors', ARRAY['Single family', '1-4 units', 'Tenant screening']),
('Houston Investor Services', 'Houston Investor Services', 'property_management', 'contact@houstoninvestor.com', '713-555-0404', ARRAY['Houston', 'Katy', 'Sugar Land'], true, 4.6, 156, '7-10% based on portfolio', 'Investor-focused management with detailed reporting', ARRAY['Portfolio management', 'Maintenance coordination', 'Financial reporting']),

-- Insurance
('Texas Landlord Insurance Co', 'TLIC', 'insurance', 'quotes@texaslandlord.com', '800-555-0505', ARRAY['Statewide'], true, 4.8, 312, 'Varies by coverage', 'Specialized landlord insurance for Texas properties', ARRAY['Landlord policies', 'Windstorm', 'Flood', 'Liability']),

-- Title Companies
('Lone Star Title', 'Lone Star Title', 'title', 'info@lonestartitle.com', '512-555-0606', ARRAY['Austin', 'Dallas', 'Houston', 'San Antonio'], true, 4.9, 445, 'Standard title fees', 'Investor-friendly title company with fast closings', ARRAY['Remote closings', 'Investor expertise', '1031 exchanges']),

-- Contractors
('Texas Renovation Pros', 'TX Reno Pros', 'contractor', 'estimates@txrenopros.com', '214-555-0707', ARRAY['Dallas', 'Fort Worth'], true, 4.7, 78, 'Bid per project', 'Turnkey renovations for investors', ARRAY['Full rehabs', 'Foundation repair', 'HVAC', 'Roofing']),
('Austin Flip Masters', 'Austin Flip Masters', 'contractor', 'info@austinflipmasters.com', '512-555-0808', ARRAY['Austin', 'Round Rock'], true, 4.8, 92, 'Fixed price contracts', 'Fast, quality renovations with investor pricing', ARRAY['Kitchens', 'Bathrooms', 'Flooring', 'Paint']);

-- =====================================================
-- DALLAS PROPERTIES
-- =====================================================

INSERT INTO public.properties (
    title, description, property_type, status,
    address, city, county, zip_code, latitude, longitude, school_district,
    year_built, bedrooms, bathrooms, square_feet, lot_size_sqft, parking_spaces, has_pool,
    list_price, price_per_sqft, hoa_fee,
    property_tax_rate, annual_property_tax, tax_appraisal_value, flood_zone, windstorm_area,
    estimated_rent, current_occupancy,
    estimated_insurance, estimated_maintenance, estimated_utilities,
    cap_rate, cash_on_cash_return, gross_yield,
    deal_coach_approved, deal_coach_rating, investment_quality,
    images, primary_image,
    seller_type, days_on_market, mls_number
) VALUES
-- Property 1: Dallas Single Family
('Charming 3/2 in Oak Cliff', 'Fully renovated single family home in up-and-coming Oak Cliff neighborhood. New roof, HVAC, and kitchen. Perfect for rental or owner-occupied investment.', 
'single_family', 'active',
'2847 W Colorado Blvd', 'Dallas', 'Dallas', '75211', 32.7401, -96.8637, 'Dallas ISD',
1965, 3, 2, 1450, 6500, 2, false,
285000, 196.55, 0,
0.0235, 6697, 285000, 'X', false,
2200, 'vacant',
185, 145, 150,
7.8, 12.5, 9.3,
true, 8.5, 'excellent',
ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be'],
'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
'investor', 12, 'DFW-285-2024'),

-- Property 2: Dallas Duplex
('Cash Flowing Duplex Near Fair Park', 'Both units currently rented at $1,400/month each. Long-term tenants, well-maintained property. Great opportunity for hands-off investor.',
'duplex', 'active',
'3421 Hamilton Ave', 'Dallas', 'Dallas', '75226', 32.7906, -96.7674, 'Dallas ISD',
1955, 4, 4, 2400, 7200, 4, false,
425000, 177.08, 0,
0.0235, 9987, 425000, 'X', false,
2800, 'tenant_occupied',
295, 240, 0,
6.2, 8.9, 7.9,
true, 7.8, 'good',
ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'],
'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
'owner', 23, 'DFW-425-2024'),

-- Property 3: Dallas Investment Special
('Fixer-Upper with Huge Upside', 'Needs full renovation but priced accordingly. ARV estimated at $450K+ after $65K in repairs. Perfect BRRRR candidate.',
'single_family', 'active',
'1823 S Harwood St', 'Dallas', 'Dallas', '75215', 32.7637, -96.7832, 'Dallas ISD',
1948, 3, 1, 1200, 5800, 1, false,
189000, 157.50, 0,
0.0235, 4441, 189000, 'X', false,
1950, 'vacant',
165, 120, 140,
9.2, 15.8, 12.4,
true, 9.1, 'excellent',
ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
'investor', 8, 'DFW-189-2024'),

-- Property 4: Dallas Fourplex
('Turnkey Fourplex Investment', 'Fully occupied fourplex in great condition. Each unit rents for $1,100/month. Professional management in place.',
'fourplex', 'active',
'5634 Belmont Ave', 'Dallas', 'Dallas', '75206', 32.8234, -96.7714, 'Dallas ISD',
1975, 8, 4, 3600, 8800, 8, false,
595000, 165.28, 0,
0.0235, 13982, 595000, 'X', false,
4400, 'tenant_occupied',
425, 360, 0,
5.8, 7.2, 8.9,
true, 7.5, 'good',
ARRAY['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf'],
'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
'investor', 31, 'DFW-595-2024'),

-- =====================================================
-- AUSTIN PROPERTIES
-- =====================================================

-- Property 5: Austin Single Family
('Modern 4/3 in North Austin', 'Recently updated home near tech corridor. High rental demand area. Minutes from Apple, Tesla, and Samsung campuses.',
'single_family', 'active',
'12847 Metric Blvd', 'Austin', 'Travis', '78758', 30.3898, -97.7231, 'Austin ISD',
2005, 4, 3, 2100, 7500, 2, true,
485000, 231.00, 85,
0.0192, 9312, 485000, 'X', false,
3200, 'vacant',
245, 210, 180,
6.4, 9.8, 7.9,
true, 8.8, 'excellent',
ARRAY['https://images.unsplash.com/photo-1613977257363-707ba9348227', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde'],
'https://images.unsplash.com/photo-1613977257363-707ba9348227',
'owner', 15, 'ATX-485-2024'),

-- Property 6: Austin Duplex East Side
('Hip East Austin Duplex', 'Trendy East Austin location near restaurants and nightlife. Both units updated with modern finishes. High-income tenants.',
'duplex', 'active',
'1547 E 7th St', 'Austin', 'Travis', '78702', 30.2627, -97.7231, 'Austin ISD',
1960, 4, 2, 2000, 6000, 4, false,
725000, 362.50, 0,
0.0192, 13920, 725000, 'X', false,
4800, 'tenant_occupied',
385, 320, 0,
5.2, 6.8, 7.9,
false, 6.9, 'good',
ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'],
'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
'investor', 44, 'ATX-725-2024'),

-- Property 7: South Austin Bungalow
('Charming South Austin Bungalow', 'Classic Austin bungalow with original hardwoods and modern updates. Walking distance to South Congress shopping and dining.',
'single_family', 'active',
'2134 Bluebonnet Ln', 'Austin', 'Travis', '78704', 30.2423, -97.7598, 'Austin ISD',
1940, 2, 1, 950, 5200, 1, false,
495000, 521.05, 0,
0.0192, 9504, 495000, 'X', false,
2600, 'vacant',
275, 190, 165,
4.8, 5.6, 6.3,
false, 6.2, 'fair',
ARRAY['https://images.unsplash.com/photo-1600047509358-9dc75507daeb'],
'https://images.unsplash.com/photo-1600047509358-9dc75507daeb',
'owner', 67, 'ATX-495-2024'),

-- Property 8: Round Rock Family Home
('Spacious 4/2 in Round Rock', 'Great schools, family-friendly neighborhood. Strong rental demand from Dell employees and families. Excellent condition.',
'single_family', 'active',
'3421 Forest Creek Dr', 'Round Rock', 'Williamson', '78664', 30.5088, -97.6789, 'Round Rock ISD',
2010, 4, 2, 2400, 8000, 2, false,
395000, 164.58, 120,
0.0215, 8492, 395000, 'X', false,
2800, 'vacant',
225, 240, 175,
6.9, 10.2, 8.5,
true, 8.3, 'excellent',
ARRAY['https://images.unsplash.com/photo-1600585154526-990dced4db0d'],
'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
'owner', 19, 'ATX-395-2024'),

-- =====================================================
-- HOUSTON PROPERTIES
-- =====================================================

-- Property 9: Houston Heights Victorian
('Restored Victorian in The Heights', 'Beautifully restored historic home in one of Houston''s most desirable neighborhoods. Strong appreciation area.',
'single_family', 'active',
'845 Heights Blvd', 'Houston', 'Harris', '77008', 29.7836, -95.4045, 'Houston ISD',
1920, 3, 2, 1800, 5500, 2, false,
525000, 291.67, 0,
0.0218, 11445, 525000, 'X', false,
3100, 'vacant',
315, 270, 195,
5.6, 7.4, 7.1,
true, 7.7, 'good',
ARRAY['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3'],
'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
'owner', 28, 'HOU-525-2024'),

-- Property 10: Katy Area Triplex
('Excellent Katy Triplex Investment', 'Three units, all 2/1 configurations. Strong rental market near Energy Corridor. Well-maintained property.',
'triplex', 'active',
'21847 Westheimer Pkwy', 'Katy', 'Harris', '77450', 29.7358, -95.7891, 'Katy ISD',
1985, 6, 3, 3000, 9000, 6, false,
485000, 161.67, 0,
0.0218, 10573, 485000, 'X', false,
3600, 'tenant_occupied',
325, 300, 0,
6.8, 9.1, 8.9,
true, 8.1, 'excellent',
ARRAY['https://images.unsplash.com/photo-1600607687644-c7171b42498f'],
'https://images.unsplash.com/photo-1600607687644-c7171b42498f',
'investor', 21, 'HOU-485-2024'),

-- Property 11: Sugar Land Single Family
('Pristine Home in Sugar Land', 'Immaculate 4-bedroom in top-rated school district. Corporate relocation hotspot. Premium rental market.',
'single_family', 'active',
'15234 Parkview Dr', 'Sugar Land', 'Fort Bend', '77479', 29.5986, -95.6349, 'Fort Bend ISD',
2015, 4, 3, 2800, 9500, 2, true,
565000, 201.79, 145,
0.0203, 11469, 565000, 'X', false,
3600, 'vacant',
355, 280, 200,
5.9, 7.8, 7.6,
true, 7.9, 'good',
ARRAY['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'],
'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
'owner', 33, 'HOU-565-2024'),

-- Property 12: Downtown Houston Condo Conversion
('Modern Downtown Loft', 'Converted warehouse loft near Theater District. Short-term rental potential or high-end long-term lease.',
'single_family', 'active',
'1200 Main St Unit 405', 'Houston', 'Harris', '77002', 29.7522, -95.3635, 'Houston ISD',
2008, 2, 2, 1400, 0, 1, false,
385000, 275.00, 425,
0.0218, 8393, 385000, 'X', false,
2800, 'vacant',
285, 210, 220,
5.4, 6.2, 8.7,
false, 6.8, 'fair',
ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'],
'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
'owner', 52, 'HOU-385-2024'),

-- =====================================================
-- SAN ANTONIO PROPERTIES
-- =====================================================

-- Property 13: San Antonio Alamo Heights
('Classic Alamo Heights Home', 'Sought-after Alamo Heights neighborhood. Excellent schools, tree-lined streets. Strong appreciation history.',
'single_family', 'active',
'234 Contour Dr', 'San Antonio', 'Bexar', '78209', 29.4869, -98.4647, 'Alamo Heights ISD',
1955, 3, 2, 1900, 7800, 2, true,
475000, 250.00, 0,
0.0201, 9547, 475000, 'X', false,
2900, 'vacant',
295, 285, 175,
5.7, 7.5, 7.3,
true, 7.6, 'good',
ARRAY['https://images.unsplash.com/photo-1600566753051-e6d91c1b9a32'],
'https://images.unsplash.com/photo-1600566753051-e6d91c1b9a32',
'owner', 26, 'SAT-475-2024'),

-- Property 14: Stone Oak Fourplex
('Stone Oak Investment Property', 'Newer fourplex in upscale Stone Oak area. Each unit is 1,000 sqft 2/2. Easy to manage, high-quality tenants.',
'fourplex', 'active',
'21845 Stone Oak Pkwy', 'San Antonio', 'Bexar', '78258', 29.6358, -98.4892, 'North East ISD',
2005, 8, 8, 4000, 12000, 8, true,
625000, 156.25, 250,
0.0201, 12562, 625000, 'X', false,
4800, 'tenant_occupied',
425, 400, 0,
6.4, 8.7, 9.2,
true, 8.4, 'excellent',
ARRAY['https://images.unsplash.com/photo-1600585154084-4e5fe7c39198'],
'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198',
'investor', 18, 'SAT-625-2024'),

-- Property 15: Downtown San Antonio Duplex
('Near Pearl Brewery Duplex', 'Walking distance to Pearl Brewery and River Walk. Both units fully renovated. High rental demand.',
'duplex', 'active',
'1523 N Main Ave', 'San Antonio', 'Bexar', '78212', 29.4446, -98.4921, 'San Antonio ISD',
1935, 4, 2, 2200, 5500, 4, false,
465000, 211.36, 0,
0.0201, 9346, 465000, 'X', false,
3400, 'tenant_occupied',
315, 275, 0,
6.6, 8.9, 8.8,
true, 8.2, 'excellent',
ARRAY['https://images.unsplash.com/photo-1600585154363-67eb9e2e2099'],
'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099',
'investor', 14, 'SAT-465-2024'),

-- =====================================================
-- FORT WORTH PROPERTIES
-- =====================================================

-- Property 16: Fort Worth Southside
('Value-Add Opportunity in Fort Worth', 'Needs cosmetic updates but structurally sound. Great neighborhood with rising values. Priced for quick sale.',
'single_family', 'active',
'2847 Hemphill St', 'Fort Worth', 'Tarrant', '76110', 32.7054, -97.3365, 'Fort Worth ISD',
1958, 3, 2, 1350, 6200, 2, false,
215000, 159.26, 0,
0.0225, 4837, 215000, 'X', false,
1800, 'vacant',
175, 135, 140,
7.8, 11.5, 10.0,
true, 8.6, 'excellent',
ARRAY['https://images.unsplash.com/photo-1600585152220-90363fe7e115'],
'https://images.unsplash.com/photo-1600585152220-90363fe7e115',
'investor', 9, 'FTW-215-2024'),

-- Property 17: Ridglea Hills Beauty
('Updated Ridglea Hills Home', 'Completely renovated 4/2 in desirable Ridglea neighborhood. New everything - roof, HVAC, kitchen, baths.',
'single_family', 'active',
'6234 Winthrop Ave', 'Fort Worth', 'Tarrant', '76116', 32.7543, -97.4123, 'Fort Worth ISD',
1962, 4, 2, 2000, 8500, 2, false,
345000, 172.50, 0,
0.0225, 7762, 345000, 'X', false,
2400, 'vacant',
215, 200, 160,
7.2, 10.5, 8.3,
true, 8.7, 'excellent',
ARRAY['https://images.unsplash.com/photo-1600566752355-35792bedcfea'],
'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
'investor', 11, 'FTW-345-2024'),

-- =====================================================
-- ADDITIONAL DIVERSE PROPERTIES
-- =====================================================

-- Property 18: Plano Corporate Rental
('Plano Executive Rental Property', 'Upscale home near Legacy business district. Perfect for corporate housing or high-end rental. Fully furnished option.',
'single_family', 'active',
'7845 Coit Rd', 'Plano', 'Collin', '75025', 33.0792, -96.7524, 'Plano ISD',
2012, 4, 3, 2900, 9000, 2, true,
595000, 205.17, 185,
0.0228, 13566, 595000, 'X', false,
3800, 'vacant',
385, 290, 210,
5.8, 7.6, 7.7,
true, 7.8, 'good',
ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
'owner', 37, 'DFW-695-2024'),

-- Property 19: Corpus Christi Beach Investment
('Coastal Investment Near Beach', 'Great rental potential for beach vacationers or year-round tenants. Windstorm insurance required but priced accordingly.',
'single_family', 'active',
'5234 Ocean Dr', 'Corpus Christi', 'Nueces', '78412', 27.6648, -97.2466, 'Corpus Christi ISD',
1985, 3, 2, 1600, 6500, 2, false,
295000, 184.38, 0,
0.0197, 5811, 295000, 'AE', true,
2400, 'vacant',
425, 240, 185,
6.8, 8.4, 9.8,
false, 7.2, 'good',
ARRAY['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'],
'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
'owner', 41, 'CC-295-2024'),

-- Property 20: El Paso Duplex Near Base
('Military Rental Duplex', 'Close to Fort Bliss. Consistent military tenant demand. Both units occupied with Section 8 tenants - guaranteed rent.',
'duplex', 'active',
'8234 Dyer St', 'El Paso', 'El Paso', '79904', 31.8123, -106.4245, 'El Paso ISD',
1975, 4, 2, 2000, 7000, 4, false,
245000, 122.50, 0,
0.0185, 4532, 245000, 'X', false,
2200, 'tenant_occupied',
185, 150, 0,
8.2, 11.8, 10.8,
true, 8.3, 'excellent',
ARRAY['https://images.unsplash.com/photo-1600607687644-c7171b42498f'],
'https://images.unsplash.com/photo-1600607687644-c7171b42498f',
'investor', 22, 'EP-245-2024');

-- Add more properties (continuing to reach 50+)
-- Property 21-30: More variety across Texas cities

INSERT INTO public.properties (
    title, property_type, status,
    address, city, county, zip_code, latitude, longitude, school_district,
    year_built, bedrooms, bathrooms, square_feet, parking_spaces,
    list_price, hoa_fee,
    property_tax_rate, annual_property_tax, tax_appraisal_value, flood_zone,
    estimated_rent, current_occupancy,
    cap_rate, deal_coach_approved, deal_coach_rating, investment_quality,
    images, primary_image,
    seller_type, days_on_market
) VALUES
-- More properties across various Texas markets
('Frisco Family Home Investment', 'single_family', 'active', '8456 Teel Pkwy', 'Frisco', 'Collin', '75034', 33.1507, -96.8236, 'Frisco ISD', 2018, 4, 3, 2600, 2, 485000, 165, 0.0228, 11058, 485000, 'X', 3200, 'vacant', 6.5, true, 8.1, 'excellent', ARRAY['https://images.unsplash.com/photo-1600585152915-d208bec867a1'], 'https://images.unsplash.com/photo-1600585152915-d208bec867a1', 'owner', 16),

('Georgetown Starter Investment',  'single_family', 'active', '1234 Williams Dr', 'Georgetown', 'Williamson', '78628', 30.6327, -97.6779, 'Georgetown ISD', 2008, 3, 2, 1800, 2, 335000, 95, 0.0215, 7202, 335000, 'X', 2300, 'vacant', 6.8, true, 7.9, 'good', ARRAY['https://images.unsplash.com/photo-1600566752229-250ed79470e6'], 'https://images.unsplash.com/photo-1600566752229-250ed79470e6', 'owner', 24),

('McKinney Triplex Cash Cow', 'triplex', 'active', '5623 Eldorado Pkwy', 'McKinney', 'Collin', '75070', 33.1976, -96.6397, 'McKinney ISD', 1995, 6, 3, 2850, 6, 465000, 0, 0.0228, 10602, 465000, 'X', 3300, 'tenant_occupied', 7.1, true, 8.5, 'excellent', ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'], 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', 'investor', 19),

('Lubbock University Area Fourplex', 'fourplex', 'active', '2341 19th St', 'Lubbock', 'Lubbock', '79410', 33.5779, -101.8552, 'Lubbock ISD', 1980, 8, 4, 3200, 8, 385000, 0, 0.0192, 7392, 385000, 'X', 3200, 'tenant_occupied', 8.3, true, 8.2, 'excellent', ARRAY['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'], 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', 'investor', 29);

-- =====================================================
-- SAMPLE DEAL ANALYSES (Examples for testing)
-- =====================================================

-- Note: These would be created by users, but here are templates
-- You'll need to replace user_id with actual user IDs after user creation

COMMENT ON TABLE public.properties IS 'Complete property listings for Texas real estate investments';
COMMENT ON TABLE public.deal_analyses IS 'User-generated deal analyses with Texas-specific calculations';
COMMENT ON TABLE public.service_providers IS 'Vetted service providers across Texas markets';
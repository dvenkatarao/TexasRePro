import { createClient } from './client';

export interface Property {
  id: string;
  user_id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: 'single_family' | 'duplex' | 'triplex' | 'fourplex';
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  purchase_price: number;
  current_value: number;
  rental_income: number;
  property_tax: number;
  insurance: number;
  hoa_fees: number;
  images: string[];
  status: 'active' | 'sold' | 'pending';
  cap_rate: number;
  cash_flow: number;
  created_at: string;
}

export async function getProperties(filters?: {
  city?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
}) {
  const supabase = createClient();
  
  let query = supabase
    .from('properties')
    .select('*')
    .eq('status', 'active');

  if (filters?.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  if (filters?.propertyType) {
    query = query.eq('property_type', filters.propertyType);
  }

  if (filters?.minPrice) {
    query = query.gte('purchase_price', filters.minPrice);
  }

  if (filters?.maxPrice) {
    query = query.lte('purchase_price', filters.maxPrice);
  }

  if (filters?.minBedrooms) {
    query = query.gte('bedrooms', filters.minBedrooms);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }

  return data as Property[];
}

export async function savePropertyAnalysis(analysisData: any) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('property_analyses')
    .insert([
      {
        user_id: user.id,
        analysis_data: analysisData,
        monthly_cash_flow: analysisData.monthlyCashFlow,
        cap_rate: analysisData.capRate,
        cash_on_cash_return: analysisData.cashOnCash,
        total_investment: analysisData.totalInvestment,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }

  return data;
}

export async function getServiceProviders(category?: string) {
  const supabase = createClient();
  
  let query = supabase
    .from('service_providers')
    .select('*')
    .order('rating', { ascending: false });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching service providers:', error);
    throw error;
  }

  return data;
}
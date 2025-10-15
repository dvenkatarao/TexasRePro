// src/app/properties/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, ChevronDown } from 'lucide-react';
import { PropertyCard } from '@/components/property/PropertyCard';
import HoverCard from '@/components/ui/hover-card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import Toast from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useFavorites } from '@/contexts/favorites-context';
import ProtectedRoute from '@/components/auth/protected-route';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000000],
    propertyType: 'all',
    bedrooms: 'any',
    city: 'all',
    capRate: 5
  });

  const [showFilters, setShowFilters] = useState(false);
  const [loadingProperties, setLoadingProperties] = useState<string[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        // Enhanced sample data - using static data instead of async call
        const sampleProperties = [
          {
            id: '1',
            address: '123 Main Street',
            city: 'Austin',
            state: 'TX',
            zipCode: '78704',
            price: 450000,
            bedrooms: 3,
            bathrooms: 2,
            square_feet: 1850,
            property_type: 'Single Family',
            description: 'Beautiful Texas ranch-style home in prime Austin location.',
            images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'],            estimated_rent: 2800,
            cap_rate: 6.2,
            cash_flow: 796,
            status: 'Deal Coach Approved',
            views: 142,
            days_on_market: 5,
            texasData: {
              county: 'Travis County',
              schoolDistrict: 'Austin ISD',
              property_tax_rate: 2.1,
              taxAppraisal: 420000,
              floodZone: 'X',
              windstormInsurance: false,
              texasHomesteadExempt: false,
              mlsNumber: 'AUST-123456'
            }
          },
          {
            id: '2',
            address: '456 Oak Avenue',
            city: 'Dallas',
            state: 'TX',
            zipCode: '75201',
            price: 375000,
            bedrooms: 4,
            bathrooms: 3,
            square_feet: 2200,
            property_type: 'Single Family',
            description: 'Spacious Dallas home in growing neighborhood.',
            images: ['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop'],
            estimated_rent: 2600,
            cap_rate: 6.8,
            cash_flow: 713,
            status: 'Hot Deal',
            views: 89,
            days_on_market: 10,
            texasData: {
              county: 'Dallas County',
              schoolDistrict: 'Dallas ISD',
              property_tax_rate: 2.35,
              taxAppraisal: 360000,
              floodZone: 'X',
              windstormInsurance: false,
              texasHomesteadExempt: false,
              mlsNumber: 'DAL-789012'
            }
          },
          {
            id: '3',
            address: '2468 Pine Triplex',
            city: 'San Antonio',
            state: 'TX',
            zipCode: '78201',
            price: 675000,
            bedrooms: 9,
            bathrooms: 6,
            square_feet: 4200,
            property_type: 'Triplex',
            description: 'Excellent cash-flowing triplex in growing San Antonio neighborhood.',
            images: ['https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop'],
            estimated_rent: 6200,
            cap_rate: 9.1,
            cash_flow: 2450,
            status: 'Deal Coach Approved',
            views: 167,
            days_on_market: 7,
            texasData: {
              county: 'Bexar County',
              schoolDistrict: 'San Antonio ISD',
              property_tax_rate: 2.2,
              taxAppraisal: 650000,
              floodZone: 'X',
              windstormInsurance: false,
              texasHomesteadExempt: false,
              mlsNumber: 'SA-789012'
            }
          },
          {
            id: '4',
            address: '1234 Oak Street',
            city: 'Austin',
            state: 'TX', 
            zipCode: '78701',
            price: 425000,
            bedrooms: 3,
            bathrooms: 2,
            square_feet: 1850,
            property_type: 'Single Family',
            description: 'Charming single family home in prime Austin location.',
            images: ['https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=300&fit=crop'],
            estimated_rent: 3200,
            cap_rate: 7.8,
            cash_flow: 1450,
            status: 'Deal Coach Approved',
            views: 203,
            days_on_market: 3,
            texasData: {
              county: 'Travis County',
              schoolDistrict: 'Austin ISD',
              property_tax_rate: 2.1,
              taxAppraisal: 410000,
              floodZone: 'X',
              windstormInsurance: false,
              texasHomesteadExempt: false,
              mlsNumber: 'AUST-456789'
            }
          },
          {
            id: '5',
            address: '5678 Main Avenue',
            city: 'Dallas',
            state: 'TX',
            zipCode: '75201',
            price: 380000,
            bedrooms: 4,
            bathrooms: 2,
            square_feet: 2200,
            property_type: 'Single Family',
            description: 'Spacious family home in Dallas with great rental potential.',
            images: ['https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop'],
            estimated_rent: 2900,
            cap_rate: 7.2,
            cash_flow: 980,
            status: 'Hot Deal',
            views: 89,
            days_on_market: 1,
            texasData: {
              county: 'Dallas County',
              schoolDistrict: 'Dallas ISD',
              property_tax_rate: 2.35,
              taxAppraisal: 375000,
              floodZone: 'X',
              windstormInsurance: false,
              texasHomesteadExempt: false,
              mlsNumber: 'DAL-123789'
            }
          },
          {
            id: '6',
            address: '910 Elm Street Duplex',
            city: 'Houston',
            state: 'TX',
            zipCode: '77001',
            price: 520000,
            bedrooms: 6,
            bathrooms: 4,
            square_feet: 3100,
            property_type: 'Duplex',
            description: 'Cash-flowing duplex in high-demand Houston neighborhood.',
            images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop'],
            estimated_rent: 4500,
            cap_rate: 8.5,
            cash_flow: 1850,
            status: 'BRRRR Ready',
            views: 203,
            days_on_market: 5,
            texasData: {
              county: 'Harris County',
              schoolDistrict: 'Houston ISD',
              property_tax_rate: 2.3,
              taxAppraisal: 500000,
              floodZone: 'AE',
              windstormInsurance: true,
              texasHomesteadExempt: false,
              mlsNumber: 'HOU-456123'
            }
          }
        ];

        setProperties(sampleProperties);
      } catch (error) {
        console.error('Error loading properties:', error);
        // Don't use showToast here to avoid dependency issues
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []); // Empty dependency array - only run once on mount

  const cities = ['All Cities', 'Austin', 'Dallas', 'Houston', 'San Antonio'];
  const propertyTypes = ['All Types', 'Single Family', 'Duplex', 'Triplex', 'Fourplex'];

  const handleToggleFavorite = async (propertyId: string) => {
    setLoadingProperties(prev => [...prev, propertyId]);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    toggleFavorite(propertyId);
    
    const action = favorites.includes(propertyId) ? 'removed from' : 'added to';
    showToast(`Property ${action} favorites`, 'success');
    setLoadingProperties(prev => prev.filter(id => id !== propertyId));
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    // Simulate loading more properties
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoadingMore(false);
    showToast('More properties loaded!', 'success');
  };

  const handleQuickAnalyze = (propertyAddress: string) => {
    showToast(`Opening analysis for ${propertyAddress}`, 'info');
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Texas Investment Properties</h1>
            <p className="text-gray-600">Vetted deals analyzed for investor success</p>
          </div>

          {/* Search and Filters */}
          <HoverCard className="bg-white rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by address, city, or ZIP code..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              {/* Filter Toggle */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="lg:w-auto w-full px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition flex items-center justify-center bg-white hover:bg-gray-50"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select className="lg:w-auto w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Price Low-High</option>
                  <option>Sort by: Price High-Low</option>
                  <option>Sort by: CAP Rate</option>
                  <option>Sort by: Cash Flow</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* City Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                      {cities.map(city => (
                        <option key={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                      {propertyTypes.map(type => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* CAP Rate Minimum */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min CAP Rate</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={filters.capRate}
                        onChange={(e) => setFilters({...filters, capRate: parseInt(e.target.value)})}
                        className="flex-1 transition-colors"
                      />
                      <span className="text-sm font-semibold">{filters.capRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['Austin', 'Dallas', 'Houston', 'San Antonio', 'Duplex', 'Single Family', 'BRRRR Ready', 'Deal Coach Approved', 'Under $500K', 'Cash Flow > $1K'].map(tag => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors hover:scale-105 transform"
                >
                  {tag}
                </button>
              ))}
            </div>
          </HoverCard>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{properties.length}</span> properties in Texas
            </p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <MapPin className="w-4 h-4 mr-1" />
                Map View
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm transition-colors">Grid</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors">List</button>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {loadingMore ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Loading Properties...
                </>
              ) : (
                'Load More Properties'
              )}
            </button>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Get New Properties First</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of Texas investors who get early access to vetted deals before they hit the public market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
              />
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Early Access
              </button>
            </div>
          </div>
        </div>

        {/* Toast Notifications */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </ProtectedRoute>
  );
}
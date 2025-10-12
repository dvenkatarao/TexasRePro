'use client';

import React, { useState } from 'react';
import { Search, Filter, MapPin, Home, Star, Eye, Bed, Bath, Square, TrendingUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    priceRange: [0, 5000000],
    propertyType: 'all',
    bedrooms: 'any',
    city: 'all',
    capRate: 5
  });

  const [showFilters, setShowFilters] = useState(false);

  const properties = [
    {
      id: 1,
      address: '1234 Oak Street',
      city: 'Austin',
      price: 425000,
      beds: 3,
      baths: 2,
      sqft: 1850,
      rent: 3200,
      capRate: 7.8,
      type: 'Single Family',
      status: 'Deal Coach Approved',
      image: '🏡',
      favorite: true,
      views: 142,
      daysOnMarket: 3,
      cashFlow: 1250
    },
    {
      id: 2,
      address: '5678 Main Avenue',
      city: 'Dallas',
      price: 380000,
      beds: 4,
      baths: 2.5,
      sqft: 2200,
      rent: 2900,
      capRate: 7.2,
      type: 'Single Family',
      status: 'Hot Deal',
      image: '🏠',
      favorite: false,
      views: 89,
      daysOnMarket: 1,
      cashFlow: 980
    },
    {
      id: 3,
      address: '910 Elm Street Duplex',
      city: 'Houston',
      price: 520000,
      beds: 6,
      baths: 4,
      sqft: 3100,
      rent: 4500,
      capRate: 8.5,
      type: 'Duplex',
      status: 'BRRRR Ready',
      image: '🏘️',
      favorite: true,
      views: 203,
      daysOnMarket: 5,
      cashFlow: 1850
    },
    {
      id: 4,
      address: '2468 Pine Triplex',
      city: 'San Antonio',
      price: 675000,
      beds: 9,
      baths: 6,
      sqft: 4200,
      rent: 6200,
      capRate: 9.1,
      type: 'Triplex',
      status: 'Deal Coach Approved',
      image: '🏢',
      favorite: false,
      views: 167,
      daysOnMarket: 7,
      cashFlow: 2450
    },
    {
      id: 5,
      address: '1357 Cedar Fourplex',
      city: 'Austin',
      price: 890000,
      beds: 12,
      baths: 8,
      sqft: 5800,
      rent: 8200,
      capRate: 8.8,
      type: 'Fourplex',
      status: 'Premium Deal',
      image: '🏬',
      favorite: false,
      views: 298,
      daysOnMarket: 2,
      cashFlow: 3250
    },
    {
      id: 6,
      address: '8642 Maple Single Family',
      city: 'Dallas',
      price: 345000,
      beds: 3,
      baths: 2,
      sqft: 1750,
      rent: 2650,
      capRate: 6.9,
      type: 'Single Family',
      status: 'Good Value',
      image: '🏡',
      favorite: true,
      views: 76,
      daysOnMarket: 12,
      cashFlow: 850
    }
  ];

  const cities = ['All Cities', 'Austin', 'Dallas', 'Houston', 'San Antonio'];
  const propertyTypes = ['All Types', 'Single Family', 'Duplex', 'Triplex', 'Fourplex'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">TexasRE Pro</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/listings" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Properties</Link>
              <Link href="/analysis" className="text-gray-700 hover:text-blue-600 font-medium">Analysis</Link>
              <Link href="/education" className="text-gray-700 hover:text-blue-600 font-medium">Education</Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Texas Investment Properties</h1>
          <p className="text-gray-600">Vetted deals analyzed for investor success</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by address, city, or ZIP code..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Filter Toggle */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto w-full px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition flex items-center justify-center"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select className="lg:w-auto w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
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
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {cities.map(city => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="flex-1"
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
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{properties.length}</span> properties in Texas
          </p>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <MapPin className="w-4 h-4 mr-1" />
              Map View
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">Grid</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">List</button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map(property => (
            <div key={property.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
              {/* Property Image/Header */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-green-100 h-48 flex items-center justify-center">
                  <span className="text-6xl">{property.image}</span>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    property.status === 'Deal Coach Approved' ? 'bg-green-500 text-white' :
                    property.status === 'Hot Deal' ? 'bg-red-500 text-white' :
                    property.status === 'BRRRR Ready' ? 'bg-purple-500 text-white' :
                    property.status === 'Premium Deal' ? 'bg-yellow-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {property.status}
                  </span>
                </div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition">
                  <Star className={`w-4 h-4 ${property.favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                </button>

                {/* Views Counter */}
                <div className="absolute bottom-4 left-4 flex items-center text-white bg-black/50 rounded-full px-2 py-1 text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  {property.views} views
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                {/* Location */}
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.city}, TX</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">{property.daysOnMarket} days on market</span>
                </div>

                {/* Address */}
                <h3 className="font-bold text-lg mb-3 hover:text-blue-600 cursor-pointer">{property.address}</h3>

                {/* Price */}
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  ${property.price.toLocaleString()}
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center">
                    <Bed className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold">{property.beds}</div>
                    <div className="text-xs text-gray-600">Beds</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold">{property.baths}</div>
                    <div className="text-xs text-gray-600">Baths</div>
                  </div>
                  <div className="text-center">
                    <Square className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold">{property.sqft.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold">{property.capRate}%</div>
                    <div className="text-xs text-gray-600">CAP</div>
                  </div>
                </div>

                {/* Financials */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Est. Monthly Rent</span>
                    <span className="font-semibold">${property.rent.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Est. Cash Flow</span>
                    <span className="font-semibold text-green-600">
                      ${property.cashFlow.toLocaleString()}/mo
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <Link 
                    href={`/analysis?property=${property.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-center"
                  >
                    Analyze Deal
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition font-semibold">
            Load More Properties
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
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Early Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
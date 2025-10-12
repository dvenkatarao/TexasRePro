'use client';

import React from 'react';
import { Heart, MapPin, Bed, Bath, Square, TrendingUp, Eye, Calculator } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/ui/header';
import ProtectedRoute from '@/components/auth/protected-route';
import { useFavorites } from '@/contexts/favorites-context';
import HoverCard from '@/components/ui/hover-card';

export default function FavoritesPage() {
  const { favoriteProperties, removeFromFavorites } = useFavorites();

  if (favoriteProperties.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-sm p-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">No Favorite Properties Yet</h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start exploring Texas investment properties and save your favorites to compare and analyze later.
              </p>
              <Link
                href="/listings"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorite Properties</h1>
                <p className="text-gray-600">
                  {favoriteProperties.length} saved propert{favoriteProperties.length === 1 ? 'y' : 'ies'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/listings"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Browse More
                </Link>
                <Link
                  href="/analysis"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Compare Properties
                </Link>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {favoriteProperties.map(property => (
              <HoverCard key={property.id} className="bg-white rounded-2xl overflow-hidden">
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

                  {/* Remove Favorite Button */}
                  <button 
                    onClick={() => removeFromFavorites(property.id)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </button>
                </div>

                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.city}, TX</span>
                  </div>

                  {/* Address */}
                  <h3 className="font-bold text-lg mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                    {property.address}
                  </h3>

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

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      href={`/analysis?property=${property.id}`}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
                    >
                      Analyze Deal
                    </Link>
                    <button 
                      onClick={() => removeFromFavorites(property.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
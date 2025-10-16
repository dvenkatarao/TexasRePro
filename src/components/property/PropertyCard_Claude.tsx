import React from 'react';
import { MapPin, Home, Bed, Bath, Square, TrendingUp, Award, Heart, DollarSign } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  county: string;
  zip_code: string;
  property_type: string;
  list_price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  estimated_rent: number;
  cap_rate: number;
  cash_on_cash_return: number;
  deal_coach_approved: boolean;
  deal_coach_rating: number;
  primary_image: string;
  days_on_market: number;
  property_tax_rate: number;
}

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onFavorite,
  isFavorited = false 
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPropertyTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      single_family: 'Single Family',
      duplex: 'Duplex',
      triplex: 'Triplex',
      fourplex: 'Fourplex',
    };
    return labels[type] || type;
  };

  const getCapRateColor = (rate: number) => {
    if (rate >= 8) return 'bg-green-100 text-green-800';
    if (rate >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-200">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.primary_image || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.deal_coach_approved && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Award className="w-3 h-3" />
              Deal Coach Approved
            </div>
          )}
          {property.days_on_market <= 7 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              🔥 New Listing
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(property.id);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
        >
          <Heart
            className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
          {getPropertyTypeLabel(property.property_type)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Price & Address */}
        <div className="mb-3">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {formatCurrency(property.list_price)}
            </h3>
            {property.deal_coach_rating && (
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                <Award className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-700">
                  {property.deal_coach_rating}/10
                </span>
              </div>
            )}
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
            {property.title}
          </h4>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">
              {property.address}, {property.city}, TX {property.zip_code}
            </span>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-gray-200 mb-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <Bed className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-gray-900">{property.bedrooms}</p>
            <p className="text-xs text-gray-500">Beds</p>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <Bath className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-gray-900">{property.bathrooms}</p>
            <p className="text-xs text-gray-500">Baths</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <Square className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {property.square_feet?.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">Sq Ft</p>
          </div>
        </div>

        {/* Investment Metrics */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              Est. Monthly Rent
            </span>
            <span className="text-sm font-bold text-green-600">
              {formatCurrency(property.estimated_rent || 0)}/mo
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              CAP Rate
            </span>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getCapRateColor(property.cap_rate || 0)}`}>
              {(property.cap_rate || 0).toFixed(2)}%
            </span>
          </div>

          {property.cash_on_cash_return && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cash on Cash</span>
              <span className="text-sm font-bold text-blue-600">
                {property.cash_on_cash_return.toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        {/* Texas-Specific Info */}
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              📍 {property.county} County
            </span>
            <span className="font-semibold text-gray-800">
              Tax Rate: {((property.property_tax_rate || 0) * 100).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            View Details
          </button>
          <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            Analyze Deal
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 rounded-xl transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

// Example usage component showing a grid of properties
const PropertyGrid = () => {
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());

  // Sample property data
  const sampleProperty: Property = {
    id: '1',
    title: 'Charming 3/2 in Oak Cliff',
    address: '2847 W Colorado Blvd',
    city: 'Dallas',
    county: 'Dallas',
    zip_code: '75211',
    property_type: 'single_family',
    list_price: 285000,
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1450,
    estimated_rent: 2200,
    cap_rate: 7.8,
    cash_on_cash_return: 12.5,
    deal_coach_approved: true,
    deal_coach_rating: 8.5,
    primary_image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    days_on_market: 12,
    property_tax_rate: 0.0235,
  };

  const handleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Texas Investment Properties
          </h1>
          <p className="text-gray-600">
            Vetted opportunities across the Lone Star State
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Show 6 sample cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PropertyCard
              key={i}
              property={{ ...sampleProperty, id: String(i) }}
              onFavorite={handleFavorite}
              isFavorited={favorites.has(String(i))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
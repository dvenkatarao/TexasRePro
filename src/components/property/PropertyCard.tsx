// components/property/PropertyCard.tsx
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, TrendingUp, Heart } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: string;
    address: string;
    city: string;
    state: string;
    zipCode?: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    square_feet?: number;
    squareFeet?: number;
    images?: string[];
    image?: string;
    status?: string;
    cap_rate?: number;
    cash_flow?: number;
    estimated_rent?: number;
    texasData?: {
      county: string;
      property_tax_rate: number;
    };
  };
  showAnalysis?: boolean;
}

export function PropertyCard({ property, showAnalysis = false }: PropertyCardProps) {
  const getImage = () => {
    if (Array.isArray(property.images) && property.images.length > 0) return property.images[0];
    if (property.image) return property.image;
    return '/placeholder-property.jpg';
  };

  const getSquareFeet = () => {
    return property.square_feet || property.squareFeet || 0;
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gradient-to-r from-gray-500 to-gray-600';
    if (status.includes('Sold') || status.includes('SOLD')) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (status.includes('Rent') || status.includes('RENT')) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    if (status.includes('Hot')) return 'bg-gradient-to-r from-red-500 to-orange-500';
    if (status.includes('Approved')) return 'bg-gradient-to-r from-emerald-500 to-teal-600';
    return 'bg-gradient-to-r from-purple-500 to-purple-600';
  };

  const imageUrl = getImage();
  const squareFeet = getSquareFeet();

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-border/50 overflow-hidden">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={property.address}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Badge */}
          {property.status && (
            <div className="absolute top-4 left-4">
              <Badge className={`${getStatusColor(property.status)} text-white border-0 shadow-lg text-xs font-semibold px-3 py-1`}>
                {property.status}
              </Badge>
            </div>
          )}
          
          {/* Favorite Button */}
          <button className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>

          {/* Analysis Badges */}
          {showAnalysis && property.cap_rate && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <Badge variant="secondary" className="bg-green-500/90 text-white border-0">
                {property.cap_rate}% CAP
              </Badge>
              {property.cash_flow && (
                <Badge variant="secondary" className="bg-blue-500/90 text-white border-0">
                  ${property.cash_flow}/mo
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-foreground">
              ${property.price.toLocaleString()}
            </h3>
            {property.estimated_rent && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Est. Rent</p>
                <p className="text-lg font-semibold text-green-600">${property.estimated_rent}/mo</p>
              </div>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start space-x-2 mb-4">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground line-clamp-1">{property.address}</h4>
              <p className="text-sm text-muted-foreground">
                {property.city}, {property.state} {property.zipCode}
              </p>
            </div>
          </div>

          {/* Property Features */}
          <div className="flex items-center justify-between py-3 border-y border-border/50 mb-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Square className="w-4 h-4" />
              <span>{squareFeet.toLocaleString()} sq ft</span>
            </div>
          </div>

          {/* Investment Metrics */}
          {showAnalysis && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">CAP Rate</p>
                  <p className="font-semibold text-green-600">{property.cap_rate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Cash Flow</p>
                  <p className="font-semibold text-blue-600">${property.cash_flow}/mo</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">County</p>
                  <p className="font-semibold text-foreground">{property.texasData?.county || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ROI</p>
                  <p className="font-semibold text-green-600">{property.cap_rate}%</p>
                </div>                
              </div>
            </div>
          )}

          {/* Action Button */}
          <Link 
            href={`/properties/${property.id}`}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold text-center block transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View Investment Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
// components/property/PropertyCard.tsx
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    texasData?: {
      county: string;
      property_tax_rate: number;
    };
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Safe property access
  const getImage = () => {
    if (Array.isArray(property.images) && property.images.length > 0) return property.images[0];
    if (property.image) return property.image;
    return '/placeholder-property.jpg';
  };

  const getSquareFeet = () => {
    return property.square_feet || property.squareFeet || 0;
  };

  const getCounty = () => {
    return property.texasData?.county || 'N/A';
  };

  const getTaxRate = () => {
    return property.texasData?.property_tax_rate || 'N/A';
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-500';
    if (status.includes('Sold') || status.includes('SOLD')) return 'bg-green-500';
    if (status.includes('Rent') || status.includes('RENT')) return 'bg-blue-500';
    return 'bg-red-500';
  };

  const imageUrl = getImage();
  const squareFeet = getSquareFeet();
  const county = getCounty();
  const taxRate = getTaxRate();

  return (
    <Link href={`/properties/${property.id}`} className="block no-underline">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-0">
          {/* Image with Status Badge */}
          <div className="aspect-video relative">
            {imageUrl ? (
              // Use regular img tag to avoid Next.js image config issues
              <img
                src={imageUrl}
                alt={property.address || 'Property image'}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
            
            {/* Status Badge */}
            {property.status && (
              <div className="absolute top-3 left-3">
                <Badge className={getStatusColor(property.status)}>
                  {property.status}
                </Badge>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{property.address}</h3>
            <p className="text-muted-foreground mb-2">
              {property.city}, {property.state} {property.zipCode || ''}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold">
                ${property.price.toLocaleString()}
              </span>
              <div className="flex gap-2">
                <Badge variant="secondary">{property.bedrooms} BD</Badge>
                <Badge variant="secondary">{property.bathrooms} BA</Badge>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{county} County</p>
              <p>{squareFeet.toLocaleString()} sq ft • Tax: {taxRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
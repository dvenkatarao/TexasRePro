// components/property/PropertyCard.tsx (completely flexible)
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: any; // Use any to avoid type conflicts
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Safe property access with comprehensive fallbacks
  const getImage = () => {
    if (Array.isArray(property.images) && property.images.length > 0) return property.images[0];
    if (property.image) return property.image;
    if (property.images) return property.images; // Handle case where images might be a string
    return '/placeholder-property.jpg';
  };

  const getSquareFeet = () => {
    return property.square_feet || property.squareFeet || property.square_footage || 0;
  };

  const getCounty = () => {
    return property.county || 
           property.texasData?.county || 
           property.texas_data?.county || 
           'N/A';
  };

  const getTaxRate = () => {
    return property.property_tax_rate || 
           property.tax_rate ||
           property.texasData?.property_tax_rate ||
           property.texasData?.propertyTaxRate ||
           property.texas_data?.property_tax_rate ||
           'N/A';
  };

  const imageUrl = getImage();
  const squareFeet = getSquareFeet();
  const county = getCounty();
  const taxRate = getTaxRate();

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="aspect-video relative">
            <img
              src={imageUrl}
              alt={property.address || 'Property image'}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{property.address || 'Address not available'}</h3>
            <p className="text-gray-600 mb-2">
              {property.city || ''}, {property.state || ''}
            </p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold">
                ${property.price ? property.price.toLocaleString() : 'N/A'}
              </span>
              <div className="flex gap-2">
                <Badge variant="secondary">{property.bedrooms || 0} BD</Badge>
                <Badge variant="secondary">{property.bathrooms || 0} BA</Badge>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p>{county} • {squareFeet.toLocaleString()} sq ft</p>
              <p>Tax Rate: {taxRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
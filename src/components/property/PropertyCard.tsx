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
    price: number;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    image: string;
    texasData: {
      county: string;
      propertyTaxRate: number;
    };
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="aspect-video relative">
            <img
              src={property.image}
              alt={property.address}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{property.address}</h3>
            <p className="text-gray-600 mb-2">
              {property.city}, {property.state}
            </p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold">${property.price.toLocaleString()}</span>
              <div className="flex gap-2">
                <Badge variant="secondary">{property.bedrooms} BD</Badge>
                <Badge variant="secondary">{property.bathrooms} BA</Badge>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p>{property.texasData.county} • {property.squareFeet.toLocaleString()} sq ft</p>
              <p>Tax Rate: {property.texasData.propertyTaxRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
// app/properties/page.tsx
import { PropertyCard } from '@/components/property/PropertyCard';
import { getAllProperties } from '@/lib/property-service';

export default async function PropertiesPage() {
  // This would fetch all properties from your database
  const properties = await getAllProperties();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Texas Investment Properties</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
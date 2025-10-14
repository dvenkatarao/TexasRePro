// app/properties/[id]/page.tsx
import { notFound } from 'next/navigation';
import PropertyDetailClient from './PropertyDetailClient';
import { getPropertyById, getAllPropertyIds } from '@/lib/property-service';

export async function generateStaticParams() {
  // This would come from your database in production
  return [
    { id: '1' },
    { id: '2' },
  ];
}

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return <PropertyDetailClient property={property} />;
}

// Optional: Generate metadata for each property
export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const property = await getPropertyById(params.id);
  
  if (!property) {
    return {
      title: 'Property Not Found'
    };
  }

  return {
    title: `${property.address} | ${property.city}, ${property.state}`,
    description: property.description,
  };
}
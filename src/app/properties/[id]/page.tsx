// app/properties/[id]/page.tsx
import { notFound } from 'next/navigation';
import PropertyDetailClient from './PropertyDetailClient';
import { getPropertyById } from '@/lib/property-service';

// This tells Next.js which paths to pre-render
export async function generateStaticParams() {
  // In production, this would fetch from your database
  const propertyIds = await getAllPropertyIds();
  
  return propertyIds.map((id) => ({
    id: id,
  }));
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
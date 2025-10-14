// app/properties/[id]/page.tsx
import { notFound } from 'next/navigation';
import PropertyDetailClient from './PropertyDetailClient';
import { getPropertyById, getAllPropertyIds } from '@/lib/property-service';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
  ];
}

interface PropertyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  console.log('Property data received in detail page:', property);
  console.log('Available fields:', Object.keys(property || {}));

  if (!property) {
    notFound();
  }

  return <PropertyDetailClient property={property} />;
}

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);
  
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
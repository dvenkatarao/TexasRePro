// app/api/properties/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPropertyById } from '@/lib/property-service';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = context.params;
    const property = await getPropertyById(id);
    
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
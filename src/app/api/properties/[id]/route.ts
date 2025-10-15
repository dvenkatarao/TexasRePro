// app/api/properties/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPropertyById } from '@/lib/property-service';

// Update the interface for Next.js 14 - params is now a Promise
interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    // Await the params promise to get the actual parameters
    const { id } = await context.params;
    
    // Validate ID
    if (!id) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
    }

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
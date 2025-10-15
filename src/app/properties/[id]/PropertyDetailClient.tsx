// app/properties/[id]/PropertyDetailClient.tsx
'use client';

import { useState } from 'react';
import { Download, Heart, Share2, Calculator, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PropertyDetailClientProps {
  property: any;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { showToast } = useToast(); // This returns { toast: { dispatch, ... } }

  const handleSaveProperty = () => {
  setIsSaved(!isSaved);
  showToast(
      isSaved ? 'Property removed from saved properties' : 'Property added to saved properties',
      'success'
  );
  };

    const handleDeepAnalysis = () => {
    showToast(
        `Deep analysis requested for ${property.address}`,
        'info'
    );
    };

  return (
    <div className="min-h-screen  bg-background">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">{property.address}</h1>
            <p className="text-lg mb-4">
              {property.city}, {property.state} {property.zip_code}
            </p>
            <div className="flex items-center gap-4">
              <Badge className="text-lg px-4 py-1 bg-card text-primary">
                ${property.price?.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="text-white border-white">
                {property.bedrooms} BD / {property.bathrooms} BA
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={activeTab === 'overview' ? "default" : "outline"}
                onClick={() => setActiveTab('overview')}
                className="flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Overview
              </Button>
              <Button
                variant={activeTab === 'financials' ? "default" : "outline"}
                onClick={() => setActiveTab('financials')}
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Financials
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleSaveProperty}>
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button onClick={() => window.print()} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm ext-muted-foreground">Type</p>
                        <p className="font-semibold">{property.property_type}</p>
                      </div>
                      <div>
                        <p className="text-sm ext-muted-foreground">Square Feet</p>
                        <p className="font-semibold">{property.square_feet?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm ext-muted-foreground">County</p>
                        <p className="font-semibold">{property.county || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm ext-muted-foreground">Year Built</p>
                        <p className="font-semibold">{property.year_built || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="ext-muted-foreground">{property.description}</p>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'financials' && (
              <Card>
                <CardHeader>
                  <CardTitle>Financial Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-primary">
                          {property.estimated_rent ? `$${property.estimated_rent}` : 'N/A'}
                        </p>
                        <p className="text-sm ext-muted-foreground">Est. Monthly Rent</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {property.cap_rate ? `${property.cap_rate}%` : 'N/A'}
                        </p>
                        <p className="text-sm ext-muted-foreground">Cap Rate</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">
                          {property.property_tax_rate ? `${property.property_tax_rate}%` : 'N/A'}
                        </p>
                        <p className="text-sm ext-muted-foreground">Tax Rate</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-accent rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Texas Investment Insights</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Property tax protest opportunities available</li>
                        <li>• No state income tax in Texas</li>
                        <li>• Landlord-friendly state laws</li>
                        <li>• Strong rental market in {property.city}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-green-200 bg-accent">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">Investment Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Good</div>
                  <p className="text-sm text-green-700">Solid cash flow opportunity in {property.city}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📝 Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🏠 Get Pre-Approved
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleDeepAnalysis}
                >
                  📊 Deep Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
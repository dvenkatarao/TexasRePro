// app/properties/[id]/PropertyDetailClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, Heart, Share2, Calculator, School, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyDetailClientProps {
  property: any;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const TabButton = ({ id, label, icon }: { id: string; label: string; icon: React.ReactNode }) => (
    <Button
      variant={activeTab === id ? "default" : "outline"}
      onClick={() => setActiveTab(id)}
      className="flex items-center gap-2"
    >
      {icon}
      {label}
    </Button>
  );

  // Calculate some basic financial metrics
  const monthlyCashFlow = (property.estimated_rent || 0) - (property.price * 0.01); // Simplified

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Badge variant="secondary" className="text-lg px-4 py-1">
                ${property.price.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="text-white border-white">
                {property.bedrooms} BD / {property.bathrooms} BA
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TabButton id="overview" label="Overview" icon={<MapPin className="w-4 h-4" />} />
              <TabButton id="financials" label="Financials" icon={<Calculator className="w-4 h-4" />} />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setIsSaved(!isSaved)}>
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
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-semibold">{property.property_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Square Feet</p>
                        <p className="font-semibold">{property.square_feet?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">County</p>
                        <p className="font-semibold">{property.county || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">School District</p>
                        <p className="font-semibold">{property.school_district || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tax Rate</p>
                        <p className="font-semibold">{property.property_tax_rate || 'N/A'}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{property.description}</p>
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
                        <p className="text-2xl font-bold text-blue-600">
                          {property.estimated_rent ? `$${property.estimated_rent}` : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">Est. Monthly Rent</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {property.cap_rate ? `${property.cap_rate}%` : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">Cap Rate</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">
                          ${monthlyCashFlow.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">Est. Cash Flow</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Texas Investment Considerations</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Property tax protest opportunities available</li>
                        <li>• No state income tax in Texas</li>
                        <li>• Landlord-friendly state laws</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Investment Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Good</div>
                  <p className="text-sm text-green-700">Solid cash flow opportunity</p>
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
                <Button variant="outline" className="w-full justify-start">
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
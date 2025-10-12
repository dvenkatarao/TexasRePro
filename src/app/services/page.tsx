'use client';

import React, { useState } from 'react';
import { 
  Home, Building, Users, Shield, Wrench, FileText, 
  Star, MapPin, Phone, Mail, Calendar, CheckCircle,
  Award, Clock, DollarSign, TrendingUp, Filter, Search,
  ChevronDown, MessageCircle, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/ui/header';


export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: Building, count: 42 },
    { id: 'mortgage', name: 'Mortgage Lenders', icon: DollarSign, count: 12 },
    { id: 'management', name: 'Property Management', icon: Users, count: 8 },
    { id: 'insurance', name: 'Insurance Providers', icon: Shield, count: 6 },
    { id: 'closing', name: 'Title & Closing', icon: FileText, count: 5 },
    { id: 'contractors', name: 'Contractors', icon: Wrench, count: 7 },
    { id: 'agents', name: 'Real Estate Agents', icon: Home, count: 4 },
  ];

  const serviceProviders = [
    {
      id: 1,
      name: 'Texas Lending Co.',
      category: 'mortgage',
      specialty: 'DSCR & Investment Loans',
      rating: 4.9,
      reviews: 347,
      responseTime: '2 hours',
      fee: 'Competitive Rates',
      locations: ['Austin', 'Dallas', 'Houston'],
      description: 'Specialized in Texas investment property financing with fast approvals',
      features: ['DSCR Loans', 'Portfolio Lending', 'Fast Closings', 'Texas Experts'],
      contact: {
        phone: '(512) 555-7890',
        email: 'loans@texaslending.co',
        website: 'texaslending.co'
      },
      image: '🏦',
      isFeatured: true,
      dealsClosed: 1250
    },
    {
      id: 2,
      name: 'DFW Property Pros',
      category: 'management',
      specialty: 'Multi-Family Management',
      rating: 4.8,
      reviews: 289,
      responseTime: '1 hour',
      fee: '8% Monthly',
      locations: ['Dallas', 'Fort Worth'],
      description: 'Full-service property management for Dallas-Fort Worth investors',
      features: ['Tenant Screening', 'Maintenance Coordination', 'Rent Collection', '24/7 Support'],
      contact: {
        phone: '(214) 555-4567',
        email: 'manage@dfwpropertypros.com',
        website: 'dfwpropertypros.com'
      },
      image: '👥',
      isFeatured: true,
      propertiesManaged: 450
    },
    {
      id: 3,
      name: 'Lone Star Insurance',
      category: 'insurance',
      specialty: 'Investment Property Coverage',
      rating: 4.7,
      reviews: 156,
      responseTime: '4 hours',
      fee: 'Free Quotes',
      locations: ['Statewide'],
      description: 'Texas-specific insurance solutions for rental properties',
      features: ['Landlord Policies', 'Flood Coverage', 'Windstorm', 'Liability Protection'],
      contact: {
        phone: '(800) 555-3421',
        email: 'quotes@lonestarins.com',
        website: 'lonestarins.com'
      },
      image: '🛡️',
      isFeatured: false,
      policiesWritten: 3200
    },
    {
      id: 4,
      name: 'Austin Title Partners',
      category: 'closing',
      specialty: 'Investor-Friendly Closings',
      rating: 4.9,
      reviews: 234,
      responseTime: 'Same Day',
      fee: 'Flat $1,295',
      locations: ['Austin', 'San Antonio'],
      description: 'Streamlined title and closing services for real estate investors',
      features: ['Online Tracking', 'Fast Closings', 'Investor Discounts', 'E-Signatures'],
      contact: {
        phone: '(512) 555-8899',
        email: 'closing@austintitle.com',
        website: 'austintitle.com'
      },
      image: '📄',
      isFeatured: true,
      closingsCompleted: 1800
    },
    {
      id: 5,
      name: 'Houston Renovation Crew',
      category: 'contractors',
      specialty: 'Turnkey Renovations',
      rating: 4.6,
      reviews: 189,
      responseTime: '24 hours',
      fee: 'Free Estimates',
      locations: ['Houston', 'Galveston'],
      description: 'Complete renovation services for investment properties',
      features: ['Kitchen/Bath Updates', 'Flooring', 'Painting', 'HVAC'],
      contact: {
        phone: '(713) 555-6677',
        email: 'projects@houstonrenovation.com',
        website: 'houstonrenovation.com'
      },
      image: '🔨',
      isFeatured: false,
      projectsCompleted: 650
    },
    {
      id: 6,
      name: 'Alamo City Realty',
      category: 'agents',
      specialty: 'Investment Property Specialist',
      rating: 4.8,
      reviews: 167,
      responseTime: '1 hour',
      fee: '2.5% Commission',
      locations: ['San Antonio'],
      description: 'Dedicated to helping investors find and acquire profitable properties',
      features: ['Off-Market Deals', 'Market Analysis', 'Negotiation', 'Portfolio Building'],
      contact: {
        phone: '(210) 555-7788',
        email: 'invest@alamocityrealty.com',
        website: 'alamocityrealty.com'
      },
      image: '🏠',
      isFeatured: true,
      dealsClosed: 420
    }
  ];

  const featuredProviders = serviceProviders.filter(provider => provider.isFeatured);
  const filteredProviders = activeCategory === 'all' 
    ? serviceProviders 
    : serviceProviders.filter(provider => provider.category === activeCategory);

  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyDetails: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactFormData);
    setShowContactForm(false);
    // Show success message
    alert('Message sent! The provider will contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Texas Service Providers</h1>
          <p className="text-gray-600">Vetted professionals to support your investment journey</p>
        </div>

        {/* Featured Providers */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Featured Texas Partners</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Award className="w-4 h-4 text-yellow-500" />
              <span>Platform Vetted & Investor Approved</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map(provider => (
              <div key={provider.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition border-2 border-blue-200">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{provider.image}</span>
                      <div>
                        <h3 className="font-bold text-lg">{provider.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold ml-1">{provider.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({provider.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      FEATURED
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{provider.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {provider.locations.join(', ')}
                    </div>
                    <div className="text-green-600 font-semibold">
                      {provider.fee}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <button 
                    onClick={() => setSelectedProvider(provider)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories & Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search providers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <h3 className="font-semibold mb-4">Service Categories</h3>
              <div className="space-y-2">
                {serviceCategories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                        activeCategory === category.id
                          ? 'bg-blue-50 border border-blue-200 text-blue-700'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <IconComponent className="w-4 h-4 mr-3" />
                        <span>{category.name}</span>
                      </div>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Additional Filters */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-3">Filter By</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Response Time</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Any</option>
                      <option>Within 1 hour</option>
                      <option>Within 4 hours</option>
                      <option>Within 24 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Any</option>
                      <option>4.5+ Stars</option>
                      <option>4.0+ Stars</option>
                      <option>3.5+ Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>All Texas</option>
                      <option>Austin Area</option>
                      <option>Dallas/Fort Worth</option>
                      <option>Houston Area</option>
                      <option>San Antonio</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Providers Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  {activeCategory === 'all' ? 'All Service Providers' : 
                   serviceCategories.find(cat => cat.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredProviders.length} providers found
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition">
                  <Filter className="w-4 h-4 mr-2" />
                  Sort By
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredProviders.map(provider => (
                <div key={provider.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">{provider.image}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-bold text-lg">{provider.name}</h3>
                            {provider.isFeatured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                FEATURED
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-3">{provider.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              {provider.rating} ({provider.reviews} reviews)
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {provider.responseTime} response
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {provider.locations.join(', ')}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {provider.features.map((feature, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600 mb-2">
                          {provider.fee}
                        </div>
                        <button 
                          onClick={() => setSelectedProvider(provider)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Provider Detail Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">{selectedProvider.image}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedProvider.name}</h2>
                    <p className="text-gray-600">{selectedProvider.specialty}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProvider(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{selectedProvider.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{selectedProvider.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{selectedProvider.contact.website}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Service Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time:</span>
                      <span className="font-semibold">{selectedProvider.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee:</span>
                      <span className="font-semibold text-green-600">{selectedProvider.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-semibold">{selectedProvider.rating} ★ ({selectedProvider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Provider
                </button>
                <a 
                  href={`tel:${selectedProvider.contact.phone}`}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition flex items-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Contact {selectedProvider.name}</h3>
                <button 
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactFormData.phone}
                    onChange={(e) => setContactFormData({...contactFormData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Details (Optional)
                  </label>
                  <textarea
                    value={contactFormData.propertyDetails}
                    onChange={(e) => setContactFormData({...contactFormData, propertyDetails: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your property or investment needs..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Send Message to {selectedProvider.name}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// lib/property-service.ts
export interface TexasData {
  county: string;
  schoolDistrict: string;
  propertyTaxRate: number;
  taxAppraisal: number;
  floodZone: string;
  windstormInsurance: boolean;
  texasHomesteadExempt: boolean;
  mlsNumber: string;
  architectureStyle?: string; // Texas ranch, suburban, etc.
  foundationType?: string; // Slab, pier and beam (Texas-specific)
  hvacAge?: number; // Important for Texas heat
  roofAge?: number; // Texas weather considerations
  pool?: boolean; // Common in Texas, maintenance consideration
  energyEfficiency?: string; // Important for Texas utilities
}

export interface FinancialData {
  estimatedRent: number;
  grossYield: number;
  capRate: number;
  cashOnCash: number;
  monthlyExpenses: number;
  propertyManagement: number;
  insurance: number;
  taxes: number;
  maintenance: number;
  vacancy: number;
  utilities?: number;
  hoaFees?: number;
  capitalExpenditures?: number;
  monthlyMortgage?: number;
  cashFlow?: number;
  noi?: number; // Net Operating Income
  dscr?: number; // Debt Service Coverage Ratio
}

export interface School {
  name: string;
  rating: number;
  type: 'Elementary School' | 'Middle School' | 'High School';
  distance: number; // miles
  grade?: string; // A, B, C, etc.
  districtRating?: number;
}

export interface NeighborhoodData {
  walkScore: number;
  transitScore: number;
  bikeScore: number;
  crimeRate: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  appreciation1Y: number;
  appreciation5Y: number;
  averageRent?: number;
  vacancyRate?: number;
  medianHomePrice?: number;
  populationGrowth?: number;
  jobGrowth?: number;
  texasMarketCycle?: 'Boom' | 'Growth' | 'Stable' | 'Decline';
}

export interface RiskAnalysis {
  type: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  mitigation?: string;
  probability?: number; // 0-100%
}

export interface DealCoachRating {
  overall: number; // 0-10
  cashFlow: number;
  appreciation: number;
  neighborhood: number;
  condition: number;
  valueAdd: number;
  recommendations: string[];
  confidence: 'Low' | 'Medium' | 'High' | 'Very High';
}

export interface PropertyAnalysis {
  brrrrPotential?: {
    buyPrice: number;
    repairEstimate: number;
    afterRepairValue: number;
    rentalIncome: number;
    cashOutRefinance: number;
  };
  taxProtestOpportunity?: {
    potentialSavings: number;
    successProbability: number;
    recommended: boolean;
  };
  renovationOpportunities?: {
    type: string;
    cost: number;
    valueAdd: number;
    roi: number;
  }[];
}

export interface ServiceProvider {
  id: string;
  name: string;
  type: 'mortgage' | 'insurance' | 'property-management' | 'title' | 'contractor';
  rating: number;
  reviews: number;
  specialties: string[];
  texasAreas: string[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
}

export interface Property {
  // Basic Information
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  
  // Property Characteristics
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number; // acres
  yearBuilt: number;
  propertyType: 'Single Family' | 'Duplex' | 'Triplex' | 'Fourplex' | 'Townhouse';
  architectureStyle?: 'Texas Ranch' | 'Modern' | 'Traditional' | 'Spanish' | 'Victorian';
  description: string;
  images: string[];
  videoTour?: string;
  
  // Texas-Specific Data
  texasData: TexasData;
  
  // Financial Analysis
  financials: FinancialData;
  
  // Education & Schools
  schools: School[];
  
  // Neighborhood & Market Data
  neighborhood: NeighborhoodData;
  
  // Property Features
  features: string[];
  amenities: string[];
  
  // Risk Analysis
  risks: RiskAnalysis[];
  
  // Deal Coach Assessment
  dealCoach: DealCoachRating;
  
  // Advanced Analysis
  analysis: PropertyAnalysis;
  
  // Recommended Service Providers
  recommendedProviders: ServiceProvider[];
  
  // Metadata
  listingDate: Date;
  lastUpdated: Date;
  status: 'Active' | 'Pending' | 'Sold' | 'Contingent';
  daysOnMarket: number;
  mlsStatus?: string;
  
  // Texas Investment Considerations
  investmentConsiderations: {
    propertyTaxProtest: boolean;
    insuranceConsiderations: string[];
    landlordTenantNotes: string[];
    maintenancePriorities: string[];
    utilityConsiderations: string[];
  };
  
  // BRRRR Strategy (if applicable)
  brrrrStrategy?: {
    phase: 'Buy' | 'Rehab' | 'Rent' | 'Refinance' | 'Repeat';
    estimatedTimeline: string;
    totalInvestment: number;
    projectedReturns: {
      cashFlow: number;
      appreciation: number;
      equity: number;
      totalROI: number;
    };
  };
}

// Mock data with all properties expanded
export const mockProperties: Property[] = [
  {
    id: '1',
    address: '123 Main Street',
    city: 'Austin',
    state: 'TX',
    zipCode: '78704',
    latitude: 30.2500,
    longitude: -97.7500,
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1850,
    lotSize: 0.25,
    yearBuilt: 1995,
    propertyType: 'Single Family',
    architectureStyle: 'Texas Ranch',
    description: 'Beautiful Texas ranch-style home in prime Austin location. Perfect for investment with strong rental demand. Features updated kitchen, hardwood floors, and large fenced yard. Located in highly sought-after Travis County with excellent school district.',
    images: ['/property1-1.jpg', '/property1-2.jpg', '/property1-3.jpg'],
    videoTour: 'https://example.com/tour/property1',
    
    texasData: {
      county: 'Travis County',
      schoolDistrict: 'Austin ISD',
      propertyTaxRate: 2.1,
      taxAppraisal: 420000,
      floodZone: 'X',
      windstormInsurance: false,
      texasHomesteadExempt: false,
      mlsNumber: 'AUST-123456',
      architectureStyle: 'Texas Ranch',
      foundationType: 'Slab',
      hvacAge: 8,
      roofAge: 5,
      pool: false,
      energyEfficiency: 'Good'
    },
    
    financials: {
      estimatedRent: 2800,
      grossYield: 7.5,
      capRate: 6.2,
      cashOnCash: 8.1,
      monthlyExpenses: 1200,
      propertyManagement: 224, // 8%
      insurance: 150,
      taxes: 735, // Based on 2.1% tax rate
      maintenance: 200,
      vacancy: 140, // 5%
      utilities: 180,
      hoaFees: 0,
      capitalExpenditures: 100,
      monthlyMortgage: 1850,
      cashFlow: 796,
      noi: 31752,
      dscr: 1.43
    },
    
    schools: [
      { 
        name: 'Austin High School', 
        rating: 8, 
        type: 'High School', 
        distance: 1.2,
        grade: 'A',
        districtRating: 8.5
      },
      { 
        name: 'O. Henry Middle School', 
        rating: 9, 
        type: 'Middle School', 
        distance: 0.8,
        grade: 'A+',
        districtRating: 9.2
      },
      { 
        name: 'Casis Elementary', 
        rating: 10, 
        type: 'Elementary School', 
        distance: 0.5,
        grade: 'A+',
        districtRating: 9.8
      }
    ],
    
    neighborhood: {
      walkScore: 75,
      transitScore: 68,
      bikeScore: 82,
      crimeRate: 'Low',
      appreciation1Y: 8.2,
      appreciation5Y: 42.5,
      averageRent: 2750,
      vacancyRate: 2.1,
      medianHomePrice: 465000,
      populationGrowth: 3.2,
      jobGrowth: 4.1,
      texasMarketCycle: 'Growth'
    },
    
    features: [
      'Updated Kitchen', 
      'Hardwood Floors', 
      'Fenced Yard', 
      'Two-Car Garage',
      'Energy Efficient Windows',
      'Smart Thermostat',
      'Updated Electrical',
      'Fresh Paint'
    ],
    
    amenities: [
      'Near Downtown',
      'Walking Trails',
      'Public Transportation',
      'Shopping Centers',
      'Restaurants',
      'Parks'
    ],
    
    risks: [
      {
        type: 'Market Volatility',
        description: 'Austin market has seen rapid appreciation, potential for short-term correction',
        severity: 'Medium',
        mitigation: 'Long-term hold strategy recommended',
        probability: 40
      },
      {
        type: 'Property Taxes',
        description: 'Travis County taxes increasing at 5% annually, above state average',
        severity: 'Medium',
        mitigation: 'File annual tax protest to mitigate increases',
        probability: 80
      },
      {
        type: 'Foundation Issues',
        description: 'Central Texas clay soil can cause foundation movement',
        severity: 'Low',
        mitigation: 'Regular foundation inspections recommended',
        probability: 20
      }
    ],
    
    dealCoach: {
      overall: 8.2,
      cashFlow: 7.5,
      appreciation: 9.0,
      neighborhood: 8.8,
      condition: 7.0,
      valueAdd: 8.5,
      recommendations: [
        'File tax protest to save ~$800 annually',
        'Consider HVAC service contract',
        'Add smart home features to increase rental appeal',
        'Monitor foundation regularly'
      ],
      confidence: 'High'
    },
    
    analysis: {
      brrrrPotential: {
        buyPrice: 450000,
        repairEstimate: 25000,
        afterRepairValue: 495000,
        rentalIncome: 3000,
        cashOutRefinance: 346500
      },
      taxProtestOpportunity: {
        potentialSavings: 840,
        successProbability: 65,
        recommended: true
      },
      renovationOpportunities: [
        {
          type: 'Kitchen Update',
          cost: 15000,
          valueAdd: 25000,
          roi: 66
        },
        {
          type: 'Bathroom Remodel',
          cost: 8000,
          valueAdd: 12000,
          roi: 50
        }
      ]
    },
    
    recommendedProviders: [
      {
        id: 'pm1',
        name: 'Lone Star Property Management',
        type: 'property-management',
        rating: 4.8,
        reviews: 127,
        specialties: ['Single Family', 'Austin Area', 'Premium Properties'],
        texasAreas: ['Austin', 'Travis County'],
        contact: {
          phone: '(512) 555-0123',
          email: 'info@lonestarpm.com',
          website: 'https://lonestarpm.com'
        }
      },
      {
        id: 'ins1',
        name: 'Texas Insurance Pros',
        type: 'insurance',
        rating: 4.6,
        reviews: 89,
        specialties: ['Landlord Policies', 'Windstorm Coverage', 'Flood Insurance'],
        texasAreas: ['Statewide'],
        contact: {
          phone: '(800) 555-0124',
          email: 'quotes@txinsurancepros.com'
        }
      }
    ],
    
    listingDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-20'),
    status: 'Active',
    daysOnMarket: 5,
    mlsStatus: 'Active',
    
    investmentConsiderations: {
      propertyTaxProtest: true,
      insuranceConsiderations: [
        'Standard landlord policy sufficient',
        'No windstorm coverage required',
        'Consider umbrella liability policy'
      ],
      landlordTenantNotes: [
        'No security deposit limits in Texas',
        '3-day notice for non-payment required',
        'Tenant repair and deduct rights apply'
      ],
      maintenancePriorities: [
        'HVAC system - 8 years old',
        'Roof - 5 years old, good condition',
        'Foundation - monitor for movement'
      ],
      utilityConsiderations: [
        'Average Texas electricity: $180/month',
        'Water: $45/month',
        'Gas: $25/month (if applicable)'
      ]
    },
    
    brrrrStrategy: {
      phase: 'Buy',
      estimatedTimeline: '6-9 months to refinance',
      totalInvestment: 121000,
      projectedReturns: {
        cashFlow: 9552,
        appreciation: 45000,
        equity: 45000,
        totalROI: 37.2
      }
    }
  },
  {
    id: '2',
    address: '456 Oak Avenue',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201',
    latitude: 32.7767,
    longitude: -96.7970,
    price: 375000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    lotSize: 0.18,
    yearBuilt: 1988,
    propertyType: 'Single Family',
    architectureStyle: 'Traditional',
    description: 'Spacious Dallas home in growing neighborhood. Great cash flow potential with recent updates and strong rental demand.',
    images: ['/property2-1.jpg', '/property2-2.jpg'],
    
    texasData: {
      county: 'Dallas County',
      schoolDistrict: 'Dallas ISD',
      propertyTaxRate: 2.35,
      taxAppraisal: 360000,
      floodZone: 'X',
      windstormInsurance: false,
      texasHomesteadExempt: false,
      mlsNumber: 'DAL-789012',
      foundationType: 'Slab',
      hvacAge: 12,
      roofAge: 3,
      pool: true,
      energyEfficiency: 'Average'
    },
    
    financials: {
      estimatedRent: 2600,
      grossYield: 8.3,
      capRate: 6.8,
      cashOnCash: 9.2,
      monthlyExpenses: 1350,
      propertyManagement: 208,
      insurance: 165,
      taxes: 734,
      maintenance: 250,
      vacancy: 130,
      cashFlow: 713
    },
    
    schools: [
      { name: 'Dallas High School', rating: 7, type: 'High School', distance: 1.5 },
      { name: 'Dallas Middle School', rating: 6, type: 'Middle School', distance: 1.1 },
      { name: 'Oak Elementary', rating: 8, type: 'Elementary School', distance: 0.7 }
    ],
    
    neighborhood: {
      walkScore: 65,
      transitScore: 72,
      bikeScore: 58,
      crimeRate: 'Moderate',
      appreciation1Y: 6.8,
      appreciation5Y: 35.2,
      texasMarketCycle: 'Stable'
    },
    
    features: [
      'Updated Kitchen',
      'Swimming Pool',
      'Large Backyard',
      'Two-Car Garage',
      'Fresh Paint'
    ],
    
    amenities: [
      'Near Schools',
      'Shopping',
      'Highways'
    ],
    
    risks: [
      {
        type: 'Pool Maintenance',
        description: 'Additional maintenance costs for pool',
        severity: 'Low',
        mitigation: 'Budget for pool maintenance',
        probability: 100
      }
    ],
    
    dealCoach: {
      overall: 7.8,
      cashFlow: 8.5,
      appreciation: 7.0,
      neighborhood: 7.2,
      condition: 8.0,
      valueAdd: 7.5,
      recommendations: [
        'Budget for pool maintenance',
        'Consider HVAC replacement soon',
        'Verify rental rates in area'
      ],
      confidence: 'Medium'
    },
    
    analysis: {
      taxProtestOpportunity: {
        potentialSavings: 720,
        successProbability: 60,
        recommended: true
      }
    },
    
    recommendedProviders: [
      {
        id: 'mtg1',
        name: 'Texas Lending Co.',
        type: 'mortgage',
        rating: 4.7,
        reviews: 203,
        specialties: ['DSCR Loans', 'Investment Properties', 'Texas Programs'],
        texasAreas: ['Statewide'],
        contact: {
          phone: '(214) 555-0125',
          email: 'loans@txlending.com'
        }
      }
    ],
    
    listingDate: new Date('2024-01-10'),
    lastUpdated: new Date('2024-01-20'),
    status: 'Active',
    daysOnMarket: 10,
    
    investmentConsiderations: {
      propertyTaxProtest: true,
      insuranceConsiderations: [
        'Pool liability coverage required',
        'Standard landlord policy'
      ],
      landlordTenantNotes: [
        'Pool safety requirements apply',
        'Standard Texas landlord-tenant laws'
      ],
      maintenancePriorities: [
        'Pool maintenance - ongoing',
        'HVAC system - 12 years old, consider replacement',
        'Roof - 3 years old, good condition'
      ],
      utilityConsiderations: [
        'Higher electricity due to pool pump',
        'Water costs higher for pool maintenance'
      ]
    }
  }
  // Add more properties as needed...
];

// Update the service functions to use the expanded data
export async function getPropertyById(id: string): Promise<Property | null> {
  // Simulate API/database call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const property = mockProperties.find(prop => prop.id === id);
  return property || null;
}

export async function getAllProperties(): Promise<Property[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockProperties;
}

export async function getAllPropertyIds(): Promise<string[]> {
  return mockProperties.map(prop => prop.id);
}

export async function getPropertiesByCity(city: string): Promise<Property[]> {
  await new Promise(resolve => setTimeout(resolve, 150));
  return mockProperties.filter(prop => 
    prop.city.toLowerCase() === city.toLowerCase()
  );
}

export async function searchProperties(filters: {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string;
}): Promise<Property[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockProperties.filter(property => {
    if (filters.city && property.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) {
      return false;
    }
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }
    return true;
  });
}
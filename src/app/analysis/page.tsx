'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, Home, TrendingUp, DollarSign, BarChart3, 
  Download, Share2, Save, RotateCcw, Zap, Target,
  Building, MapPin, Calendar, Users, Wrench, Shield
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [analysisData, setAnalysisData] = useState({
    // Property Details
    purchasePrice: 350000,
    closingCosts: 10500,
    repairBudget: 25000,
    
    // Rental Income
    unit1Rent: 1200,
    unit2Rent: 1100,
    unit3Rent: 900,
    unit4Rent: 0,
    vacancyRate: 5,
    
    // Operating Expenses
    propertyTax: 583,
    insurance: 145,
    management: 256,
    maintenance: 200,
    utilities: 150,
    hoaFees: 0,
    
    // Financing
    downPayment: 20,
    interestRate: 6.5,
    loanTerm: 30,
  });

  const [report, setReport] = useState<any>(null);

  // Calculate financial metrics
  useEffect(() => {
    const totalInvestment = analysisData.purchasePrice + analysisData.closingCosts + analysisData.repairBudget;
    const downPaymentAmount = (analysisData.purchasePrice * analysisData.downPayment) / 100;
    const loanAmount = analysisData.purchasePrice - downPaymentAmount;
    
    const monthlyRent = analysisData.unit1Rent + analysisData.unit2Rent + analysisData.unit3Rent + analysisData.unit4Rent;
    const grossMonthlyRent = monthlyRent;
    const vacancyLoss = grossMonthlyRent * (analysisData.vacancyRate / 100);
    const effectiveGrossIncome = grossMonthlyRent - vacancyLoss;
    
    const totalMonthlyExpenses = 
      analysisData.propertyTax + 
      analysisData.insurance + 
      analysisData.management + 
      analysisData.maintenance + 
      analysisData.utilities + 
      analysisData.hoaFees;
    
    const netOperatingIncome = effectiveGrossIncome - totalMonthlyExpenses;
    
    // Mortgage calculation
    const monthlyInterestRate = analysisData.interestRate / 100 / 12;
    const numberOfPayments = analysisData.loanTerm * 12;
    const mortgagePayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    const monthlyCashFlow = netOperatingIncome - mortgagePayment;
    const annualCashFlow = monthlyCashFlow * 12;
    const capRate = (netOperatingIncome * 12) / analysisData.purchasePrice * 100;
    const cashOnCash = (annualCashFlow / totalInvestment) * 100;

    setReport({
      totalInvestment,
      downPaymentAmount,
      loanAmount,
      grossMonthlyRent,
      vacancyLoss,
      effectiveGrossIncome,
      totalMonthlyExpenses,
      netOperatingIncome,
      mortgagePayment,
      monthlyCashFlow,
      annualCashFlow,
      capRate,
      cashOnCash
    });
  }, [analysisData]);

  const expenseData = [
    { name: 'Property Tax', value: analysisData.propertyTax, color: '#3B82F6' },
    { name: 'Insurance', value: analysisData.insurance, color: '#10B981' },
    { name: 'Management', value: analysisData.management, color: '#F59E0B' },
    { name: 'Maintenance', value: analysisData.maintenance, color: '#EF4444' },
    { name: 'Utilities', value: analysisData.utilities, color: '#8B5CF6' },
    { name: 'HOA Fees', value: analysisData.hoaFees, color: '#6B7280' },
  ];

  const projectionData = [
    { year: 1, value: report?.annualCashFlow || 0, equity: report?.totalInvestment || 0 },
    { year: 2, value: (report?.annualCashFlow || 0) * 1.03, equity: (report?.totalInvestment || 0) * 1.05 },
    { year: 3, value: (report?.annualCashFlow || 0) * 1.06, equity: (report?.totalInvestment || 0) * 1.10 },
    { year: 4, value: (report?.annualCashFlow || 0) * 1.09, equity: (report?.totalInvestment || 0) * 1.15 },
    { year: 5, value: (report?.annualCashFlow || 0) * 1.12, equity: (report?.totalInvestment || 0) * 1.20 },
  ];

  const handleInputChange = (field: string, value: number) => {
    setAnalysisData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetToDefaults = () => {
    setAnalysisData({
      purchasePrice: 350000,
      closingCosts: 10500,
      repairBudget: 25000,
      unit1Rent: 1200,
      unit2Rent: 1100,
      unit3Rent: 900,
      unit4Rent: 0,
      vacancyRate: 5,
      propertyTax: 583,
      insurance: 145,
      management: 256,
      maintenance: 200,
      utilities: 150,
      hoaFees: 0,
      downPayment: 20,
      interestRate: 6.5,
      loanTerm: 30,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">TexasRE Pro</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/listings" className="text-gray-700 hover:text-blue-600 font-medium">Properties</Link>
              <Link href="/analysis" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Analysis</Link>
              <Link href="/education" className="text-gray-700 hover:text-blue-600 font-medium">Education</Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Deal Analysis Tool</h1>
              <p className="text-gray-600">Crunch the numbers for any Texas investment property</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition">
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button 
                onClick={resetToDefaults}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          {['calculator', 'report', 'comparison'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium capitalize transition ${
                activeTab === tab 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'calculator' && <Calculator className="w-4 h-4 inline mr-2" />}
              {tab === 'report' && <BarChart3 className="w-4 h-4 inline mr-2" />}
              {tab === 'comparison' && <TrendingUp className="w-4 h-4 inline mr-2" />}
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'calculator' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Details Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <Building className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold">Property Details</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Price
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={analysisData.purchasePrice}
                        onChange={(e) => handleInputChange('purchasePrice', Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Costs
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={analysisData.closingCosts}
                        onChange={(e) => handleInputChange('closingCosts', Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Repair Budget
                    </label>
                    <div className="relative">
                      <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={analysisData.repairBudget}
                        onChange={(e) => handleInputChange('repairBudget', Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rental Income Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold">Rental Income</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit 1 Rent
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={analysisData.unit1Rent}
                        onChange={(e) => handleInputChange('unit1Rent', Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit 2 Rent
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={analysisData.unit2Rent}
                        onChange={(e) => handleInputChange('unit2Rent', Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit 3 Rent
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={analysisData.unit3Rent}
                        onChange={(e) => handleInputChange('unit3Rent', Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vacancy Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={analysisData.vacancyRate}
                        onChange={(e) => handleInputChange('vacancyRate', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="100"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Expenses Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
                  <h2 className="text-lg font-semibold">Operating Expenses</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: 'Property Tax', value: 'propertyTax', icon: Shield },
                    { label: 'Insurance', value: 'insurance', icon: Shield },
                    { label: 'Management (8%)', value: 'management', icon: Users },
                    { label: 'Maintenance', value: 'maintenance', icon: Wrench },
                    { label: 'Utilities', value: 'utilities', icon: Zap },
                    { label: 'HOA Fees', value: 'hoaFees', icon: Building },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={value}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <div className="relative">
                        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="number"
                          value={analysisData[value as keyof typeof analysisData]}
                          onChange={(e) => handleInputChange(value, Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financing Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                  <h2 className="text-lg font-semibold">Financing</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Down Payment (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={analysisData.downPayment}
                        onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="100"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={analysisData.interestRate}
                        onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                        min="0"
                        max="20"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (years)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={analysisData.loanTerm}
                        onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        max="40"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">yrs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="space-y-6">
              {/* Quick Summary */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Investment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-semibold">${report?.totalInvestment?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Cash Flow</span>
                    <span className={`font-semibold ${(report?.monthlyCashFlow || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${report?.monthlyCashFlow?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Cash Flow</span>
                    <span className={`font-semibold ${(report?.annualCashFlow || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${report?.annualCashFlow?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CAP Rate</span>
                    <span className="font-semibold text-blue-600">{report?.capRate?.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cash on Cash</span>
                    <span className="font-semibold text-purple-600">{report?.cashOnCash?.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              {/* Deal Assessment */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Deal Assessment</h3>
                <div className={`p-4 rounded-lg ${
                  (report?.cashOnCash || 0) >= 10 
                    ? 'bg-green-50 border border-green-200' 
                    : (report?.cashOnCash || 0) >= 5
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center mb-2">
                    <Target className={`w-5 h-5 mr-2 ${
                      (report?.cashOnCash || 0) >= 10 
                        ? 'text-green-600' 
                        : (report?.cashOnCash || 0) >= 5
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`} />
                    <span className="font-semibold">
                      {(report?.cashOnCash || 0) >= 10 
                        ? 'Strong Investment' 
                        : (report?.cashOnCash || 0) >= 5
                        ? 'Moderate Investment'
                        : 'Poor Investment'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {(report?.cashOnCash || 0) >= 10 
                      ? 'This deal exceeds Texas market averages. Consider moving forward.' 
                      : (report?.cashOnCash || 0) >= 5
                      ? 'This deal meets basic criteria. Review carefully.'
                      : 'This deal may not meet your investment goals.'}
                  </p>
                </div>
              </div>

              {/* Expense Breakdown */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'report' && report && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Comprehensive Analysis Report</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">${report.monthlyCashFlow?.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Monthly Cash Flow</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{report.capRate?.toFixed(2)}%</div>
                <div className="text-sm text-gray-600">CAP Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{report.cashOnCash?.toFixed(2)}%</div>
                <div className="text-sm text-gray-600">Cash on Cash</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{(report.netOperatingIncome / report.effectiveGrossIncome * 100)?.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Profit Margin</div>
              </div>
            </div>

            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" name="Annual Cash Flow" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                  <Area type="monotone" dataKey="equity" name="Equity Build" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
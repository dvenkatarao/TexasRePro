import React, { useState, useEffect } from 'react';
import { DollarSign, Home, TrendingUp, Calculator, Download, Save, AlertCircle } from 'lucide-react';

// TypeScript Interfaces
interface AnalysisData {
  analysis_name: string;
  purchase_price: number;
  down_payment_percent: number;
  interest_rate: number;
  loan_term_years: number;
  closing_cost_percent: number;
  renovation_budget: number;
  monthly_rent: number;
  other_monthly_income: number;
  vacancy_rate: number;
  property_tax_monthly: number;
  insurance_monthly: number;
  hoa_monthly: number;
  property_management_percent: number;
  maintenance_percent: number;
  utilities_monthly: number;
  strategy_type: string;
}

interface CalculatedMetrics {
  down_payment_amount: number;
  loan_amount: number;
  closing_costs: number;
  monthly_mortgage: number;
  gross_monthly_income: number;
  effective_monthly_income: number;
  property_management_monthly: number;
  maintenance_monthly: number;
  total_monthly_expenses: number;
  net_operating_income: number;
  monthly_cash_flow: number;
  annual_cash_flow: number;
  total_cash_needed: number;
  cap_rate: number;
  cash_on_cash_return: number;
  dscr: number;
  break_even: number;
}

const DealAnalysisCalculator = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    analysis_name: '',
    purchase_price: 285000,
    down_payment_percent: 20,
    interest_rate: 7.5,
    loan_term_years: 30,
    closing_cost_percent: 2,
    renovation_budget: 0,
    monthly_rent: 2200,
    other_monthly_income: 0,
    vacancy_rate: 5,
    property_tax_monthly: 560,
    insurance_monthly: 158,
    hoa_monthly: 0,
    property_management_percent: 8,
    maintenance_percent: 5,
    utilities_monthly: 0,
    strategy_type: 'buy_hold',
  });

  const [calculatedMetrics, setCalculatedMetrics] = useState<CalculatedMetrics | null>(null);

  // Real-time calculation
  useEffect(() => {
    const calculate = () => {
      const {
        purchase_price,
        down_payment_percent,
        interest_rate,
        loan_term_years,
        closing_cost_percent,
        renovation_budget,
        monthly_rent,
        other_monthly_income,
        vacancy_rate,
        property_tax_monthly,
        insurance_monthly,
        hoa_monthly,
        property_management_percent,
        maintenance_percent,
        utilities_monthly,
      } = analysisData;

      // Calculate down payment and loan
      const down_payment_amount = purchase_price * (down_payment_percent / 100);
      const loan_amount = purchase_price - down_payment_amount;
      const closing_costs = purchase_price * (closing_cost_percent / 100);

      // Calculate monthly mortgage
      const monthly_rate = interest_rate / 100 / 12;
      const num_payments = loan_term_years * 12;
      const monthly_mortgage =
        loan_amount *
        (monthly_rate * Math.pow(1 + monthly_rate, num_payments)) /
        (Math.pow(1 + monthly_rate, num_payments) - 1);

      // Calculate income
      const gross_monthly_income = monthly_rent + other_monthly_income;
      const effective_monthly_income = gross_monthly_income * (1 - vacancy_rate / 100);

      // Calculate expenses
      const property_management_monthly = gross_monthly_income * (property_management_percent / 100);
      const maintenance_monthly = gross_monthly_income * (maintenance_percent / 100);

      const total_monthly_expenses =
        property_tax_monthly +
        insurance_monthly +
        hoa_monthly +
        property_management_monthly +
        maintenance_monthly +
        utilities_monthly;

      // NOI and cash flow
      const net_operating_income = effective_monthly_income - total_monthly_expenses;
      const monthly_cash_flow = net_operating_income - monthly_mortgage;
      const annual_cash_flow = monthly_cash_flow * 12;

      // Total investment
      const total_cash_needed = down_payment_amount + closing_costs + renovation_budget;

      // Investment metrics
      const annual_noi = net_operating_income * 12;
      const cap_rate = (annual_noi / purchase_price) * 100;
      const cash_on_cash_return = (annual_cash_flow / total_cash_needed) * 100;
      const annual_debt_service = monthly_mortgage * 12;
      const dscr = annual_noi / annual_debt_service;
      const break_even = ((total_monthly_expenses + monthly_mortgage) / gross_monthly_income) * 100;

      setCalculatedMetrics({
        down_payment_amount,
        loan_amount,
        closing_costs,
        monthly_mortgage,
        gross_monthly_income,
        effective_monthly_income,
        property_management_monthly,
        maintenance_monthly,
        total_monthly_expenses,
        net_operating_income,
        monthly_cash_flow,
        annual_cash_flow,
        total_cash_needed,
        cap_rate,
        cash_on_cash_return,
        dscr,
        break_even,
      });
    };

    calculate();
  }, [analysisData]);

  const handleInputChange = (field: keyof AnalysisData, value: number | string) => {
    setAnalysisData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const getMetricColor = (metric: string, value: number): string => {
    if (metric === 'cap_rate') {
      if (value >= 8) return 'text-green-600';
      if (value >= 6) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (metric === 'cash_on_cash_return') {
      if (value >= 10) return 'text-green-600';
      if (value >= 6) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (metric === 'dscr') {
      if (value >= 1.25) return 'text-green-600';
      if (value >= 1.0) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (metric === 'monthly_cash_flow') {
      if (value >= 200) return 'text-green-600';
      if (value >= 0) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-gray-900';
  };

  const getDealRating = (): { rating: string; color: string; score: number } | null => {
    if (!calculatedMetrics) return null;
    
    let score = 0;
    if (calculatedMetrics.cap_rate >= 8) score += 3;
    else if (calculatedMetrics.cap_rate >= 6) score += 2;
    else if (calculatedMetrics.cap_rate >= 4) score += 1;

    if (calculatedMetrics.cash_on_cash_return >= 10) score += 3;
    else if (calculatedMetrics.cash_on_cash_return >= 6) score += 2;
    else if (calculatedMetrics.cash_on_cash_return >= 3) score += 1;

    if (calculatedMetrics.dscr >= 1.25) score += 2;
    else if (calculatedMetrics.dscr >= 1.0) score += 1;

    if (calculatedMetrics.monthly_cash_flow >= 200) score += 2;
    else if (calculatedMetrics.monthly_cash_flow >= 0) score += 1;

    if (score >= 9) return { rating: 'Excellent', color: 'bg-green-500', score: score };
    if (score >= 6) return { rating: 'Good', color: 'bg-yellow-500', score: score };
    if (score >= 3) return { rating: 'Fair', color: 'bg-orange-500', score: score };
    return { rating: 'Poor', color: 'bg-red-500', score: score };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Texas Deal Analysis</h1>
          </div>
          <p className="text-gray-600">Complete financial analysis for your investment property</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Purchase */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Property Purchase</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    value={analysisData.purchase_price}
                    onChange={(e) => handleInputChange('purchase_price', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment %
                  </label>
                  <input
                    type="number"
                    value={analysisData.down_payment_percent}
                    onChange={(e) => handleInputChange('down_payment_percent', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={analysisData.interest_rate}
                    onChange={(e) => handleInputChange('interest_rate', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term (Years)
                  </label>
                  <input
                    type="number"
                    value={analysisData.loan_term_years}
                    onChange={(e) => handleInputChange('loan_term_years', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Closing Costs %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={analysisData.closing_cost_percent}
                    onChange={(e) => handleInputChange('closing_cost_percent', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Renovation Budget
                  </label>
                  <input
                    type="number"
                    value={analysisData.renovation_budget}
                    onChange={(e) => handleInputChange('renovation_budget', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Income */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Monthly Income</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent
                  </label>
                  <input
                    type="number"
                    value={analysisData.monthly_rent}
                    onChange={(e) => handleInputChange('monthly_rent', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Income
                  </label>
                  <input
                    type="number"
                    value={analysisData.other_monthly_income}
                    onChange={(e) => handleInputChange('other_monthly_income', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vacancy Rate %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={analysisData.vacancy_rate}
                    onChange={(e) => handleInputChange('vacancy_rate', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Texas-Specific Expenses */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Texas Monthly Expenses</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Tax (Monthly)
                  </label>
                  <input
                    type="number"
                    value={analysisData.property_tax_monthly}
                    onChange={(e) => handleInputChange('property_tax_monthly', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance (Monthly)
                  </label>
                  <input
                    type="number"
                    value={analysisData.insurance_monthly}
                    onChange={(e) => handleInputChange('insurance_monthly', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    HOA Fees
                  </label>
                  <input
                    type="number"
                    value={analysisData.hoa_monthly}
                    onChange={(e) => handleInputChange('hoa_monthly', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Utilities
                  </label>
                  <input
                    type="number"
                    value={analysisData.utilities_monthly}
                    onChange={(e) => handleInputChange('utilities_monthly', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Management %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={analysisData.property_management_percent}
                    onChange={(e) => handleInputChange('property_management_percent', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maintenance %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={analysisData.maintenance_percent}
                    onChange={(e) => handleInputChange('maintenance_percent', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {calculatedMetrics && (
              <>
                {/* Deal Rating */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Deal Rating</h2>
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  
                  {(() => {
                    const rating = getDealRating();
                    if (!rating) return null;
                    return (
                      <div className="text-center">
                        <div className={`inline-block ${rating.color} text-white px-6 py-3 rounded-lg text-2xl font-bold mb-2`}>
                          {rating.rating}
                        </div>
                        <p className="text-blue-100 text-sm">Score: {rating.score}/10</p>
                      </div>
                    );
                  })()}
                </div>

                {/* Key Metrics */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600 font-medium">CAP Rate</span>
                      <span className={`text-xl font-bold ${getMetricColor('cap_rate', calculatedMetrics.cap_rate)}`}>
                        {formatPercent(calculatedMetrics.cap_rate)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600 font-medium">Cash on Cash</span>
                      <span className={`text-xl font-bold ${getMetricColor('cash_on_cash_return', calculatedMetrics.cash_on_cash_return)}`}>
                        {formatPercent(calculatedMetrics.cash_on_cash_return)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600 font-medium">DSCR</span>
                      <span className={`text-xl font-bold ${getMetricColor('dscr', calculatedMetrics.dscr)}`}>
                        {calculatedMetrics.dscr.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600 font-medium">Monthly Cash Flow</span>
                      <span className={`text-xl font-bold ${getMetricColor('monthly_cash_flow', calculatedMetrics.monthly_cash_flow)}`}>
                        {formatCurrency(calculatedMetrics.monthly_cash_flow)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Annual Cash Flow</span>
                      <span className="text-xl font-bold text-gray-900">
                        {formatCurrency(calculatedMetrics.annual_cash_flow)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Investment Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment</span>
                      <span className="font-semibold">{formatCurrency(calculatedMetrics.down_payment_amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Closing Costs</span>
                      <span className="font-semibold">{formatCurrency(calculatedMetrics.closing_costs)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Renovation</span>
                      <span className="font-semibold">{formatCurrency(analysisData.renovation_budget)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t-2 border-gray-300">
                      <span className="font-bold text-gray-900">Total Cash Needed</span>
                      <span className="font-bold text-blue-600 text-lg">{formatCurrency(calculatedMetrics.total_cash_needed)}</span>
                    </div>
                  </div>
                </div>

                {/* Monthly Breakdown */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Breakdown</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-green-600">
                      <span>Gross Income</span>
                      <span className="font-semibold">{formatCurrency(calculatedMetrics.gross_monthly_income)}</span>
                    </div>
                    <div className="flex justify-between text-yellow-600">
                      <span>After Vacancy</span>
                      <span className="font-semibold">{formatCurrency(calculatedMetrics.effective_monthly_income)}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Total Expenses</span>
                      <span className="font-semibold">-{formatCurrency(calculatedMetrics.total_monthly_expenses)}</span>
                    </div>
                    <div className="flex justify-between text-blue-600 pt-2 border-t">
                      <span className="font-semibold">NOI</span>
                      <span className="font-semibold">{formatCurrency(calculatedMetrics.net_operating_income)}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Mortgage P&I</span>
                      <span className="font-semibold">-{formatCurrency(calculatedMetrics.monthly_mortgage)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t-2 border-gray-300">
                      <span className="font-bold">Net Cash Flow</span>
                      <span className={`font-bold text-lg ${getMetricColor('monthly_cash_flow', calculatedMetrics.monthly_cash_flow)}`}>
                        {formatCurrency(calculatedMetrics.monthly_cash_flow)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Save className="w-5 h-5" />
                    Save Analysis
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Download className="w-5 h-5" />
                    Export PDF Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealAnalysisCalculator;
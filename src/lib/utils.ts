// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export function calculateMonthlyMortgage(loanAmount: number, interestRate: number, loanTerm: number = 30): number {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  return loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

export function calculateCashFlow(rent: number, expenses: number, mortgage: number): number {
  return rent - expenses - mortgage;
}
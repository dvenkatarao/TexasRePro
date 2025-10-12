import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Header() {
  return (
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
            <Link href="/analysis" className="text-gray-700 hover:text-blue-600 font-medium">Analysis</Link>
            <Link href="/education" className="text-gray-700 hover:text-blue-600 font-medium">Education</Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/auth/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
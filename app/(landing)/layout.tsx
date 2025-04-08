import { Network } from 'lucide-react';
import Link from 'next/link';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm py-3">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Network className="h-8 w-8 text-primary-600 mr-2" />
            <span className="text-xl font-bold">GikaGraph</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="#technology" className="hover:text-primary-600 transition-colors">
              Technology
            </Link>
            <Link href="#usecases" className="hover:text-primary-600 transition-colors">
              Use Cases
            </Link>
            <Link href="#" className="hover:text-primary-600 transition-colors">
              About
            </Link>
          </div>
          
          <div>
            <Link 
              href="/chat" 
              className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try GikaGraph
            </Link>
          </div>
        </div>
      </nav>
      
      {children}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Network className="h-6 w-6 text-primary-400 mr-2" />
                <span className="text-xl font-bold">GikaGraph</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming enterprise data into actionable intelligence with specialized SLMs and dynamic entity graphs.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Solutions</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Case Studies</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 GikaGraph, Inc. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
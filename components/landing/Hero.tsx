import Link from 'next/link';
import { ChevronRight, Network, Database, Code } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Entity Intelligence for the Enterprise
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Transform fragmented data into grounded, actionable insights with specialized small language models.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/chat" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-primary-700 transition-colors">
                Explore Platform
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-white rounded-2xl shadow-xl p-6 flex flex-col">
                  <div className="flex items-center mb-4">
                    <Network className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="font-medium text-sm">Entity Graph</span>
                  </div>
                  <div className="flex-1 relative">
                    {/* Simulated entity graph visualization */}
                    <div className="absolute inset-0">
                      <div className="w-8 h-8 bg-primary-100 rounded-full absolute top-8 left-8 flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary-500 rounded-full"></div>
                      </div>
                      <div className="w-6 h-6 bg-blue-100 rounded-full absolute top-20 left-24 flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="w-7 h-7 bg-purple-100 rounded-full absolute bottom-6 left-16 flex items-center justify-center">
                        <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                      </div>
                      <div className="w-5 h-5 bg-yellow-100 rounded-full absolute bottom-14 right-10 flex items-center justify-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      </div>
                      <div className="w-9 h-9 bg-red-100 rounded-full absolute top-6 right-6 flex items-center justify-center">
                        <div className="w-7 h-7 bg-red-500 rounded-full"></div>
                      </div>
                      {/* Connection lines */}
                      <svg className="absolute inset-0 w-full h-full">
                        <line x1="32" y1="40" x2="56" y2="88" stroke="#10B981" strokeWidth="1" />
                        <line x1="32" y1="40" x2="144" y2="40" stroke="#10B981" strokeWidth="1" />
                        <line x1="56" y1="88" x2="136" y2="144" stroke="#6366F1" strokeWidth="1" />
                        <line x1="136" y1="144" x2="180" y2="96" stroke="#F59E0B" strokeWidth="1" />
                        <line x1="144" y1="40" x2="180" y2="96" stroke="#EF4444" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating info cards */}
              <div className="absolute -right-6 top-16 w-64 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center mb-2">
                  <Database className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="font-medium text-sm">Data Integration</span>
                </div>
                <p className="text-xs text-gray-600">
                  Connects internal and external data sources for comprehensive entity understanding.
                </p>
              </div>
              
              <div className="absolute -left-6 bottom-16 w-64 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center mb-2">
                  <Code className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="font-medium text-sm">Specialized SLMs</span>
                </div>
                <p className="text-xs text-gray-600">
                  Domain-tuned small language models for precise entity comprehension.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Zap, Network } from 'lucide-react';

export default function TechSection() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center mb-24">
        <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
          <h3 className="text-2xl font-bold mb-4">Entity-Aware SLMs</h3>
          <p className="text-gray-600 mb-6">
            Our small language models are fine-tuned for specific verticals to understand domain-specific entities with unprecedented precision.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mt-1 bg-primary-100 p-1 rounded-full mr-3">
                <Zap className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <span className="font-medium">Vertical-Specific Training</span>
                <p className="text-sm text-gray-600 mt-1">
                  Models tailored for healthcare, finance, e-commerce and more
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mt-1 bg-primary-100 p-1 rounded-full mr-3">
                <Zap className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <span className="font-medium">Entity Recognition</span>
                <p className="text-sm text-gray-600 mt-1">
                  Precise identification of products, suppliers, regulations, and more
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mt-1 bg-primary-100 p-1 rounded-full mr-3">
                <Zap className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <span className="font-medium">Low Resource Requirements</span>
                <p className="text-sm text-gray-600 mt-1">
                  10x more efficient than general-purpose LLMs with higher accuracy
                </p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-50 to-primary-50 rounded-xl p-8 relative">
          <div className="flex justify-between mb-8">
            <div className="text-sm text-gray-500">Model Architecture</div>
            <div className="text-sm font-medium bg-primary-100 text-primary-800 px-2 py-1 rounded">
              Industry-Optimized
            </div>
          </div>
          
          {/* Stylized SLM model visualization */}
          <div className="h-64 flex flex-col">
            <div className="flex-1 flex">
              <div className="w-1/3 bg-blue-100 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-200 opacity-50 flex flex-col justify-center items-center">
                  <div className="h-1 w-16 bg-blue-400 rounded-full mb-2"></div>
                  <div className="h-1 w-20 bg-blue-400 rounded-full mb-2"></div>
                  <div className="h-1 w-12 bg-blue-400 rounded-full"></div>
                </div>
                <div className="absolute bottom-2 left-2 text-xs font-medium text-blue-800">Input Layer</div>
              </div>
              <div className="w-1/3 bg-purple-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-200 opacity-50 flex flex-col justify-center items-center">
                  <div className="grid grid-cols-3 gap-1 p-2">
                    {Array(9).fill(0).map((_, i) => (
                      <div key={i} className="h-3 w-3 bg-purple-300 rounded-sm"></div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 text-xs font-medium text-purple-800">Entity Layer</div>
              </div>
              <div className="w-1/3 bg-primary-100 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-200 opacity-50 flex flex-col justify-center items-center">
                  <div className="h-1 w-12 bg-primary-400 rounded-full mb-2"></div>
                  <div className="h-1 w-16 bg-primary-400 rounded-full mb-2"></div>
                  <div className="h-1 w-20 bg-primary-400 rounded-full"></div>
                </div>
                <div className="absolute bottom-2 left-2 text-xs font-medium text-primary-800">Output Layer</div>
              </div>
            </div>
            <div className="h-16 bg-gray-100 rounded-b-lg flex items-center justify-center">
              <div className="text-xs font-medium text-gray-500">Domain-Specific Knowledge Base</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mt-6">
            Our specialized SLMs are optimized for specific industries with focused training sets and entity embedding layers.
          </div>
        </div>
      </div>
      
      <div className="flex flex-col-reverse lg:flex-row items-center">
        <div className="lg:w-1/2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 relative">
          <div className="flex justify-between mb-8">
            <div className="text-sm text-gray-500">Entity Relationships</div>
            <div className="text-sm font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
              Dynamic Mapping
            </div>
          </div>
          
          {/* Stylized graph visualization */}
          <div className="h-64 relative">
            <div className="absolute inset-0">
              {/* Central node */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-indigo-400 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Product</div>
              </div>
              
              {/* Connected nodes */}
              <div className="absolute top-1/4 left-1/4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-purple-300 rounded-full"></div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Reviews</div>
              </div>
              
              <div className="absolute bottom-1/4 left-1/3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary-300 rounded-full"></div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Inventory</div>
              </div>
              
              <div className="absolute top-1/3 right-1/4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Suppliers</div>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Pricing</div>
              </div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4" />
                <line x1="50%" y1="50%" x2="33%" y2="75%" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
                <line x1="50%" y1="50%" x2="75%" y2="33%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mt-6">
            Dynamic entity graphs connect related data points to provide comprehensive context for more accurate insights.
          </div>
        </div>
        
        <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pl-12">
          <h3 className="text-2xl font-bold mb-4">Dynamic Entity Graphs</h3>
          <p className="text-gray-600 mb-6">
            Our platform maps relationships between data points across your entire information ecosystem, enabling context-rich answers.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mt-1 bg-indigo-100 p-1 rounded-full mr-3">
                <Network className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <span className="font-medium">Relationship Mapping</span>
                <p className="text-sm text-gray-600 mt-1">
                  Connects products, reviews, inventory, regulations, and more
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mt-1 bg-indigo-100 p-1 rounded-full mr-3">
                <Network className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <span className="font-medium">Self-Updating</span>
                <p className="text-sm text-gray-600 mt-1">
                  Continuously incorporates new data and evolves relationships
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mt-1 bg-indigo-100 p-1 rounded-full mr-3">
                <Network className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <span className="font-medium">Cross-Source Integration</span>
                <p className="text-sm text-gray-600 mt-1">
                  Unifies internal systems with external data sources
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

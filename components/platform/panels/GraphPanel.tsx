import { Network } from "lucide-react";

interface GraphPanelProps {
    data: any; // In a real app, use proper typing
  }
  
  export default function GraphPanel({ data }: GraphPanelProps) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Network className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="font-medium mb-2">Entity Relationship Graph</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Visualizing connections for {data.entities[0].name}
          </p>
          
          {/* This would be replaced with an actual graph visualization component */}
          <div className="relative h-64 w-64 mx-auto">
            {/* Central node */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-emerald-200 dark:bg-emerald-800/30 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-emerald-400 dark:bg-emerald-600/50 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                {data.entities[0].name.length > 15 
                  ? data.entities[0].name.substring(0, 15) + '...' 
                  : data.entities[0].name}
              </div>
            </div>
            
            {/* Connected nodes - positioned around in a circle */}
            {data.relatedEntities.slice(0, 4).map((entity: any, index: number) => {
              // Calculate position on circle
              const angle = (index * Math.PI / 2) + (Math.PI / 4); // Distribute around circle
              const x = 50 + 40 * Math.cos(angle);
              const y = 50 + 40 * Math.sin(angle);
              
              // Color variations
              const colors = [
                { bg: "bg-blue-100 dark:bg-blue-900/30", inner: "bg-blue-300 dark:bg-blue-700/50" },
                { bg: "bg-purple-100 dark:bg-purple-900/30", inner: "bg-purple-300 dark:bg-purple-700/50" },
                { bg: "bg-yellow-100 dark:bg-yellow-900/30", inner: "bg-yellow-300 dark:bg-yellow-700/50" },
                { bg: "bg-red-100 dark:bg-red-900/30", inner: "bg-red-300 dark:bg-red-700/50" }
              ];
              
              return (
                <div 
                  key={index} 
                  className="absolute" 
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`w-10 h-10 ${colors[index].bg} rounded-full flex items-center justify-center`}>
                    <div className={`w-6 h-6 ${colors[index].inner} rounded-full`}></div>
                  </div>
                  <div 
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap"
                  >
                    {entity.name.length > 12 ? entity.name.substring(0, 12) + '...' : entity.name}
                  </div>
                </div>
              );
            })}
            
            {/* Connection lines - using SVG */}
            <svg className="absolute inset-0 w-full h-full">
              <line 
                x1="50%" y1="50%" 
                x2="35%" y2="35%" 
                stroke="#6366F1" strokeWidth="2" strokeDasharray="4" 
                strokeOpacity="0.6"
              />
              <line 
                x1="50%" y1="50%" 
                x2="65%" y2="35%" 
                stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4" 
                strokeOpacity="0.6"
              />
              <line 
                x1="50%" y1="50%" 
                x2="65%" y2="65%" 
                stroke="#F59E0B" strokeWidth="2" strokeDasharray="4" 
                strokeOpacity="0.6"
              />
              <line 
                x1="50%" y1="50%" 
                x2="35%" y2="65%" 
                stroke="#EF4444" strokeWidth="2" strokeDasharray="4" 
                strokeOpacity="0.6"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  
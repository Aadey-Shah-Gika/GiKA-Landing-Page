interface SourcePanelProps {
    data: any; // In a real app, use proper typing
  }
  
  export default function SourcePanel({ data }: SourcePanelProps) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Data Sources</h3>
          <div className="space-y-2 text-sm">
            {data.sources.map((source: any, index: number) => (
              <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="font-medium">{source.name}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                  {source.lastUpdated 
                    ? `Last updated: ${source.lastUpdated}`
                    : source.details}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium mb-2">Data Reliability</h4>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p className="mb-2">All information is derived from verified sources and processed using GikaGraph's entity-aware models.</p>
            <p>Our SLMs are trained on domain-specific data to ensure high accuracy and reliability.</p>
          </div>
        </div>
      </div>
    );
  }
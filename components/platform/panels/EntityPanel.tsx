interface EntityPanelProps {
    data: any; // In a real app, use proper typing
  }
  
  export default function EntityPanel({ data }: EntityPanelProps) {
    return (
      <div className="p-4">
        {data.entities.map((entity: any, index: number) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 font-medium">
              {entity.type.charAt(0).toUpperCase() + entity.type.slice(1)} Details
            </div>
            <div className="p-4">
              <h3 className="font-medium">{entity.name}</h3>
              <div className="mt-2 text-sm">
                {Object.entries(entity.properties).map(([key, value]) => (
                  <div key={key} className="flex justify-between mb-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    <span>{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {data.relatedEntities && data.relatedEntities.length > 0 && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 font-medium">
              Similar Products
            </div>
            <div className="p-4">
              <div className="text-sm space-y-3">
                {data.relatedEntities.map((entity: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{entity.name}</span>
                    <span>{entity.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
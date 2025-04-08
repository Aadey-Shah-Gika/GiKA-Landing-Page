import { ArrowRight, Network } from 'lucide-react';
import EntityPanel from './EntityPanel';
import GraphPanel from './GraphPanel';
import SourcePanel from './SourcePanel';

type PanelType = 'entity' | 'graph' | 'source';

interface ContextPanelProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  data: any; // In a real app, use proper typing
}

export default function ContextPanel({ activePanel, onPanelChange, data }: ContextPanelProps) {
  const cyclePanelType = () => {
    const panels: PanelType[] = ['entity', 'graph', 'source'];
    const currentIndex = panels.indexOf(activePanel);
    const nextIndex = (currentIndex + 1) % panels.length;
    onPanelChange(panels[nextIndex]);
  };

  // If no data, show empty state
  if (!data) {
    return (
      <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <h2 className="text-md font-medium">Context Panel</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Network className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-2">No context available</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
            Start a conversation to see entity information
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Panel Header */}
      <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
        <h2 className="text-md font-medium">
          {activePanel === 'entity' && 'Entity Details'}
          {activePanel === 'graph' && 'Relationship Graph'}
          {activePanel === 'source' && 'Data Sources'}
        </h2>
        <div className="flex space-x-1">
          <button 
            onClick={cyclePanelType} 
            className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto">
        {activePanel === 'entity' && <EntityPanel data={data} />}
        {activePanel === 'graph' && <GraphPanel data={data} />}
        {activePanel === 'source' && <SourcePanel data={data} />}
      </div>
    </div>
  );
}
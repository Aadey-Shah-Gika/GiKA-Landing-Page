import { ArrowRight, Network } from "lucide-react";
import EntityPanel from "./EntityPanel";
import GraphPanel from "./GraphPanel";
import SourcePanel from "./SourcePanel";

type PanelType = "entity" | "graph" | "source";

interface ContextPanelProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  data: any; // In a real app, use proper typing
}

export default function ContextPanel({
  activePanel,
  onPanelChange,
  data,
}: ContextPanelProps) {
  const cyclePanelType = () => {
    const panels: PanelType[] = ["entity", "graph", "source"];
    const currentIndex = panels.indexOf(activePanel);
    const nextIndex = (currentIndex + 1) % panels.length;
    onPanelChange(panels[nextIndex]);
  };

  // If no data, show empty state
  if (!data) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Network className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            No context available
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Start a conversation to see entity information
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Panel Content */}
      <div className="flex items-center justify-between py-3 px-6">
        <button
          onClick={cyclePanelType}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1.5"
        >
          Switch view <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 chat-thread-scrollbar">
        {activePanel === "entity" && <EntityPanel data={data} />}
        {activePanel === "graph" && <GraphPanel data={data} />}
        {activePanel === "source" && <SourcePanel data={data} />}
      </div>
    </div>
  );
}

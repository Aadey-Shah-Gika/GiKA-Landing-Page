import { Search, Database, Network } from 'lucide-react';

export default function ChatSidebar() {
  return (
    <div className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4">
      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-8">
        <Network className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
        <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      </div>
    </div>
  );
}
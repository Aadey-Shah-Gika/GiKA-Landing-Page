import { Send } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({ value, onChange, onSend, isLoading }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none"
          placeholder="Ask GikaGraph..."
          disabled={isLoading}
        />
        <button 
          onClick={onSend}
          disabled={isLoading || value.trim() === ''}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center ml-2",
            isLoading || value.trim() === '' 
              ? "bg-gray-100 dark:bg-gray-700"
              : "bg-emerald-100 dark:bg-emerald-900"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-gray-400 dark:text-gray-500 animate-spin" />
          ) : (
            <Send className={cn(
              "w-4 h-4",
              value.trim() === '' 
                ? "text-gray-400 dark:text-gray-500"
                : "text-emerald-600 dark:text-emerald-400"
            )} />
          )}
        </button>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
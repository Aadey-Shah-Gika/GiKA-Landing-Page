import { User, Bot } from 'lucide-react';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatThreadProps {
  messages: Message[];
}

export default function ChatThread({ messages }: ChatThreadProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.map(message => (
        <div 
          key={message.id} 
          className={cn(
            "mb-6 flex",
            message.role === 'user' ? "justify-end" : "justify-start"
          )}
        >
          <div className={cn(
            "flex max-w-3xl",
            message.role === 'user' ? "flex-row-reverse" : "flex-row"
          )}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              message.role === 'user' 
                ? "bg-blue-100 dark:bg-blue-900 ml-3"
                : "bg-emerald-100 dark:bg-emerald-900 mr-3"
            )}>
              {message.role === 'user' 
                ? <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                : <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              }
            </div>
            <div className={cn(
              "p-4 rounded-2xl",
              message.role === 'user'
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            )}>
              {message.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
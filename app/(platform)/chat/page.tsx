'use client';

import { useState } from 'react';
import { useChat } from '@/lib/chat-store';
import ChatSidebar from '@/components/platform/chat/ChatSidebar';
import ChatThread from '@/components/platform/chat/ChatThread';
import ChatInput from '@/components/platform/chat/ChatInput';
import ContextPanel from '@/components/platform/panels/ContextPanel';
import { Message } from '@/lib/types';

export default function ChatPage() {
  const { messages, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [activePanel, setActivePanel] = useState<'entity' | 'graph' | 'source'>('entity');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    sendMessage(inputValue);
    setInputValue('');
  };

  const handlePanelChange = (panel: 'entity' | 'graph' | 'source') => {
    setActivePanel(panel);
  };

  // Get entity data based on the last message for the context panel
  const getContextData = () => {
    if (messages.length === 0) return null;
    
    const lastMessage = messages[messages.length - 1];
    
    // In a real app, this would come from your backend API
    // This is mock data for demonstration purposes
    if (lastMessage.role === 'assistant') {
      return {
        entities: [
          {
            type: 'product',
            name: 'Aaranya Natural\'s Aloe Gel',
            properties: {
              price: '₹599 ($7.20)',
              rating: '4.7 ★ (124 reviews)',
              certification: 'Vegan, Cruelty-Free'
            }
          }
        ],
        relatedEntities: [
          { name: 'Plum Green Tea Toner', price: '₹570 ($6.85)' },
          { name: 'Earth Rhythm Face Wash', price: '₹650 ($7.80)' },
          { name: 'Juicy Chemistry Serum', price: '₹750 ($9.00)' }
        ],
        sources: [
          { name: 'Product Database', lastUpdated: 'April 5, 2025' },
          { name: 'Review Analysis', details: '124 user reviews analyzed' },
          { name: 'Certification Records', details: 'Vegan Society, PETA databases' }
        ]
      };
    }
    
    return null;
  };

  const contextData = getContextData();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Left Sidebar */}
      <ChatSidebar />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-6">
          <h1 className="text-lg font-semibold">GikaGraph Assistant</h1>
          <div className="ml-auto flex space-x-2">
            <button className="px-3 py-1 rounded-md text-sm border border-gray-200 dark:border-gray-700">
              New Chat
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <ChatThread messages={messages} />
        
        {/* Input Area */}
        <ChatInput 
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
      
      {/* Right Context Panel */}
      <ContextPanel 
        activePanel={activePanel} 
        onPanelChange={handlePanelChange}
        data={contextData}
      />
    </div>
  );
}
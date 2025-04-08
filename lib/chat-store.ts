import { create } from 'zustand';
import { generateId } from './utils';
import { Message } from './types';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChat = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,

  sendMessage: async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content,
      timestamp: new Date(),
    };

    // Add user message immediately
    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
    }));

    try {
      // In a real app, you would call your API here
      // For demo purposes, we'll simulate a delay and response
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo response based on the query
      let responseContent = '';

      if (
        content.toLowerCase().includes('vegan') ||
        content.toLowerCase().includes('skincare')
      ) {
        responseContent =
          "I found 5 vegan skincare products in Mumbai under $10 with 4+ star ratings. The most popular is Aaranya Natural's Aloe Gel with 124 reviews and 4.7 stars.";
      } else if (
        content.toLowerCase().includes('finance') ||
        content.toLowerCase().includes('stock')
      ) {
        responseContent =
          'Based on the latest FDA announcements, 3 pharmaceutical stocks may be impacted by the recent approval delays: AstraZeneca (AZN), Novartis (NVS), and Bristol Myers Squibb (BMY).';
      } else if (
        content.toLowerCase().includes('healthcare') ||
        content.toLowerCase().includes('medical')
      ) {
        responseContent =
          "Analyzing the patient's symptoms against our medical knowledge graph shows a 92% correlation with Erythromelalgia, a rare vascular peripheral pain disorder that's often misdiagnosed.";
      } else {
        responseContent =
          "I've analyzed your query using our entity intelligence platform. Is there a specific industry or domain you're interested in exploring further?";
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      // Add assistant response
      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content:
          "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, errorMessage],
        isLoading: false,
      }));
    }
  },

  clearMessages: () => {
    set({ messages: [] });
  },
}));

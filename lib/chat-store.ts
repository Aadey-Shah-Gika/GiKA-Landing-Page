import { create } from "zustand";
import { generateId } from "./utils";
import { Message } from "./types";
import { persist } from "zustand/middleware";

const competitorAnalysis = [
  `
# Analyzing Competitor Products

Understanding competitor products is critical for staying competitive in any market. This process involves systematically evaluating the strengths, weaknesses, features, and market performance of rival offerings. Below is a structured approach to performing a comprehensive competitor product analysis.

## 1. Identify Key Competitors
- List direct and indirect competitors.
- Focus on those offering similar products or targeting the same customer segments.

## 2. Gather Product Information
- Visit competitor websites and online marketplaces.
- Use product demos, reviews, manuals, and customer feedback.
- Tools like SimilarWeb, SEMrush, and Ahrefs can help gather data on traffic, SEO, and marketing strategies.

## 3. Analyze Product Features
- Create a comparison table for feature-by-feature analysis.
- Note any unique selling points (USPs) or missing features.
- Evaluate design, user experience (UX), performance, and technology stack.

## 4. Study Pricing and Packaging
- Compare pricing models (subscription, one-time purchase, freemium, etc.).
- Look at product bundles, discount strategies, and upselling techniques.

## 5. Examine Customer Perception
- Analyze customer reviews and ratings.
- Monitor social media and forums for sentiment analysis.
- Identify common complaints and praise points.

## 6. Evaluate Marketing and Positioning
- Assess branding, messaging, and target audience.
- Study content marketing, advertising channels, and influencer collaborations.

## 7. Assess Market Performance
- Look at market share, revenue estimates, and growth trends.
- Identify partnerships and distribution channels.

## 8. Identify Opportunities and Threats
- Pinpoint gaps in the market.
- Discover areas where your product can outperform competitors.
- Note potential risks or challenges posed by competitors.

## Conclusion
Competitor product analysis should be an ongoing process. The insights gained can guide product development, marketing strategies, and business growth. Staying informed about competitor moves ensures you're always ready to innovate and adapt.
`,
  `
# Market Segmentation

Dividing a market into distinct groups helps businesses tailor their strategies. Segments can be based on demographics, behavior, geography, or psychographics. Effective segmentation enables personalized marketing and improves customer satisfaction.
`,

  `
# Unique Value Proposition (UVP)

A UVP communicates why a customer should choose your product. It should be clear, concise, and focused on benefits that solve specific pain points. A strong UVP sets your brand apart in a crowded market.
`,

  `
# SWOT Analysis

## Strengths
- Internal advantages and differentiators

## Weaknesses
- Areas needing improvement

## Opportunities
- External trends that favor growth

## Threats
- Market risks or emerging competition
`,

  `
# Go-To-Market Strategy

Launching a product requires a plan that includes target audience, marketing channels, pricing, and sales strategy. A GTM strategy aligns teams and ensures efficient resource use for maximum impact. Measure success with KPIs.
`,

  `
# Porter's Five Forces

1. **Competitive Rivalry** – Intensity of competition among existing players  
2. **Supplier Power** – Control suppliers have over pricing  
3. **Buyer Power** – Influence of customers on pricing and value  
4. **Threat of Substitution** – Availability of alternative products  
5. **Threat of New Entrants** – Barriers for new competitors to enter
`,
];

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  isLoading: boolean;
  tempMessage: string | null; // To store first message temporarily

  createNewChat: (initialMessage: string) => string;
  setActiveChat: (chatId: string | null) => void;
  getChatById: (chatId: string) => Chat | null;
  deleteChat: (chatIdToDelete: string) => string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  hasChats: () => boolean;
  getEmptyState: () => void;
}

export const useChat = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChat: null,
      isLoading: false,
      tempMessage: null, // Temporary message before chat creation

      createNewChat: (initialMessage) => {
        const newChatId = generateId();
        const now = new Date();

        // Create a new chat with the initial message
        const userMessage: Message = {
          id: generateId(),
          role: "user",
          content: initialMessage,
          timestamp: now,
        };

        // Create a new chat and add it to state
        set((state) => ({
          chats: [
            {
              id: newChatId,
              title: initialMessage.split(" ").slice(0, 3).join(" ") + "...",
              messages: [userMessage],
              createdAt: now,
              updatedAt: now,
            },
            ...state.chats,
          ],
          activeChat: newChatId,
          tempMessage: null, // Clear temp message
        }));

        return newChatId;
      },

      setActiveChat: (chatId) => {
        set({
          activeChat: chatId,
          tempMessage: null, // Clear temp message when switching chats
        });
      },

      // Get chat by ID
      getChatById: (chatId: string) => {
        const { chats } = get();
        return chats.find((chat) => chat.id === chatId) || null;
      },

      // Delete a chat
      deleteChat: (chatIdToDelete: string) => {
        const { chats, activeChat } = get();

        // Filter out the chat to delete
        const updatedChats = chats.filter((chat) => chat.id !== chatIdToDelete);

        // If we're deleting the active chat, set a new active chat or null
        let newActiveChat = activeChat;
        if (activeChat === chatIdToDelete) {
          // We deleted the active chat, go to empty state
          newActiveChat = null;
        }

        set({
          chats: updatedChats,
          activeChat: newActiveChat,
        });

        return newActiveChat;
      },

      sendMessage: async (content: string) => {
        if (!content.trim()) return;

        const { activeChat, chats } = get();

        if (!activeChat) {
          // We're in the empty state (/chat), store the message temporarily
          set({
            tempMessage: content,
            isLoading: true,
          });

          try {
            // In a real app, you would call your API here
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Now create a new chat with this message
            const newChatId = get().createNewChat(content);

            // Generate a response based on the query
            let responseContent = "";

            if (
              content.toLowerCase().includes("vegan") ||
              content.toLowerCase().includes("skincare")
            ) {
              responseContent =
                "I found 5 vegan skincare products in Mumbai under $10 with 4+ star ratings. The most popular is Aaranya Natural's Aloe Gel with 124 reviews and 4.7 stars.";
            } else if (
              content.toLowerCase().includes("finance") ||
              content.toLowerCase().includes("stock")
            ) {
              responseContent =
                "Based on the latest FDA announcements, 3 pharmaceutical stocks may be impacted by the recent approval delays: AstraZeneca (AZN), Novartis (NVS), and Bristol Myers Squibb (BMY).";
            } else if (
              content.toLowerCase().includes("healthcare") ||
              content.toLowerCase().includes("medical")
            ) {
              responseContent =
                "Analyzing the patient's symptoms against our medical knowledge graph shows a 92% correlation with Erythromelalgia, a rare vascular peripheral pain disorder that's often misdiagnosed.";
            } else {
              responseContent =
                competitorAnalysis[
                  Math.floor(Math.random() * competitorAnalysis.length)
                ];
            }

            const assistantMessage: Message = {
              id: generateId(),
              role: "assistant",
              content: responseContent,
              timestamp: new Date(),
            };

            // Add the assistant response to the new chat
            set((state) => {
              const updatedChats = state.chats.map((chat) => {
                if (chat.id === newChatId) {
                  return {
                    ...chat,
                    messages: [...chat.messages, assistantMessage],
                    updatedAt: new Date(),
                  };
                }
                return chat;
              });

              return {
                chats: updatedChats,
                isLoading: false,
              };
            });

            return;
          } catch (error) {
            console.error("Error sending message:", error);

            // Create the chat anyway but with an error
            const newChatId = get().createNewChat(content);

            const errorMessage: Message = {
              id: generateId(),
              role: "assistant",
              content:
                "I'm sorry, I encountered an error processing your request. Please try again.",
              timestamp: new Date(),
            };

            set((state) => {
              const updatedChats = state.chats.map((chat) => {
                if (chat.id === newChatId) {
                  return {
                    ...chat,
                    messages: [...chat.messages, errorMessage],
                    updatedAt: new Date(),
                  };
                }
                return chat;
              });

              return {
                chats: updatedChats,
                isLoading: false,
              };
            });

            return;
          }
        }

        // We have an active chat, add message to it
        const userMessage: Message = {
          id: generateId(),
          role: "user",
          content: content,
          timestamp: new Date(),
        };

        // Add user message to the active chat
        set((state) => {
          const updatedChats = state.chats.map((chat) => {
            if (chat.id === state.activeChat) {
              return {
                ...chat,
                messages: [...chat.messages, userMessage],
                updatedAt: new Date(),
              };
            }
            return chat;
          });

          return {
            chats: updatedChats,
            isLoading: true,
          };
        });

        try {
          // In a real app, you would call your API here
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Generate response based on the query
          let responseContent = "";

          if (
            content.toLowerCase().includes("vegan") ||
            content.toLowerCase().includes("skincare")
          ) {
            responseContent =
              "I found 5 vegan skincare products in Mumbai under $10 with 4+ star ratings. The most popular is Aaranya Natural's Aloe Gel with 124 reviews and 4.7 stars.";
          } else if (
            content.toLowerCase().includes("finance") ||
            content.toLowerCase().includes("stock")
          ) {
            responseContent =
              "Based on the latest FDA announcements, 3 pharmaceutical stocks may be impacted by the recent approval delays: AstraZeneca (AZN), Novartis (NVS), and Bristol Myers Squibb (BMY).";
          } else if (
            content.toLowerCase().includes("healthcare") ||
            content.toLowerCase().includes("medical")
          ) {
            responseContent =
              "Analyzing the patient's symptoms against our medical knowledge graph shows a 92% correlation with Erythromelalgia, a rare vascular peripheral pain disorder that's often misdiagnosed.";
          } else {
            responseContent =
              competitorAnalysis[
                Math.floor(Math.random() * competitorAnalysis.length)
              ];
          }

          const assistantMessage: Message = {
            id: generateId(),
            role: "assistant",
            content: responseContent,
            timestamp: new Date(),
          };

          // Add assistant response to the active chat
          set((state) => {
            const updatedChats = state.chats.map((chat) => {
              if (chat.id === state.activeChat) {
                return {
                  ...chat,
                  messages: [...chat.messages, assistantMessage],
                  updatedAt: new Date(),
                };
              }
              return chat;
            });

            return {
              chats: updatedChats,
              isLoading: false,
            };
          });
        } catch (error) {
          console.error("Error sending message:", error);

          // Add error message to the active chat
          const errorMessage: Message = {
            id: generateId(),
            role: "assistant",
            content:
              "I'm sorry, I encountered an error processing your request. Please try again.",
            timestamp: new Date(),
          };

          set((state) => {
            const updatedChats = state.chats.map((chat) => {
              if (chat.id === state.activeChat) {
                return {
                  ...chat,
                  messages: [...chat.messages, errorMessage],
                  updatedAt: new Date(),
                };
              }
              return chat;
            });

            return {
              chats: updatedChats,
              isLoading: false,
            };
          });
        }
      },

      clearMessages: () => {
        const { activeChat } = get();

        if (activeChat) {
          // If we're in a chat, delete it and go to empty state
          get().deleteChat(activeChat);
        } else {
          // If we're in empty state, just clear temp message
          set({ tempMessage: null });
        }
      },

      hasChats: () => {
        return get().chats.length > 0;
      },

      getEmptyState: () => {
        set({
          activeChat: null,
          tempMessage: null,
        });
      },
    }),
    {
      name: "chats-storage", // name of the item in the storage
      partialize: (state) => ({
        chats: state.chats.map((chat) => ({
          ...chat,
          // Convert Date objects to ISO strings for storage
          createdAt:
            chat.createdAt instanceof Date
              ? chat.createdAt.toISOString()
              : chat.createdAt,
          updatedAt:
            chat.updatedAt instanceof Date
              ? chat.updatedAt.toISOString()
              : chat.updatedAt,
          messages: chat.messages.map((msg) => ({
            ...msg,
            timestamp:
              msg.timestamp instanceof Date
                ? msg.timestamp.toISOString()
                : msg.timestamp,
          })),
        })),
        activeChat: state.activeChat,
      }),
      // Parse dates when hydrating from storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert ISO strings back to Date objects
          state.chats = state.chats.map((chat) => ({
            ...chat,
            createdAt: new Date(chat.createdAt),
            updatedAt: new Date(chat.updatedAt),
            messages: chat.messages.map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
          }));
        }
      },
    }
  )
);

// Helper function to get messages for the active chat
export const useActiveChat = () => {
  const {
    chats,
    activeChat,
    isLoading,
    sendMessage,
    clearMessages,
    tempMessage,
  } = useChat();

  const activeChatData = chats.find((chat) => chat.id === activeChat);

  // If we have an active chat, use its messages
  // If we're in empty state but have a temp message, create a temporary message array
  // Otherwise return empty array
  const messages =
    activeChatData?.messages ||
    (tempMessage
      ? [
          {
            id: "temp",
            role: "user",
            content: tempMessage,
            timestamp: new Date(),
          },
        ]
      : []);

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    chatTitle: activeChatData?.title || "New Chat",
    isEmptyState: !activeChat,
  };
};

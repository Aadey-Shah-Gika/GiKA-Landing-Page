import { create } from "zustand";
import { generateId } from "./utils";
import { Message } from "./types";

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
Competitor product analysis should be an ongoing process. The insights gained can guide product development, marketing strategies, and business growth. Staying informed about competitor moves ensures you’re always ready to innovate and adapt.
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
      role: "user",
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

      // Add assistant response
      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
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

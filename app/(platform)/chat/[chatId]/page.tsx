"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useChat } from "@/lib/chat-store";
import { useSidebar } from "../../layout"; // Import from layout
import ChatSidebar from "@/components/platform/chat/ChatSidebar";
import ChatThread from "@/components/platform/chat/ChatThread";
import ChatInput from "@/components/platform/chat/ChatInput";
import ContextPanel from "@/components/platform/panels/ContextPanel";
import SidebarOverlay from "@/components/platform/chat/SidebarOverlay";
import { X, PanelRightOpen } from "lucide-react";

// Configuration for panel resize
const MIN_PANEL_WIDTH = 300; // Minimum width for the context panel
const MAX_PANEL_WIDTH = 600; // Maximum width for the context panel
const DEFAULT_PANEL_WIDTH = 400; // Default width
const SIDEBAR_WIDTH = 256; // Width of sidebar in pixels (w-64 = 16rem = 256px)

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default function ChatIdPage({ params }: ChatPageProps) {
  const { chatId } = params;
  const { getChatById, setActiveChat } = useChat();

  // Use the sidebar context from layout
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const [inputValue, setInputValue] = useState("");
  const [activePanel, setActivePanel] = useState<"entity" | "graph" | "source">(
    "entity"
  );
  const [isResizing, setIsResizing] = useState(false);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const splitterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the chat when the component mounts or chatId changes
  useEffect(() => {
    // Verify that the chat exists
    const chat = getChatById(chatId);

    if (chat) {
      // If chat exists, set it as active
      setActiveChat(chatId);
    }
    // If chat doesn't exist, we'll let the root layout handle the redirect
  }, [chatId, getChatById, setActiveChat]);

  // Get current chat messages
  const currentChat = getChatById(chatId);
  const messages = currentChat?.messages || [];
  const isLoading = useChat((state) => state.isLoading);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    const { sendMessage } = useChat.getState();
    await sendMessage(inputValue);
    setInputValue("");
  };

  const handlePanelChange = (panel: "entity" | "graph" | "source") => {
    setActivePanel(panel);
  };

  // Get entity data based on the last message for the context panel
  const getContextData = () => {
    if (messages.length === 0) return null;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role === "assistant") {
      return {
        entities: [
          {
            type: "product",
            name: "Aaranya Natural's Aloe Gel",
            properties: {
              price: "₹599 ($7.20)",
              rating: "4.7 ★ (124 reviews)",
              certification: "Vegan, Cruelty-Free",
            },
          },
        ],
        relatedEntities: [
          { name: "Plum Green Tea Toner", price: "₹570 ($6.85)" },
          { name: "Earth Rhythm Face Wash", price: "₹650 ($7.80)" },
          { name: "Juicy Chemistry Serum", price: "₹750 ($9.00)" },
        ],
        sources: [
          { name: "Product Database", lastUpdated: "April 5, 2025" },
          { name: "Review Analysis", details: "124 user reviews analyzed" },
          {
            name: "Certification Records",
            details: "Vegan Society, PETA databases",
          },
        ],
      };
    }
    return null;
  };

  const contextData = getContextData();

  // Start resizing when mouse down on splitter
  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  // Handle mouse move for resizing
  const handleResize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerRight = containerRect.right;
        const newWidth = containerRight - e.clientX;

        // Apply min/max constraints
        const constrainedWidth = Math.max(
          MIN_PANEL_WIDTH,
          Math.min(MAX_PANEL_WIDTH, newWidth)
        );

        setPanelWidth(constrainedWidth);
      });
    },
    [isResizing]
  );

  // Stop resizing on mouse up
  const stopResize = useCallback(() => {
    setIsResizing(false);
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
  }, []);

  // Toggle panel open/closed state
  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  // Add event listeners for mouse move and mouse up
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", stopResize);
    }

    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing, handleResize, stopResize]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Sidebar Overlay - for mobile */}
      <SidebarOverlay isVisible={isSidebarOpen} onClick={toggleSidebar} />

      {/* Left Sidebar - Fixed position outside of flex flow */}
      <div
        className="fixed left-0 top-0 bottom-0 z-20 transition-all duration-300 ease-in-out overflow-x-hidden"
        style={{
          width: isSidebarOpen ? `${SIDEBAR_WIDTH}px` : "0",
        }}
      >
        <ChatSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>

      {/* Main Chat Area - Takes full width and pushes content based on sidebar state */}
      <div
        className="flex-1 flex flex-col relative transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isSidebarOpen ? `${SIDEBAR_WIDTH}px` : "0px",
          width: isSidebarOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : "100%",
        }}
      >
        {/* Header */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-6">
          {/* Sidebar Toggle Button - Only show when sidebar is closed with animation */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isSidebarOpen ? "w-0 opacity-0" : "w-10 opacity-100"
            }`}
          >
            {!isSidebarOpen && (
              <button
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={toggleSidebar}
                aria-label="Open sidebar"
              >
                <PanelRightOpen className="w-5 h-5 transform rotate-180" />
              </button>
            )}
          </div>

          <h1 className="text-lg font-semibold">
            Chat Page - GiKA Graph Assistant
          </h1>
          <div className="ml-auto flex space-x-2">
            {!isPanelOpen && (
              <button
                onClick={togglePanel}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open context panel"
              >
                <PanelRightOpen className="w-5 h-5" />
              </button>
            )}
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

      {/* Context Panel Container */}
      <div
        ref={containerRef}
        className={`flex h-screen border-l border-gray-200 dark:border-gray-700 overflow-hidden ${
          !isResizing ? "transition-all duration-300 ease-in-out" : ""
        } ${isPanelOpen ? "" : "transform translate-x-full"}`}
        style={{
          width: isPanelOpen ? `${panelWidth}px` : "0",
          position: "relative",
        }}
      >
        {/* Resizing Splitter */}
        <div
          ref={splitterRef}
          className={`w-1 hover:w-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-col-resize transition-colors duration-75 ${
            isResizing ? "bg-blue-500 dark:bg-blue-700 w-1.5" : ""
          } absolute left-0 top-0 bottom-0 z-10`}
          onMouseDown={startResize}
          style={{ touchAction: "none" }}
        />

        {/* Right Context Panel Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
            <h2 className="text-md font-medium">
              {activePanel === "entity" && "Entity Details"}
              {activePanel === "graph" && "Relationship Graph"}
              {activePanel === "source" && "Data Sources"}
            </h2>
            <button
              onClick={togglePanel}
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close context panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto chat-thread-scrollbar">
            <ContextPanel
              activePanel={activePanel}
              onPanelChange={handlePanelChange}
              data={contextData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

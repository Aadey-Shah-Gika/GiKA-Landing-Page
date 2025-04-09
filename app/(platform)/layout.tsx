"use client";

import { useState, useEffect, createContext, useContext } from "react";

// Create a context for sidebar state
interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Custom hook to use the sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar-open");
      if (savedState !== null) {
        setIsSidebarOpen(savedState === "true");
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-open", isSidebarOpen.toString());
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
    </SidebarContext.Provider>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  ComposedChart,
  AreaChart,
  Area,
} from "recharts";
import {
  ShoppingCart,
  Send,
  ArrowRight,
  RefreshCcw,
  Users,
  TrendingUp,
  Maximize2,
  Minimize2,
  Package,
  DollarSign,
  Target,
  AlertCircle,
  Database,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";

// Simple confetti particle component
const ConfettiParticle = ({ color, left, delay, duration, size }) => (
  <motion.div
    className="absolute top-0 rounded-full pointer-events-none"
    style={{
      left: `${left}%`,
      width: size,
      height: size,
      backgroundColor: color,
      zIndex: 10,
    }}
    initial={{ top: "-10%" }}
    animate={{
      top: "110%",
      rotate: [0, 360],
      x: [
        0,
        Math.random() > 0.5 ? 20 : -20,
        0,
        Math.random() > 0.5 ? -20 : 20,
        0,
      ],
    }}
    transition={{
      duration: duration,
      delay: delay,
      ease: [0.1, 0.25, 0.3, 1],
    }}
  />
);

// Custom confetti effect component
const ConfettiEffect = () => {
  const particles = [];
  const colors = [
    "#059669",
    "#0EA5E9",
    "#3B82F6",
    "#F59E0B",
    "#7C3AED",
    "#DC2626",
  ];

  // Create 50 particles
  for (let i = 0; i < 50; i++) {
    particles.push(
      <ConfettiParticle
        key={i}
        color={colors[Math.floor(Math.random() * colors.length)]}
        left={Math.random() * 100}
        delay={Math.random() * 0.5}
        duration={2 + Math.random() * 2}
        size={`${Math.random() * 10 + 5}px`}
      />
    );
  }

  return <div className="absolute inset-0 overflow-hidden">{particles}</div>;
};

const PrivateEquityDemo = () => {
  const [stage, setStage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [expandDashboard, setExpandDashboard] = useState(false);
  const [showSection, setShowSection] = useState({
    categoryPerformance: false,
    customerSegments: false,
    inventoryOptimization: false,
    strategicInsights: false,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [userScrollingEnabled, setUserScrollingEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const dashboardContainerRef = useRef(null);

  // Check for mobile layout on mount and window resize
  useEffect(() => {
    const checkLayout = () => {
      const windowWidth = window.innerWidth;

      // Determine mobile layout
      setIsMobileLayout(windowWidth < 768);

      // Calculate optimal scale for very small screens
      if (windowWidth < 400) {
        setScale(0.8);
      } else if (windowWidth < 600) {
        setScale(0.9);
      } else {
        setScale(1);
      }
    };

    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  // Smoother, more elegant scrolling functions
  const scrollChatToBottom = (smooth = true) => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const scrollHeight = container.scrollHeight;

      if (smooth) {
        container.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      } else {
        container.scrollTop = scrollHeight;
      }
    }
  };

  const scrollDashboardToBottom = (smooth = true) => {
    if (dashboardContainerRef.current) {
      const container = dashboardContainerRef.current;
      const scrollHeight = container.scrollHeight;

      if (smooth) {
        container.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      } else {
        container.scrollTop = scrollHeight;
      }
    }
  };

  // Auto-start animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // MutationObserver for chat container
  useEffect(() => {
    if (chatContainerRef.current && isAnimating) {
      const chatObserver = new MutationObserver(() => {
        if (isAnimating) {
          setTimeout(() => scrollChatToBottom(), 10);
        }
      });

      chatObserver.observe(chatContainerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      return () => chatObserver.disconnect();
    }
  }, [isAnimating]);

  // MutationObserver for dashboard container
  useEffect(() => {
    if (dashboardContainerRef.current && expandDashboard && isAnimating) {
      const dashboardObserver = new MutationObserver(() => {
        if (isAnimating) {
          setTimeout(() => scrollDashboardToBottom(), 10);
        }
      });

      dashboardObserver.observe(dashboardContainerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      return () => dashboardObserver.disconnect();
    }
  }, [expandDashboard, isAnimating]);

  // Start animation sequence
  const startAnimation = () => {
    setIsAnimating(true);
    setUserScrollingEnabled(false);

    setStage(1);
    setInputValue(
      "Analyze our Q4 portfolio performance across buyout and growth equity deals - which investments are generating the highest IRR and MOIC?"
    );

    setTimeout(() => {
      setShowTyping(true);
      setStage(2);
      setExpandDashboard(true);

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 300);

    setTimeout(() => {
      setShowTyping(false);
      setShowResponse(true);

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 1200);

    // Show dashboard sections with delays
    setTimeout(() => {
      setShowSection((prev) => ({ ...prev, categoryPerformance: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop =
          dashboardContainerRef.current.scrollHeight;
      }
    }, 2000);

    setTimeout(() => {
      setShowSection((prev) => ({ ...prev, customerSegments: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop =
          dashboardContainerRef.current.scrollHeight;
      }
    }, 3500);

    setTimeout(() => {
      setShowSection((prev) => ({ ...prev, inventoryOptimization: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop =
          dashboardContainerRef.current.scrollHeight;
      }
    }, 5000);

    setTimeout(() => {
      setShowSection((prev) => ({ ...prev, strategicInsights: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop =
          dashboardContainerRef.current.scrollHeight;
      }
    }, 6500);

    setTimeout(() => setShowConfetti(true), 7000);
    setTimeout(() => setShowConfetti(false), 9000);

    setTimeout(() => {
      setTypingComplete(true);

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop =
          dashboardContainerRef.current.scrollHeight;
      }

      setTimeout(() => {
        setUserScrollingEnabled(true);
        setIsAnimating(false);
      }, 500);
    }, 7000);
  };

  // Reset the demo
  const resetDemo = () => {
    setUserScrollingEnabled(false);
    setIsAnimating(true);

    setStage(0);
    setInputValue("");
    setShowTyping(false);
    setShowResponse(false);
    setTypingComplete(false);
    setExpandDashboard(false);
    setShowSection({
      categoryPerformance: false,
      customerSegments: false,
      inventoryOptimization: false,
      strategicInsights: false,
    });
    setShowConfetti(false);

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
    if (dashboardContainerRef.current) {
      dashboardContainerRef.current.scrollTop = 0;
    }

    setTimeout(() => {
      startAnimation();
    }, 500);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Chart data - realistic private equity metrics
  const categoryPerformanceData = [
    {
      category: "Buyouts",
      revenue: 125000,
      clv: 2.8,
      margin: 31,
      repeatRate: 42,
    },
    {
      category: "Growth Equity",
      revenue: 310000,
      clv: 3.2,
      margin: 25,
      repeatRate: 35,
    },
    {
      category: "Venture Capital",
      revenue: 89000,
      clv: 4.5,
      margin: 38,
      repeatRate: 48,
    },
  ];

  const quarterlyTrendsData = [
    { month: "Jul", sustainable: 32000, regular: 78000 },
    { month: "Aug", sustainable: 38000, regular: 82000 },
    { month: "Sep", sustainable: 45000, regular: 85000 },
    { month: "Oct", sustainable: 52000, regular: 88000 },
    { month: "Nov", sustainable: 48000, regular: 102000 },
    { month: "Dec", sustainable: 56000, regular: 118000 },
  ];

  const customerSegmentData = [
    {
      segment: "Tech Sector",
      clv: 3.8,
      aov: 89,
      frequency: 4.2,
      fill: "#059669",
    },
    {
      segment: "Healthcare",
      clv: 2.9,
      aov: 45,
      frequency: 3.1,
      fill: "#F59E0B",
    },
    {
      segment: "Financial Services",
      clv: 4.2,
      aov: 134,
      frequency: 3.8,
      fill: "#3B82F6",
    },
    {
      segment: "Consumer Goods",
      clv: 2.5,
      aov: 42,
      frequency: 2.7,
      fill: "#94A3B8",
    },
  ];

  const inventoryOptimizationData = [
    {
      metric: "Due Diligence Time",
      normal: 12,
      enhanced: 8,
      improvement: 33,
      unit: " weeks",
    },
    {
      metric: "Deal Flow Quality",
      normal: 4.5,
      enhanced: 6.2,
      improvement: 38,
      unit: "/10",
    },
    {
      metric: "Portfolio Risk Score",
      normal: 18,
      enhanced: 14,
      improvement: 22,
      unit: "%",
    },
    {
      metric: "Value Creation Index",
      normal: 87,
      enhanced: 94,
      improvement: 8,
      unit: "%",
    },
  ];

  const marketInsightsData = [
    {
      insight: "Tech sector buyouts show 22% higher EBITDA margins post-acquisition",
      impact: "high",
      confidence: 92,
    },
    {
      insight: "Portfolio company operational improvements increase exit multiples by 31%",
      impact: "medium",
      confidence: 88,
    },
    {
      insight: "Healthcare investments respond well to add-on acquisition strategy",
      impact: "medium",
      confidence: 94,
    },
    {
      insight: "Geographic expansion opportunity in emerging market growth equity",
      impact: "high",
      confidence: 85,
    },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 text-xs border border-gray-200 shadow-sm rounded">
          <p className="font-medium">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-gray-700">
              <span style={{ color: item.color }}>
                {item.dataKey || item.name}:{" "}
              </span>
              {typeof item.value === "number" && item.value % 1 !== 0
                ? `${item.value.toFixed(1)}${item.payload.unit || ""}`
                : `${item.value}${item.payload.unit || ""}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Typing animation text
  const fullText = `Based on Q4 analysis, venture capital investments demonstrate 27% higher MOIC compared to traditional buyout strategies. Key findings suggest shifting market dynamics toward technology-enabled growth opportunities.

Investment Performance:
* Venture Capital deals: Average MOIC 4.5x (+41% vs buyouts)
* Net IRR 31% (+6 percentage points)
* Successful exit rate 42% (+7 percentage points)

Sector Analysis:
* Tech sector deals: MOIC 3.8x, Average Deal Size $89M
* Investment frequency: 4.2x annually (vs 3.1x average)
* Financial services cross-sector opportunities: 48% value creation rate

Portfolio & Operational Insights:
* Enhanced data modeling reduces due diligence time by 33%
* Deal flow quality improved 38% with predictive analytics
* Portfolio risk exposure down 22% through optimized allocation

Strategic Recommendations:
1. Expand technology sector exposure targeting high-growth segments
2. Implement dynamic valuation models for growth equity opportunities
3. Develop cross-sector investment strategies leveraging high MOIC deals
4. Focus geographic expansion in high-performing emerging markets

Return Projections: 15-18% IRR improvement potential with optimized portfolio mix.`;

  // Main container classes based on responsive settings
  const mainContainerClasses = `
    ${isFullscreen ? "fixed inset-0 z-50" : "min-h-screen"}
    bg-gray-50 flex items-center justify-center 
    ${isFullscreen ? "p-0" : "p-2 sm:p-4"}
    transition-all duration-300
  `;

  const demoContainerClasses = `
    bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden 
    ${isMobileLayout ? "flex-col" : "flex"} 
    w-full 
    ${isFullscreen ? "max-w-none h-screen" : "max-w-[1000px] h-[80vh]"} 
    relative
    transform origin-center
  `;

  return (
    <div className={mainContainerClasses} ref={containerRef}>
      <motion.div
        className={demoContainerClasses}
        style={{ transform: `scale(${scale})` }}
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Window controls */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gray-50 border-b border-gray-200 flex items-center z-10">
          <div className="flex items-center mr-auto">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-xs font-medium text-gray-700 hidden sm:block">
              Private Equity Portfolio Intelligence
            </div>
            <div className="text-xs font-medium text-gray-700 sm:hidden">
              PE Portfolio Intel
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isMobileLayout && (
              <button
                onClick={toggleFullscreen}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
            )}
            <button
              title="Reset Demo"
              onClick={resetDemo}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Left chat section */}
        <motion.div
          className="flex flex-col bg-gradient-to-br from-green-50 to-blue-50"
          layout
          initial={{ width: isMobileLayout ? "100%" : "500px" }}
          animate={{
            width: isMobileLayout ? "100%" : stage >= 1 ? "50%" : "500px",
            height: isMobileLayout && expandDashboard ? "50%" : "auto",
          }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        >
          {/* Header */}
          <div className="border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between bg-white/70 backdrop-blur-sm mt-12">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800 text-sm sm:text-base">
                  Portfolio Analytics
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Advanced investment intelligence powered by AI
                </p>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div
            className={`flex-grow p-3 sm:p-4 ${
              userScrollingEnabled ? "overflow-y-auto" : "overflow-hidden"
            }`}
            ref={chatContainerRef}
            style={{
              scrollBehavior: "smooth",
              pointerEvents: userScrollingEnabled ? "auto" : "none",
            }}
          >
            <div className="space-y-4 min-h-full flex flex-col justify-end">
              {/* Welcome message */}
              <div className="flex justify-center my-4">
                <div className="text-xs text-gray-500">Today, 9:42 AM</div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="text-sm text-center text-gray-600 max-w-[85%]">
                  Welcome to Private Equity Portfolio Intelligence. Ask me about
                  investment performance, sector analysis, portfolio
                  optimization, or market insights.
                </div>
              </div>

              {/* User query */}
              {stage >= 1 && (
                <div className="flex justify-end mb-6">
                  <div className="bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm max-w-[85%] text-xs sm:text-sm">
                    {inputValue}
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {showTyping && (
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              )}

              {/* AI response */}
              {showResponse && (
                <div className="flex justify-center mb-6 px-4">
                  <div className="text-xs sm:text-sm text-gray-700 max-w-[90%]">
                    {typingComplete ? (
                      <div>
                        <p className="font-medium">
                          Based on Q4 analysis,{" "}
                          <span className="text-green-700 font-semibold">
                            venture capital investments demonstrate 27% higher MOIC
                          </span>{" "}
                          compared to traditional buyout strategies. Key findings suggest
                          shifting market dynamics toward technology-enabled growth
                          opportunities.
                        </p>

                        <p className="mt-4 font-medium text-green-800">
                          Investment Performance:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            Venture Capital deals: Average MOIC{" "}
                            <span className="font-semibold text-green-700">
                              4.5x
                            </span>{" "}
                            (+41% vs buyouts)
                          </li>
                          <li>
                            Net IRR{" "}
                            <span className="font-semibold text-green-700">
                              31%
                            </span>{" "}
                            (+6 percentage points)
                          </li>
                          <li>
                            Successful exit rate{" "}
                            <span className="font-semibold text-green-700">
                              42%
                            </span>{" "}
                            (+7 percentage points)
                          </li>
                        </ul>

                        <p className="mt-4 font-medium text-blue-800">
                          Sector Analysis:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            Tech sector deals: MOIC{" "}
                            <span className="font-semibold text-blue-700">
                              3.8x
                            </span>
                            , Avg Deal Size{" "}
                            <span className="font-semibold text-blue-700">
                              $89M
                            </span>
                          </li>
                          <li>
                            Investment frequency:{" "}
                            <span className="font-semibold text-blue-700">
                              4.2x annually
                            </span>{" "}
                            (vs 3.1x average)
                          </li>
                          <li>
                            Financial services cross-sector opportunities:{" "}
                            <span className="font-semibold text-blue-700">
                              48% value creation rate
                            </span>
                          </li>
                        </ul>

                        <p className="mt-4 font-medium text-orange-800">
                          Portfolio & Operational Insights:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            Enhanced data modeling reduces due diligence time by{" "}
                            <span className="font-semibold text-orange-700">
                              33%
                            </span>
                          </li>
                          <li>
                            Deal flow quality improved{" "}
                            <span className="font-semibold text-orange-700">
                              38%
                            </span>{" "}
                            with predictive analytics
                          </li>
                          <li>
                            Portfolio risk exposure down{" "}
                            <span className="font-semibold text-orange-700">
                              22%
                            </span>{" "}
                            through optimized allocation
                          </li>
                        </ul>

                        <p className="mt-4 font-medium text-purple-800">
                          Strategic Recommendations:
                        </p>
                        <ol className="list-decimal pl-5 mt-1 space-y-1">
                          <li>
                            Expand technology sector exposure targeting
                            high-growth segments
                          </li>
                          <li>
                            Implement dynamic valuation models for growth equity
                            opportunities
                          </li>
                          <li>
                            Develop cross-sector investment strategies leveraging high MOIC
                            deals
                          </li>
                          <li>
                            Focus geographic expansion in high-performing
                            emerging markets
                          </li>
                        </ol>

                        <div className="mt-4 p-2 bg-green-50 rounded">
                          <p className="font-medium text-green-800">
                            Return Projections:
                          </p>
                          <p className="text-sm">
                            <span className="font-semibold text-green-700">
                              15-18% IRR improvement potential
                            </span>{" "}
                            with optimized portfolio mix.
                          </p>
                        </div>

                        <div className="mt-4 flex justify-center">
                          <div className="text-xs flex items-center text-green-700 animate-pulse">
                            <span>Detailed analytics loading</span>
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <TypeAnimation
                        sequence={[fullText, () => {}]}
                        speed={99}
                        cursor={true}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 p-3 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Ask about portfolio performance, sectors, or investment insights..."
                className="flex-grow border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={true}
              />
              <button
                title="no-title"
                disabled={true}
                className="ml-2 bg-green-600/50 text-white p-2 rounded-lg opacity-50 cursor-not-allowed"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right dashboard section */}
        <AnimatePresence>
          {expandDashboard && (
            <motion.div
              className={`${
                isMobileLayout ? "w-full h-1/2" : "w-1/2"
              } border-l border-gray-200 relative flex flex-col ${
                isMobileLayout ? "max-h-[50vh]" : "h-full"
              } overflow-hidden`}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: isMobileLayout ? "100%" : "50%",
                height: isMobileLayout ? "50%" : "100%",
                opacity: 1,
              }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            >
              {/* Dashboard header */}
              <div className="border-b border-gray-200 p-3 sm:p-4 bg-white/50 backdrop-blur-sm flex items-center mt-12">
                <div className="flex items-center">
                  <div className="text-xs font-medium text-gray-700">
                    Portfolio Performance Analysis
                  </div>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="bg-green-100 px-2 py-1 rounded text-xs font-medium text-green-600 flex items-center">
                    <Database className="h-3 w-3 mr-1" />
                    <span>ENHANCED</span>
                  </div>
                  <div className="bg-green-100 px-2 py-1 rounded text-xs font-medium text-green-600 flex items-center">
                    <span>LIVE</span>
                    <div className="ml-1 w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div
                className={`p-3 sm:p-5 space-y-4 sm:space-y-6 flex-1 relative ${
                  userScrollingEnabled ? "overflow-y-auto" : "overflow-hidden"
                }`}
                ref={dashboardContainerRef}
                style={{
                  scrollBehavior: "smooth",
                  pointerEvents: userScrollingEnabled ? "auto" : "none",
                  maxHeight: "100%",
                }}
              >
                {/* Visual indication when scrolling is enabled */}
                {userScrollingEnabled && (
                  <div className="fixed bottom-4 right-4 opacity-30 hover:opacity-60 transition-opacity pointer-events-none">
                    <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-sm">
                      Scroll for more →
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {/* Category Performance section */}
                  {showSection.categoryPerformance && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-green-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <DollarSign className="h-2 w-2 sm:h-3 sm:w-3 text-green-700" />
                        </span>
                        Investment Performance & MOIC Analysis
                      </h3>

                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-2">
                            MOIC by Investment Type
                          </div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <ComposedChart
                                data={categoryPerformanceData}
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 5,
                                  bottom: 20,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  opacity={0.3}
                                />
                                <XAxis
                                  dataKey="category"
                                  tick={{ fontSize: 8 }}
                                />
                                <YAxis
                                  yAxisId="left"
                                  orientation="left"
                                  tick={{ fontSize: 8 }}
                                />
                                <YAxis
                                  yAxisId="right"
                                  orientation="right"
                                  tick={{ fontSize: 8 }}
                                />
                                <Tooltip
                                  content={
                                    <CustomTooltip
                                      active={""}
                                      payload={""}
                                      label={""}
                                    />
                                  }
                                />
                                <Bar
                                  yAxisId="left"
                                  dataKey="clv"
                                  name="MOIC"
                                  fill="#059669"
                                />
                                <Bar
                                  yAxisId="left"
                                  dataKey="margin"
                                  name="Net IRR (%)"
                                  fill="#3B82F6"
                                />
                                <Bar
                                  yAxisId="right"
                                  dataKey="repeatRate"
                                  name="Exit Rate (%)"
                                  fill="#F59E0B"
                                />
                              </ComposedChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-2">
                            Q4 Capital Deployment Trends
                          </div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={quarterlyTrendsData}
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 5,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  opacity={0.3}
                                />
                                <XAxis dataKey="month" tick={{ fontSize: 8 }} />
                                <YAxis
                                  tick={{ fontSize: 8 }}
                                  tickFormatter={(value) => `${value / 1000}k`}
                                />
                                <Tooltip
                                  content={
                                    <CustomTooltip
                                      active={""}
                                      payload={""}
                                      label={""}
                                    />
                                  }
                                />
                                <Area
                                  type="monotone"
                                  dataKey="sustainable"
                                  name="Growth Equity"
                                  stackId="1"
                                  stroke="#059669"
                                  fill="#059669"
                                  opacity={0.7}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="regular"
                                  name="Buyouts"
                                  stackId="1"
                                  stroke="#94A3B8"
                                  fill="#94A3B8"
                                  opacity={0.7}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs px-2 mt-3 space-y-1 sm:space-y-0">
                        <div className="font-medium text-gray-700 flex items-center">
                          <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                          <span className="text-green-600 mr-2">
                            <CountUp end={27} duration={2} />%
                          </span>
                          <span>higher MOIC for venture capital deals</span>
                        </div>
                        <div className="text-gray-500 text-right">
                          Based on enhanced deal attributes
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Customer Segments section */}
                  {showSection.customerSegments && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-green-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <Users className="h-2 w-2 sm:h-3 sm:w-3 text-green-700" />
                        </span>
                        Sector Performance Analysis
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-2">
                            MOIC by Sector
                          </div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={customerSegmentData}
                                layout="vertical"
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 40,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  horizontal={true}
                                  vertical={false}
                                  opacity={0.3}
                                />
                                <XAxis type="number" tick={{ fontSize: 8 }} />
                                <YAxis
                                  dataKey="segment"
                                  type="category"
                                  tick={{ fontSize: 8 }}
                                  width={80}
                                />
                                <Tooltip
                                  content={
                                    <CustomTooltip
                                      active={""}
                                      payload={""}
                                      label={""}
                                    />
                                  }
                                />
                                <Bar
                                  dataKey="clv"
                                  name="MOIC"
                                  radius={[0, 4, 4, 0]}
                                >
                                  {customerSegmentData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.fill}
                                    />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {customerSegmentData.map((segment, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded">
                              <div
                                className="text-xs font-medium"
                                style={{ color: segment.fill }}
                              >
                                {segment.segment}
                              </div>
                              <div className="mt-1 space-y-0.5">
                                <div className="text-xs text-gray-600">
                                  Avg Deal: ${segment.aov}M
                                </div>
                                <div className="text-xs text-gray-600">
                                  Deals/Yr: {segment.frequency}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 bg-blue-50 p-2 rounded">
                        <div className="text-xs font-medium text-blue-700 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          <span>Key insight:</span>
                        </div>
                        <p className="text-xs text-gray-700 mt-0.5">
                          Tech sector deals have 52% higher MOIC than consumer goods
                          investments. Enhanced analysis reveals cross-sector
                          value creation patterns.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Inventory Optimization section */}
                  {showSection.inventoryOptimization && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-green-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <Package className="h-2 w-2 sm:h-3 sm:w-3 text-green-700" />
                        </span>
                        Portfolio Optimization Metrics
                      </h3>

                      <div className="space-y-3">
                        {inventoryOptimizationData.map((metric, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <div>
                              <div className="text-xs font-medium text-gray-700">
                                {metric.metric}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                <span className="text-red-600">
                                  Normal: {metric.normal}
                                  {metric.unit}
                                </span>
                                <span className="mx-2">→</span>
                                <span className="text-green-600">
                                  Enhanced: {metric.enhanced}
                                  {metric.unit}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-semibold text-green-700">
                                +{metric.improvement}%
                              </div>
                              <div className="text-xs text-gray-500">
                                improvement
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="bg-green-50 p-2 rounded">
                          <div className="font-medium text-green-700">
                            Predictive Analytics Impact
                          </div>
                          <ul className="text-gray-700 mt-1 space-y-0.5">
                            <li>• 38% higher deal flow quality</li>
                            <li>• 33% faster due diligence</li>
                            <li>• 22% reduced portfolio risk</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                          <div className="font-medium text-green-700">
                            Key Optimization Areas
                          </div>
                          <ul className="text-gray-700 mt-1 space-y-0.5">
                            <li>• Sector allocation patterns</li>
                            <li>• Exit timing optimization</li>
                            <li>• Cross-sector value creation</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Strategic Insights section */}
                  {showSection.strategicInsights && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-sm p-3 sm:p-4 border border-green-100 relative overflow-hidden mb-2"
                    >
                      {/* {showConfetti && <ConfettiEffect />} */}

                      <h3 className="text-xs sm:text-sm font-semibold text-green-800 mb-3 flex items-center">
                        <span className="bg-green-200 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <Target className="h-2 w-2 sm:h-3 sm:w-3 text-green-800" />
                        </span>
                        Strategic Market Insights
                      </h3>

                      <div className="space-y-3">
                        {marketInsightsData.map((insight, index) => (
                          <div
                            key={index}
                            className="bg-white/60 rounded-lg p-3 backdrop-blur-sm"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-xs font-medium text-gray-800">
                                  {insight.insight}
                                </h4>
                                <div className="mt-1 flex items-center space-x-2">
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      insight.impact === "high"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {insight.impact.toUpperCase()} IMPACT
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Confidence: {insight.confidence}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-3 bg-white/50 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div>
                            <div className="text-xs font-semibold text-green-800">
                              IRR Improvement Potential
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className="text-lg sm:text-xl font-bold text-green-700">
                                <CountUp end={15} duration={3} />-
                                <CountUp end={18} duration={4} />%
                              </span>
                              <span className="ml-2 text-xs text-green-600 flex items-center">
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                  ></path>
                                </svg>
                                with optimized portfolio mix
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-green-800">
                              Implementation Timeline
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                              6-8 weeks
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PrivateEquityDemo;

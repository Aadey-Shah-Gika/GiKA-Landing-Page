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
} from "recharts";
import {
  BookOpen,
  Send,
  ArrowRight,
  RefreshCcw,
  Users,
  TrendingUp,
  Maximize2,
  Minimize2,
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
    "#8B5CF6",
    "#6366F1",
    "#3B82F6",
    "#EC4899",
    "#10B981",
    "#FBBF24",
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

const AssetManagementDemo = () => {
  const [stage, setStage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [expandDashboard, setExpandDashboard] = useState(false);
  const [showSection, setShowSection] = useState({
    marketInsights: false,
    audienceSegmentation: false,
    timeline: false,
    recommendations: false,
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
      "Given Sarah Mitchell's (Client ID: SM-2847) portfolio, current macro conditions, and historical performance data, what type of rebalancing or product move would minimize downside risk without breaching her risk profile?"
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
      setShowSection((prev) => ({ ...prev, marketInsights: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop =
          dashboardContainerRef.current.scrollHeight;
      }
    }, 2000);

    setTimeout(() => {
      setShowSection((prev) => ({ ...prev, audienceSegmentation: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop =
          dashboardContainerRef.current.scrollHeight;
      }
    }, 3500);

    setTimeout(() => {
      setShowSection((prev) => ({ ...prev, timeline: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop =
          dashboardContainerRef.current.scrollHeight;
      }
    }, 5000);

    setTimeout(() => {
      setShowSection((prev) => ({ ...prev, recommendations: true }));
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
      marketInsights: false,
      audienceSegmentation: false,
      timeline: false,
      recommendations: false,
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

  // Chart data
  const marketTrendsData = [
    { month: "Jan", interest: 75 },
    { month: "Feb", interest: 78 },
    { month: "Mar", interest: 82 },
    { month: "Apr", interest: 85 },
    { month: "May", interest: 90 },
    { month: "Jun", interest: 94 },
  ];

  const audienceSegmentData = [
    { name: "Tech Professionals", value: 48, fill: "#8B5CF6" },
    { name: "Healthcare", value: 22, fill: "#6366F1" },
    { name: "Finance", value: 15, fill: "#3B82F6" },
    { name: "Education", value: 10, fill: "#10B981" },
    { name: "Other", value: 5, fill: "#14B8A6" },
  ];

  const conversionData = [
    { type: "Current Portfolio", likelihood: 180, fill: "#8B5CF6" },
    { type: "Rebalanced Portfolio", likelihood: 420, fill: "#10B981" },
    { type: "Target (Year 3)", likelihood: 520, fill: "#6366F1" },
  ];

  const preferenceData = [
    { feature: "Project-based Learning", preference: 85, fill: "#8B5CF6" },
    { feature: "Industry Case Studies", preference: 75, fill: "#6366F1" },
    { feature: "Certification", preference: 65, fill: "#3B82F6" },
    { feature: "Flexible Scheduling", preference: 60, fill: "#10B981" },
    { feature: "Mentorship", preference: 45, fill: "#14B8A6" },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 text-xs border border-gray-200 shadow-sm rounded">
          <p className="font-medium">
            {payload[0].payload.name ||
              payload[0].payload.feature ||
              payload[0].payload.type ||
              payload[0].payload.month}
          </p>
          <p className="text-gray-700">
            {payload[0].payload.value !== undefined &&
              `${payload[0].payload.value}%`}
            {payload[0].payload.likelihood !== undefined &&
              `${payload[0].payload.likelihood}%`}
            {payload[0].payload.preference !== undefined &&
              `${payload[0].payload.preference}%`}
            {payload[0].payload.interest !== undefined &&
              `${payload[0].payload.interest}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Typing animation text
  const fullText = `Based on Sarah Mitchell's portfolio analysis and GiKA's enriched market intelligence, we recommend a strategic rebalancing approach.

Client Profile Insights:
* Sarah (age 58, tech sector executive) holds a $12.8M portfolio with 72% equity concentration, including $4.2M in employer stock (NVDA) acquired pre-IPO.
* Her historical trading patterns reveal a conservative risk tolerance, despite aggressive current allocation—likely due to inertia from appreciated positions.

Market & Risk Analysis:
* Current macro conditions (elevated rates, tech sector volatility) expose her portfolio to 28% downside risk in a correction scenario.
* Her risk profile assessment indicates a maximum 15% downside tolerance, creating a 13% breach risk under current allocation.

Recommendation: Implement a systematic rebalancing by reducing equity exposure to 55%, trimming concentrated NVDA position by 40%, and rotating into diversified fixed income (20%) and alternative assets (25%), protecting wealth while maintaining growth potential aligned with her true risk tolerance.`;

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
              GiKA Wealth Management
            </div>
            <div className="text-xs font-medium text-gray-700 sm:hidden">
              GiKA
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
              title="no-title"
              onClick={resetDemo}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Left chat section */}
        <motion.div
          className="flex flex-col bg-gradient-to-br from-violet-50 to-indigo-50"
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
              <div className="bg-indigo-100 p-2 rounded-full mr-3">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800 text-sm sm:text-base">
                  Chat Interface
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Powered by specialized small language models
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
                <div className="text-xs text-gray-500">Today, 11:42 AM</div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="text-sm text-center text-gray-600 max-w-[85%]">
                  Welcome to GiKA Wealth Management Intelligence. Ask me about
                  portfolio analysis, risk assessment, or investment strategies
                  for your clients.
                </div>
              </div>

              {/* User query */}
              {stage >= 1 && (
                <div className="flex justify-end mb-6">
                  <div className="bg-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm max-w-[85%] text-xs sm:text-sm">
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
                          Based on Sarah Mitchell's portfolio analysis and
                          GiKA's enriched market intelligence, we recommend a
                          strategic rebalancing approach.
                        </p>

                        <p className="mt-4 font-medium text-indigo-800">
                          Client Profile Insights:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            Sarah (age 58, tech sector executive) holds a{" "}
                            <span className="font-semibold text-indigo-700">
                              $12.8M portfolio
                            </span>{" "}
                            with 72% equity concentration, including{" "}
                            <span className="font-semibold text-indigo-700">
                              $4.2M in employer stock (NVDA)
                            </span>{" "}
                            acquired pre-IPO.
                          </li>
                          <li>
                            Her historical trading patterns reveal a{" "}
                            <span className="font-semibold text-indigo-700">
                              conservative risk tolerance
                            </span>
                            , despite aggressive current allocation—likely due
                            to inertia from appreciated positions.
                          </li>
                        </ul>

                        <p className="mt-4 font-medium text-indigo-800">
                          Market & Risk Analysis:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            Current macro conditions (elevated rates, tech
                            sector volatility) expose her portfolio to{" "}
                            <span className="font-semibold text-indigo-700">
                              28% downside risk
                            </span>{" "}
                            in a correction scenario.
                          </li>
                          <li>
                            Her risk profile assessment indicates a maximum{" "}
                            <span className="font-semibold text-indigo-700">
                              15% downside tolerance
                            </span>
                            , creating a{" "}
                            <span className="font-semibold text-indigo-700">
                              13% breach risk
                            </span>{" "}
                            under current allocation.
                          </li>
                        </ul>

                        <p className="mt-4">
                          <span className="font-medium text-indigo-800">
                            Recommendation:
                          </span>{" "}
                          Implement a systematic rebalancing by reducing equity
                          exposure to{" "}
                          <span className="font-semibold text-indigo-700">
                            55%
                          </span>
                          , trimming concentrated NVDA position by{" "}
                          <span className="font-semibold text-indigo-700">
                            40%
                          </span>
                          , and rotating into diversified{" "}
                          <span className="font-semibold text-indigo-700">
                            fixed income (20%)
                          </span>{" "}
                          and{" "}
                          <span className="font-semibold text-indigo-700">
                            alternative assets (25%)
                          </span>
                          , protecting wealth while maintaining growth potential
                          aligned with her true risk tolerance.
                        </p>

                        <div className="mt-4 flex justify-center">
                          <div className="text-xs flex items-center text-indigo-700 animate-pulse">
                            <span>Visual insights generated</span>
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
                placeholder="Ask about client portfolios, risk analysis, or rebalancing strategies..."
                className="flex-grow border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={true}
              />
              <button
                title="no-title"
                disabled={true}
                className="ml-2 bg-indigo-600/50 text-white p-2 rounded-lg opacity-50 cursor-not-allowed"
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
                    Portfolio Risk Analysis - Sarah Mitchell
                  </div>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="bg-indigo-100 px-2 py-1 rounded text-xs font-medium text-indigo-600 flex items-center">
                    <span>LIVE</span>
                    <div className="ml-1 w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div>
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
                  {/* Market Insights section */}
                  {showSection.marketInsights && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-indigo-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 text-indigo-700" />
                        </span>
                        Portfolio Downside Risk Exposure
                      </h3>

                      <div className="h-40 sm:h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={marketTrendsData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                              opacity={0.3}
                            />
                            <XAxis dataKey="month" tick={{ fontSize: 8 }} />
                            <YAxis
                              tick={{ fontSize: 8 }}
                              domain={[60, 100]}
                              tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                              content={
                                <CustomTooltip active={""} payload={""} />
                              }
                            />
                            <ReferenceLine
                              y={75}
                              stroke="#6B7280"
                              strokeDasharray="3 3"
                              label={{
                                value: "Baseline",
                                position: "right",
                                fontSize: 8,
                                fill: "#6B7280",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="interest"
                              stroke="#8B5CF6"
                              strokeWidth={2}
                              dot={{ fill: "#8B5CF6", r: 3 }}
                              activeDot={{
                                fill: "#6D28D9",
                                r: 4,
                                strokeWidth: 2,
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs px-2 mt-2 space-y-1 sm:space-y-0">
                        <div className="font-medium text-gray-700 flex items-center">
                          <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mr-1"></span>
                          <span className="text-indigo-600 mr-2">
                            <CountUp end={28} duration={4} />%
                          </span>
                          <span>{" downside risk in correction scenario"}</span>
                        </div>
                        <div className="text-gray-500">
                          Risk Tolerance: 15% max
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Target Audience Segmentation */}
                  {showSection.audienceSegmentation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-indigo-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <Users className="h-2 w-2 sm:h-3 sm:w-3 text-indigo-700" />
                        </span>
                        Current Portfolio Allocation
                      </h3>

                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-2 text-center">
                            Asset Class Distribution
                          </div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={audienceSegmentData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={28}
                                  outerRadius={48}
                                  paddingAngle={2}
                                  dataKey="value"
                                  label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                  }
                                  labelLine={{
                                    stroke: "#E5E7EB",
                                    strokeWidth: 1,
                                  }}
                                >
                                  {audienceSegmentData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.fill}
                                    />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-2">
                            Annual Income Generation Forecast
                          </div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={conversionData}
                                layout="vertical"
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 10,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  horizontal={false}
                                  opacity={0.3}
                                />
                                <XAxis
                                  type="number"
                                  domain={[0, 600]}
                                  tickFormatter={(value) => `$${value}K`}
                                  tick={{ fontSize: 8 }}
                                />
                                <YAxis
                                  dataKey="type"
                                  type="category"
                                  tick={{ fontSize: 8 }}
                                  width={80}
                                />
                                <Tooltip
                                  content={
                                    <CustomTooltip active={""} payload={""} />
                                  }
                                />
                                <Bar dataKey="likelihood" radius={[0, 4, 4, 0]}>
                                  {conversionData.map((entry, index) => (
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
                      </div>

                      <div className="mt-3 text-xs flex items-center justify-center">
                        <div className="flex items-center px-2 py-1 bg-green-50 rounded">
                          <span className="font-medium text-green-700">
                            Projected increase:
                          </span>
                          <span className="ml-1 text-gray-700">
                            +133% annual income after rebalancing
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Implementation Timeline section */}
                  {showSection.timeline && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-indigo-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-indigo-700">
                            ⏱
                          </span>
                        </span>
                        Rebalancing Implementation Timeline
                      </h3>

                      <div className="space-y-4 relative pl-4">
                        {/* Timeline vertical line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-indigo-200"></div>

                        {/* Phase 1 */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="relative"
                        >
                          <div className="absolute left-[-16px] top-1 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white"></div>
                          <div className="bg-indigo-50 rounded-lg p-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-indigo-800">
                                Phase 1: Assessment & Planning
                              </span>
                              <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded">
                                Weeks 1-2
                              </span>
                            </div>
                            <p className="text-xs text-gray-700">
                              Complete tax analysis, identify tax-loss harvesting opportunities, review unrealized gains on NVDA position
                            </p>
                          </div>
                        </motion.div>

                        {/* Phase 2 */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="relative"
                        >
                          <div className="absolute left-[-16px] top-1 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white"></div>
                          <div className="bg-indigo-50 rounded-lg p-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-indigo-800">
                                Phase 2: Initial Rebalancing
                              </span>
                              <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded">
                                Months 1-3
                              </span>
                            </div>
                            <p className="text-xs text-gray-700">
                              Begin systematic NVDA reduction (10-15%), initiate fixed income ladder with municipal bonds
                            </p>
                          </div>
                        </motion.div>

                        {/* Phase 3 */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                          className="relative"
                        >
                          <div className="absolute left-[-16px] top-1 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white"></div>
                          <div className="bg-indigo-50 rounded-lg p-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-indigo-800">
                                Phase 3: Alternative Allocation
                              </span>
                              <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded">
                                Months 4-8
                              </span>
                            </div>
                            <p className="text-xs text-gray-700">
                              Deploy capital to private equity, real estate funds, and hedge fund strategies
                            </p>
                          </div>
                        </motion.div>

                        {/* Phase 4 */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                          className="relative"
                        >
                          <div className="absolute left-[-16px] top-1 w-3 h-3 rounded-full bg-green-600 border-2 border-white"></div>
                          <div className="bg-green-50 rounded-lg p-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-green-800">
                                Phase 4: Final Optimization
                              </span>
                              <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded">
                                Months 9-12
                              </span>
                            </div>
                            <p className="text-xs text-gray-700">
                              Complete NVDA trimming to target, review portfolio performance, adjust allocations
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      <div className="mt-4 p-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-indigo-800">
                            Total Implementation Period
                          </span>
                          <span className="font-bold text-indigo-700">
                            6-12 months
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Recommendations section */}
                  {showSection.recommendations && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-sm p-3 sm:p-4 border border-indigo-100 relative overflow-hidden mb-2"
                    >
                      {/* {showConfetti && <ConfettiEffect />} */}

                      <h3 className="text-xs sm:text-sm font-semibold text-indigo-800 mb-3 flex items-center">
                        <span className="bg-indigo-200 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-indigo-800">
                            ✓
                          </span>
                        </span>
                        Portfolio Rebalancing Strategy
                      </h3>

                      <div className="space-y-3">
                        <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-indigo-800 mb-1">
                            Reduce Equity Concentration to 55%
                          </h4>
                          <p className="text-xs text-gray-700">
                            Systematically trim NVDA position by 40% using
                            tax-loss harvesting opportunities in other holdings
                            to offset gains. Reduces single-stock risk while
                            managing tax impact.
                          </p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-l-full"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-r-full"></div>
                            <div className="ml-2 text-[10px] text-gray-500">
                              Priority: Critical
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-indigo-800 mb-1">
                            Allocate 20% to Fixed Income
                          </h4>
                          <p className="text-xs text-gray-700">
                            Build diversified bond ladder with municipal and
                            investment-grade corporate bonds. Current elevated
                            rates provide attractive entry point for income
                            generation.
                          </p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-l-full"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-r-full"></div>
                            <div className="ml-2 text-[10px] text-gray-500">
                              Priority: High
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-indigo-800 mb-1">
                            Diversify into Alternative Assets (25%)
                          </h4>
                          <p className="text-xs text-gray-700">
                            Allocate to private equity, real estate, and hedge
                            funds to reduce correlation with public equities
                            while maintaining growth potential suited to her
                            profile.
                          </p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-l-full"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                            <div className="h-1 w-8 bg-gray-300 rounded-r-full"></div>
                            <div className="ml-2 text-[10px] text-gray-500">
                              Priority: Medium
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-white/50 rounded-lg mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div>
                            <div className="text-xs font-semibold text-indigo-800">
                              Downside Risk Reduction
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className="text-lg sm:text-xl font-bold text-indigo-700">
                                <CountUp end={28} duration={3} />% →
                                <CountUp end={12} duration={4} />%
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
                                within risk tolerance
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-indigo-800">
                              Implementation Timeline
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                              6-12 months
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

// Add responsive global styles
const globalStyles = `
@keyframes typing {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

.typing-animation span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #6366F1;
  margin: 0 2px;
  animation: typing 1.4s infinite;
}

.typing-animation span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-animation span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Hide scrollbar when overflow-hidden is applied */
.overflow-hidden::-webkit-scrollbar {
  display: none;
}

.overflow-hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Custom scrollbar styling when enabled */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

@media (min-width: 640px) {
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c7d2fe;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #818cf8;
}

/* Ensure proper scrolling on mobile */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* Fix for mobile viewport */
.dashboard-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Ensure flex container works properly */
.flex-1 {
  flex: 1 1 0%;
}

/* Ensure content doesn't exceed bounds */
.space-y-4 > * + *,
.space-y-6 > * + * {
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }
}

/* Ensure smooth scrolling */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Responsive typography */
@media (max-width: 640px) {
  html {
    font-size: 14px;
  }
}

/* Fix for mobile viewport height issues */
@supports (height: 100dvh) {
  .h-screen {
    height: 100dvh;
  }
}

/* Prevent horizontal scrolling on mobile */
body {
  overflow-x: hidden;
}

/* Adjust chart text sizes for mobile */
@media (max-width: 640px) {
  .recharts-text {
    font-size: 8px !important;
  }
}

/* Responsive scaling container */
.responsive-container {
  transition: transform 0.3s ease;
}

/* Fix confetti positioning in fullscreen mode */
.confetti-container {
  pointer-events: none;
  overflow: hidden;
}
`;

const AssetManagementDemoWithStyles = () => (
  <>
    <style>{globalStyles}</style>
    <AssetManagementDemo />
  </>
);

export default AssetManagementDemoWithStyles;

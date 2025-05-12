"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, PieChart, Pie, LineChart, Line, ComposedChart } from 'recharts';
import { PiggyBank, Send, ArrowRight, RefreshCcw, Users, TrendingUp, Maximize2, Minimize2, TrendingDown, AlertTriangle, Target, Lightbulb } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';

// Simple confetti particle component
const ConfettiParticle = ({ color, left, delay, duration, size }) => (
  <motion.div
    className="absolute top-0 rounded-full pointer-events-none"
    style={{ 
      left: `${left}%`, 
      width: size, 
      height: size, 
      backgroundColor: color,
      zIndex: 10
    }}
    initial={{ top: '-10%' }}
    animate={{
      top: '110%',
      rotate: [0, 360],
      x: [0, Math.random() > 0.5 ? 20 : -20, 0, Math.random() > 0.5 ? -20 : 20, 0],
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
  const colors = ['#10B981', '#3B82F6', '#6366F1', '#F59E0B', '#EF4444', '#FBBF24'];
  
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

const FinancialAnalyticsDemo = () => {
  const [stage, setStage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [expandDashboard, setExpandDashboard] = useState(false);
  const [showSection, setShowSection] = useState({ 
    competitorAnalysis: false, 
    customerEngagement: false, 
    missedOpportunities: false, 
    recommendations: false 
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
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);
  
  // Smoother, more elegant scrolling functions
  const scrollChatToBottom = (smooth = true) => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const scrollHeight = container.scrollHeight;
      
      if (smooth) {
        container.scrollTo({
          top: scrollHeight,
          behavior: 'smooth'
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
          behavior: 'smooth'
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
        characterData: true
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
        characterData: true
      });
      
      return () => dashboardObserver.disconnect();
    }
  }, [expandDashboard, isAnimating]);
  
  // Start animation sequence
  const startAnimation = () => {
    setIsAnimating(true);
    setUserScrollingEnabled(false);
    
    setStage(1);
    setInputValue("How are our top competitors positioning aggressive hybrid funds compared to us, and is it affecting our customer engagement or AUM growth?");
    
    setTimeout(() => {
      setShowTyping(true);
      setStage(2);
      setExpandDashboard(true);
      
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 300);
    
    setTimeout(() => {
      setShowTyping(false);
      setShowResponse(true);
      
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 1200);
    
    // Show dashboard sections with delays
    setTimeout(() => {
      setShowSection(prev => ({ ...prev, competitorAnalysis: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop = dashboardContainerRef.current.scrollHeight;
      }
    }, 2000);
    
    setTimeout(() => {
      setShowSection(prev => ({ ...prev, customerEngagement: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop = dashboardContainerRef.current.scrollHeight;
      }
    }, 3500);
    
    setTimeout(() => {
      setShowSection(prev => ({ ...prev, missedOpportunities: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop = dashboardContainerRef.current.scrollHeight;
      }
    }, 5000);
    
    setTimeout(() => {
      setShowSection(prev => ({ ...prev, recommendations: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop = dashboardContainerRef.current.scrollHeight;
      }
    }, 6500);
    
    setTimeout(() => setShowConfetti(true), 7000);
    setTimeout(() => setShowConfetti(false), 9000);
    
    setTimeout(() => {
      setTypingComplete(true);
      
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop = dashboardContainerRef.current.scrollHeight;
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
      competitorAnalysis: false, 
      customerEngagement: false, 
      missedOpportunities: false, 
      recommendations: false 
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
  const competitorTrendsData = [
    { quarter: 'Q1', our: 75, competitorB: 68, competitorC: 73 },
    { quarter: 'Q2', our: 73, competitorB: 72, competitorC: 76 },
    { quarter: 'Q3', our: 72, competitorB: 78, competitorC: 82 },
    { quarter: 'Q4', our: 68, competitorB: 84, competitorC: 87 },
  ];
  
  const sipPerformanceData = [
    { metric: 'SIP Initiations', our: -22, competitorB: 31, competitorC: 18 },
    { metric: 'Engagement Rate', our: -18.6, competitorB: 42, competitorC: 28 },
    { metric: 'Conversion Rate', our: -12, competitorB: 37, competitorC: 24 },
  ];
  
  const ageGroupData = [
    { age: '25-35', our: 15, competitors: 35, fill: '#3B82F6' },
    { age: '36-45', our: 25, competitors: 28, fill: '#10B981' },
    { age: '46-55', our: 30, competitors: 22, fill: '#F59E0B' },
    { age: '56+', our: 30, competitors: 15, fill: '#6366F1' }
  ];
  
  const contentPerformanceData = [
    { type: 'SIP-focused articles', engagement: 3.2, topPerformer: 'Competitor B', fill: '#10B981' },
    { type: 'Goal-based tools', engagement: 2.8, topPerformer: 'Competitor C', fill: '#3B82F6' },
    { type: 'Risk calculators', engagement: 1.9, topPerformer: 'Competitor B', fill: '#F59E0B' },
    { type: 'Fund comparison', engagement: 1.5, topPerformer: 'Our Platform', fill: '#EF4444' }
  ];
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 text-xs border border-gray-200 shadow-sm rounded">
          <p className="font-medium">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-gray-700">
              <span style={{ color: item.color }}>{item.dataKey || item.name}: </span>
              {item.value}
              {typeof item.value === 'number' && item.value < 0 ? '% ↓' : '% ↑'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Typing animation text
  const fullText = `Top competitors have repositioned aggressive hybrid funds toward younger, SIP-driven investors, emphasizing growth with downside protection. Our engagement on this category is down **18.6% QoQ**, SIP initiations fell **22%**, while Competitor B saw a **31% rise**. Estimated **$27M AUM opportunity lost** in the 25–35 age group. Competitors' content (e.g., 'Top hybrid funds under ₹5K/month') is driving 3× engagement. Recommend repositioning toward SIP-first users, refreshing content, and introducing goal-based fund discovery.

Key Findings:
* **Positioning Gap**: Competitors focus on low-cost SIP entry points (₹5K/month), while we emphasize lump sum investing.
* **Target Demographics**: 25-35 age group shows 35% higher conversion with competitor offerings.
* **Content Performance**: Competitor B's SIP-focused content drives 3× more engagement than our fund comparison tools.

Immediate Actions:
* Launch SIP-first landing pages with entry points under ₹5K/month.
* Develop goal-based fund discovery flow targeting career milestones.
* Create monthly SIP calculators with visual retirement projections.
* Introduce hybrid fund comparison specifically for first-time investors.

Expected Impact: 15-20% increase in SIP conversions and recovery of $17M AUM opportunity within Q1.`;

  // Main container classes based on responsive settings
  const mainContainerClasses = `
    ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'}
    bg-gray-50 flex items-center justify-center 
    ${isFullscreen ? 'p-0' : 'p-2 sm:p-4'}
    transition-all duration-300
  `;
  
  const demoContainerClasses = `
    bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden 
    ${isMobileLayout ? 'flex-col' : 'flex'} 
    w-full 
    ${isFullscreen ? 'max-w-none h-screen' : 'max-w-[1000px] h-[80vh]'} 
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
            <div className="text-xs font-medium text-gray-700 hidden sm:block">Fund Analytics Intelligence</div>
            <div className="text-xs font-medium text-gray-700 sm:hidden">Fund Analytics</div>
          </div>
          <div className="flex items-center space-x-2">
            {!isMobileLayout && (
              <button 
                onClick={toggleFullscreen}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            )}
            <button 
              onClick={resetDemo}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Left chat section */}
        <motion.div 
          className="flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50"
          layout
          initial={{ width: isMobileLayout ? '100%' : '500px' }}
          animate={{ 
            width: isMobileLayout ? '100%' : (stage >= 1 ? '50%' : '500px'),
            height: isMobileLayout && expandDashboard ? '50%' : 'auto'
          }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        >
          {/* Header */}
          <div className="border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between bg-white/70 backdrop-blur-sm mt-12">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <PiggyBank className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800 text-sm sm:text-base">Fund Analytics Chat</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Powered by real-time market intelligence</p>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div 
            className={`flex-grow p-3 sm:p-4 ${userScrollingEnabled ? 'overflow-y-auto' : 'overflow-hidden'}`}
            ref={chatContainerRef}
            style={{ 
              scrollBehavior: 'smooth',
              pointerEvents: userScrollingEnabled ? 'auto' : 'none'
            }}
          >
            <div className="space-y-4 min-h-full flex flex-col justify-end">
              {/* Welcome message */}
              <div className="flex justify-center my-4">
                <div className="text-xs text-gray-500">
                  Today, 10:15 AM
                </div>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="text-sm text-center text-gray-600 max-w-[85%]">
                  Welcome to Fund Analytics Intelligence. Ask me about competitor positioning, fund performance, customer segments, or SIP strategies.
                </div>
              </div>
              
              {/* User query */}
              {stage >= 1 && (
                <div className="flex justify-end mb-6">
                  <div className="bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm max-w-[85%] text-xs sm:text-sm">
                    {inputValue}
                  </div>
                </div>
              )}
              
              {/* Typing indicator */}
              {showTyping && (
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
                          Top competitors have repositioned aggressive hybrid funds toward younger, SIP-driven investors, emphasizing growth with downside protection. Our engagement on this category is down <span className="text-red-600 font-semibold">18.6% QoQ</span>, SIP initiations fell <span className="text-red-600 font-semibold">22%</span>, while Competitor B saw a <span className="text-green-600 font-semibold">31% rise</span>. Estimated <span className="text-red-600 font-semibold">$27M AUM opportunity lost</span> in the 25–35 age group.
                        </p>
                        
                        <p className="mt-4 font-medium text-blue-800">
                          Key Findings:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li><span className="font-semibold text-blue-700">Positioning Gap</span>: Competitors focus on low-cost SIP entry points (₹5K/month), while we emphasize lump sum investing.</li>
                          <li><span className="font-semibold text-blue-700">Target Demographics</span>: 25-35 age group shows 35% higher conversion with competitor offerings.</li>
                          <li><span className="font-semibold text-blue-700">Content Performance</span>: Competitor B's SIP-focused content drives 3× more engagement than our fund comparison tools.</li>
                        </ul>
                        
                        <p className="mt-4 font-medium text-green-800">
                          Immediate Actions:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Launch <span className="font-semibold text-green-700">SIP-first landing pages</span> with entry points under ₹5K/month.</li>
                          <li>Develop <span className="font-semibold text-green-700">goal-based fund discovery</span> flow targeting career milestones.</li>
                          <li>Create monthly <span className="font-semibold text-green-700">SIP calculators</span> with visual retirement projections.</li>
                          <li>Introduce <span className="font-semibold text-green-700">hybrid fund comparison</span> specifically for first-time investors.</li>
                        </ul>
                        
                        <p className="mt-4">
                          <span className="font-medium text-green-800">Expected Impact:</span> <span className="font-semibold text-green-700">15-20% increase</span> in SIP conversions and recovery of <span className="font-semibold text-green-700">$17M AUM opportunity</span> within Q1.
                        </p>
                        
                        <div className="mt-4 flex justify-center">
                          <div className="text-xs flex items-center text-blue-700 animate-pulse">
                            <span>Analytics dashboard</span>
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <TypeAnimation
                        sequence={[
                          fullText,
                          () => {}
                        ]}
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
                placeholder="Ask about fund performance, competitor insights, or SIP strategies..."
                className="flex-grow border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={true}
              />
              <button
                disabled={true}
                className="ml-2 bg-blue-600/50 text-white p-2 rounded-lg opacity-50 cursor-not-allowed"
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
              className={`${isMobileLayout ? 'w-full h-1/2' : 'w-1/2'} border-l border-gray-200 relative flex flex-col ${isMobileLayout ? 'max-h-[50vh]' : 'h-full'} overflow-hidden`}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ 
                width: isMobileLayout ? '100%' : '50%',
                height: isMobileLayout ? '50%' : '100%',
                opacity: 1 
              }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            >
              {/* Dashboard header */}
              <div className="border-b border-gray-200 p-3 sm:p-4 bg-white/50 backdrop-blur-sm flex items-center mt-12">
                <div className="flex items-center">
                  <div className="text-xs font-medium text-gray-700">Hybrid Fund Competitive Analysis</div>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="bg-blue-100 px-2 py-1 rounded text-xs font-medium text-blue-600 flex items-center">
                    <span>LIVE</span>
                    <div className="ml-1 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Dashboard content */}
              <div 
                className={`p-3 sm:p-5 space-y-4 sm:space-y-6 flex-1 relative ${userScrollingEnabled ? 'overflow-y-auto' : 'overflow-hidden'}`}
                ref={dashboardContainerRef}
                style={{ 
                  scrollBehavior: 'smooth',
                  pointerEvents: userScrollingEnabled ? 'auto' : 'none',
                  maxHeight: '100%'
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
                  {/* Competitor Analysis section */}
                  {showSection.competitorAnalysis && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-blue-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 text-blue-700" />
                        </span>
                        Competitor Positioning Trends
                      </h3>
                      
                      <div className="h-40 sm:h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={competitorTrendsData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis dataKey="quarter" tick={{ fontSize: 8 }} />
                            <YAxis tick={{ fontSize: 8 }} domain={[60, 90]} tickFormatter={(value) => `${value}`} />
                            <Tooltip content={<CustomTooltip active={""} payload={""} label={""}/>} />
                            <Line 
                              type="monotone" 
                              dataKey="our" 
                              name="Our Platform"
                              stroke="#3B82F6" 
                              strokeWidth={2} 
                              dot={{ fill: '#3B82F6', r: 3 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="competitorB" 
                              name="Competitor B"
                              stroke="#10B981" 
                              strokeWidth={2} 
                              dot={{ fill: '#10B981', r: 3 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="competitorC" 
                              name="Competitor C"
                              stroke="#6366F1" 
                              strokeWidth={2} 
                              dot={{ fill: '#6366F1', r: 3 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs px-2 mt-2 space-y-1 sm:space-y-0">
                        <div className="font-medium text-gray-700 flex items-center">
                          <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                          <span className="text-red-600 mr-2">Market Share Drop</span>
                          <span>Q3-Q4 2024</span>
                        </div>
                        <div className="text-gray-500">Competitor B leads with SIP focus</div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Customer Engagement section */}
                  {showSection.customerEngagement && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-blue-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <TrendingDown className="h-2 w-2 sm:h-3 sm:w-3 text-red-700" />
                        </span>
                        SIP Performance & Engagement Metrics
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-2">Quarterly Performance Comparison</div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={sipPerformanceData}
                                layout="vertical"
                                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                                <XAxis type="number" domain={[-30, 45]} tickFormatter={(value) => `${value}%`} tick={{ fontSize: 8 }} />
                                <YAxis dataKey="metric" type="category" tick={{ fontSize: 8 }} width={100} />
                                <Tooltip content={<CustomTooltip active={''} payload={''} label={""} />} />
                                <Bar dataKey="our" name="Our Platform" fill="#EF4444" />
                                <Bar dataKey="competitorB" name="Competitor B" fill="#10B981" />
                                <Bar dataKey="competitorC" name="Competitor C" fill="#6366F1" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-2">SIP Conversions by Age Group</div>
                          <div className="h-36 sm:h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <ComposedChart
                                data={ageGroupData}
                                margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                <XAxis dataKey="age" tick={{ fontSize: 8 }} />
                                <YAxis tick={{ fontSize: 8 }} tickFormatter={(value) => `${value}%`} />
                                <Tooltip content={<CustomTooltip active={''} payload={''} label={""} />} />
                                <Bar dataKey="our" name="Our Platform" fill="#EF4444" />
                                <Bar dataKey="competitors" name="Competitors Avg" fill="#10B981" />
                              </ComposedChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 text-xs">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                          <span className="font-medium text-red-700">Critical:</span>
                          <span className="ml-1 text-gray-700">25-35 age gap leads to $27M AUM loss</span>
                        </div>
                        <div className="text-gray-500 text-right">Based on Q3-Q4 2024 data</div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Missed Opportunities section */}
                  {showSection.missedOpportunities && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-blue-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <Target className="h-2 w-2 sm:h-3 sm:w-3 text-orange-700" />
                        </span>
                        Content Performance & Missed Opportunities
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="text-xs font-medium text-gray-700 mb-2">Competitive Content Performance</div>
                        <div className="space-y-2">
                          {contentPerformanceData.map((item, index) => (
                            <div key={index}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-700">{item.type}</span>
                                  <span className="ml-2 text-xs text-gray-500">({item.topPerformer})</span>
                                </div>
                                <span className={`text-xs font-semibold ${item.engagement > 2 ? 'text-green-700' : 'text-red-700'}`}>
                                  {item.engagement}× engagement
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div 
                                  className="h-2 rounded-full"
                                  style={{ backgroundColor: item.fill }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(item.engagement / 4) * 100}%` }}
                                  transition={{ duration: 1.5, delay: 0.5 + (index * 0.2) }}
                                ></motion.div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="bg-orange-50 p-2 rounded">
                          <div className="text-xs font-medium text-orange-700 flex items-center">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
                            Missing Content Types
                          </div>
                          <ul className="text-xs text-gray-700 mt-1 space-y-0.5">
                            <li>• SIP calculators with visual projections</li>
                            <li>• Goal-based fund discovery tools</li>
                            <li>• Monthly investment challenges</li>
                          </ul>
                        </div>
                        <div className="bg-orange-50 p-2 rounded">
                          <div className="text-xs font-medium text-orange-700 flex items-center">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
                            Top Performing Examples
                          </div>
                          <ul className="text-xs text-gray-700 mt-1 space-y-0.5">
                            <li>• "Top hybrid funds under ₹5K/month"</li>
                            <li>• "SIP for career milestones" series</li>
                            <li>• Interactive risk-return calculators</li>
                          </ul>
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
                      className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-sm p-3 sm:p-4 border border-blue-100 relative overflow-hidden mb-2"
                    >
                      {/* {showConfetti && <ConfettiEffect />} */}
                      
                      <h3 className="text-xs sm:text-sm font-semibold text-blue-800 mb-3 flex items-center">
                        <span className="bg-blue-200 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <Lightbulb className="h-2 w-2 sm:h-3 sm:w-3 text-blue-800" />
                        </span>
                        Strategic Action Plan
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-blue-800 mb-1">SIP-First Landing Page Revolution</h4>
                          <p className="text-xs text-gray-700">Create dedicated landing pages for entry-level investors with SIP starting points under ₹5K/month, emphasizing simplicity and goal visualization.</p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-l-full"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-green-400 to-blue-400"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-r-full"></div>
                            <div className="ml-2 text-[10px] text-gray-500">Priority: Urgent</div>
                          </div>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-blue-800 mb-1">Goal-Based Fund Discovery Engine</h4>
                          <p className="text-xs text-gray-700">Develop an intelligent fund recommendation system that matches users with hybrid funds based on life goals (home purchase, retirement, child education).</p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-l-full"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-green-400 to-blue-400"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-r-full"></div>
                            <div className="ml-2 text-[10px] text-gray-500">Priority: High</div>
                          </div>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-blue-800 mb-1">Interactive SIP Impact Visualizer</h4>
                          <p className="text-xs text-gray-700">Build a dynamic calculator that shows real-time projections of wealth creation through hybrid fund SIPs, with milestone celebrations and achievement badges.</p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-l-full"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-green-400 to-blue-400"></div>
                            <div className="h-1 w-8 bg-gray-300 rounded-r-full"></div>
                            <div className="ml-2 text-[10px] text-gray-500">Priority: Medium</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-white/50 rounded-lg mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div>
                            <div className="text-xs font-semibold text-blue-800">Projected Impact</div>
                            <div className="mt-1 flex items-center">
                              <span className="text-lg sm:text-xl font-bold text-green-700">
                                <CountUp end={15} duration={3} />-<CountUp end={20} duration={4} />%
                              </span>
                              <span className="ml-2 text-xs text-green-600 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                SIP conversion increase
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-blue-800">AUM Recovery Potential</div>
                            <div className="text-sm font-medium text-green-700">$17M within Q1</div>
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
  background-color: #3B82F6;
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
  background: #bfdbfe;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #3b82f6;
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

const FinancialAnalyticsDemoWithStyles = () => (
  <>
    <style>{globalStyles}</style>
    <FinancialAnalyticsDemo />
  </>
);

export default FinancialAnalyticsDemoWithStyles;
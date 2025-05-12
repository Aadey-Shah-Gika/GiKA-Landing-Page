"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, PieChart, Pie } from 'recharts';
import { BarChart2, Send, ArrowRight, RefreshCcw, Maximize2, Minimize2 } from 'lucide-react';
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
  const colors = ['#8B5CF6', '#6366F1', '#3B82F6', '#EC4899', '#10B981', '#FBBF24'];
  
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

const TravelAnalysisDemo = () => {
  const [stage, setStage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [expandDashboard, setExpandDashboard] = useState(false);
  const [showSection, setShowSection] = useState({ pricing: false, occupancy: false, amenities: false, recommendations: false });
  const [showConfetti, setShowConfetti] = useState(false);
  const [userScrollingEnabled, setUserScrollingEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const dashboardContainerRef = useRef(null);
  
  // Check for mobile layout and scale
  useEffect(() => {
    const checkLayout = () => {
      const windowWidth = window.innerWidth;
      
      setIsMobileLayout(windowWidth < 768);
      
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
  
  // Scrolling functions
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

  // Auto-start animation
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // MutationObserver effects
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
  
  // Animation sequence
  const startAnimation = () => {
    setIsAnimating(true);
    setUserScrollingEnabled(false);
    
    setStage(1);
    setInputValue("How do our top competitors' pricing for luxury beach resorts compare to ours during peak season?");
    
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
    
    // Show sections
    setTimeout(() => {
      setShowSection(prev => ({ ...prev, pricing: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop = dashboardContainerRef.current.scrollHeight;
      }
    }, 2000);
    
    setTimeout(() => {
      setShowSection(prev => ({ ...prev, occupancy: true }));
      if (dashboardContainerRef.current) {
        dashboardContainerRef.current.scrollTop = dashboardContainerRef.current.scrollHeight;
      }
    }, 3500);
    
    setTimeout(() => {
      setShowSection(prev => ({ ...prev, amenities: true }));
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
  
  // Reset demo
  const resetDemo = () => {
    setUserScrollingEnabled(false);
    setIsAnimating(true);
    
    setStage(0);
    setInputValue("");
    setShowTyping(false);
    setShowResponse(false);
    setTypingComplete(false);
    setExpandDashboard(false);
    setShowSection({ pricing: false, occupancy: false, amenities: false, recommendations: false });
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
  const pricingData = [
    { name: 'Our Resort', price: 432, fill: '#8B5CF6' },
    { name: 'Comp A', price: 386, fill: '#6366F1' },
    { name: 'Comp B', price: 455, fill: '#3B82F6' },
    { name: 'Comp C', price: 362, fill: '#10B981' },
    { name: 'Comp D', price: 405, fill: '#14B8A6' }
  ];
  
  const occupancyData = [
    { name: 'Our Resort', value: 72, fill: '#8B5CF6' },
    { name: 'Empty', value: 28, fill: '#E5E7EB' }
  ];
  
  const competitorOccupancyData = [
    { name: 'Competitor A', value: 87, fill: '#6366F1' },
    { name: 'Empty', value: 13, fill: '#E5E7EB' }
  ];
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 text-xs border border-gray-200 shadow-sm rounded">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-gray-700">${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  // Full text for typing animation
  const fullText = `Based on our competitive analysis, during the upcoming peak season (Dec–Feb), our average nightly rate for luxury beach resorts is $432, which is 12% higher than the median of our top 5 competitors. 
  
Notably, Competitor A has increased prices by 18% YoY, while maintaining 87% occupancy. In contrast, our occupancy projection is 72%, indicating potential price sensitivity.
  
Competitors have bundled amenities (e.g., spa credits, airport transfers) in 60% of listings, whereas only 25% of our offerings include such bundles — contributing to their higher conversion rates.`;

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
            <div className="text-xs font-medium text-gray-700 hidden sm:block">GiKA Travel Insights</div>
            <div className="text-xs font-medium text-gray-700 sm:hidden">GiKA</div>
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
          className="flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50"
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
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800 text-sm sm:text-base">Chat Interface</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Powered by specialized small language models</p>
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
                  Today, 11:42 AM
                </div>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="text-sm text-center text-gray-600 max-w-[85%]">
                  Welcome to GiKA Travel Insights. Ask me about competitors, pricing strategy, or market trends for your luxury beach resorts.
                </div>
              </div>
              
              {/* User query */}
              {stage >= 1 && (
                <div className="flex justify-end mb-6">
                  <div className="bg-purple-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm max-w-[85%] text-xs sm:text-sm">
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
                        <p>
                          Based on our competitive analysis, during the upcoming peak season (Dec–Feb), our average nightly rate for luxury beach resorts is <span className="font-semibold text-purple-700">$432</span>, which is <span className="font-semibold text-purple-700">12% higher</span> than the median of our top 5 competitors.
                        </p>
                        
                        <p className="mt-4">
                          Notably, Competitor A has increased prices by <span className="font-semibold text-indigo-700">18% YoY</span>, while maintaining 87% occupancy. In contrast, our occupancy projection is <span className="font-semibold text-purple-700">72%</span>, indicating potential price sensitivity.
                        </p>
                        
                        <p className="mt-4">
                          Competitors have bundled amenities (e.g., spa credits, airport transfers) in 60% of listings, whereas only 25% of our offerings include such bundles — contributing to their higher conversion rates.
                        </p>
                        
                        <div className="mt-4 flex justify-center">
                          <div className="text-xs flex items-center text-purple-700 animate-pulse">
                            <span>Visual insights generated</span>
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
                placeholder="Ask a question about your luxury resort data..."
                className="flex-grow border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={true}
              />
              <button
                disabled={true}
                className="ml-2 bg-purple-600/50 text-white p-2 rounded-lg opacity-50 cursor-not-allowed"
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
                  <div className="text-xs font-medium text-gray-700">Competitive Analysis Dashboard</div>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="bg-purple-100 px-2 py-1 rounded text-xs font-medium text-purple-600 flex items-center">
                    <span>LIVE</span>
                    <div className="ml-1 w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse"></div>
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
                  {/* Pricing section */}
                  {showSection.pricing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-purple-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-purple-700">$</span>
                        </span>
                        Average Nightly Rate Comparison
                      </h3>
                      
                      <div className="h-40 sm:h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={pricingData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis dataKey="name" tick={{ fontSize: 8 }} />
                            <YAxis tick={{ fontSize: 8 }} domain={[0, 500]} />
                            <Tooltip content={<CustomTooltip active={''} payload={''} />} />
                            <ReferenceLine y={386} stroke="#6B7280" strokeDasharray="3 3" label={{ value: 'Median: $386', position: 'right', fontSize: 8, fill: '#6B7280' }} />
                            <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                              {pricingData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs px-2 space-y-1 sm:space-y-0">
                        <div className="font-medium text-gray-700 flex items-center">
                          <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mr-1"></span>
                          <span className="text-purple-600"><CountUp end={12} duration={4} />%</span> vs median
                        </div>
                        <div className="font-medium text-gray-700 flex items-center">
                          <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mr-1"></span>
                          <span className="text-indigo-600"><CountUp end={18} duration={4} />%</span> YoY (Comp A)
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Occupancy section */}
                  {showSection.occupancy && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-indigo-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-indigo-700">%</span>
                        </span>
                        Occupancy Rate Comparison
                      </h3>
                      
                      <div className="flex items-center justify-around h-32 sm:h-40">
                        <div className="flex flex-col items-center">
                          <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={occupancyData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={30}
                                  outerRadius={38}
                                  startAngle={90}
                                  endAngle={-270}
                                  paddingAngle={0}
                                  dataKey="value"
                                  labelLine={false}
                                >
                                  {occupancyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <CountUp 
                                end={72} 
                                duration={4}
                                suffix="%" 
                                className="text-lg sm:text-xl font-bold text-purple-700"
                              />
                            </div>
                          </div>
                          <span className="text-xs font-medium mt-1">Our Projected</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={competitorOccupancyData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={30}
                                  outerRadius={38}
                                  startAngle={90}
                                  endAngle={-270}
                                  paddingAngle={0}
                                  dataKey="value"
                                  labelLine={false}
                                >
                                  {competitorOccupancyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <CountUp 
                                end={87} 
                                duration={4}
                                suffix="%"
                                className="text-lg sm:text-xl font-bold text-indigo-700"
                              />
                            </div>
                          </div>
                          <span className="text-xs font-medium mt-1">Competitor A</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Amenities section */}
                  {showSection.amenities && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="bg-green-100 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-green-700">+</span>
                        </span>
                        Bundled Amenities Offerings
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700">Our Offerings</span>
                            <CountUp 
                              end={25} 
                              duration={4}
                              suffix="%" 
                              className="text-xs font-semibold text-purple-700"
                            />
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div 
                              className="bg-purple-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "25%" }}
                              transition={{ duration: 2, delay: 0.5 }}
                            ></motion.div>
                          </div>  
                          <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-1">
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">Spa Credits</span>
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">Airport Transfers</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700">Competitor Offerings</span>
                            <CountUp 
                              end={60} 
                              duration={4}
                              suffix="%" 
                              className="text-xs font-semibold text-indigo-700"
                            />
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div 
                              className="bg-indigo-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "60%" }}
                              transition={{ duration: 2, delay: 0.5 }}
                            ></motion.div>
                          </div>
                          <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-1">
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">Spa Credits</span>
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">Airport Transfers</span>
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">Exclusive Dining</span>
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">Early Check-in</span>
                          </div>
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
                      className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-sm p-3 sm:p-4 border border-purple-100 relative overflow-hidden"
                    >
                      {/* {showConfetti && <ConfettiEffect />} */}
                      
                      <h3 className="text-xs sm:text-sm font-semibold text-purple-800 mb-3 flex items-center">
                        <span className="bg-purple-200 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-purple-800">✓</span>
                        </span>
                        Strategic Recommendations
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-indigo-800 mb-1">A/B Test Bundled Offerings</h4>
                          <p className="text-xs text-gray-700">Test premium packages with spa credits and airport transfers to match competitor conversion rates.</p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-l-full"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-400 to-blue-400"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-r-full"></div>
                            <div className="ml-2 text-[10px] text-gray-500">Est. Impact: High</div>
                          </div>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-indigo-800 mb-1">Dynamic Rate Adjustments</h4>
                          <p className="text-xs text-gray-700">Implement destination-specific pricing clusters to optimize for both occupancy and revenue.</p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-l-full"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-400 to-blue-400"></div>
                            <div className="h-1 w-8 bg-gray-300 rounded-r-full"></div>
                            <div className="ml-2 text-[10px] text-gray-500">Est. Impact: Medium</div>
                          </div>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-semibold text-indigo-800 mb-1">Value Proposition Marketing</h4>
                          <p className="text-xs text-gray-700">Emphasize unique experiences and exclusivity to justify premium pricing where appropriate.</p>
                          <div className="mt-1.5 flex items-center">
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-l-full"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-400 to-blue-400"></div>
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-r-full"></div>
                            <div className="ml-2 text-[10px] text-gray-500">Est. Impact: High</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <button className="flex items-center bg-purple-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors"
                                onClick={() => window.open('/GiKA_Luxury_Resort_Analysis_Q2_2025.html', '_blank')}
                        >
                          <span>Extended Report</span>
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </button>
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
  background-color: #8B5CF6;
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
  background: #c4b5fd;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a78bfa;
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

const TravelAnalysisDemoWithStyles = () => (
  <>
    <style>{globalStyles}</style>
    <TravelAnalysisDemo />
  </>
);

export default TravelAnalysisDemoWithStyles;
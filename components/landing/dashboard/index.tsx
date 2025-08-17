"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  ComposedChart,
  TooltipProps,
} from "recharts";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Type definitions
interface CapabilityData {
  capability: string;
  description: string;
  value: number;
}

interface ImpactBreakdownData {
  name: string;
  value: number;
  percentage: number;
}

interface CategoryComparisonData {
  category: string;
  "Direct Savings": number;
  "Decision Enhancement": number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    color?: string;
    name?: string;
  }>;
  label?: string;
}

const GikaDashboard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Animation states for charts
  const [isPieChartVisible, setIsPieChartVisible] = useState(false);
  const [isSavingsChartVisible, setIsSavingsChartVisible] = useState(false);
  const [isUpliftChartVisible, setIsUpliftChartVisible] = useState(false);
  const [isCategoryComparisonVisible, setIsCategoryComparisonVisible] =
    useState(false);

  // Refs for animated sections
  const pieChartRef = useRef<HTMLDivElement>(null);
  const savingsChartRef = useRef<HTMLDivElement>(null);
  const upliftChartRef = useRef<HTMLDivElement>(null);
  const categoryComparisonRef = useRef<HTMLDivElement>(null);
  const keyPropositionRef = useRef<HTMLDivElement>(null);
  const keyPropositionItemsRef = useRef<HTMLDivElement[]>([]);

  // GSAP animation setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pie Chart Animation
      if (pieChartRef.current) {
        gsap.fromTo(
          pieChartRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pieChartRef.current,
              start: "top 80%",
              end: "bottom 20%",
              onEnter: () => setIsPieChartVisible(true),
              once: true,
            },
          }
        );
      }

      // Savings Chart Animation
      if (savingsChartRef.current) {
        gsap.fromTo(
          savingsChartRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: savingsChartRef.current,
              start: "top 80%",
              end: "bottom 20%",
              onEnter: () => setIsSavingsChartVisible(true),
              once: true,
            },
          }
        );
      }

      // Uplift Chart Animation
      if (upliftChartRef.current) {
        gsap.fromTo(
          upliftChartRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: upliftChartRef.current,
              start: "top 80%",
              end: "bottom 20%",
              onEnter: () => setIsUpliftChartVisible(true),
              once: true,
            },
          }
        );
      }

      // Category Comparison Chart Animation
      if (categoryComparisonRef.current) {
        gsap.fromTo(
          categoryComparisonRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: categoryComparisonRef.current,
              start: "top 80%",
              end: "bottom 20%",
              onEnter: () => setIsCategoryComparisonVisible(true),
              once: true,
            },
          }
        );
      }

      // Key Proposition Items Staggered Animation
      if (keyPropositionRef.current) {
        const items = keyPropositionItemsRef.current.filter(Boolean);

        gsap.set(items, { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: keyPropositionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out",
            });
          },
        });
      }
    });

    // Cleanup
    return () => ctx.revert();
  }, []);

  // Static data for $100M AUM
  const directSavingsData: CapabilityData[] = [
    {
      capability: "Consultancy cost and Market Research",
      description: "Replace expensive industry reports and consultants",
      value: 1250000, // $1M-$1.5M average
    },
    {
      capability: "Reporting Automation",
      description: "Automated portfolio monitoring & LP reporting",
      value: 750000, // $500K-$1M average
    },
    {
      capability: "Data Integration",
      description: "Automate data stream harmonization",
      value: 625000, // $500K-$750K average
    },
    {
      capability: "Analyst Reduction",
      description: "Free up analyst capacity through automation",
      value: 600000,
    },
  ];

  const decisionUpliftData: CapabilityData[] = [
    {
      capability: "Risk Protection",
      description: "Early warning signals for underperforming assets",
      value: 5000000,
    },
    {
      capability: "Strategic Insights",
      description: "Identify market shifts months before competitors",
      value: 2000000,
    },
    {
      capability: "Deal Visibility",
      description: "Improve target screening and avoid missed deals",
      value: 1200000, // Using $1.2M for $1M+
    },
    {
      capability: "Regulatory Alerts",
      description: "Proactive strategy adjustment for regulatory changes",
      value: 750000, // $500K-$1M average
    },
    {
      capability: "Competitor Analytics",
      description: "Identify market headwinds and competitor strategy",
      value: 450000, // $300K-$600K average
    },
  ];

  // Calculate totals
  const totalDirectSavings = directSavingsData.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const totalDecisionUplift = decisionUpliftData.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const totalImpact = totalDirectSavings + totalDecisionUplift;
  const roiPercentage = (totalImpact / 100000000) * 100; // Against $100M AUM

  // Helper function to format currency values
  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${value.toFixed(0)}`;
    }
  };

  // Data for impact breakdown pie chart
  const impactBreakdownData: ImpactBreakdownData[] = [
    {
      name: "Direct Savings",
      value: totalDirectSavings,
      percentage: Math.round((totalDirectSavings / totalImpact) * 100),
    },
    {
      name: "Decision Enhancement",
      value: totalDecisionUplift,
      percentage: Math.round((totalDecisionUplift / totalImpact) * 100),
    },
  ];

  // Data for category comparison
  const categoryComparisonData: CategoryComparisonData[] = [
    {
      category: "Investment Impact",
      "Direct Savings": totalDirectSavings,
      "Decision Enhancement": totalDecisionUplift,
    },
  ];

  // Custom tooltip for currency formatting
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-1.5 sm:p-2 shadow-md rounded border border-gray-200 text-[10px] sm:text-xs">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom active shape for pie charts - no central text
  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  // Colors for charts
  const IMPACT_COLORS = ["#10B981", "#3B82F6"];
  const SAVINGS_COLORS = ["#059669", "#10B981", "#34D399", "#6EE7B7"];
  const UPLIFT_COLORS = ["#1D4ED8", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="bg-white p-2 sm:p-3 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-sm sm:text-lg lg:text-xl font-extrabold text-gray-700">
            GiKA Investment Platform ROI Analysis
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Annual Impact per $100M AUM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
        {/* Key Metrics Section */}
        <div className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200 overflow-hidden relative flex flex-col justify-center transform transition-all duration-700 hover:scale-105">
            <div className="absolute w-1 sm:w-1.5 h-full bg-[#2E2680]/80 left-0 top-0"></div>
            <div className="ml-1.5 sm:ml-2">
              <p className="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider mb-0.5 sm:mb-1">
                Total Business Impact
              </p>
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="text-base sm:text-lg lg:text-2xl font-bold text-[#2E2680]/80">
                  {formatCurrency(totalImpact)}
                </span>
                <span className="text-[10px] sm:text-xs lg:text-sm sm:ml-1 font-semibold text-gray-700">
                  per year
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200 overflow-hidden relative flex flex-col justify-center transform transition-all duration-700 hover:scale-105">
            <div className="absolute w-1 sm:w-1.5 h-full bg-[#421F7E]/80 left-0 top-0"></div>
            <div className="ml-1.5 sm:ml-2">
              <p className="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider mb-0.5 sm:mb-1">
                Direct Savings
              </p>
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="text-base sm:text-lg lg:text-2xl font-bold text-[#421F7E]/80">
                  {formatCurrency(totalDirectSavings)}
                </span>
                <span className="text-[10px] sm:text-xs lg:text-sm sm:ml-1 font-semibold text-gray-700">
                  per year
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200 overflow-hidden relative flex flex-col justify-center transform transition-all duration-700 hover:scale-105">
            <div className="absolute w-1 sm:w-1.5 h-full bg-[#56197B]/80 left-0 top-0"></div>
            <div className="ml-1.5 sm:ml-2">
              <p className="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider mb-0.5 sm:mb-1">
                Decision Enhancement
              </p>
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="text-base sm:text-lg lg:text-2xl font-bold text-[#56197B]/80">
                  {formatCurrency(totalDecisionUplift)}
                </span>
                <span className="text-[10px] sm:text-xs lg:text-sm sm:ml-1 font-semibold text-gray-700">
                  per year
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200 overflow-hidden relative flex flex-col justify-center transform transition-all duration-700 hover:scale-105">
            <div className="absolute w-1 sm:w-1.5 h-full bg-[#671D78]/80 left-0 top-0"></div>
            <div className="ml-1.5 sm:ml-2">
              <p className="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider mb-0.5 sm:mb-1">
                Return on Investment
              </p>
              <div className="flex items-baseline">
                <span className="text-base sm:text-lg lg:text-2xl font-bold text-[#671D78]/80">
                  {roiPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Breakdown */}
        <div
          ref={pieChartRef}
          className="col-span-12 sm:col-span-6 lg:col-span-2 bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-xs sm:text-sm lg:text-md font-bold text-gray-700 mb-2 sm:mb-3">
            Impact Distribution
          </h2>
          <div className="h-32 sm:h-40 lg:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={impactBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  animationBegin={isPieChartVisible ? 0 : 100000}
                  animationDuration={2000}
                  isAnimationActive={isPieChartVisible}
                >
                  {impactBreakdownData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={IMPACT_COLORS[index % IMPACT_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 sm:mt-3 flex flex-col gap-2">
            {impactBreakdownData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        IMPACT_COLORS[index % IMPACT_COLORS.length],
                    }}
                  ></div>
                  <span className="text-[10px] sm:text-xs font-medium">
                    {item.name}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-gray-600">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Savings Breakdown */}
        <div
          ref={savingsChartRef}
          className="col-span-12 sm:col-span-6 lg:col-span-5 bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-xs sm:text-sm lg:text-md font-bold text-gray-700 mb-2 sm:mb-3">
            Direct Savings Breakdown
          </h2>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={directSavingsData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barGap={50}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  type="number"
                  tickFormatter={formatCurrency}
                  stroke="#888"
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  type="category"
                  dataKey="capability"
                  width={90}
                  tick={{ fontSize: 9, fontWeight: "500" }}
                  stroke="#000"
                  interval={0}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  radius={[0, 4, 4, 0]}
                  animationBegin={isSavingsChartVisible ? 0 : 100000}
                  animationDuration={2000}
                  isAnimationActive={isSavingsChartVisible}
                >
                  {directSavingsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={SAVINGS_COLORS[index % SAVINGS_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Decision Enhancement Breakdown */}
        <div
          ref={upliftChartRef}
          className="col-span-12 lg:col-span-5 bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-xs sm:text-sm lg:text-md font-bold text-gray-700 mb-2 sm:mb-3">
            Decision Enhancement Breakdown
          </h2>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={decisionUpliftData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                barGap={50}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  type="number"
                  tickFormatter={formatCurrency}
                  stroke="#888"
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  type="category"
                  dataKey="capability"
                  width={110}
                  tick={{ fontSize: 9, fontWeight: "500" }}
                  stroke="#000"
                  interval={0}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  radius={[0, 4, 4, 0]}
                  animationBegin={isUpliftChartVisible ? 0 : 100000}
                  animationDuration={2000}
                  isAnimationActive={isUpliftChartVisible}
                >
                  {decisionUpliftData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={UPLIFT_COLORS[index % UPLIFT_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Comparison */}
        <div
          ref={categoryComparisonRef}
          className="col-span-12 md:col-span-6 bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-xs sm:text-sm lg:text-md font-bold text-gray-700 mb-2 sm:mb-3">
            Impact Categories Comparison
          </h2>
          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryComparisonData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="category"
                  stroke="#000"
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  stroke="#000"
                  tick={{ fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "10px", marginTop: "5px" }}
                  iconType="circle"
                  iconSize={6}
                />
                <Bar
                  dataKey="Direct Savings"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  animationBegin={isCategoryComparisonVisible ? 0 : 100000}
                  animationDuration={1000}
                  isAnimationActive={isCategoryComparisonVisible}
                />
                <Bar
                  dataKey="Decision Enhancement"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  animationBegin={isCategoryComparisonVisible ? 500 : 100000}
                  animationDuration={1000}
                  isAnimationActive={isCategoryComparisonVisible}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Value Proposition */}
        <div
          ref={keyPropositionRef}
          className="col-span-12 md:col-span-6 p-2 sm:p-3 lg:p-4 rounded-xl overflow-hidden shadow-lg text-white relative"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 brightness-150 bg-gradient-to-r from-[#671D78] to-[#2E2680] z-0"></div>
          <h2 className="text-sm sm:text-base lg:text-xl font-bold mb-2 sm:mb-3 flex items-center relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Key Value Proposition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 relative z-10">
            <div
              ref={(el) => {
                if (el) keyPropositionItemsRef.current[0] = el;
              }}
              className="bg-white/20 bg-opacity-15 p-2 sm:p-2.5 lg:p-3 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center mb-1 sm:mb-1.5 lg:mb-2">
                <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded-full bg-purple-300 bg-opacity-30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm lg:text-lg font-semibold ml-1 sm:ml-1.5 lg:ml-2">
                  Strategic Foresight
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs lg:text-md leading-relaxed">
                Proactive Intelligence Across Compliance, Competition, and Market Shifts
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) keyPropositionItemsRef.current[1] = el;
              }}
              className="bg-white/20 bg-opacity-15 p-2 sm:p-2.5 lg:p-3 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center mb-1 sm:mb-1.5 lg:mb-2">
                <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded-full bg-purple-300 bg-opacity-30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm lg:text-lg font-semibold ml-1 sm:ml-1.5 lg:ml-2">
                  From chaos to clarity
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs lg:text-md leading-relaxed">
                The AI that sees the whole picture — before anyone else does.
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) keyPropositionItemsRef.current[2] = el;
              }}
              className="bg-white/20 bg-opacity-15 p-2 sm:p-2.5 lg:p-3 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center mb-1 sm:mb-1.5 lg:mb-2">
                <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded-full bg-purple-300 bg-opacity-30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm lg:text-lg font-semibold ml-1 sm:ml-1.5 lg:ml-2">
                  Strong ROI
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs lg:text-md leading-relaxed">
                GiKA pays for itself — and then multiplies your returns by 20×
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GikaDashboard;

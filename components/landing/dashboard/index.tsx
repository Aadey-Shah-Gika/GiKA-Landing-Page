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
  Line,
  ComposedChart,
  TooltipProps,
} from "recharts";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Type definitions
interface GMVData {
  gmv: string;
  gmvValue: number;
  directSavingsMin: number;
  directSavingsMax: number;
  gmvUpliftMin: number;
  gmvUpliftMax: number;
  totalMinROI: number;
  totalMaxROI: number;
}

interface CapabilityData {
  capability: string;
  description: string;
  min: number;
  max: number;
  average: number;
}

interface ImpactBreakdownData {
  name: string;
  value: number;
  percentage: number;
}

interface ScaledCapabilityData extends CapabilityData {
  scaledAverage: number;
}

interface TotalImpactData {
  gmv: string;
  "Direct Savings": number;
  "GMV Uplift": number;
  "Total Impact": number;
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
  const [selectedGMV, setSelectedGMV] = useState<string>("$100M");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Animation states for charts
  const [isPieChartVisible, setIsPieChartVisible] = useState(false);
  const [isSavingsChartVisible, setIsSavingsChartVisible] = useState(false);
  const [isUpliftChartVisible, setIsUpliftChartVisible] = useState(false);
  const [isTotalImpactChartVisible, setIsTotalImpactChartVisible] =
    useState(false);

  // Refs for animated sections
  const pieChartRef = useRef<HTMLDivElement>(null);
  const savingsChartRef = useRef<HTMLDivElement>(null);
  const upliftChartRef = useRef<HTMLDivElement>(null);
  const totalImpactChartRef = useRef<HTMLDivElement>(null);
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

      // Total Impact Chart Animation
      if (totalImpactChartRef.current) {
        gsap.fromTo(
          totalImpactChartRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: totalImpactChartRef.current,
              start: "top 80%",
              end: "bottom 20%",
              onEnter: () => setIsTotalImpactChartVisible(true),
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

  // GMV Data
  const gmvData: GMVData[] = [
    {
      gmv: "$10M",
      gmvValue: 10000000,
      directSavingsMin: 225000,
      directSavingsMax: 450000,
      gmvUpliftMin: 800000,
      gmvUpliftMax: 1450000,
      totalMinROI: 10.25,
      totalMaxROI: 19,
    },
    {
      gmv: "$50M",
      gmvValue: 50000000,
      directSavingsMin: 1125000,
      directSavingsMax: 2250000,
      gmvUpliftMin: 4000000,
      gmvUpliftMax: 7250000,
      totalMinROI: 10.25,
      totalMaxROI: 19,
    },
    {
      gmv: "$100M",
      gmvValue: 100000000,
      directSavingsMin: 2250000,
      directSavingsMax: 4500000,
      gmvUpliftMin: 8000000,
      gmvUpliftMax: 14500000,
      totalMinROI: 10.25,
      totalMaxROI: 19,
    },
    {
      gmv: "$250M",
      gmvValue: 250000000,
      directSavingsMin: 5625000,
      directSavingsMax: 11250000,
      gmvUpliftMin: 20000000,
      gmvUpliftMax: 36250000,
      totalMinROI: 10.25,
      totalMaxROI: 19,
    },
    {
      gmv: "$500M",
      gmvValue: 500000000,
      directSavingsMin: 11250000,
      directSavingsMax: 22500000,
      gmvUpliftMin: 40000000,
      gmvUpliftMax: 72500000,
      totalMinROI: 10.25,
      totalMaxROI: 19,
    },
  ];

  // Savings data
  const savingsData: CapabilityData[] = [
    {
      capability: "Return Reduction",
      description: "Better product attribution → fewer wrong orders",
      min: 75000,
      max: 150000,
      average: 112500,
    },
    {
      capability: "Operational Efficiency",
      description: "Less time spent on BI/reporting",
      min: 50000,
      max: 100000,
      average: 75000,
    },
    {
      capability: "Market Research Spend",
      description: "Replacing external research/consulting",
      min: 50000,
      max: 100000,
      average: 75000,
    },
    {
      capability: "Inventory Inefficiency",
      description: "Avoid overstocking wrong SKUs",
      min: 50000,
      max: 100000,
      average: 75000,
    },
  ];

  // Uplift data
  const upliftData: CapabilityData[] = [
    {
      capability: "Gap Discovery",
      description: "New SKUs & categories discovered",
      min: 300000,
      max: 500000,
      average: 400000,
    },
    {
      capability: "Conversion Lift",
      description: "Better PDPs, related SKUs, enriched data",
      min: 200000,
      max: 300000,
      average: 250000,
    },
    {
      capability: "Smarter Pricing",
      description: "Higher competitiveness, margin-sensitive pricing",
      min: 200000,
      max: 400000,
      average: 300000,
    },
    {
      capability: "Trend Anticipation",
      description: "First-mover advantage in fast-growing segments",
      min: 100000,
      max: 250000,
      average: 175000,
    },
  ];

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

  // Get selected GMV data
  const selectedGMVData = gmvData.find((item) => item.gmv === selectedGMV)!;

  // Data for impact breakdown pie chart
  const directSavingsAvg =
    (selectedGMVData.directSavingsMin + selectedGMVData.directSavingsMax) / 2;
  const upliftAvg =
    (selectedGMVData.gmvUpliftMin + selectedGMVData.gmvUpliftMax) / 2;
  const totalAvgValue = directSavingsAvg + upliftAvg;

  const impactBreakdownData: ImpactBreakdownData[] = [
    {
      name: "Direct Savings",
      value: directSavingsAvg,
      percentage: Math.round((directSavingsAvg / totalAvgValue) * 100),
    },
    {
      name: "GMV Uplift",
      value: upliftAvg,
      percentage: Math.round((upliftAvg / totalAvgValue) * 100),
    },
  ];

  // Scale factors for visualizing savings and uplift values
  const savingsMultiplier = selectedGMVData.gmvValue / 10000000; // Base scale from $10M
  const scaledSavingsData: ScaledCapabilityData[] = savingsData
    .map((item) => ({
      ...item,
      scaledAverage: item.average * savingsMultiplier,
    }))
    .sort((a, b) => b.scaledAverage - a.scaledAverage);

  const scaledUpliftData: ScaledCapabilityData[] = upliftData
    .map((item) => ({
      ...item,
      scaledAverage: item.average * savingsMultiplier,
    }))
    .sort((a, b) => b.scaledAverage - a.scaledAverage);

  // Data for the total impact by GMV chart
  const totalImpactByGMVData: TotalImpactData[] = gmvData.map((item) => {
    const minTotal = item.directSavingsMin + item.gmvUpliftMin;
    const maxTotal = item.directSavingsMax + item.gmvUpliftMax;
    return {
      gmv: item.gmv,
      "Direct Savings": (item.directSavingsMin + item.directSavingsMax) / 2,
      "GMV Uplift": (item.gmvUpliftMin + item.gmvUpliftMax) / 2,
      "Total Impact": (minTotal + maxTotal) / 2,
    };
  });

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

  // Custom active shape for pie charts
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
        <text
          x={cx}
          y={cy}
          dy={-4}
          textAnchor="middle"
          fill="#333"
          className="text-[10px] sm:text-xs"
        >
          {payload.name}
        </text>
        <text
          x={cx}
          y={cy}
          dy={15}
          textAnchor="middle"
          fill="#333"
          className="text-xs sm:text-sm font-medium"
        >
          {payload.percentage}%
        </text>
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
  const COLORS = [
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#3B82F6",
    "#EF4444",
  ];
  const IMPACT_COLORS = ["#10B981", "#3B82F6"];
  const SAVINGS_COLORS = ["#059669", "#10B981", "#34D399", "#6EE7B7"];
  const UPLIFT_COLORS = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header & Logo */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center bg-white p-0.5 sm:p-1 rounded-lg shadow-md border border-gray-200">
          <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-gray-700 mr-1 sm:mr-2 ml-1 sm:ml-2">
            GMV
          </span>
          <div className="flex flex-wrap sm:flex-nowrap">
            {gmvData.map((item) => (
              <button
                key={item.gmv}
                onClick={() => setSelectedGMV(item.gmv)}
                className={`px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs lg:text-sm rounded-md transition-all duration-200 mx-0.5 ${
                  selectedGMV === item.gmv
                    ? "bg-gradient-to-r from-[#671D78] to-[#2E2680] text-white font-medium shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {item.gmv}
              </button>
            ))}
          </div>
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
                  {formatCurrency(totalAvgValue)}
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
                  {formatCurrency(directSavingsAvg)}
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
                GMV Uplift
              </p>
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="text-base sm:text-lg lg:text-2xl font-bold text-[#56197B]/80">
                  {formatCurrency(upliftAvg)}
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
                  {(
                    (selectedGMVData.totalMinROI +
                      selectedGMVData.totalMaxROI) /
                    2
                  ).toFixed(1)}
                  %
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
                  innerRadius={40}
                  outerRadius={60}
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
          <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-1 sm:gap-2">
            {impactBreakdownData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                  style={{
                    backgroundColor:
                      IMPACT_COLORS[index % IMPACT_COLORS.length],
                  }}
                ></div>
                <span className="ml-1 text-[10px] sm:text-xs font-medium">
                  {item.name}
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
                data={scaledSavingsData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
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
                  width={80}
                  tick={{ fontSize: 11, fontWeight: "500" }}
                  stroke="#000"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="scaledAverage"
                  radius={[0, 4, 4, 0]}
                  animationBegin={isSavingsChartVisible ? 0 : 100000}
                  animationDuration={2000}
                  isAnimationActive={isSavingsChartVisible}
                >
                  {scaledSavingsData.map((entry, index) => (
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

        {/* GMV Uplift Breakdown */}
        <div
          ref={upliftChartRef}
          className="col-span-12 lg:col-span-5 bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-xs sm:text-sm lg:text-md font-bold text-gray-700 mb-2 sm:mb-3">
            GMV Uplift Breakdown
          </h2>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={scaledUpliftData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
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
                  width={80}
                  tick={{ fontSize: 11, fontWeight: "500" }}
                  stroke="#000"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="scaledAverage"
                  radius={[0, 4, 4, 0]}
                  animationBegin={isUpliftChartVisible ? 0 : 100000}
                  animationDuration={2000}
                  isAnimationActive={isUpliftChartVisible}
                >
                  {scaledUpliftData.map((entry, index) => (
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

        {/* Total Impact by GMV */}
        <div
          ref={totalImpactChartRef}
          className="col-span-12 md:col-span-6 bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-xs sm:text-sm lg:text-md font-bold text-gray-700 mb-2 sm:mb-3">
            Total Impact by GMV
          </h2>
          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={totalImpactByGMVData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="gmv" stroke="#000" tick={{ fontSize: 10 }} />
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
                  stackId="a"
                  radius={[4, 4, 0, 0]}
                  animationBegin={isTotalImpactChartVisible ? 0 : 100000}
                  animationDuration={1000}
                  isAnimationActive={isTotalImpactChartVisible}
                />
                <Bar
                  dataKey="GMV Uplift"
                  fill="#3B82F6"
                  stackId="a"
                  radius={[4, 4, 0, 0]}
                  animationBegin={isTotalImpactChartVisible ? 1000 : 100000}
                  animationDuration={1000}
                  isAnimationActive={isTotalImpactChartVisible}
                />
                <Line
                  type="monotone"
                  dataKey="Total Impact"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{
                    stroke: "#8B5CF6",
                    strokeWidth: 2,
                    r: 3,
                    fill: "white",
                  }}
                  activeDot={{
                    stroke: "#8B5CF6",
                    strokeWidth: 2,
                    r: 5,
                    fill: "white",
                  }}
                  animationBegin={isTotalImpactChartVisible ? 0 : 100000}
                  animationDuration={2000}
                  isAnimationActive={isTotalImpactChartVisible}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Value Proposition - Made Fully Responsive */}
        <div
          ref={keyPropositionRef}
          className="col-span-12 md:col-span-6 p-2 sm:p-3 lg:p-4 rounded-xl overflow-hidden shadow-lg text-white relative"
        >
          {/* Gradient background replacing the image */}
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
                  Consistent ROI
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs lg:text-md leading-relaxed">
                10-19% ROI across all GMV ranges
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
                  3.7x Multiplier
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs lg:text-md leading-relaxed">
                $1 in savings = $3.7 in GMV uplift
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm lg:text-lg font-semibold ml-1 sm:ml-1.5 lg:ml-2">
                  Full Scalability
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs lg:text-md leading-relaxed">
                Benefits scale linearly with GMV
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GikaDashboard;

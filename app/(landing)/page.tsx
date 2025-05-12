"use client";

import Image from "next/image";
import React, { useState, useEffect, ReactNode, useRef } from "react";
import {
  ChevronRight,
  Database,
  Network,
  Eye,
  Code,
  BarChart2,
  ArrowRight,
  Zap,
  Check,
  ArrowLeft,
  Target,
  Brain,
  Search,
  Coins,
  TrendingUp,
  Puzzle,
  Microscope,
  Shield,
  BarChart3,
  Rocket,
  Globe,
  Dot
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./logo.png";
import GrainyFilm from "./grany-film.png";
import GraphImage from "./graph.png";
import TravelAnalysisDemo from "@/components/landing/demo_panels/travel";
import EducationAnalysisDemoWithStyles from "@/components/landing/demo_panels/education";
import FinancialAnalyticsDemoWithStyles from "@/components/landing/demo_panels/finance";
import EcommerceExecutiveDemoWithStyles from "@/components/landing/demo_panels/retail";
import GikaDashboard from "@/components/landing/dashboard";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// Types
// ==========================================

type ThemeColorSet = {
  from: string;
  to: string;
};

type ThemeColors = {
  primary: ThemeColorSet;
  text: {
    primary: string;
    secondary: string;
    light: string;
  };
  background: {
    light: string;
    default: string;
    dark: string;
  };
};

type ThemeConfig = {
  colors: ThemeColors;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
};

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

type TabButtonProps = ButtonProps & {
  isActive: boolean;
};

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

type TwoColumnLayoutProps = {
  leftContent: ReactNode;
  rightContent: ReactNode;
  reverseOnMobile?: boolean;
};

interface Point {
  icon: string;
  text: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  frontPoints: Point[];
  backTitle: string;
  backDescription: string;
  backPoints: Point[];
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
  light?: boolean;
};

type FeatureListItemProps = {
  text: string;
  color?: string;
};

type TechFeatureCardProps = {
  title: string;
  description: string;
  featureType: "blue" | "purple";
};

type BadgeProps = {
  children: ReactNode;
  color?: string;
};

type CategoryPillProps = {
  children: ReactNode;
  color?: string;
};

type FadeInAnimationProps = {
  children: ReactNode;
  delay?: string;
};

type NavigationLinkProps = {
  href: string;
  children: ReactNode;
};

type NavLink = {
  href: string;
  label: string;
};

type Feature = {
  title: string;
  backTitle: string;
  description: string;
  backDescription: string;
  frontPoints: Point[];
  backPoints: Point[];
};

type TechFeature = {
  title: string;
  description: string;
};

type UseCaseFeature = string;

type UseCaseHeaderProps = {
  icon: ReactNode;
  title: string;
  color?: string;
};

type UseCaseFeaturesProps = {
  features: UseCaseFeature[];
  color?: string;
};

type UseCaseActionProps = {
  text: string;
  color?: string;
};

type TabItem = {
  id: string;
  label: string;
};

type TabNavigationProps = {
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabs: TabItem[];
};

type TestimonialCardProps = {
  name: string;
  title: string;
  text: string;
  delay: string;
};

type Testimonial = {
  name: string;
  title: string;
  text: string;
  delay: string;
};

type FooterLink = {
  href: string;
  label: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type NavigationProps = {
  isScrolled: boolean;
};

// ==========================================
// Design System & UI Components
// ==========================================

// Theme constants
const THEME: ThemeConfig = {
  colors: {
    primary: {
      from: "#671D78",
      to: "#2E2680",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
      light: "#FFFFFF",
    },
    background: {
      light: "#FFFFFF",
      default: "#F3F4F6",
      dark: "#111827",
    },
  },
  borderRadius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
  },
};

// Button Components
const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden bg-gradient-to-r from-[${THEME.colors.primary.from}] to-[${THEME.colors.primary.to}] 
        text-white px-6 py-3 rounded-lg hover:rounded-[2rem] font-[350] 
        flex items-center justify-center hover:shadow-lg transition-all duration-300 group ${className}`}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <div
        className={`absolute inset-0 bg-gradient-to-l from-[${THEME.colors.primary.from}] to-[${THEME.colors.primary.to}] 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
    </button>
  );
};

const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-white/80 px-6 py-3 ${THEME.borderRadius.sm} font-medium 
        hover:bg-white/10 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

const WhiteButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-white bg-white text-black px-6 py-3 ${THEME.borderRadius.sm} 
        font-medium transition-all duration-300 transform hover:opacity-[0.93] ${className}`}
    >
      {children}
    </button>
  );
};

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 mx-2 mb-2 ${
        THEME.borderRadius.sm
      } font-[350] transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r from-[${THEME.colors.primary.from}] to-[${THEME.colors.primary.to}] text-white shadow-md`
          : "bg-white text-gray-700 hover:shadow-md"
      }`}
    >
      {children}
    </button>
  );
};

// Layout Components
const Section: React.FC<SectionProps> = ({ id, className = "", children }) => {
  return (
    <section id={id} className={`py-24 md:w-[90vw] md:mx-auto ${className}`}>
      <div className="container mx-auto px-6">{children}</div>
    </section>
  );
};

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftContent,
  rightContent,
  reverseOnMobile = false,
}) => {
  const mobileOrderClass = reverseOnMobile ? "order-last lg:order-first" : "";

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className={`lg:w-1/2 ${mobileOrderClass}`}>{leftContent}</div>
      <div className="lg:w-1/2">{rightContent}</div>
    </div>
  );
};

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Dot,
  Target,
  Brain,
  Search,
  Coins,
  TrendingUp,
  Puzzle,
  Microscope,
  Shield,
  BarChart3,
  Rocket,
  Globe,
  Eye,
  Zap,
};

// Card Components
const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  frontPoints,
  backTitle,
  backDescription,
  backPoints,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const renderIcon = (iconName: string, isError: boolean = false) => {
    const Icon = iconMap[iconName];
    if (!Icon) return null;
    return <Icon className={`w-5 h-5 flex-shrink-0 ${isError ? 'text-gray-400' : 'text-green-400'}`} />;
  };

  return (
    <div
      className="relative w-full h-[500px] md:h-[450px]"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-700`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Card */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full bg-black/30 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col">
            {/* Front Card Content */}
            <div className="flex-1 overflow-y-auto">
              <h3 className="text-xl md:text-2xl text-gray-100 font-semibold mb-2">
                {title}
              </h3>
              <div className="w-16 h-1 mb-4"></div>
              <p className="text-gray-300 text-sm md:text-base mb-4">
                {description}
              </p>
              <ul className="space-y-3">
                {frontPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {renderIcon(point.icon, true)}
                    <span className="text-gray-200 text-sm">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Front Card Button */}
            <div className="flex justify-end mt-4 pt-4 border-t border-white/40">
              <button
                onClick={handleFlip}
                className="flex items-center gap-2 text-purple-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                Our Solutions
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Back Card */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full bg-black/70 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col">
            {/* Back Card Content */}
            <div className="flex-1 overflow-y-auto">
              <h3 className="text-xl md:text-2xl text-gray-200 font-semibold mb-2">
                {backTitle}
              </h3>
              <div className="w-16 h-1 mb-4"></div>
              <p className="text-gray-300 text-sm md:text-base mb-4">
                {backDescription}
              </p>
              <ul className="space-y-3">
                {backPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {renderIcon(point.icon, false)}
                    <span className="text-gray-200 text-sm">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Back Card Button */}
            <div className="flex justify-end mt-4 pt-4 border-t border-purple-700">
              <button
                onClick={handleFlip}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Typography Components
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = "",
  centered = true,
  light = false,
}) => {
  const alignment = centered ? "text-center" : "text-left";
  const textColor = light ? "text-white" : "text-black";
  const subtitleColor = light ? "text-gray-100" : "text-gray-600";

  return (
    <div className={`mb-16 animate-slide-up ${alignment} ${className}`}>
      <h2 className={`text-5xl font-[350] mb-4 ${textColor}`}>{title}</h2>
      {subtitle && (
        <p
          className={`text-xl font-[350] ${subtitleColor} max-w-2xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

// Tech Feature Card Component
const TechFeatureCard: React.FC<TechFeatureCardProps> = ({
  title,
  description,
  featureType,
}) => {
  const isBlue = featureType === "blue";
  const bgColor = isBlue ? "bg-blue-100" : "bg-purple-100";
  const textColor = isBlue ? "text-blue-600" : "text-purple-600";

  return (
    <div className="flex gap-4">
      <div>
        <div className={`mt-1 ${bgColor} p-2 rounded-full shrink-0`}>
          <Check className={`h-4 w-4 ${textColor}`} />
        </div>
      </div>
      <div>
        <span className="block font-medium text-lg mb-1">{title}</span>
        <span className="text-gray-600">{description}</span>
      </div>
    </div>
  );
};

// Badge Component
const Badge: React.FC<BadgeProps> = ({ children, color = "purple" }) => {
  return (
    <div
      className={`inline-block px-4 py-2 rounded-full bg-${color}-100 text-${color}-600 mb-6 text-sm font-medium`}
    >
      {children}
    </div>
  );
};

// Category Pill Component
const CategoryPill: React.FC<CategoryPillProps> = ({
  children,
  color = "purple",
}) => {
  return (
    <span
      className={`px-2 py-1 bg-${color}-100 text-${color}-800 text-xs rounded`}
    >
      {children}
    </span>
  );
};

// Animation Wrapper
const FadeInAnimation: React.FC<FadeInAnimationProps> = ({
  children,
  delay = "0s",
}) => {
  return (
    <div className="animate-fade-in" style={{ animationDelay: delay }}>
      {children}
    </div>
  );
};

// ==========================================
// Navigation Component
// ==========================================

const NavigationLink: React.FC<NavigationLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="hover:text-[#671D78] font-[450] transition-colors duration-300"
    >
      {children}
    </a>
  );
};

const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
  const navLinks: NavLink[] = [
    { href: "#why-gikagraph", label: "Home" },
    { href: "#technology", label: "Technology" },
    { href: "#use-cases", label: "Resources" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="w-full z-50 transition-all duration-500 bg-transparent py-8">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <Image
            src={Logo}
            alt="logo"
            className="h-8 w-10 text-purple-600 mr-2 animate-pulse-slow"
          />
          <span className="text-xl font-bold text-black">GiKA AI</span>
        </div>

        <div className="hidden text-[1rem] font-[450] tracking-wide md:flex space-x-10">
          {navLinks.map((link, index) => (
            <NavigationLink key={index} href={link.href}>
              {link.label}
            </NavigationLink>
          ))}
        </div>

        <div>
          <PrimaryButton
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            Book Demo
          </PrimaryButton>
        </div>
      </div>
    </nav>
  );
};

// ==========================================
// Hero Section Component
// ==========================================

const HeroSection: React.FC = () => {
  return (
    <Section className="text-black py-8 md:py-0 md:h-[75vh] flex flex-col justify-center">
      <div className="md:h-full mb-8 md:mb-16 animate-slide-up flex flex-col justify-center items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-center font-[400] leading-tight mb-4 md:mb-6 font-montserrat px-4">
          AI That Truly Understands Your Data
        </h1>
        <p className="text-base sm:text-lg text-center text-black font-[350] mb-6 md:mb-8 max-w-[90%] sm:max-w-[85%] md:max-w-[80%] px-4">
          Transform fragmented data into grounded, actionable insights with our
          specialized AI platform built on small language models.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 px-4">
          <PrimaryButton
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            Explore Platform
            <ChevronRight className="ml-1 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2" />
          </PrimaryButton>
        </div>
      </div>

      {/* <div className="relative animate-fade-in rounded-lg overflow-hidden shadow-lg">
          <Image src={Dashboard} alt="dashboard" />
          </div> */}
    </Section>
  );
};
// ==========================================
// Problem Solution Section Component
// ==========================================

const ProblemSolutionSection: React.FC = () => {
  const features: Feature[] = [
    {
      title: "LLMs Aren't Enough",
      description:
        "Off-the-shelf LLMs lack the depth, precision, and adaptability required for real business impact.",
      frontPoints: [
        { icon: "Dot", text: "Missing Business Context" },
        { icon: "Dot", text: "High Hallucination Risk" },
        { icon: "Dot", text: "Generic, Cookie-cutter output" },
        { icon: "Dot", text: "High Operational Costs" },
      ],
      backTitle: "With GiKA, You Get Purpose-Built Intelligence:",
      backDescription: "",
      backPoints: [
        {
          icon: "Target",
          text: "Business-Aware Agents trained on your enterprise data",
        },
        {
          icon: "Brain",
          text: "Precision Answers, powered by enriched knowledge graphs",
        },
        { icon: "Search", text: "Deeper Insight Discovery" },
        { icon: "Coins", text: "Up to 90% Lower LLM Cost" },
        {
          icon: "TrendingUp",
          text: "Not just answers, but strategic recommendations",
        },
      ],
    },
    {
      title: "Own Your Data",
      description: "Businesses suffer due to:",
      frontPoints: [
        { icon: "Dot", text: "Low-Quality, Incomplete Data" },
        {
          icon: "Dot",
          text: "Missing attributes resulting in ineffective search",
        },
        { icon: "Dot", text: "No Data Ownership" },
      ],
      backTitle: "With GiKA, You empower your business with:",
      backDescription: "",
      backPoints: [
        { icon: "Puzzle", text: "High-Fidelity Data Enrichment" },
        {
          icon: "Microscope",
          text: "Smarter Discovery – Powers long-tail, complex queries",
        },
        { icon: "Shield", text: "Data Ownership & Transparency" },
        {
          icon: "BarChart3",
          text: "Uplift – Up to 30% increase in discovery-led conversions",
        },
        {
          icon: "Rocket",
          text: "Faster Decisions - insight-rich data foundation",
        },
      ],
    },
    {
      title: "All Data, One Brain",
      description: "Enterprises struggle because:",
      frontPoints: [
        { icon: "Dot", text: "Information is fragmented and scattered" },
        {
          icon: "Dot",
          text: "No Unified View – impacts strategic decisions quality",
        },
        {
          icon: "Dot",
          text: "Missing External Context – Competitor moves and market shifts",
        },
      ],
      backTitle: "With GiKA, Connect the Dots",
      backDescription: "",
      backPoints: [
        {
          icon: "Globe",
          text: "Unified Knowledge Graph – Internal + external + world knowledge",
        },
        { icon: "Eye", text: "360° Business Visibility" },
        { icon: "Brain", text: "Context-Aware Intelligence" },
        { icon: "Zap", text: "Faster, Informed Action, Ask, Explore, Act" },
      ],
    },
  ];

  return (
    <div className="relative w-[90vw] mx-auto rounded-2xl overflow-hidden">
      {/* Gradient background replacing the image */}
      <div className="absolute inset-0 brightness-150 bg-gradient-to-r from-[#671D78] to-[#2E2680] z-0"></div>

      {/* Grainy film effect overlay */}
      <Image
        src={GrainyFilm}
        alt="grainy film"
        className="w-full h-full object-cover absolute z-0 opacity-10"
      />

      <section
        id="why-gikagraph"
        className="py-20 rounded-xl md:w-[90vw] md:mx-auto relative text-white"
      >
        <div className="container mx-auto px-6 z-10 relative">
          <SectionHeader
            title="Purpose-Driven AI, Tailored for You"
            subtitle="Engineered for enterprise-scale performance, our platform addresses critical AI limitations and unifies fragmented data into actionable, domain-specific intelligence."
            light={true}
          />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                frontPoints={feature.frontPoints}
                backTitle={feature.backTitle}
                backDescription={feature.backDescription}
                backPoints={feature.backPoints}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// Technology Section Components
// ==========================================

// SLM Visualization Component
const SLMVisualization: React.FC = () => {
  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="backdrop-blur-lg rounded-xl h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] min-h-[200px] shadow-lg overflow-hidden bg-gray-600 pb-3">
        <div className="flex flex-col h-full">
          <div className="w-full grow flex rounded-lg overflow-hidden mb-3">
            <div className="w-1/3 bg-blue-500 flex flex-col items-center justify-center">
              <div className="text-white/60 mb-1 sm:mb-2">
                <Database className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white mb-0.5 sm:mb-1 text-center">
                Input Layer
              </div>
              <div className="text-[10px] sm:text-xs text-white/70 text-center">
                Entity Processing
              </div>
            </div>
            <div className="w-1/3 bg-purple-500 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="text-white/60 mb-1 sm:mb-2">
                <Network className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white mb-0.5 sm:mb-1 text-center">
                Knowledge Graph
              </div>
              <div className="text-[10px] sm:text-xs text-white/70 text-center">
                Relationship Mapping
              </div>
            </div>
            <div className="w-1/3 bg-indigo-500 flex flex-col items-center justify-center">
              <div className="text-white/60 mb-1 sm:mb-2">
                <Code className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white mb-0.5 sm:mb-1 text-center">
                Output Layer
              </div>
              <div className="text-[10px] sm:text-xs text-white/70 text-center">
                Insight Generation
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="text-[10px] sm:text-xs md:text-sm text-center text-white/70 px-2">
              Specialized small language models trained on domain-specific data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Entity Graph Visualization Component
const EntityGraphVisualization: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Image src={GraphImage} alt="graph-image" />
    </div>
  );
};

// SLM Technology Section Component
const SLMTechnologySection: React.FC = () => {
  const features: TechFeature[] = [
    {
      title: "Vertical-Specific Training",
      description:
        "Models tailored for healthcare, finance, e-commerce and more",
    },
    {
      title: "Entity Recognition",
      description:
        "Precise identification of products, suppliers, regulations, and more",
    },
    {
      title: "Low Resource Requirements",
      description:
        "10x more efficient than general-purpose LLMs with higher accuracy",
    },
  ];

  return (
    <div className="rounded-2xl p-8 bg-white shadow-sm">
      <TwoColumnLayout
        leftContent={
          <div>
            <Badge color="blue">Entity-Aware SLMs</Badge>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Our small language models are fine-tuned for specific verticals to
              understand domain-specific entities with unprecedented precision.
            </p>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <TechFeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  featureType="blue"
                />
              ))}
            </div>
          </div>
        }
        rightContent={<SLMVisualization />}
      />
    </div>
  );
};

// Entity Graph Section Component
const EntityGraphSection: React.FC = () => {
  const features: TechFeature[] = [
    {
      title: "Comprehensive Relationship Mapping",
      description:
        "Connect products, customers, suppliers, inventory, and more in a unified view",
    },
    {
      title: "Self-Updating Intelligence",
      description:
        "Continuously incorporates new data and evolves relationships automatically",
    },
    {
      title: "Cross-Source Integration",
      description:
        "Unifies internal systems with external data sources for complete context",
    },
  ];

  return (
    <div className="rounded-2xl p-8 bg-white shadow-sm">
      <TwoColumnLayout
        leftContent={<EntityGraphVisualization />}
        rightContent={
          <div>
            <Badge color="purple">Dynamic Entity Graphs</Badge>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Our platform maps relationships between data points across your
              entire information ecosystem, enabling context-rich answers.
            </p>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <TechFeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  featureType="purple"
                />
              ))}
            </div>
          </div>
        }
        reverseOnMobile={true}
      />
    </div>
  );
};

// Technology Section Component
const TechnologySection: React.FC = () => {
  return (
    <Section id="technology" className="text-black">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Advanced Engineering for Unrivaled Intelligence"
          subtitle="GikaGraph combines specialized small language models with dynamic entity graphs to create a powerful data layer."
        />

        <div className="grid grid-cols-1 gap-24">
          <SLMTechnologySection />
          <EntityGraphSection />
        </div>
      </div>
    </Section>
  );
};

// ==========================================
// Use Case Section Components
// ==========================================

// Reusable Components for Use Case Panels
const UseCaseHeader: React.FC<UseCaseHeaderProps> = ({
  icon,
  title,
  color = "purple",
}) => {
  return (
    <>
      <div className={`bg-white inline-block rounded-full p-3 mb-4 shadow-md`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
    </>
  );
};

const UseCaseFeatures: React.FC<UseCaseFeaturesProps> = ({
  features,
  color = "purple",
}) => {
  return (
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className={`h-4 w-4 text-${color}-600 mr-2`} />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  );
};

const UseCaseAction: React.FC<UseCaseActionProps> = ({
  text,
  color = "purple",
}) => {
  return (
    <button
      className={`flex items-center text-sm font-medium text-${color}-600 hover:text-${color}-700 transition-colors`}
    >
      {text}
      <ArrowRight className="ml-1 h-4 w-4" />
    </button>
  );
};

// Example Panel Component
const EcommercePanel: React.FC = () => {
  const features: UseCaseFeature[] = [
    "Match customers with perfect product combinations",
    "Understand context behind complex search terms",
    "Dramatically improve conversion rates for edge cases",
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
        <UseCaseHeader
          icon={<BarChart2 className="h-6 w-6 text-purple-600" />}
          title="Precision Product Discovery"
        />
        <p className="text-gray-600 mb-4">
          Resolve complex, long-tail queries with 99% precision, connecting
          customers to exactly what they need.
        </p>
        <UseCaseFeatures features={features} />
        <UseCaseAction text="Explore E-commerce Solutions" />
      </div>
      <div className="md:w-1/2 p-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <Database className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-lg font-medium">Example Query</div>
          </div>
          <div className="mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-gray-800 mb-4">
              "vegan skincare in Mumbai under $10 with recyclable packaging"
            </div>
            <div className="text-sm text-gray-500">
              GikaGraph finds products matching all criteria with 99% precision
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">Aaranya Natural's Aloe Gel</div>
                <div className="text-sm text-purple-600">₹599 ($7.20)</div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <div className="flex text-yellow-400 mr-1">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                124 reviews
              </div>
              <div className="flex space-x-2">
                <CategoryPill>Vegan</CategoryPill>
                <CategoryPill color="indigo">Recyclable</CategoryPill>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 opacity-70 hover:opacity-100 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">Earth Rhythm Face Wash</div>
                <div className="text-sm text-purple-600">₹650 ($7.80)</div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <div className="flex text-yellow-400 mr-1">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>☆</span>
                </div>
                96 reviews
              </div>
              <div className="flex space-x-2">
                <CategoryPill>Vegan</CategoryPill>
                <CategoryPill color="indigo">Recyclable</CategoryPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TravelPanel Component
const TravelPanel: React.FC = () => {
  const features: UseCaseFeature[] = [
    "Identify patterns across cases for rare disease diagnosis",
    "Connect symptoms to latest research findings",
    "Provide evidence-based treatment recommendations",
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
        <UseCaseHeader
          icon={<BarChart2 className="h-6 w-6 text-indigo-600" />}
          title="Advanced Diagnostic Support"
          color="indigo"
        />
        <p className="text-gray-600 mb-4">
          Diagnose rare conditions by connecting patient records with
          comprehensive medical knowledge graphs.
        </p>
        <UseCaseFeatures features={features} />
        <UseCaseAction text="Explore Healthcare Solutions" color="indigo" />
      </div>
      <div className="md:w-1/2 p-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <Database className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="text-lg font-medium">Patient Case Analysis</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium">Symptom Pattern Analysis</div>
              <div className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded">
                92% Confidence
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-start">
                <Check className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Burning pain in extremities with pronounced heat sensitivity
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Symptoms worse during warmth and exercise, improves with
                  cooling
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Normal nerve conduction studies despite persistent pain
                </span>
              </div>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="text-sm font-medium mb-1">
                Diagnosis: Erythromelalgia
              </p>
              <p className="text-xs text-gray-600">
                A rare vascular peripheral pain disorder often misdiagnosed as
                inflammatory conditions.
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            GikaGraph analyzed 3,724 similar cases and identified key diagnostic
            patterns that standard protocols missed.
          </div>
        </div>
      </div>
    </div>
  );
};

// FinancePanel Component
const FinancePanel: React.FC = () => {
  const features: UseCaseFeature[] = [
    "Identify stocks affected by regulatory decisions",
    "Predict market movements from complex event triggers",
    "Monitor supply chain impacts on financial performance",
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-br from-violet-50 to-purple-50 p-8">
        <UseCaseHeader
          icon={<BarChart2 className="h-6 w-6 text-violet-600" />}
          title="Real-time Market Intelligence"
          color="violet"
        />
        <p className="text-gray-600 mb-4">
          Track market changes and regulatory impacts on investments with
          interconnected financial data.
        </p>
        <UseCaseFeatures features={features} color="violet" />
        <UseCaseAction text="Explore Finance Solutions" color="violet" />
      </div>
      <div className="md:w-1/2 p-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center mr-3">
              <Database className="h-4 w-4 text-violet-600" />
            </div>
            <div className="text-lg font-medium">
              Regulatory Impact Analysis
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 hover:shadow-md transition-all duration-300">
            <div className="font-medium mb-3">
              FDA Approval Delays: Impacted Stocks
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="font-medium">AstraZeneca (AZN)</span>
                </div>
                <span className="text-red-600">-2.4%</span>
              </div>

              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="font-medium">Novartis (NVS)</span>
                </div>
                <span className="text-red-600">-1.7%</span>
              </div>

              <div className="flex justify-between items-center p-2 bg-amber-50 rounded">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span className="font-medium">
                    Bristol Myers Squibb (BMY)
                  </span>
                </div>
                <span className="text-amber-600">-0.8%</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            GikaGraph detected the pattern 36 hours before major market
            movements by connecting FDA documents with company pipeline data.
          </div>
        </div>
      </div>
    </div>
  );
};

// LogisticsPanel Component
const LogisticsPanel: React.FC = () => {
  const features: UseCaseFeature[] = [
    "Anticipate shipping delays from environmental factors",
    "Identify backup suppliers before disruptions occur",
    "Optimize inventory based on predicted delivery patterns",
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-br from-fuchsia-50 to-purple-50 p-8">
        <UseCaseHeader
          icon={<BarChart2 className="h-6 w-6 text-fuchsia-600" />}
          title="Supply Chain Risk Detection"
          color="fuchsia"
        />
        <p className="text-gray-600 mb-4">
          Predict supplier risks using integrated weather data, shipment
          histories, and geopolitical events.
        </p>
        <UseCaseFeatures features={features} color="fuchsia" />
        <UseCaseAction text="Explore Logistics Solutions" color="fuchsia" />
      </div>
      <div className="md:w-1/2 p-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-fuchsia-100 flex items-center justify-center mr-3">
              <Database className="h-4 w-4 text-fuchsia-600" />
            </div>
            <div className="text-lg font-medium">Risk Assessment Report</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 hover:shadow-md transition-all duration-300">
            <div className="font-medium mb-3">
              Port of Singapore: Upcoming Delays
            </div>

            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-500 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: "68%" }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">68%</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <div className="mt-0.5 bg-purple-100 p-1 rounded-full mr-2 flex-shrink-0">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-600">
                  Seasonal storm patterns predicted for March 15-22
                </span>
              </div>
              <div className="flex items-start">
                <div className="mt-0.5 bg-purple-100 p-1 rounded-full mr-2 flex-shrink-0">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-600">
                  Historical delay correlation: 78% probability of 3-5 day
                  delays
                </span>
              </div>
              <div className="flex items-start">
                <div className="mt-0.5 bg-purple-100 p-1 rounded-full mr-2 flex-shrink-0">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-600">
                  15 scheduled shipments affected with estimated $42K impact
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            GikaGraph recommends rerouting 8 critical shipments through Port of
            Hong Kong to prevent production delays.
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab Navigation Component
const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  tabs,
}) => {
  return (
    <div className="mb-10 flex flex-wrap justify-center">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
};

// Use Cases Section Component
const UseCasesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ecommerce");

  const tabs: TabItem[] = [
    { id: "ecommerce", label: "Retail" },
    { id: "travel", label: "Travel" },
    { id: "education", label: "Education" },
    { id: "finance", label: "Finance" },
  ];

  const renderActivePanel = () => {
    switch (activeTab) {
      case "ecommerce":
        return <EcommerceExecutiveDemoWithStyles />;
      case "travel":
        return <TravelAnalysisDemo />;
      case "education":
        return <EducationAnalysisDemoWithStyles />;
      case "finance":
        return <FinancialAnalyticsDemoWithStyles />;
      default:
        return <EcommerceExecutiveDemoWithStyles />;
    }
  };

  return (
    <Section id="use-cases">
      <SectionHeader
        title="Experience the Evolution of Industry Solutions"
        subtitle="GikaGraph is transforming how enterprises interact with data across industries."
      />

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

      <FadeInAnimation>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {renderActivePanel()}
        </div>
      </FadeInAnimation>
    </Section>
  );
};

// ==========================================
// Testimonials Section Components
// ==========================================

// Testimonial Component
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  title,
  text,
  delay,
}) => {
  return (
    <div
      className="bg-gradient-to-r from-[#671D78] to-[#2E2680] backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 animate-fade-in w-[90%] md:w-[80%] mx-auto"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-purple-400/20 rounded-full mr-4 overflow-hidden flex items-center justify-center">
          <div className="w-8 h-8 bg-purple-500/50 rounded-full"></div>
        </div>
        <div>
          <div className="font-medium text-white">{name}</div>
          <div className="text-sm text-white/70">{title}</div>
        </div>
      </div>
      <p className="text-white/90 mb-4">{text}</p>
      <div className="flex text-yellow-300">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
    </div>
  );
};

// Testimonials Section Component
const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Divya Manjari",
      title: "CEO, Drezily Inc.",
      text: "GikaGraph transformed how we handle product search and recommendations by dramatically improving the quality and consistency of our data. With more accurate entity matching for complex queries due to improved data quality, the discovery rate for niche product searches improved substantially within a short span of time",
      delay: "0s",
    }
  ];

  return (
    <Section className="text-black relative">
      <SectionHeader
        title="Voices of Our Clients"
        subtitle="Hear from companies that have transformed their data intelligence with GiKA.AI"
      />

      <div className="grid md:grid-cols-1 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            title={testimonial.title}
            text={testimonial.text}
            delay={testimonial.delay}
          />
        ))}
      </div>
    </Section>
  );
};

// ==========================================
// CTA Section Component
// ==========================================

const CTASection: React.FC = () => {
  return (
    <Section>
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#671D78] to-[#2E2680] rounded-xl p-10 text-white text-center shadow-xl transform transition-all duration-500 animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">
          Transform Your Data Into Intelligence
        </h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Experience the power of entity-aware AI tailored specifically for your
          enterprise needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <WhiteButton
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            Request Demo
          </WhiteButton>
          <SecondaryButton
            onClick={() => {
              window.location.href = "#use-cases";
            }}
          >
            Explore Use Cases
          </SecondaryButton>
        </div>
      </div>
    </Section>
  );
};

// ==========================================
// Footer Components
// ==========================================

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <div>
      <h4 className="font-medium mb-4">{title}</h4>
      <ul className="space-y-2 text-gray-400 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="hover:text-purple-400 transition-colors duration-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const footerColumns: FooterColumn[] = [
    {
      title: "Product",
      links: [
        { href: "#", label: "Features" },
        { href: "#", label: "Solutions" },
        { href: "#", label: "Pricing" },
        { href: "#", label: "Case Studies" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", label: "Documentation" },
        { href: "#", label: "Blog" },
        { href: "#", label: "API" },
        { href: "#", label: "Support" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", label: "About" },
        { href: "#", label: "Careers" },
        { href: "/contact", label: "Contact" },
        { href: "#", label: "Press" },
      ],
    },
  ];

  const legalLinks: FooterLink[] = [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
    { href: "#", label: "Security" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src={Logo}
                alt="logo"
                className="h-8 w-10 text-purple-600 mr-2 animate-pulse-slow"
              />
              <span className="text-xl font-bold text-white">GiKA.AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transforming enterprise data into actionable intelligence with
              specialized SLMs and dynamic entity graphs.
            </p>
          </div>

          {footerColumns.map((column, index) => (
            <FooterColumn
              key={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 GikaGraph, Inc. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// Main GikaGraphLanding Component
// ==========================================

export default function GikaGraphLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // For the navigation state
    const handleNavScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleNavScroll);

    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }

    // GSAP animation setup
    let ctx = gsap.context(() => {
      // Create the ScrollTrigger for the blur and background effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "800 top",
          scrub: true,
          // markers: true, // Uncomment for debugging
        },
      });

      // Add animations to the timeline
      tl.to(
        videoRef.current,
        {
          filter: "blur(10px)",
          scale: 1.05,
          duration: 1,
        },
        0
      );

      tl.to(
        overlayRef.current,
        {
          backgroundColor: "rgba(229, 231, 235, 1)", // bg-gray-200
          duration: 1,
        },
        0
      );
    });

    // Cleanup function that follows GSAP documentation guidelines
    return () => {
      window.removeEventListener("scroll", handleNavScroll);
      // Proper GSAP cleanup
      ctx.revert(); // This kills all animations and ScrollTriggers created by this context
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Background container with overlay */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ backgroundColor: "rgba(229, 231, 235, 0)" }} // Start transparent
      >
        {/* Video with ref for GSAP manipulation */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "blur(0px)", transform: "scale(1)" }}
        >
          <source src="/bg-video-2.mov" type="video/quicktime" />
          {/* Add MP4 as fallback for better browser compatibility */}
          <source src="/bg-video-2.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="min-h-screen text-gray-800 relative z-10">
        <Navigation isScrolled={isScrolled} />
        <HeroSection />
        <div
          className={`w-[90vw] mx-auto mb-24 rounded-2xl overflow-hidden bg-gradient-to-r from-[#671D78] to-[#2E2680]`}
        >
          <div className="w-full mx-auto h-full scale-[0.87] rounded-2xl overflow-hidden">
            <GikaDashboard />
          </div>
        </div>
        <ProblemSolutionSection />
        <TechnologySection />
        <UseCasesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

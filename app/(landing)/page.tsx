"use client"

import Image from 'next/image';
import React, { useState, useEffect, ReactNode } from 'react';
import { ChevronRight, Database, Network, Eye, Code, BarChart2, ArrowRight, Zap, Lock, Server, Check, ExternalLink, LucideIcon } from 'lucide-react';
import Logo from "./logo.png"
import Dashboard from './dashboard-2.png';
import GrainyFilm from './grany-film.png';
import TravelAnalysisDemo from '@/components/landing/demo_panels/travel';
import EducationAnalysisDemoWithStyles from '@/components/landing/demo_panels/education';
import FinancialAnalyticsDemoWithStyles from '@/components/landing/demo_panels/finance';
import EcommerceExecutiveDemoWithStyles from '@/components/landing/demo_panels/retail';

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

type FeatureCardProps = {
  title: string;
  description: string;
};

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
  description: string;
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
      from: '#671D78',
      to: '#2E2680',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
      light: '#FFFFFF',
    },
    background: {
      light: '#FFFFFF',
      default: '#F3F4F6',
      dark: '#111827',
    }
  },
  borderRadius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
  }
};

// Button Components
const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`relative overflow-hidden bg-gradient-to-r from-[${THEME.colors.primary.from}] to-[${THEME.colors.primary.to}] 
        text-white px-6 py-3 rounded-lg hover:rounded-[2rem] font-[350] 
        flex items-center justify-center hover:shadow-lg transition-all duration-300 group ${className}`}
    >
      <span className="relative z-10 flex items-center">
        {children}
      </span>
      <div className={`absolute inset-0 bg-gradient-to-l from-[${THEME.colors.primary.from}] to-[${THEME.colors.primary.to}] 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </button>
  );
};

const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
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

const WhiteButton: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
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

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 mx-2 mb-2 ${THEME.borderRadius.sm} font-[350] transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r from-[${THEME.colors.primary.from}] to-[${THEME.colors.primary.to}] text-white shadow-md`
          : 'bg-white text-gray-700 hover:shadow-md'
      }`}
    >
      {children}
    </button>
  );
};

// Layout Components
const Section: React.FC<SectionProps> = ({ id, className = '', children }) => {
  return (
    <section id={id} className={`py-24 md:w-[90vw] md:mx-auto ${className}`}>
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
};

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ leftContent, rightContent, reverseOnMobile = false }) => {
  const mobileOrderClass = reverseOnMobile ? 'order-last lg:order-first' : '';
  
  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className={`lg:w-1/2 ${mobileOrderClass}`}>
        {leftContent}
      </div>
      <div className="lg:w-1/2">
        {rightContent}
      </div>
    </div>
  );
};

// Card Components
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-black/30 p-8 rounded-xl shadow-lg transition-all duration-300">
      <div className="text-2xl text-gray-100 font-[500] mb-3">{title}</div>
      <p className="text-gray-200 font-[350]">{description}</p>
    </div>
  );
};

// Typography Components
const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  className = '', 
  centered = true, 
  light = false 
}) => {
  const alignment = centered ? 'text-center' : 'text-left';
  const textColor = light ? 'text-white' : 'text-black';
  const subtitleColor = light ? 'text-gray-100' : 'text-gray-600';
  
  return (
    <div className={`mb-16 animate-slide-up ${alignment} ${className}`}>
      <h2 className={`text-5xl font-[350] mb-4 ${textColor}`}>{title}</h2>
      {subtitle && (
        <p className={`text-xl font-[350] ${subtitleColor} max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

// Feature List Item Component
const FeatureListItem: React.FC<FeatureListItemProps> = ({ text, color = "purple" }) => {
  return (
    <li className="flex items-center">
      <Check className={`h-4 w-4 text-${color}-600 mr-2`} />
      <span className="text-sm">{text}</span>
    </li>
  );
};

// Tech Feature Card Component
const TechFeatureCard: React.FC<TechFeatureCardProps> = ({ title, description, featureType }) => {
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
    <div className={`inline-block px-4 py-2 rounded-full bg-${color}-100 text-${color}-600 mb-6 text-sm font-medium`}>
      {children}
    </div>
  );
};

// Category Pill Component
const CategoryPill: React.FC<CategoryPillProps> = ({ children, color = "purple" }) => {
  return (
    <span className={`px-2 py-1 bg-${color}-100 text-${color}-800 text-xs rounded`}>{children}</span>
  );
};

// Animation Wrapper
const FadeInAnimation: React.FC<FadeInAnimationProps> = ({ children, delay = "0s" }) => {
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
      className="hover:text-[#671D78] transition-colors duration-300"
    >
      {children}
    </a>
  );
};

const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
  const navLinks: NavLink[] = [
    { href: "#why-gikagraph", label: "Home" },
    { href: "#technology", label: "About Us" },
    { href: "#use-cases", label: "Our Resources" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
          <Image src={Logo} alt="logo" className="h-8 w-10 text-purple-600 mr-2 animate-pulse-slow" />
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
          <PrimaryButton onClick={() => {
            window.location.href = '/contact';
          }}>Book Demo</PrimaryButton>
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
    <Section className="mt-20 text-black md:h-[80vh]">
      <TwoColumnLayout
        leftContent={
          <div className="md:h-full mb-16 md:mb-0 animate-slide-up flex flex-col justify-center">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              AI That Truly Understands Your Data
            </h1>
            <p className="text-lg text-black font-[350] mb-8 max-w-lg">
              Transform fragmented data into grounded, actionable insights with our specialized AI platform built on small language models.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <PrimaryButton onClick={() => {
            window.location.href = '/contact';
          }}>
                Explore Platform
                <ChevronRight className="ml-1 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2" />
              </PrimaryButton>
            </div>
          </div>
        }
        rightContent={
          <div className="relative animate-fade-in rounded-lg overflow-hidden shadow-lg">
            <Image src={Dashboard} alt="dashboard"/>
          </div>
        }
      />
    </Section>
  );
};

// ==========================================
// Problem Solution Section Component
// ==========================================

const ProblemSolutionSection: React.FC = () => {
  const features: Feature[] = [
    {
      title: "LLM Limitations",
      description: "Traditional LLMs suffer from hallucinations, high costs, and generic outputs that limit enterprise AI adoption."
    },
    {
      title: "Platform Dependency",
      description: "Businesses lose revenue to aggregators due to poor search experiences and lack of data ownership."
    },
    {
      title: "Data Silos",
      description: "Critical information remains trapped in spreadsheets, PDFs, or legacy systems, hindering decision-making."
    }
  ];

  return (
    <div className='relative w-[90vw] mx-auto rounded-[2vw] overflow-hidden'>
      {/* Gradient background replacing the image */}
      <div className='absolute inset-0 brightness-150 bg-gradient-to-r from-[#671D78] to-[#2E2680] z-0'></div>
      
      {/* Grainy film effect overlay */}
      <Image src={GrainyFilm} alt="grainy film" className='w-full h-full object-cover absolute z-0 opacity-10' />
      
      <section id="why-gikagraph" className="py-20 rounded-xl md:w-[90vw] md:mx-auto relative text-white">
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
    <div className='flex flex-col justify-center w-full'>
      <div className="backdrop-blur-lg rounded-xl h-[60vh] shadow-lg overflow-hidden">
        <div className="flex flex-col relative h-full">
          <div className="w-full grow flex rounded-lg overflow-hidden">
            <div className="w-1/3 bg-blue-500 flex flex-col items-center justify-center">
              <div className="text-white/60 mb-2">
                <Database className="h-6 w-6" />
              </div>
              <div className="text-xs font-medium text-white mb-1">Input Layer</div>
              <div className="text-xs text-white/70">Entity Processing</div>
            </div>
            <div className="w-1/3 bg-purple-500 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="text-white/60 mb-2">
                <Network className="h-6 w-6" />
              </div>
              <div className="text-xs font-medium text-white mb-1">Knowledge Graph</div>
              <div className="text-xs text-white/70">Relationship Mapping</div>
            </div>
            <div className="w-1/3 bg-indigo-500 flex flex-col items-center justify-center">
              <div className="text-white/60 mb-2">
                <Code className="h-6 w-6" />
              </div>
              <div className="text-xs font-medium text-white mb-1">Output Layer</div>
              <div className="text-xs text-white/70">Insight Generation</div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-gray-600 rounded-b-lg p-3">
            <div className="text-xs text-center text-white/70">
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
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />

        <rect x="10" y="10" width="480" height="50" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="1" />
        <text x="30" y="38" fontFamily="sans-serif" fontSize="14" fontWeight="500" fill="#000000" opacity="0.8">Entity Relationships</text>
        <rect x="360" y="20" width="120" height="28" rx="4" fill="#6366f1" />
        <text x="420" y="38" fontFamily="sans-serif" fontSize="12" fill="white" textAnchor="middle">Dynamic Mapping</text>

        <line x1="250" y1="200" x2="100" y2="120" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4" />
        <line x1="250" y1="200" x2="100" y2="300" stroke="#C084FC" strokeWidth="2" strokeDasharray="4" />
        <line x1="250" y1="200" x2="400" y2="120" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4" />
        <line x1="250" y1="200" x2="400" y2="300" stroke="#D946EF" strokeWidth="2" strokeDasharray="4" />

        <circle cx="250" cy="200" r="30" fill="white" stroke="#6366f1" strokeWidth="1" />
        <g transform="translate(235, 185)">
          <path d="M15 0 L0 -5 L0 20 L15 25 L30 20 L30 -5 Z" fill="#6366f1" />
          <path d="M15 0 L30 -5 L30 20 L15 25 Z" fill="#4f46e5" />
          <path d="M0 -5 L15 0 L30 -5 L15 -10 Z" fill="#818cf8" />
        </g>
        <text x="250" y="245" fontFamily="sans-serif" fontSize="12" fontWeight="500" fill="#000000" opacity="0.7" textAnchor="middle">Gika Platform</text>

        <circle cx="100" cy="120" r="24" fill="white" stroke="#60A5FA" strokeWidth="1">
          <animate attributeName="strokeOpacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <g transform="translate(100, 120)">
          <path d="M0 -15 A8 8 0 1 1 0 1 A8 8 0 1 1 0 -15 Z" fill="#60A5FA" />
          <path d="M-15 13 C-15 5 -5 3 0 3 C5 3 15 5 15 13" stroke="#60A5FA" strokeWidth="2" fill="none" />
        </g>
        <text x="100" y="155" fontFamily="sans-serif" fontSize="12" fontWeight="500" fill="#000000" opacity="0.7" textAnchor="middle">Customer</text>

        <circle cx="100" cy="300" r="24" fill="white" stroke="#C084FC" strokeWidth="1">
          <animate attributeName="strokeOpacity" values="0.7;1;0.7" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
        <g transform="translate(100, 300)">
          <rect x="-15" y="-10" width="30" height="20" rx="2" fill="#C084FC" />
          <rect x="-10" y="-5" width="20" height="3" rx="1" fill="white" />
          <rect x="-10" y="2" width="15" height="3" rx="1" fill="white" />
        </g>
        <text x="100" y="335" fontFamily="sans-serif" fontSize="12" fontWeight="500" fill="#000000" opacity="0.7" textAnchor="middle">Data</text>

        <circle cx="400" cy="120" r="24" fill="white" stroke="#8B5CF6" strokeWidth="1">
          <animate attributeName="strokeOpacity" values="0.7;1;0.7" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </circle>
        <g transform="translate(400, 120)">
          <path d="M0 -15 L10 5 L0 0 L-10 5 Z" fill="#8B5CF6" />
          <path d="M-5 -12 L5 -12 L5 -2 L-5 -2 Z" fill="#8B5CF6" />
          <path d="M0 -15 L-5 -5 L0 -8 L5 -5 Z" fill="#A78BFA" />
        </g>
        <text x="400" y="155" fontFamily="sans-serif" fontSize="12" fontWeight="500" fill="#000000" opacity="0.7" textAnchor="middle">Business Insights</text>

        <circle cx="400" cy="300" r="24" fill="white" stroke="#D946EF" strokeWidth="1">
          <animate attributeName="strokeOpacity" values="0.7;1;0.7" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <g transform="translate(400, 300)">
          <path d="M-10 -10 L10 -10 L10 10 L-10 10 Z" fill="none" stroke="#D946EF" strokeWidth="2" />
          <path d="M-15 -5 L-5 -5" stroke="#D946EF" strokeWidth="2" />
          <path d="M-15 0 L-5 0" stroke="#D946EF" strokeWidth="2" />
          <path d="M-15 5 L-5 5" stroke="#D946EF" strokeWidth="2" />
          <path d="M5 -5 L15 -5" stroke="#D946EF" strokeWidth="2" />
          <path d="M5 0 L15 0" stroke="#D946EF" strokeWidth="2" />
          <path d="M5 5 L15 5" stroke="#D946EF" strokeWidth="2" />
        </g>
        <text x="400" y="335" fontFamily="sans-serif" fontSize="12" fontWeight="500" fill="#000000" opacity="0.7" textAnchor="middle">Operations</text>
      </svg>
    </div>
  );
};

// SLM Technology Section Component
const SLMTechnologySection: React.FC = () => {
  const features: TechFeature[] = [
    {
      title: "Vertical-Specific Training",
      description: "Models tailored for healthcare, finance, e-commerce and more"
    },
    {
      title: "Entity Recognition",
      description: "Precise identification of products, suppliers, regulations, and more"
    },
    {
      title: "Low Resource Requirements",
      description: "10x more efficient than general-purpose LLMs with higher accuracy"
    }
  ];

  return (
    <div className="rounded-2xl p-8 bg-white shadow-sm">
      <TwoColumnLayout
        leftContent={
          <div>
            <Badge color="blue">Entity-Aware SLMs</Badge>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Our small language models are fine-tuned for specific verticals to understand domain-specific entities with unprecedented precision.
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
      description: "Connect products, customers, suppliers, inventory, and more in a unified view"
    },
    {
      title: "Self-Updating Intelligence",
      description: "Continuously incorporates new data and evolves relationships automatically"
    },
    {
      title: "Cross-Source Integration",
      description: "Unifies internal systems with external data sources for complete context"
    }
  ];

  return (
    <div className="rounded-2xl p-8 bg-white shadow-sm">
      <TwoColumnLayout
        leftContent={<EntityGraphVisualization />}
        rightContent={
          <div>
            <Badge color="purple">Dynamic Entity Graphs</Badge>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Our platform maps relationships between data points across your entire information ecosystem, enabling context-rich answers.
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
const UseCaseHeader: React.FC<UseCaseHeaderProps> = ({ icon, title, color = "purple" }) => {
  return (
    <>
      <div className={`bg-white inline-block rounded-full p-3 mb-4 shadow-md`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
    </>
  );
};

const UseCaseFeatures: React.FC<UseCaseFeaturesProps> = ({ features, color = "purple" }) => {
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

const UseCaseAction: React.FC<UseCaseActionProps> = ({ text, color = "purple" }) => {
  return (
    <button className={`flex items-center text-sm font-medium text-${color}-600 hover:text-${color}-700 transition-colors`}>
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
    "Dramatically improve conversion rates for edge cases"
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
        <UseCaseHeader 
          icon={<BarChart2 className="h-6 w-6 text-purple-600" />}
          title="Precision Product Discovery"
        />
        <p className="text-gray-600 mb-4">
          Resolve complex, long-tail queries with 99% precision, connecting customers to exactly what they need.
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
            <div className="text-sm text-gray-500">GikaGraph finds products matching all criteria with 99% precision</div>
          </div>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">Aaranya Natural's Aloe Gel</div>
                <div className="text-sm text-purple-600">₹599 ($7.20)</div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <div className="flex text-yellow-400 mr-1">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
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
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
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
    "Provide evidence-based treatment recommendations"
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
          Diagnose rare conditions by connecting patient records with comprehensive medical knowledge graphs.
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
              <div className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded">92% Confidence</div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-start">
                <Check className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Burning pain in extremities with pronounced heat sensitivity</span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Symptoms worse during warmth and exercise, improves with cooling</span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Normal nerve conduction studies despite persistent pain</span>
              </div>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="text-sm font-medium mb-1">Diagnosis: Erythromelalgia</p>
              <p className="text-xs text-gray-600">A rare vascular peripheral pain disorder often misdiagnosed as inflammatory conditions.</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            GikaGraph analyzed 3,724 similar cases and identified key diagnostic patterns that standard protocols missed.
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
    "Monitor supply chain impacts on financial performance"
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
          Track market changes and regulatory impacts on investments with interconnected financial data.
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
            <div className="text-lg font-medium">Regulatory Impact Analysis</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 hover:shadow-md transition-all duration-300">
            <div className="font-medium mb-3">FDA Approval Delays: Impacted Stocks</div>

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
                  <span className="font-medium">Bristol Myers Squibb (BMY)</span>
                </div>
                <span className="text-amber-600">-0.8%</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            GikaGraph detected the pattern 36 hours before major market movements by connecting FDA documents with company pipeline data.
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
    "Optimize inventory based on predicted delivery patterns"
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
          Predict supplier risks using integrated weather data, shipment histories, and geopolitical events.
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
            <div className="font-medium mb-3">Port of Singapore: Upcoming Delays</div>

            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: "68%" }}></div>
              </div>
              <span className="ml-2 text-sm font-medium">68%</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <div className="mt-0.5 bg-purple-100 p-1 rounded-full mr-2 flex-shrink-0">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-600">Seasonal storm patterns predicted for March 15-22</span>
              </div>
              <div className="flex items-start">
                <div className="mt-0.5 bg-purple-100 p-1 rounded-full mr-2 flex-shrink-0">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-600">Historical delay correlation: 78% probability of 3-5 day delays</span>
              </div>
              <div className="flex items-start">
                <div className="mt-0.5 bg-purple-100 p-1 rounded-full mr-2 flex-shrink-0">
                  <Check className="h-3 w-3 text-purple-600" />
                </div>
                <span className="text-gray-600">15 scheduled shipments affected with estimated $42K impact</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            GikaGraph recommends rerouting 8 critical shipments through Port of Hong Kong to prevent production delays.
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab Navigation Component
const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, tabs }) => {
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
  const [activeTab, setActiveTab] = useState('ecommerce');
  
  const tabs: TabItem[] = [
    { id: 'ecommerce', label: 'Retail' },
    { id: 'travel', label: 'Travel' },
    { id: 'education', label: 'Education' },
    { id: 'finance', label: 'Finance' },
  ];

  const renderActivePanel = () => {
    switch(activeTab) {
      case 'ecommerce':
        return <EcommerceExecutiveDemoWithStyles />;
      case 'travel':
        return <TravelAnalysisDemo />;
      case 'education':
        return <EducationAnalysisDemoWithStyles />;
      case 'finance':
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
const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, title, text, delay }) => {
  return (
    <div 
      className="bg-gradient-to-r from-[#671D78] to-[#2E2680] backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 animate-fade-in" 
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
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
    </div>
  );
};

// Testimonials Section Component
const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Chen",
      title: "Chief Data Officer, TechRetail Inc.",
      text: "GikaGraph transformed how we handle product search and recommendations. The precision of entity matching for complex queries is unlike anything we've seen before. Our conversion rates for niche product searches increased by 34% in just three months.",
      delay: "0s"
    },
    {
      name: "Michael Okonjo",
      title: "VP of Supply Chain, GlobalPharm",
      text: "The ability to predict supply chain disruptions has been game-changing for our pharmaceutical operations. GikaGraph's entity intelligence identified potential supplier issues weeks before they would have impacted production, saving us millions in potential losses.",
      delay: "0.2s"
    }
  ];

  return (
    <Section className="text-black relative">
      <SectionHeader
        title="What Our Clients Say"
        subtitle="Hear from companies that have transformed their data intelligence with GikaGraph."
      />

      <div className="grid md:grid-cols-2 gap-8">
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
        <h2 className="text-3xl font-bold mb-4">Transform Your Data Into Intelligence</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Experience the power of entity-aware AI tailored specifically for your enterprise needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <WhiteButton>Request Demo</WhiteButton>
          <SecondaryButton>Explore Use Cases</SecondaryButton>
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
            <a href={link.href} className="hover:text-purple-400 transition-colors duration-300">
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
        { href: "#", label: "Case Studies" }
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "#", label: "Documentation" },
        { href: "#", label: "Blog" },
        { href: "#", label: "API" },
        { href: "#", label: "Support" }
      ]
    },
    {
      title: "Company",
      links: [
        { href: "#", label: "About" },
        { href: "#", label: "Careers" },
        { href: "/contact", label: "Contact" },
        { href: "#", label: "Press" }
      ]
    }
  ];

  const legalLinks: FooterLink[] = [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
    { href: "#", label: "Security" }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image src={Logo} alt="logo" className="h-8 w-10 text-purple-600 mr-2 animate-pulse-slow" />
              <span className="text-xl font-bold text-white">GiKA.AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transforming enterprise data into actionable intelligence with specialized SLMs and dynamic entity graphs.
            </p>
          </div>

          {footerColumns.map((column, index) => (
            <FooterColumn key={index} title={column.title} links={column.links} />
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 GikaGraph, Inc. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {legalLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 text-gray-800 font-sans">
      <Navigation isScrolled={isScrolled} />
      <HeroSection />
      <ProblemSolutionSection />
      <TechnologySection />
      <UseCasesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
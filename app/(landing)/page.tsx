import Link from 'next/link';
import { ChevronRight, Database, Network, Eye, Code, BarChart2, ArrowRight, Zap, Lock, Server } from 'lucide-react';
import Hero from '@/components/landing/Hero';
import FeatureCard from '@/components/landing/FeatureCard';
import TechSection from '@/components/landing/TechSection';
import UseCaseCard from '@/components/landing/UseCaseCard';
import CTASection from '@/components/landing/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <Hero />
      
      {/* Problem Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why GikaGraph?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're solving the fundamental challenges enterprises face with AI and data integration.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Eye className="h-6 w-6 text-red-600" />}
              iconBgColor="bg-red-100"
              title="LLM Limitations"
              description="Traditional LLMs suffer from hallucinations, high costs, and generic outputs that limit enterprise AI adoption."
              solution="Specialized SLMs fine-tuned for your industry with 99% precision on domain-specific queries."
            />
            
            <FeatureCard 
              icon={<Lock className="h-6 w-6 text-blue-600" />}
              iconBgColor="bg-blue-100"
              title="Platform Dependency"
              description="Businesses lose revenue to aggregators due to poor search experiences and lack of data ownership."
              solution="Full control of your data layer with proprietary entity intelligence that keeps users on your platform."
            />
            
            <FeatureCard 
              icon={<Server className="h-6 w-6 text-yellow-600" />}
              iconBgColor="bg-yellow-100"
              title="Data Silos"
              description="Critical information remains trapped in spreadsheets, PDFs, or legacy systems, hindering decision-making."
              solution="Dynamic entity graphs connect disparate data sources to provide comprehensive context for better insights."
            />
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section id="technology" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Deep Tech</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              GikaGraph combines specialized language models with dynamic entity graphs to create a powerful data layer.
            </p>
          </div>
          
          <TechSection />
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section id="usecases" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Industry Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              GikaGraph is transforming how enterprises interact with data across industries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <UseCaseCard 
              industry="E-commerce"
              color="red"
              title="Precision Product Discovery"
              description="Resolve complex, long-tail queries with 99% precision, connecting customers to exactly what they need."
              example="Vegan skincare in Mumbai under $10 with recyclable packaging"
            />
            
            <UseCaseCard 
              industry="Healthcare"
              color="blue"
              title="Advanced Diagnostic Support"
              description="Diagnose rare conditions by connecting patient records with comprehensive medical knowledge graphs."
              example="Identify patterns across symptoms, tests, and medical literature for rare disease diagnosis"
            />
            
            <UseCaseCard 
              industry="Finance"
              color="emerald"
              title="Real-time Market Intelligence"
              description="Track market changes and regulatory impacts on investments with interconnected financial data."
              example="Identify pharma stocks affected by FDA approval delays or drug trial outcomes"
            />
            
            <UseCaseCard 
              industry="Logistics"
              color="amber"
              title="Supply Chain Risk Detection"
              description="Predict supplier risks using integrated weather data, shipment histories, and geopolitical events."
              example="Early warning of shipping delays based on weather patterns and historical performance"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
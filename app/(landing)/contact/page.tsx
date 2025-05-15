"use client";

import Image from "next/image";
import React, { useState, useEffect, ReactNode } from "react";
import { InlineWidget } from "react-calendly";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  CheckCircle,
  CalendarCheck,
} from "lucide-react";
import Logo from "../logo.png";
import GrainyFilm from "../grany-film.png";

// ==========================================
// Types
// ==========================================

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

type NavigationLinkProps = {
  href: string;
  children: ReactNode;
};

type NavLink = {
  href: string;
  label: string;
};

type NavigationProps = {
  isScrolled: boolean;
};

// ==========================================
// Design System & UI Components
// ==========================================

// Button Components (matching the home page)
const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden bg-gradient-to-r from-[#671D78] to-[#2E2680] 
        text-white px-6 py-3 rounded-lg hover:rounded-[2rem] font-[350] 
        flex items-center justify-center hover:shadow-lg transition-all duration-300 group 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <div
        className="absolute inset-0 bg-gradient-to-l from-[#671D78] to-[#2E2680] 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
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
    { href: "/", label: "Home" },
    { href: "/#technology", label: "Technology" },
    { href: "/#use-cases", label: "Resources" },
    { href: "#", label: "Contact Us" },
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
          <span className="text-xl font-bold text-black">GiKA.AI</span>
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
// Contact Form Component
// ==========================================

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
  autoComplete?: string;
  pattern?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  icon,
  required,
  autoComplete,
  pattern,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        pattern={pattern}
        placeholder={placeholder}
        required={required}
        className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
      />
    </div>
  </div>
);

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.company) {
        throw new Error("Please fill in all required fields");
      }

      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Show Calendly after successful form submission
      setShowCalendly(true);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {!showCalendly ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              icon={<User className="h-5 w-5 text-gray-400" />}
              required
            />
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@company.com"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              required
            />
          </div>

          <FormInput
            label="Send text messages to"
            name="company"
            type="tel"
            autoComplete="tel"
            value={formData.company}
            pattern="[0-9]{10}"
            onChange={handleInputChange}
            placeholder="Mobile"
            icon={<Phone className="h-5 w-5 text-gray-400" />}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please share anything that will help prepare for our meeting.
            </label>
            <div className="relative">
              <div className="absolute top-3 left-4 pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                placeholder="Tell us about your needs..."
              />
            </div>
          </div>

          <PrimaryButton type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              <>
                <CalendarCheck className="w-5 h-5" />
                <span className="ml-2">Continue to Schedule</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </PrimaryButton>
        </form>
      ) : (
        <div className="calendly-container h-[600px] w-full">
          <InlineWidget
            url="https://calendly.com/contact-gikagraph/30min"
            prefill={{
              name: formData.name,
              email: formData.email,
              customAnswers: {
                a1: formData.message,
                a2: formData.company,
              },
            }}
            styles={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
      )}

      {showSuccess && !showCalendly && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-start space-x-3">
          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-green-800">
              Great! Let's schedule your demo
            </h3>
            <p className="mt-1 text-sm text-green-700">
              Please select a convenient time slot.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

// ==========================================
// Contact Hero Section
// ==========================================

const ContactHero: React.FC = () => {
  return (
    <Section className="mt-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold leading-tight mb-6 animate-slide-up">
          Get in Touch with Our Experts
        </h1>
        <p className="text-lg text-gray-600 font-[350] mb-8 max-w-2xl mx-auto animate-fade-in">
          Ready to transform your data into actionable intelligence? Our team is
          here to help you get started with GiKA.AI.
        </p>
      </div>
    </Section>
  );
};

// ==========================================
// Contact Information Section
// ==========================================

const ContactInfoItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  details: string[];
  isLink?: boolean;
}> = ({ icon, title, details, isLink = false }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-lg mb-1 text-white">{title}</h3>
      {details.map((detail, index) =>
        isLink ? (
          <a
            key={index}
            href={`mailto:${detail}`}
            className="text-white/80 hover:text-white transition-colors text-sm block"
          >
            {detail}
          </a>
        ) : (
          <p key={index} className="text-white/80 text-sm">
            {detail}
          </p>
        )
      )}
    </div>
  </div>
);

const ContactInfo: React.FC = () => {
  const contactDetails = [
    {
      icon: <MapPin className="h-5 w-5 text-white" />,
      title: "Location",
      details: [
        "Indiqube Edge,",
        "Outer Ring Rd, Bengaluru,",
        "Karnataka 560102, India",
      ],
    },
    {
      icon: <Mail className="h-5 w-5 text-white" />,
      title: "Email",
      details: ["contact@gikagraph.ai"],
      isLink: true,
    },
    {
      icon: <Phone className="h-5 w-5 text-white" />,
      title: "Phone",
      details: ["+91 9810350324"],
    },
  ];

  return (
    <div className="relative w-[90vw] mx-auto rounded-2xl overflow-hidden mb-24">
      {/* Gradient background matching the home page */}
      <div className="absolute inset-0 brightness-150 bg-gradient-to-r from-[#671D78] to-[#2E2680] z-0"></div>

      {/* Grainy film effect overlay */}
      <Image
        src={GrainyFilm}
        alt="grainy film"
        className="w-full h-full object-cover absolute z-0 opacity-10"
      />

      <div className="relative z-10 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-purple-100 mb-8">
            We're here to help and answer any questions you might have. We look
            forward to hearing from you.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {contactDetails.map((detail, index) => (
              <ContactInfoItem
                key={index}
                icon={detail.icon}
                title={detail.title}
                details={detail.details}
                isLink={detail.isLink}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Main Contact Form Section
// ==========================================

const ContactFormSection: React.FC = () => {
  return (
    <Section className="text-black">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Schedule Your Demo</h2>
            <p className="text-gray-600 font-[350]">
              Fill out the form below and our team will get back to you within
              24 hours.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
};

// ==========================================
// Footer Component (matching home page)
// ==========================================

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Copyright on the left */}
          <div className="text-gray-400 text-sm mb-4 sm:mb-0">
            © 2025 GiKA AI. All rights reserved.
          </div>

          {/* Social Media links on the right */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm hidden sm:inline">
              Follow us:
            </span>
            <a
              href="https://www.linkedin.com/company/gika-ai?trk=public_profile_topcard-current-company"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// Main Contact Page Component
// ==========================================

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-montserrat">
      <Navigation isScrolled={isScrolled} />
      <ContactHero />
      <ContactInfo />
      <ContactFormSection />
      <Footer />
    </div>
  );
}

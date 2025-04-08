import { ArrowRight, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  solution: string;
}

export default function FeatureCard({ icon, iconBgColor, title, description, solution }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <div className="pt-4 border-t border-gray-100">
        <p className="text-primary-600 font-medium flex items-center">
          Our solution
          <ArrowRight className="ml-2 h-4 w-4" />
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {solution}
        </p>
      </div>
    </div>
  );
}
import { BarChart2 } from 'lucide-react';

interface UseCaseCardProps {
  industry: string;
  color: string;
  title: string;
  description: string;
  example: string;
}

export default function UseCaseCard({ industry, color, title, description, example }: UseCaseCardProps) {
  const colorMap: Record<string, { bg: string, text: string, gradient: string }> = {
    red: {
      bg: 'bg-red-600',
      text: 'text-red-600',
      gradient: 'bg-gradient-to-r from-pink-100 to-red-100'
    },
    blue: {
      bg: 'bg-blue-600',
      text: 'text-blue-600',
      gradient: 'bg-gradient-to-r from-blue-100 to-cyan-100'
    },
    emerald: {
      bg: 'bg-emerald-600',
      text: 'text-emerald-600',
      gradient: 'bg-gradient-to-r from-green-100 to-emerald-100'
    },
    amber: {
      bg: 'bg-amber-600',
      text: 'text-amber-600',
      gradient: 'bg-gradient-to-r from-yellow-100 to-amber-100'
    }
  };

  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`h-48 ${colors.gradient} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <BarChart2 className={`h-8 w-8 ${colors.text}`} />
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className={`bg-white px-3 py-1 rounded-full text-sm font-medium ${colors.text}`}>{industry}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <div className="text-sm text-gray-500 mb-2">Example:</div>
          <div className="font-medium italic">{example}</div>
        </div>
      </div>
    </div>
  );
}

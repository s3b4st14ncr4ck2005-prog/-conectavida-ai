type Color = "emerald" | "blue" | "amber" | "red" | "purple" | "teal";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: Color;
  delay?: number;
}

const iconBg: Record<Color, string> = {
  emerald:
    "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  amber:
    "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  purple:
    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
};

const hoverBorder: Record<Color, string> = {
  emerald: "hover:border-emerald-200 dark:hover:border-emerald-700",
  blue: "hover:border-blue-200 dark:hover:border-blue-700",
  amber: "hover:border-amber-200 dark:hover:border-amber-700",
  red: "hover:border-red-200 dark:hover:border-red-700",
  purple: "hover:border-purple-200 dark:hover:border-purple-700",
  teal: "hover:border-teal-200 dark:hover:border-teal-700",
};

export default function FeatureCard({
  icon,
  title,
  description,
  color,
  delay = 0,
}: FeatureCardProps) {
  return (
    <div
      className={`animate-fade-in-up bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 ${hoverBorder[color]} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`w-12 h-12 rounded-xl ${iconBg[color]} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-base">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

import { motion } from 'framer-motion';

export default function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active
          ? "bg-[#d4a017] text-white font-semibold shadow-lg"
          : "text-gray-700 hover:bg-gray-100 hover:text-[#d4a017]"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </motion.div>
  );
}

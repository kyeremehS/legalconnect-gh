// Action button for videos

import { motion } from 'framer-motion';
export default function ActionButton({
  icon,
  count,
  onClick,
}: {
  icon: React.ReactNode;
  count: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-[#d4a017]/20 transition-all"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{count > 999 ? `${Math.floor(count/1000)}k` : count}</span>
    </motion.button>
  );
}
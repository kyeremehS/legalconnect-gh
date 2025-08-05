import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// Video controls component - only volume control now
export default function VideoControls({
  isMuted,
  onMuteToggle,
}: {
  isMuted: boolean;
  onMuteToggle: () => void;
}) {
  return (
    <div className="absolute top-4 right-4 flex gap-3 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all border border-white/20 shadow-lg"
        onClick={onMuteToggle}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </motion.button>
    </div>
  );
}
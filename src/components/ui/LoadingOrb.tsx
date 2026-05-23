import { motion } from "framer-motion";

interface Props {
  label?: string;
  agentColor?: string;
}

export default function LoadingOrb({ label = "Processing...", agentColor = "from-cyan-500 to-blue-600" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      {/* Orb */}
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${agentColor} blur-xl`}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-2 rounded-full border-2 border-t-transparent bg-gradient-to-br ${agentColor} opacity-80`}
          style={{ borderColor: "rgba(6,182,212,0.6)", borderTopColor: "transparent" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${agentColor}`}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full bg-cyan-400"
          />
        ))}
      </div>

      <p className="text-sm text-gray-400 animate-pulse">{label}</p>
    </div>
  );
}

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(6,182,212,0.15)",
  hover = false,
  onClick,
}: Props) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={
        hover
          ? {
              ["--glow" as string]: glowColor,
            }
          : undefined
      }
      className={`relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden ${
        hover ? "cursor-pointer hover:border-white/20" : ""
      } ${className}`}
    >
      {/* Animated top-edge glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor.replace("0.15", "0.6")}, transparent)`,
        }}
      />
      {children}
    </motion.div>
  );
}

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  FolderOpen,
  Home,
  Cpu,
  Zap,
} from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/workspace", icon: Bot, label: "Workspace" },
  { to: "/projects", icon: FolderOpen, label: "Projects" },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-[#0c0a12]/80 backdrop-blur-2xl border-r border-white/[0.04] z-50 flex flex-col antialiased"
    >
      {/* Logo Container */}
      <div className="flex items-center gap-3.5 px-5 py-6 border-b border-white/[0.04]">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_4px_20px_rgba(147,51,234,0.3)] border-t border-purple-300/20">
            <Cpu size={18} className="text-white" />
          </div>
          <div className="absolute inset-0 rounded-xl bg-purple-500/10 blur-md -z-10" />
        </div>
        <div className="hidden md:block overflow-hidden">
          <h1 className="text-base font-semibold text-white tracking-tight leading-tight">
            AutoDev
          </h1>
          <p className="text-[10px] bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent font-medium tracking-widest uppercase font-mono mt-0.5">
            Squad
          </p>
        </div>
      </div>

      {/* Navigation Layer */}
      <nav className="flex-1 py-8 px-3 space-y-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.99 }}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 cursor-pointer group relative ${
                  isActive
                    ? "bg-purple-500/[0.04] border border-purple-500/30 text-white shadow-[0_0_30px_rgba(147,51,234,0.03),inset_0_0_15px_rgba(147,51,234,0.02)]"
                    : "text-gray-400 border border-transparent hover:text-white hover:bg-white/[0.02] hover:border-white/[0.02]"
                }`}
              >
                {/* Active Soft Radial Background Glow */}
                {isActive && (
                  <div className="absolute inset-0 pointer-events-none opacity-40 rounded-xl" style={{ background: "radial-gradient(circle at 10% 50%, rgba(147,51,234,0.15) 0%, transparent 60%)" }} />
                )}

                <Icon
                  size={18}
                  className={`flex-shrink-0 transition-colors duration-300 ${
                    isActive ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300"
                  }`}
                />
                
                <span className="hidden md:block text-sm font-medium tracking-wide transition-colors">
                  {label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"
                    style={{ boxShadow: "0 0 10px 2px rgba(168,85,247,0.6)" }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Lower Footer Branding */}
      <div className="px-4 pb-6 border-t border-white/[0.04] pt-5">
        <div className="hidden md:flex items-center gap-2.5 px-3 py-2 bg-black/20 border border-white/[0.02] rounded-lg">
          <Zap size={12} className="text-purple-400 fill-purple-400/10" />
          <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">
            AutoDev Node Active
          </span>
        </div>
      </div>
    </motion.aside>
  );
}
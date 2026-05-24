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
      className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-black/60 backdrop-blur-xl border-r border-cyan-500/20 z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-cyan-500/20">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Cpu size={20} className="text-white" />
          </div>
          <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-md -z-10" />
        </div>
        <div className="hidden md:block overflow-hidden">
          <h1 className="text-sm font-bold text-white leading-tight">AutoDev</h1>
          <p className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">Squad</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-2 md:px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-white"
                  }`}
                />
                <span className="hidden md:block text-sm font-medium">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-6 border-t border-cyan-500/20 pt-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-2">
          <Zap size={14} className="text-cyan-400" />
          <span className="text-xs text-gray-500">Powered by AutoDev Squad</span>
        </div>
      </div>
    </motion.aside>
  );
}

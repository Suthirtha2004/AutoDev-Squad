import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex">
      <Sidebar />
      <main className="flex-1 ml-20 md:ml-64 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

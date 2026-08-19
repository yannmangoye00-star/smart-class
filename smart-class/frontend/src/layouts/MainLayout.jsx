import { useState } from "react";
import Navbar from "../components/Navbar";
import SidebarParent from "../components/SidebarParent";
import ParentAIAssistant from "../components/ParentAIAssistant";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* 1. La Sidebar reçoit le déclencheur onOpenAI */}
      <SidebarParent onOpenAI={() => setIsAIOpen(true)} />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* 2. La modale s'affiche au premier plan lorsqu'elle est activée */}
      <ParentAIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </div>
  );
}
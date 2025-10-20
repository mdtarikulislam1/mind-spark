import React from "react";
import { Outlet } from "react-router";
import useSidebarStore from "../Zustand-state/useSidebarStore";
import Navbar from "../Component/Navbar";

export default function RootLayout() {
  const { desktopOpen } = useSidebarStore();

  return (
    <div className="min-h-screen">
      {/* Top Navbar is fixed */}
      <div
        className={`pt-16 grid min-h-screen ${
          desktopOpen ? "lg:grid-cols-[270px_1fr]" : "lg:grid-cols-[0_1fr]"
        }`}
      >
        {/* Sidebar */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col overflow-y-auto">
          <div className="min-h-screen p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

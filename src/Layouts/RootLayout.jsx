import React from "react";
import { Outlet } from "react-router";
import useSidebarStore from "../Zustand-state/useSidebarStore";
import Navbar from "../Component/Navbar";
import FullScreenLoader from "../Component/Shared/FullScreenLoader";

export default function RootLayout() {
  const { desktopOpen } = useSidebarStore();

  return (
    <div className="min-h-screen dark:bg-gray-800">
      {/* Top Navbar is fixed */}
      <div
        className={` grid min-h-screen ${
          desktopOpen ? "lg:grid-cols-[270px_1fr]" : "lg:grid-cols-[0_1fr]"
        }`}
      >
        {/* Sidebar */}
        <div className="relative z-50 ">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col overflow-y-auto dark:bg-gray-800 dark:text-white">
          <div className="min-h-[calc(100vh-70px)] lg:pt-18 pt-10">
            <Outlet />
            <FullScreenLoader/>
          </div>
        </div>
      </div>
    </div>
  );
}

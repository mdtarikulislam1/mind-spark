import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import { NavLink } from "react-router"; // ✅ Corrected import
import useSidebarStore from "../Zustand-state/useSidebarStore";
import { RiDashboardFill, RiFolderReceivedFill } from "react-icons/ri";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdHistory, MdInventory, MdOutlineInventory } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { IoMdAdd } from "react-icons/io";
import ThemeToggle from "./Shared/DarkModeToggle"; // ✅ working dark mode toggle
import { LuPanelBottomOpen } from "react-icons/lu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { desktopOpen, toggleDesktop } = useSidebarStore();

  const navItems = [
    { name: "Dashboard", icon: <RiDashboardFill />, link: "/" },
    {
      name: "Product",
      icon: <FaShoppingCart />,
      subItems: [
        {
          name: "Procurement",
          link: "/product/procurement",
          icon: <MdInventory />,
        },
        {
          name: "Received",
          link: "/product/received",
          icon: <RiFolderReceivedFill />,
        },
        {
          name: "Inventory",
          link: "/product/inventory",
          icon: <MdOutlineInventory />,
        },
        {
          name: "Add Product",
          link: "/product/addProduct",
          icon: <IoMdAdd />,
        },
      ],
    },
    {
      name: "Orders",
      icon: <AiOutlineOrderedList />,
      link: "/orders",
    },
    {
      name: "Sales",
      icon: <FcSalesPerformance />,
      link: "/sales",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      subItems: [
        { name: "History", link: "/settings/history", icon: <MdHistory /> },
      ],
    },
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <>
      {/* 🌐 Top Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-600 dark:bg-gray-800 text-white flex items-center justify-between px-4 py-3 z-20 dark:border-b dark:border-gray-600">
        <h1 className="text-lg font-bold">Mind Spark</h1>

        {/* 🌐 Right-side icons */}
        <div className="flex items-center gap-3">
          <ThemeToggle /> {/* ✅ Dark Mode Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-2xl lg:hidden focus:outline-none"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 pt-16 h-screen w-64 bg-blue-700 dark:bg-gray-900 text-white z-40 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-4rem)]">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <>
                  <div
                    onClick={() => toggleSubmenu(index)}
                    className="flex items-center justify-between text-base cursor-pointer px-3 py-2 rounded-md hover:bg-blue-800 dark:hover:bg-gray-700 transition"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <FaChevronDown
                      className={`transition-transform duration-300 ${
                        activeSubmenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Submenu */}
                  {activeSubmenu === index && (
                    <ul className="ml-8 mt-2 space-y-2">
                      {item.subItems.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={sub.link}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-2 py-2 text-sm rounded-md ${
                                isActive
                                  ? "bg-blue-900 dark:bg-gray-700"
                                  : "hover:bg-blue-800 dark:hover:bg-gray-700"
                              }`
                            }
                          >
                            {sub.icon}
                            {sub.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-blue-900 dark:bg-gray-700"
                        : "hover:bg-blue-800 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 💻 Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed top-0 left-0 pt-16 h-screen bg-blue-700 dark:bg-gray-900 text-white transition-all duration-300 ${
          desktopOpen ? "w-[260px]" : "w-0"
        }`}
      >
        <ul
          className={`overflow-y-auto h-[calc(100vh-4rem)] p-4 space-y-3 ${
            desktopOpen ? "block" : "hidden"
          }`}
        >
          {navItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <>
                  <div
                    onClick={() => toggleSubmenu(index)}
                    className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-blue-800 dark:hover:bg-gray-700 transition"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <FaChevronDown
                      className={`transition-transform duration-300 ${
                        activeSubmenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Submenu */}
                  {activeSubmenu === index && desktopOpen && (
                    <ul className="ml-8 mt-2 space-y-2">
                      {item.subItems.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={sub.link}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-2 py-2 text-sm rounded-md ${
                                isActive
                                  ? "bg-blue-900 dark:bg-gray-700"
                                  : "hover:bg-blue-800 dark:hover:bg-gray-700"
                              }`
                            }
                          >
                            {sub.icon}
                            {sub.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-blue-900 dark:bg-gray-700"
                        : "hover:bg-blue-800 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* 💡 Desktop Toggle Button */}
        <div className="absolute top-12 my-2 right-[-30px]">
          <button
            onClick={toggleDesktop}
            className="text-2xl text-blue-700 dark:text-white"
          >
          <LuPanelBottomOpen/>
          </button>
        </div>
      </div>
    </>
  );
}

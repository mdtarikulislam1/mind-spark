import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaCog,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router"; // ✅ Corrected import
import useSidebarStore from "../Zustand-state/useSidebarStore";
import { RiDashboardFill, RiFolderReceivedFill } from "react-icons/ri";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdHistory, MdInventory, MdOutlineInventory } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { IoMdAdd } from "react-icons/io";
import ThemeToggle from "./Shared/DarkModeToggle"; // ✅ working dark mode toggle
import { LuPanelBottomOpen } from "react-icons/lu";
import { GiExpense } from "react-icons/gi";
import { removeToken } from "../Pages/Helper/SessionHelper";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { desktopOpen, toggleDesktop } = useSidebarStore();
   const navigate = useNavigate();

  const handleLogout = () => {
    removeToken(); // localStorage থেকে token remove করো
    navigate("/login"); // login page এ পাঠাও
  };

  const navItems = [
    { name: "Dashboard", icon: <RiDashboardFill />, link: "/" },
    {
      name: "Product",
      icon: <FaShoppingCart />,
      subItems: [
        {
          name: "Add Product",
          link: "/product/addProduct",
          icon: <IoMdAdd />,
        },
      ],
    },
    {
      name: "Inventory",
      link: "/product/inventory",
      icon: <MdOutlineInventory />,
    },
    {
      name: "Purchase",
      link: "/product/procurement",
      icon: <MdInventory />,
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
      name: "Expenses",
      icon: <GiExpense />,
      link: "/expenses",
    },
    // {
    //   name: "Settings",
    //   icon: <FaCog />,
    //   subItems: [
    //     { name: "History", link: "/settings/history", icon: <MdHistory /> },
    //     { name: "Create User", link: "/settings/createUser", icon: <MdHistory /> },
    //   ],
    // },
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-700 dark:bg-gray-800 text-white flex items-center justify-between px-4 py-3 z-50 dark:border-b dark:border-gray-600">
        <h1 className="text-lg font-bold">Mind Spark</h1>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt  size={20}/>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-2xl lg:hidden focus:outline-none"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 pt-16 h-screen w-64 bg-blue-700 dark:bg-gray-900 text-white z-40 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="p-4 space-y-3 overflow-y-auto scrollbar-hide h-[calc(100vh-4rem)]">
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

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed top-0 left-0 pt-16 h-screen bg-blue-700 dark:bg-gray-900 text-white transition-all duration-300 ${
          desktopOpen ? "w-[260px]" : "w-0"
        }`}
      >
        <ul
          className={`overflow-y-auto scrollbar-hide h-[calc(100vh-4rem)] p-4 space-y-3 ${
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

        {/* Desktop Toggle Button */}
        <div className="absolute top-14 right-[-35px]">
          <button
            onClick={toggleDesktop}
            className="text-2xl bg-blue-600 p-1 rounded-lg"
          >
            <LuPanelBottomOpen />
          </button>
        </div>
      </div>
    </>
  );
}

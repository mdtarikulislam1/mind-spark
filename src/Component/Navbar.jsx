import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserAlt,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import { NavLink } from "react-router";
import useSidebarStore from "../Zustand-state/useSidebarStore";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { desktopOpen, toggleDesktop } = useSidebarStore();

  const navItems = [
    { name: "Home", icon: <FaHome />, link: "/" },
    {
      name: "Profile",
      icon: <FaUserAlt />,
      subItems: [
        { name: "My Account", link: "/profile/account", icon: <FaUserAlt /> },
        { name: "Settings", link: "/profile/settings", icon: <FaCog /> },
      ],
    },
    {
      name: "Settings",
      icon: <FaCog />,
      subItems: [
        { name: "Privacy", link: "/settings/privacy", icon: <FaCog /> },
        {
          name: "Notifications",
          link: "/settings/notifications",
          icon: <FaUserAlt />,
        },
      ],
    },
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const activeClass = "bg-blue-800";

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white flex items-center justify-between px-4 py-3  z-50">
        <h1 className="text-lg font-bold">Mind Spark</h1>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-2xl lg:hidden focus:outline-none"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop toggle */}
        <button
          onClick={toggleDesktop}
          className="hidden lg:block text-2xl focus:outline-none"
        >
          {desktopOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

    
      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 pt-16 h-screen w-64 text-white bg-blue-700 z-40 transition-transform duration-300
      ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="overflow-y-auto h-[calc(100vh-4rem)] p-4 space-y-3 scrollbar-none">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <>
                  <div
                    onClick={() => toggleSubmenu(index)}
                    className="flex items-center justify-between text-lg cursor-pointer hover:bg-blue-800 px-3 py-2 rounded-md transition"
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

                  {item.subItems && activeSubmenu === index && (
                    <ul className="ml-10 mt-2 space-y-2 w-full">
                      {item.subItems.map((sub, subIndex) => (
                        <li key={subIndex} className="w-full">
                          <NavLink
                            to={sub.link}
                            className={({ isActive }) =>
                              `flex items-center w-full text-sm px-2 py-2 rounded-md ${
                                isActive ? "bg-blue-800" : "hover:bg-blue-800"
                              }`
                            }
                          >
                            {sub.icon && (
                              <span className="mr-2">{sub.icon}</span>
                            )}
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
                      isActive ? activeClass : "hover:bg-blue-800"
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
        className={`hidden lg:block fixed top-0 left-0 pt-16 h-screen text-white bg-blue-700 z-40 transition-all duration-300 
      ${desktopOpen ? "w-[270px]" : "w-0"}`}
      >
        <ul
          className={`overflow-y-auto h-[calc(100vh-4rem)] p-4 space-y-3 scrollbar-none ${
            desktopOpen ? "block" : "hidden"
          }`}
        >
          {navItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <>
                  <div
                    onClick={() => toggleSubmenu(index)}
                    className="flex items-center justify-between text-lg cursor-pointer hover:bg-blue-800 px-3 py-2 rounded-md transition"
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

                  {item.subItems && activeSubmenu === index && desktopOpen && (
                    <ul className="ml-10 mt-2 space-y-2 w-full">
                      {item.subItems.map((sub, subIndex) => (
                        <li key={subIndex} className="w-full">
                          <NavLink
                            to={sub.link}
                            className={({ isActive }) =>
                              `flex items-center w-full text-sm px-2 py-2 rounded-md ${
                                isActive ? "bg-blue-800" : "hover:bg-blue-800"
                              }`
                            }
                          >
                            {sub.icon && (
                              <span className="mr-2">{sub.icon}</span>
                            )}
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
                      isActive ? activeClass : "hover:bg-blue-800"
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
    </>
  );
}

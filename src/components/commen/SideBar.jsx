import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LogOut } from "lucide-react";
import { PiBankFill } from "react-icons/pi";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdTextsms } from "react-icons/md";
import { ImMenu } from "react-icons/im";

// Helper to merge Tailwind classes
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const navigationItems = [
    { icon: <PiBankFill />, name: "Bank", href: "/bank" },
    { icon: <FaUser />, name: "Agent", href: "/agent" },
    { icon: <RxDashboard />, name: "Deposit Code", href: "/depositcode" },
    { icon: <MdTextsms />, name: "SMS Template", href: "/smstemplate" },
    ...(user?.role === "admin"
      ? [{ icon: <FaUsers />, name: "UserList", href: "/user" }]
      : []),
  ];

  const sidebarWidth = isExpanded ? "w-64" : "w-16";

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity",
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed left-0 top-0 h-screen z-30 flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out",
          sidebarWidth,
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Header */}
        <div className="flex items-center border-b border-gray-200 p-4">
          <div className="flex items-center cursor-pointer gap-2.5">
            {/* <div className="h-[40px] w-[40px] flex justify-center items-center text-white bg-black text-xl font-medium rounded-md">
              F
            </div> */}
          <img src="/src/assets/fincollect.png" alt="" className="h-[40px] w-[40px]"/>
            {isExpanded && (
              <span>
                <p className="text-[20px] text-gray-800 font-bold whitespace-nowrap">
                  FinCollect
                </p>
                <p className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                  Maxence Infotech
                </p>
              </span>
            )}
          </div>

          {/* Mobile close */}
          {/* <button
            className="md:hidden ml-auto"
            onClick={() => setIsMobileOpen(false)}
          >
            ✕
          </button> */}
        </div>

        {/* Navigation */}
        <ul className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href; // ✅ Check active path
            return (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.href)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors w-full text-left"
                >
                  <span
                    className={cn(
                      "text-2xl transition-colors duration-200",
                      isActive ? "text-blue-600" : "text-gray-700"
                    )}
                  >
                    {item.icon}
                  </span>
                  {isExpanded && (
                    <span  className={cn(
                      "text-sm font-medium",
                      isActive ? "text-blue-600 whitespace-nowrap" : "text-gray-800 whitespace-nowrap"
                    )}>
                      {item.name}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="p-3">
          <button
            className="flex items-center gap-2 w-full p-2 bg-red-500 hover:bg-red-600 rounded-md text-sm text-white font-medium"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <LogOut size={16} />
            {isExpanded && "Logout"}
          </button>
        </div>
      </nav>

   
     {/* Mobile menu button */}
{!isMobileOpen && (
  <button
    className="fixed top-4 left-4 z-40 md:hidden h-[40px] w-[40px] flex items-center justify-center bg-black text-white rounded-md text-lg font-semibold shadow-md"
    onClick={() => setIsMobileOpen(true)}
  >
    <ImMenu />
  </button>
)}


      {/* Main content */}
      <div
        className={cn(
          "transition-all duration-300",
          isExpanded ? "md:ml-64" : "md:ml-16"
        )}
      >
        <div className="p-2">{children}</div>
      </div>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  BookOpenIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar({ user, onLogout }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
    },
    {
      name: "Courses",
      href: "/courses",
      icon: <BookOpenIcon className="h-5 w-5" />,
    },
    {
      name: "Skills",
      href: "/skills",
      icon: <GraduationCapIcon className="h-5 w-5" />,
    },
    {
      name: "Job Matching",
      href: "/jobs",
      icon: <BriefcaseIcon className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-20 p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-600"
        >
          {isOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                CareerBridge
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span
                    className={`mr-3 ${
                      isActive ? "text-blue-500" : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User and Logout */}
          <div className="p-4 border-t border-gray-200">
            {user && (
              <div className="flex items-center mb-4 px-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium text-gray-600">
                      {user.first_name?.charAt(0) || ""}
                      {user.last_name?.charAt(0) || ""}
                    </span>
                  )}
                </div>
                <div className="ml-3 flex-1 truncate">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>
            )}

            <Button
              onClick={onLogout}
              className="w-full flex items-center justify-center"
              variant="outline"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

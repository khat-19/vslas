import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { api } from "../services/api";
// import { LoadingSpinner } from "./LoadingSpinner";
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
  ChartBarIcon,
  UserPlusIcon,
  DocumentChartBarIcon,
  ArrowTrendingUpIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

interface DashboardStats {
  totalRevenue: number;
  totalUsers: number;
  totalSales: number;
  growth: string;
}

interface RecentActivity {
  type: string;
  time: string;
}

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
  { name: "Users", href: "/users", icon: UsersIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  { name: "Help", href: "/help", icon: QuestionMarkCircleIcon },
];

const quickActions = [
  { name: "Add User", href: "/users/add", icon: UserPlusIcon },
  { name: "Create Report", href: "/reports/new", icon: DocumentChartBarIcon },
  { name: "View Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Update Profile", href: "/profile", icon: Cog6ToothIcon },
];

export function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 54375,
    totalUsers: 2345,
    totalSales: 1247,
    growth: "+24.5%",
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    { type: "New user registered", time: "2 minutes ago" },
    { type: "New user registered", time: "2 minutes ago" },
    { type: "New user registered", time: "2 minutes ago" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(1);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } fixed inset-y-0 z-30 transform bg-[#15171E] transition-all duration-300 ease-in-out md:relative ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo and Toggle */}
        <div className="flex h-16 items-center justify-between px-4">
          <span
            className={`text-xl font-bold text-white ${
              !isSidebarOpen && "hidden"
            }`}
          >
            VSLAs
          </span>
          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden text-white md:block"
          >
            {isSidebarOpen ? (
              <ChevronDoubleLeftIcon className="h-6 w-6" />
            ) : (
              <ChevronDoubleRightIcon className="h-6 w-6" />
            )}
          </button>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white md:hidden"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`mt-2 flex items-center rounded-lg px-4 py-2.5 transition-colors duration-200 
                ${
                  isActiveRoute(item.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-500 md:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <span className="ml-4 text-lg font-semibold">VSla</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative"
              >
                <BellIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                {notifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {/* Sample notifications */}
                    <div className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            New user registered
                          </p>
                          <p className="text-sm text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    {/* More notifications... */}
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="relative"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                  <img
                    src="https://via.placeholder.com/32"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Change Profile
                  </Link>
                  <Link
                    to="/change-password"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-6 ${
            !isSidebarOpen && "md:ml-20"
          }`}
        >
          <h1 className="mb-6 text-2xl font-bold">Dashboard Overview</h1>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Revenue
                </h3>
                <ChartBarIcon className="h-5 w-5 text-blue-500" />
              </div>
              <p className="mt-2 text-3xl font-semibold">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Users
                </h3>
                <UsersIcon className="h-5 w-5 text-blue-500" />
              </div>
              <p className="mt-2 text-3xl font-semibold">
                {stats.totalUsers.toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Sales
                </h3>
                <DocumentChartBarIcon className="h-5 w-5 text-blue-500" />
              </div>
              <p className="mt-2 text-3xl font-semibold">
                {stats.totalSales.toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Growth</h3>
                <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />
              </div>
              <p className="mt-2 text-3xl font-semibold text-green-500">
                {stats.growth}
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Activity */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                    <div>
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    to={action.href}
                    className="flex items-center rounded-lg border p-4 hover:bg-gray-50"
                  >
                    <action.icon className="h-6 w-6 text-gray-500" />
                    <span className="ml-3 font-medium">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

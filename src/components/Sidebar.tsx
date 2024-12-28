import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Settings, 
  HelpCircle, 
  Menu,
  ChevronLeft
} from 'lucide-react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Help', path: '/dashboard/help' },
  ];

  return (
    <div 
      className={`bg-[#14162E] text-white h-screen transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">VSLAs</h1>}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-4 ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              } transition-colors ${isCollapsed ? 'justify-center' : ''}`
            }
          >
            <item.icon size={24} />
            {!isCollapsed && <span className="ml-4">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
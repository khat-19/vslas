import React from 'react';
import { Sidebar } from './Sidebar';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$54,375',
      icon: DollarSign,
      change: '+14.5%'
    },
    {
      title: 'Total Users',
      value: '2,345',
      icon: Users,
      change: '+21.2%'
    },
    {
      title: 'Total Sales',
      value: '1,247',
      icon: ShoppingCart,
      change: '+12.8%'
    },
    {
      title: 'Growth',
      value: '+24.5%',
      icon: TrendingUp,
      change: '+4.3%'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                  <stat.icon className="text-blue-500" size={24} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <span className="text-green-500 text-sm">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              {/* Activity list would go here */}
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">New user registered</p>
                      <p className="text-sm text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 text-left hover:bg-gray-50 rounded-lg border">
                  Add User
                </button>
                <button className="p-4 text-left hover:bg-gray-50 rounded-lg border">
                  Create Report
                </button>
                <button className="p-4 text-left hover:bg-gray-50 rounded-lg border">
                  View Analytics
                </button>
                <button className="p-4 text-left hover:bg-gray-50 rounded-lg border">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
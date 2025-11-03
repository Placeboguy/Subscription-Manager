import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useSubscriptions } from '../Context/SubscriptionContext';
import StatCard from '../Component/StatCard';
import {
  IconCheckCircle,
  IconTrendingUp,
  IconPieChart,
} from '../Component/icons';

// Mock chart data
const chartData = [
  { name: 'Jan', spending: 60 },
  { name: 'Feb', spending: 75 },
  { name: 'Mar', spending: 90 },
  { name: 'Apr', spending: 85 },
  { name: 'May', spending: 110 },
  { name: 'Jun', spending: 120 },
];

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const { subscriptions, getStats } = useSubscriptions();
  const { totalActive, monthlyCost, yearlyCost } = getStats();
  const recentSubscriptions = subscriptions.slice(0, 3);
  const chartStrokeColor = '#9ca3af'; // Hardcoded for dark theme
  const chartGridColor = '#4b5563'; // Hardcoded for dark theme

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Active"
          value={totalActive}
          icon={<IconCheckCircle size={26} className="text-green-600" />}
          color="bg-green-100 dark:bg-green-900/50"
        />
        <StatCard
          title="Monthly Cost"
          value={`$${monthlyCost}`}
          icon={<IconTrendingUp size={26} className="text-blue-600" />}
          color="bg-blue-100 dark:bg-blue-900/50"
        />
        <StatCard
          title="Yearly Cost"
          value={`$${yearlyCost}`}
          icon={<IconPieChart size={26} className="text-purple-600" />}
          color="bg-purple-100 dark:bg-purple-900/50"
        />
      </div>

      {/* Charts and Recent Subs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Monthly Spending
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
              <XAxis dataKey="name" stroke={chartStrokeColor} />
              <YAxis stroke={chartStrokeColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937', // Hardcoded for dark theme
                  borderColor: chartGridColor,
                  borderRadius: '0.5rem',
                }}
                itemStyle={{
                  color: '#e5e7eb', // Hardcoded for dark theme
                }}
              />
              <Legend />
              <Bar
                dataKey="spending"
                fill="#3b82f6" // primary-500
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Subscriptions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Recent Additions
          </h3>
          <div className="space-y-4">
            {recentSubscriptions.map((sub) => (
              <div
                key={sub.id}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {sub.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${sub.cost.toFixed(2)} / {sub.billingCycle}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    sub.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

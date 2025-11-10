import React, { useState, useEffect } from 'react';
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
import { subscriptionAPI } from '../services/api';
import StatCard from '../Component/StatCard';

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const { subscriptions, getStats } = useSubscriptions();
  const stats = getStats();
  const totalActive = stats?.totalActive || 0;
  const monthlySpending = stats?.monthlySpending || 0;
  const yearlySpending = stats?.yearlySpending || 0;
  const recentSubscriptions = subscriptions.slice(0, 3);
  
  const [monthlyChartData, setMonthlyChartData] = useState([]);
  const [yearlyChartData, setYearlyChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch chart data
  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      const [monthlyRes, yearlyRes] = await Promise.all([
        subscriptionAPI.getMonthlyChartData(),
        subscriptionAPI.getYearlyChartData(),
      ]);
      
      if (monthlyRes.success && monthlyRes.data) {
        setMonthlyChartData(monthlyRes.data);
      }
      if (yearlyRes.success && yearlyRes.data) {
        setYearlyChartData(yearlyRes.data);
      }
      setLoading(false);
    };

    fetchChartData();
  }, [subscriptions]); // Re-fetch when subscriptions change

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
          icon="✓"
          color="bg-green-100 dark:bg-green-900/50"
        />
        <StatCard
          title="Monthly Spending"
          value={`$${monthlySpending.toFixed(2)}`}
          icon="📈"
          color="bg-blue-100 dark:bg-blue-900/50"
        />
        <StatCard
          title="Yearly Spending"
          value={`$${yearlySpending.toFixed(2)}`}
          icon="📊"
          color="bg-purple-100 dark:bg-purple-900/50"
        />
      </div>

      {/* Left: Recent Subscriptions | Right: Yearly Spending Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Recent Subscriptions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Recent Additions
          </h3>
          <div className="space-y-4">
            {recentSubscriptions.length > 0 ? (
              recentSubscriptions.map((sub) => (
                <div
                  key={sub._id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {sub.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ${sub.price?.toFixed(2) || '0.00'} / {sub.frequency}
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
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No subscriptions yet</p>
            )}
          </div>
        </div>

        {/* Right - Yearly Spending Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Total Spending - 12 Months
          </h3>

          {loading ? (
            <div className="flex items-center justify-center h-[350px]">
              <p className="text-gray-500 dark:text-gray-400">Loading chart...</p>
            </div>
          ) : yearlyChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={yearlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="name" stroke={chartStrokeColor} />
                <YAxis stroke={chartStrokeColor} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    borderColor: chartGridColor,
                    borderRadius: '0.5rem',
                  }}
                  itemStyle={{
                    color: '#e5e7eb',
                  }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Legend />
                <Bar
                  dataKey="spending"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  name="Yearly Spending"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[350px]">
              <p className="text-gray-500 dark:text-gray-400">No spending data yet. Add subscriptions to see your chart!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

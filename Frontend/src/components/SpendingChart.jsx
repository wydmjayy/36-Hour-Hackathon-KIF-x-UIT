import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const data = [
  { month: 'Oct', amount: 4500 },
  { month: 'Nov', amount: 5200 },
  { month: 'Dec', amount: 4800 },
  { month: 'Jan', amount: 6100 },
  { month: 'Feb', amount: 5900 },
  { month: 'Mar', amount: 7200 },
];

const pieData = [
  { name: 'OTT', value: 2500, color: '#1F7A63' },
  { name: 'SaaS', value: 4230, color: '#F4A261' },
  { name: 'Music', value: 119, color: '#E8585C' },
  { name: 'Other', value: 350, color: '#4CAF50' },
];

const SpendingChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
      <div className="card-base h-[400px]">
        <h3 className="text-lg font-bold text-textDark mb-6">Monthly Spending Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: '#f8f8f8' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="amount" fill="#1F7A63" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card-base h-[400px]">
        <h3 className="text-lg font-bold text-textDark mb-6">Category Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-bold text-gray-400">
              Split
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;

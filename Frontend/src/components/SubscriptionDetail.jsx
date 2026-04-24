import React from 'react';
import { motion } from 'framer-motion';
import ZombieScoreBar from './ZombieScoreBar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SubscriptionDetail = ({ subscription, onClose, onCancel }) => {
  if (!subscription) return null;

  const data = subscription.history.map((price, i) => ({
    name: `Month ${i + 1}`,
    spend: price,
  }));

  const usageData = subscription.usageStats.weekly.map((hours, i) => ({
    name: `Week ${i + 1}`,
    hours: hours,
  }));

  const handleOptimize = () => {
    const suggestions = [
      "Consider switching to the Annual plan to save 20%.",
      "Sharing this plan with family members could reduce costs by ₹150/mo.",
      "A cheaper alternative 'Micro-SaaS' offers similar features for ₹199/mo.",
      "You haven't used the premium features this month. Downgrade to 'Basic'?"
    ];
    const tip = suggestions[Math.floor(Math.random() * suggestions.length)];
    alert(`Optimization Insight for ${subscription.name}:\n\n${tip}`);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-60 overflow-y-auto"
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-smooth"
          >
            ✕
          </button>
          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Subscription Detail</span>
        </div>

        {/* Hero */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 bg-warmBg rounded-2xl flex items-center justify-center text-4xl">
            {subscription.icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-textDark">{subscription.name}</h2>
            <div className="flex gap-2 mt-2">
              <span className="bg-primary-50 text-primary-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {subscription.category}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {subscription.status}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-warmBg p-6 rounded-2xl">
            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Monthly Price</p>
            <p className="text-2xl font-bold text-textDark">₹{subscription.price}</p>
          </div>
          <div className="bg-warmBg p-6 rounded-2xl">
            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Renewal Date</p>
            <p className="text-xl font-bold text-textDark">{subscription.renewalDate}</p>
          </div>
        </div>

        {/* Health Section */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-textDark mb-4">Subscription Health</h3>
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500">Zombie Score</span>
              <span className={`font-bold ${subscription.zombieScore > 70 ? 'text-error' : 'text-primary-500'}`}>
                {subscription.zombieScore}/100
              </span>
            </div>
            <ZombieScoreBar score={subscription.zombieScore} />
            <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
              * Based on last activity ({subscription.lastUsed}) and average weekly usage ({subscription.usageStats.monthlyAvg} hrs).
            </p>
          </div>
        </div>

        {/* Usage Chart */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-textDark mb-4">Usage Patterns (Weekly Hours)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#2D6A4F" 
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-auto">
          <button 
            onClick={() => onCancel(subscription)}
            className="flex-1 bg-error/10 text-error font-bold py-4 rounded-2xl hover:bg-error/20 transition-smooth"
          >
            Terminate
          </button>
          <button 
            onClick={handleOptimize}
            className="flex-1 bg-textDark text-white font-bold py-4 rounded-2xl hover:bg-black transition-smooth"
          >
            Optimize Plan
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionDetail;

import React from 'react';
import Navbar from '../components/Navbar';
import SavingsSummary from '../components/SavingsSummary';
import SavingsChart from '../components/SavingsChart';
import HistoryList from '../components/HistoryList';
import { motion } from 'framer-motion';

const Savings = () => {
  // Mock Visualization Data
  const timelineData = [
    { name: 'Nov', saved: 1200 },
    { name: 'Dec', saved: 2100 },
    { name: 'Jan', saved: 1800 },
    { name: 'Feb', saved: 4500 },
    { name: 'Mar', saved: 7200 },
    { name: 'Apr', saved: 12694 },
  ];

  const beforeAfterData = [
    { name: 'Before', value: 18500 },
    { name: 'After', value: 5806 },
  ];

  const categoryData = [
    { name: 'OTT', value: 3450 },
    { name: 'SaaS', value: 5670 },
    { name: 'Health', value: 1599 },
    { name: 'News', value: 1975 },
  ];

  const history = [
    { action: "Cancelled Adobe CC", icon: "🎨", date: "April 08, 2026", saved: 4230, type: "Full Cut" },
    { action: "Merged Spotify Family", icon: "🎵", date: "April 06, 2026", saved: 238, type: "Optimization" },
    { action: "Cancelled Zeroify", icon: "🧘", date: "April 02, 2026", saved: 1599, type: "Full Cut" },
    { action: "Downgraded LinkedIn", icon: "💼", date: "March 28, 2026", saved: 800, type: "Plan Trim" },
    { action: "Cancelled Hotstar Mini", icon: "🌟", date: "March 24, 2026", saved: 299, type: "Full Cut" },
  ];

  return (
    <div className="min-h-screen bg-warmBg pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold uppercase mb-4"
            >
              Financial Recovery Report
            </motion.div>
            <h1 className="text-4xl font-black text-textDark">Savings Tracker 📈</h1>
            <p className="text-gray-500 mt-2">Visualizing your path to financial freedom.</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available to Invest</p>
            <p className="text-3xl font-black text-primary-500">₹12,694</p>
          </div>
        </div>

        {/* Summary Stats */}
        <SavingsSummary 
          totalSaved={34500} 
          monthlySavings={12694} 
          cancelledCount={14} 
        />

        {/* Charts Section */}
        <SavingsChart 
          timelineData={timelineData} 
          beforeAfterData={beforeAfterData} 
          categoryData={categoryData} 
        />

        {/* Action Logs */}
        <HistoryList history={history} />

        <div className="mt-12 text-center">
            <button className="bg-textDark text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-black transition-smooth">
                Export Savings Report (PDF)
            </button>
        </div>
      </main>
    </div>
  );
};

export default Savings;

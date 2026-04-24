import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import SubscriptionCard from '../components/SubscriptionCard';
import AlertBanner from '../components/AlertBanner';
import FinancialTrimButton from '../components/FinancialTrimButton';
import SpendingChart from '../components/SpendingChart';
import { useSubscriptions } from '../context/SubscriptionContext';
import { motion, AnimatePresence } from 'framer-motion';
import TrimModal from '../components/TrimModal';
import SubscriptionDetail from '../components/SubscriptionDetail';

const Home = () => {

  // ✅ KEEP existing context (DO NOT REMOVE)
  const { subscriptions, isScanning, stats, scanSubscriptions } = useSubscriptions();

  const [isTrimModalOpen, setIsTrimModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleCancel = (sub) => {
    const subject = `Cancellation of Subscription: ${sub.name}`;
    const body = `Hi ${sub.name} Support,\n\nI would like to cancel my subscription associated with this email.\n\nThank you.`;
    window.location.href = `mailto:support@${sub.name.toLowerCase()}.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-warmBg pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">

        {/* Intro Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-textDark">Welcome back, Surgeon! 👋</h1>
            <p className="text-gray-500 mt-1">Here's your subscription health overview.</p>
          </div>
          <button
            onClick={scanSubscriptions}
            disabled={isScanning}
            className={`btn-primary flex items-center gap-2 ${isScanning ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isScanning ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Scanning...
              </>
            ) : (
              '🔍 Scan My Subscriptions'
            )}
          </button>
        </div>

        {/* Alert Banner */}
        <AlertBanner message="⚠️ Canva trial ends in 3 days. Action required if you don't want to be charged ₹499." />

        {/* Hero Summary Strip */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div variants={itemVariants}>
            <SummaryCard 
              title="Monthly Spend" 
              value={`₹${stats.totalMonthlySpend.toLocaleString()}`}
              icon="💸" 
              trend={stats.totalMonthlySpend > 0 ? "+12%" : "0%"} 
              colorClass="text-primary-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SummaryCard 
              title="Zombie Subs" 
              value={stats.zombieSubscriptions}
              icon="🧟" 
              trend={stats.zombieSubscriptions > 0 ? "-2" : "0"} 
              colorClass="text-error"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SummaryCard 
              title="Potential Savings" 
              value={`₹${stats.potentialSavings.toLocaleString()}`}
              icon="💰" 
              trend="Actionable" 
              colorClass="text-accent-500"
            />
          </motion.div>
        </motion.div>

        {/* Subscription Preview */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-textDark">Recent Subscriptions</h2>
            <Link to="/dashboard" className="text-primary-500 font-semibold hover:underline">View All</Link>
          </div>
          
          {subscriptions.length === 0 && !isScanning ? (
            <div className="card-base text-center py-12 bg-white/50 border-2 border-dashed border-gray-200">
              <p className="text-gray-400">No subscriptions found. Click scan to begin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {subscriptions.slice(0, 4).map((sub) => (
                <SubscriptionCard 
                  key={sub.id} 
                  sub={sub} 
                  onManage={(s) => setSelectedSubscription(s)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Graphs Section */}
        <SpendingChart />

        {/* Financial Trim Section */}
        <FinancialTrimButton onClick={() => setIsTrimModalOpen(true)} />

        <AnimatePresence>
          {isTrimModalOpen && (
            <TrimModal isOpen={isTrimModalOpen} onClose={() => setIsTrimModalOpen(false)} />
          )}
          {selectedSubscription && (
            <SubscriptionDetail 
              subscription={selectedSubscription} 
              onClose={() => setSelectedSubscription(null)}
              onCancel={handleCancel}
            />
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};

export default Home;
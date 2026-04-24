import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import SubscriptionTable from '../components/SubscriptionTable';
import SummaryCard from '../components/SummaryCard';
import { useSubscriptions } from '../context/SubscriptionContext';
import { motion, AnimatePresence } from 'framer-motion';
import TrimModal from '../components/TrimModal';
import FinancialTrimButton from '../components/FinancialTrimButton';
import SubscriptionDetail from '../components/SubscriptionDetail';

const Dashboard = () => {
  const { subscriptions, stats, verifiedPan, saveVerifiedPan } = useSubscriptions();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isTrimModalOpen, setIsTrimModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [panInput, setPanInput] = useState(verifiedPan || '');
  const [panError, setPanError] = useState(false);

  const familyData = useMemo(() => [
    { name: 'Pavan', pan: 'ABCDE1234F', father: 'Ramesh Kumar', dob: '12-05-2000' },
    { name: 'Aakruti', pan: 'FGHIJ5678K', father: 'Suresh Patel', dob: '23-08-2001' },
    { name: 'Jay', pan: 'LMNOP9012Q', father: 'Mahesh Shah', dob: '05-11-1999' },
    { name: 'Ishika', pan: 'QRSTU3456V', father: 'Rajesh Verma', dob: '17-02-2002' },
    { name: 'Aditya', pan: 'WXYZA7890B', father: 'Anil Mehta', dob: '30-07-2000' }
  ], []);

  const handleVerifyPan = () => {
    const uppercasedPan = panInput.toUpperCase();
    const isValid = familyData.some(member => member.pan === uppercasedPan);
    if (isValid) {
      saveVerifiedPan(uppercasedPan);
      setPanError(false);
    } else {
      setPanError(true);
    }
  };

  const currentUserByPan = verifiedPan ? familyData.find(member => member.pan === verifiedPan) : null;
  const otherFamilyMembers = currentUserByPan 
    ? familyData.filter(member => member.pan !== currentUserByPan.pan)
    : [];

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesFilter = filter === 'All' || sub.status === filter;
      const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [subscriptions, filter, search]);

  const handleCancel = (sub) => {
    const subject = `Cancellation of Subscription: ${sub.name}`;
    const body = `Hi ${sub.name} Support,\n\nI would like to cancel my subscription associated with this email.\n\nThank you.`;
    window.location.href = `mailto:support@${sub.name.toLowerCase()}.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDetails = (sub) => {
    setSelectedSubscription(sub);
  };

  return (
    <div className="min-h-screen bg-warmBg pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Top Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-textDark">Subscriptions Insight 📊</h1>
          <p className="text-gray-500 mt-1">Manage and optimize your recurring payments in one place.</p>
        </div>

        {/* PAN Card Verification Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-6 mb-10 transition-all duration-250 hover:shadow-md">
          <h2 className="text-xl font-bold text-textDark mb-4">Family Identity Verification</h2>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Input Section */}
            <div className="w-full md:w-1/3 flex flex-col justify-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter PAN Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  className={`input-base uppercase font-mono text-lg tracking-wider transition-colors ${verifiedPan ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200 focus:border-gray-200 focus:ring-0' : (panError ? 'border-error focus:ring-error' : '')}`} 
                  placeholder="e.g. ABCDE1234F"
                  value={panInput}
                  onChange={(e) => {
                    setPanInput(e.target.value);
                    setPanError(false);
                  }}
                  maxLength={10}
                  disabled={verifiedPan !== null}
                />
              </div>
              
              {panError && !verifiedPan && (
                <p className="text-error text-xs font-semibold mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> Invalid PAN Card No. Try again.
                </p>
              )}
              
              {!verifiedPan && (
                <button 
                  onClick={handleVerifyPan}
                  disabled={panInput.trim().length !== 10}
                  className="mt-4 px-4 py-2.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm w-full flex justify-center items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                  Save & Verify PAN
                </button>
              )}
              
              <AnimatePresence>
                {currentUserByPan && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl border border-primary-100 flex items-center gap-4 shadow-sm"
                  >
                    <div className="bg-primary-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-inner">
                      {currentUserByPan.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-primary-600 mb-0.5">Verified User</p>
                      <p className="font-bold text-lg text-gray-800">{currentUserByPan.name}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Separator for desktop */}
            <div className="hidden md:block w-px bg-gray-100"></div>

            {/* Family Members Section */}
            <div className="w-full md:w-2/3">
              {currentUserByPan ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <span className="bg-accent-500 w-2 h-2 rounded-full inline-block"></span>
                    Other Family Members
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {otherFamilyMembers.map((member, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        key={idx} 
                        className="p-4 border border-gray-100 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-250 bg-white group cursor-default"
                      >
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-50 group-hover:border-primary-100 transition-colors">
                          <div className="bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                            {member.name.charAt(0)}
                          </div>
                          <span className="font-bold text-gray-800 text-lg group-hover:text-primary-600">{member.name}</span>
                        </div>
                        <div className="space-y-1.5 text-sm mt-2">
                          <p className="flex justify-between items-center"><span className="text-gray-400">PAN</span> <span className="font-mono text-gray-700">{member.pan}</span></p>
                          <p className="flex justify-between items-center"><span className="text-gray-400">Father</span> <span className="text-gray-700">{member.father}</span></p>
                          <p className="flex justify-between items-center"><span className="text-gray-400">DOB</span> <span className="text-gray-700 border border-gray-100 px-2 py-0.5 rounded-md bg-gray-50">{member.dob}</span></p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[160px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50/50">
                  <span className="text-3xl mb-3 opacity-50">👨‍👩‍👧‍👦</span>
                  <p className="text-gray-500 text-center font-medium">
                    Enter a PAN Card number to automatically fetch linked family members.
                  </p>
                  <div className="flex gap-2 mt-4 text-xs font-mono text-gray-400 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                    <span>Quick Try:</span>
                    <button disabled={verifiedPan !== null} className="disabled:opacity-50 hover:text-primary-500 transition-colors cursor-pointer disabled:cursor-not-allowed" onClick={() => { setPanInput("ABCDE1234F"); setPanError(false); }}>ABCDE1234F</button>
                    <span>•</span>
                    <button disabled={verifiedPan !== null} className="disabled:opacity-50 hover:text-primary-500 transition-colors cursor-pointer disabled:cursor-not-allowed" onClick={() => { setPanInput("FGHIJ5678K"); setPanError(false); }}>FGHIJ5678K</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Top Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard 
            title="Total Subscriptions" 
            value={subscriptions.length} 
            icon="📇" 
            colorClass="text-primary-500"
          />
          <SummaryCard 
            title="Active Zombies" 
            value={subscriptions.filter(s => s.status === 'Zombie').length} 
            icon="🧟" 
            colorClass="text-error"
          />
          <SummaryCard 
            title="Monthly Burn Rate" 
            value={`₹${stats.totalMonthlySpend.toLocaleString()}`} 
            icon="🔥" 
            colorClass="text-accent-500"
          />
        </div>

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        </div>

        {/* Subscription Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SubscriptionTable 
            subscriptions={filteredSubscriptions} 
            onCancel={handleCancel}
            onDetails={handleDetails}
          />
        </motion.div>

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

export default Dashboard;

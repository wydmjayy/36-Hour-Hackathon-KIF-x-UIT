import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FamilyPlanCard from '../components/FamilyPlanCard';
import { motion, AnimatePresence } from 'framer-motion';

const FamilyPlan = () => {
  const [merging, setMerging] = useState(false);
  const [duplicates, setDuplicates] = useState([
    {
      id: 'd1',
      service: { name: 'Spotify', icon: '🎵' },
      users: ['Pavan (You)', 'Sneha (Wife)'],
      individualPrice: 119,
      familyPrice: 179
    },
    {
      id: 'd2',
      service: { name: 'Netflix', icon: '🎬' },
      users: ['Pavan (You)', 'Rajesh (Brother)'],
      individualPrice: 649,
      familyPrice: 799
    },
    {
      id: 'd3',
      service: { name: 'YouTube Premium', icon: '📺' },
      users: ['Pavan (You)', 'Sneha (Wife)', 'Kiran (Mom)'],
      individualPrice: 129,
      familyPrice: 189
    }
  ]);

  const handleMerge = (serviceName) => {
    setMerging(true);
    // Simulate merge process
    setTimeout(() => {
      setDuplicates(prev => prev.filter(d => d.service.name !== serviceName));
      setMerging(false);
      alert(`🤝 Success! ${serviceName} subscriptions have been merged into a single Family Plan. Enjoy the savings!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-warmBg pb-20">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block bg-primary-500/10 text-primary-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4"
          >
            Household Optimization
          </motion.div>
          <h1 className="text-4xl font-black text-textDark mb-4">Family Plan Merger 🧑‍👩‍👧‍👦</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We've identified potential overlaps in your household. Merge these plans to stop paying for the same service twice.
          </p>
        </div>

        {/* List of Duplicates */}
        <div className="space-y-8">
          <AnimatePresence mode='popLayout'>
            {duplicates.map((duplicate) => (
              <FamilyPlanCard 
                key={duplicate.id}
                {...duplicate}
                onMerge={handleMerge}
              />
            ))}
          </AnimatePresence>

          {duplicates.length === 0 && !merging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-base bg-white/50 border-2 border-dashed border-gray-200 py-20 text-center"
            >
              <div className="text-5xl mb-6">🏆</div>
              <h3 className="text-2xl font-bold text-gray-500">All Household Plans Optimized!</h3>
              <p className="text-gray-400 mt-2">No more duplicate subscriptions detected in your network.</p>
            </motion.div>
          )}

          {merging && (
            <div className="fixed inset-0 bg-textDark/20 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-textDark">Merging Accounts...</h3>
                <p className="text-gray-500 mt-2">Harmonizing household preferences</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FamilyPlan;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { user, isInitialized } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [verifiedPan, setVerifiedPan] = useState(localStorage.getItem('verifiedPan') || null);
  const [stats, setStats] = useState({
    totalMonthlySpend: 0,
    zombieSubscriptions: 0,
    potentialSavings: 0,
  });

  // Reset all data when user logs out, only if fully initialized
  useEffect(() => {
    if (isInitialized && !user) {
      setSubscriptions([]);
      setStats({
        totalMonthlySpend: 0,
        zombieSubscriptions: 0,
        potentialSavings: 0,
      });
      setVerifiedPan(null);
      localStorage.removeItem('verifiedPan');
    }
  }, [user, isInitialized]);

  const saveVerifiedPan = (pan) => {
    setVerifiedPan(pan);
    if(pan) {
      localStorage.setItem('verifiedPan', pan);
    } else {
      localStorage.removeItem('verifiedPan');
    }
  };

  const mockSubscriptions = [
    { 
      id: 1, 
      name: 'Netflix', 
      price: 649, 
      lastUsed: '2 days ago', 
      status: 'Active', 
      category: 'OTT', 
      icon: '🎬', 
      zombieScore: 15,
      renewalDate: 'April 24, 2026',
      history: [649, 649, 649, 649, 649, 649],
      usageStats: { weekly: [12, 14, 8, 15], monthlyAvg: 45 }
    },
    { 
      id: 2, 
      name: 'Spotify', 
      price: 119, 
      lastUsed: '1 week ago', 
      status: 'Active', 
      category: 'Music', 
      icon: '🎵', 
      zombieScore: 25,
      renewalDate: 'May 02, 2026',
      history: [119, 119, 119, 119, 119, 119],
      usageStats: { weekly: [18, 20, 15, 22], monthlyAvg: 75 }
    },
    { 
      id: 3, 
      name: 'Adobe CC', 
      price: 4230, 
      lastUsed: '24 days ago', 
      status: 'Zombie', 
      category: 'SaaS', 
      icon: '🎨', 
      zombieScore: 88,
      renewalDate: 'April 15, 2026',
      history: [4230, 4230, 4230, 4230, 4230, 4230],
      usageStats: { weekly: [0, 0.5, 0, 1], monthlyAvg: 1.5 }
    },
    { 
      id: 4, 
      name: 'Canva Pro', 
      price: 499, 
      lastUsed: '3 days ago', 
      status: 'Duplicate', 
      category: 'Design', 
      icon: '✨', 
      zombieScore: 40,
      renewalDate: 'April 20, 2026',
      history: [499, 499, 499, 499, 499, 499],
      usageStats: { weekly: [4, 5, 3, 6], monthlyAvg: 18 }
    },
    { 
      id: 5, 
      name: 'Zeroify', 
      price: 1599, 
      lastUsed: '45 days ago', 
      status: 'Zombie', 
      category: 'Health', 
      icon: '🧘', 
      zombieScore: 92,
      renewalDate: 'Expired',
      history: [1599, 1599, 1599, 1599, 1599, 1599],
      usageStats: { weekly: [0, 0, 0, 0], monthlyAvg: 0 }
    },
    { 
      id: 6, 
      name: 'LinkedIn Premium', 
      price: 1800, 
      lastUsed: '12 days ago', 
      status: 'Active', 
      category: 'Social', 
      icon: '💼', 
      zombieScore: 35,
      renewalDate: 'May 10, 2026',
      history: [1800, 1800, 1800, 1800, 1800, 1800],
      usageStats: { weekly: [2, 3, 1, 2], monthlyAvg: 8 }
    },
    { 
      id: 7, 
      name: 'Amazon Prime', 
      price: 1499, 
      lastUsed: '2 months ago', 
      status: 'Zombie', 
      category: 'SaaS', 
      icon: '📦', 
      zombieScore: 85,
      renewalDate: 'May 15, 2026',
      history: [1499, 1499, 1499, 1499, 1499, 1499],
      usageStats: { weekly: [0, 0, 0, 0], monthlyAvg: 1 }
    },
    { 
      id: 8, 
      name: 'Hotstar', 
      price: 299, 
      lastUsed: '1 day ago', 
      status: 'Active', 
      category: 'OTT', 
      icon: '🌟', 
      zombieScore: 10,
      renewalDate: 'April 28, 2026',
      history: [299, 299, 299, 299, 299, 299],
      usageStats: { weekly: [20, 25, 18, 30], monthlyAvg: 93 }
    },
  ];

  const scanSubscriptions = async () => {
    setIsScanning(true);
    // Simulate scan delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubscriptions(mockSubscriptions);
    calculateStats(mockSubscriptions);
    setIsScanning(false);
  };

  const calculateStats = (subs) => {
    const total = subs.reduce((acc, sub) => acc + sub.price, 0);
    const zombies = subs.filter(sub => sub.status === 'Zombie').length;
    const savings = subs.filter(sub => sub.status === 'Zombie' || sub.status === 'Duplicate')
                        .reduce((acc, sub) => acc + sub.price, 0);
    
    setStats({
      totalMonthlySpend: total,
      zombieSubscriptions: zombies,
      potentialSavings: savings,
    });
  };

  const value = {
    subscriptions,
    isScanning,
    stats,
    verifiedPan,
    saveVerifiedPan,
    scanSubscriptions,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within SubscriptionProvider');
  }
  return context;
};

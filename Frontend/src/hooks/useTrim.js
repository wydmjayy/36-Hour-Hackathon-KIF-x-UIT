import { useMemo } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';

const useTrim = () => {
  const { subscriptions } = useSubscriptions();

  const trimData = useMemo(() => {
    const zombies = subscriptions.filter(sub => sub.status === 'Zombie');
    const totalSavings = zombies.reduce((acc, sub) => acc + sub.price, 0);
    
    return {
      zombies,
      totalSavings,
      count: zombies.length
    };
  }, [subscriptions]);

  const generateEmailDraft = (sub) => {
    return {
      id: sub.id,
      name: sub.name,
      to: `support@${sub.name.toLowerCase()}.com`,
      subject: `Cancellation Request: ${sub.name} Subscription`,
      body: `Hi ${sub.name} Support Team,\n\nI am writing to request the cancellation of my subscription associated with this email address. I have not been using the service recently and would like to stop any further recurring charges.\n\nPlease confirm once the cancellation is processed.\n\nBest regards,\nSubscription Surgeon User`
    };
  };

  return {
    ...trimData,
    generateEmailDraft
  };
};

export default useTrim;

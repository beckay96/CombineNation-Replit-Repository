import { useState, useEffect } from 'react';

export function useAuthTabSync(initialTab: string | undefined, accountExists: boolean | undefined) {
  // Default to 'signup' tab for new users, 'login' for returning users
  const [activeTab, setActiveTab] = useState(initialTab || (accountExists ? 'login' : 'signup'));

  // Update local state when the accountExists prop changes
  useEffect(() => {
    if (accountExists !== undefined) {
      setActiveTab(accountExists ? 'login' : 'signup');
    }
  }, [accountExists]);

  // Synchronize with the parent component when the initialTab prop changes
  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, activeTab]);

  // Function to handle tab change and ensure parent component knows about it
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // We need to synchronize this state with the parent component
    if (typeof window !== 'undefined') {
      // Dispatch a custom event that the parent component can listen for
      const event = new CustomEvent('authTabChange', { detail: { tab: value } });
      window.dispatchEvent(event);
    }
  };

  return { activeTab, handleTabChange };
}

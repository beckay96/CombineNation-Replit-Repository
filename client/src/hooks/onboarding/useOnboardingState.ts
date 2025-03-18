import { useState, useEffect } from 'react';

export function useOnboardingState(initialStep: number = 0) {
  // Authentication form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  // Onboarding flow state
  const [step, setStep] = useState(initialStep);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [accountExists, setAccountExists] = useState<boolean | undefined>(undefined);
  const [activeAuthTab, setActiveAuthTab] = useState<string>('signup');

  // Listen for auth tab changes from the AccountCreationStep component
  useEffect(() => {
    const handleAuthTabChange = (event: any) => {
      console.log('Auth tab changed:', event.detail?.tab);
      if (event.detail && event.detail.tab) {
        setActiveAuthTab(event.detail.tab);
      }
    };

    // Add event listener
    window.addEventListener('authTabChange', handleAuthTabChange);

    // Clean up
    return () => {
      window.removeEventListener('authTabChange', handleAuthTabChange);
    };
  }, []);

  // Reset processing state after a timeout if it gets stuck
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isProcessing) {
      timeout = setTimeout(() => {
        console.log('Processing state reset after timeout');
        setIsProcessing(false);
      }, 8000); // 8 second timeout
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isProcessing]);

  // Function to reset form fields (used after successful auth)
  const resetFormFields = () => {
    setPassword('');
    setConfirmPassword('');
    // Don't reset email or displayName as they'll be used in the next steps
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    displayName,
    setDisplayName,
    step,
    setStep,
    selectedOptionIndex,
    setSelectedOptionIndex,
    isProcessing,
    setIsProcessing,
    accountExists,
    setAccountExists,
    activeAuthTab,
    setActiveAuthTab,
    resetFormFields
  };
}

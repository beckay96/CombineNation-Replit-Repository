import React from 'react';
import { useOnboardingState } from '@/hooks/onboarding/useOnboardingState';
import { useOnboardingSteps } from '@/hooks/onboarding/useOnboardingSteps';
import { useOnboardingActions } from '@/hooks/onboarding/actions';
import OnboardingContent from './OnboardingContent';

interface OnboardingInitialProps {
  onComplete?: () => void; // Make onComplete optional
}

const OnboardingInitial: React.FC<OnboardingInitialProps> = ({ onComplete = () => {} }) => {
  const { getSteps } = useOnboardingSteps();
  const {
    step,
    setStep,
    selectedOptionIndex,
    setSelectedOptionIndex,
    isProcessing,
    setIsProcessing,
    accountExists,
    setAccountExists,
    activeAuthTab,
    resetFormFields
  } = useOnboardingState();

  const {
    handleSignup,
    handleNext,
    handleBack,
    handleRoleSelect,
    handleProfileSubmit,
    handleFamilySetupComplete,
    handleSchoolSetupComplete
  } = useOnboardingActions({
    step,
    setStep,
    selectedOptionIndex,
    setSelectedOptionIndex,
    isProcessing,
    setIsProcessing,
    accountExists,
    setAccountExists,
    getSteps,
    onComplete,
    resetFormFields
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <OnboardingContent
          step={step}
          onSignupSubmit={handleSignup}
          onProfileSubmit={handleProfileSubmit}
          onOptionSelect={handleRoleSelect}
          onFamilySetupComplete={handleFamilySetupComplete}
          onSchoolSetupComplete={handleSchoolSetupComplete}
          isLoading={isProcessing}
          isProcessing={isProcessing}
          accountExists={accountExists}
          activeAuthTab={activeAuthTab}
        />
      </main>
    </div>
  );
};

export default OnboardingInitial;
import React from 'react';
import { ProfileDetails } from '@/hooks/auth/services/profileUpdateService';
import AccountCreationStep from './AccountCreationStep';
import ProfileDetailsStep from './ProfileDetailsStep';
import SchoolSetupStep from './SchoolSetupStep';
import FamilySetupStep from './FamilySetupStep';
import WelcomeStep from './WelcomeStep';
import StepIndicator from './StepIndicator';
import { useAppState } from '@/hooks/appState/AppStateContext';

const ONBOARDING_STEPS = [
  { number: 1, title: 'Create your account' },
  { number: 2, title: 'Choose your experience' },
  { number: 3, title: 'Personal details' }
];

interface OnboardingContentProps {
  step: number;
  onSignupSubmit: (data: { displayName: string; email: string; password: string; confirmPassword: string; }) => Promise<void>;
  onProfileSubmit: (data: ProfileDetails) => Promise<void>;
  onOptionSelect: (optionIndex: number) => void;
  onFamilySetupComplete: () => void;
  onSchoolSetupComplete: () => void;
  isLoading: boolean;
  isProcessing: boolean;
  accountExists?: boolean;
  activeAuthTab?: string;
}

const OnboardingContent: React.FC<OnboardingContentProps> = ({
  step,
  onSignupSubmit,
  onProfileSubmit,
  onOptionSelect,
  onFamilySetupComplete,
  onSchoolSetupComplete,
  isLoading,
  isProcessing,
  accountExists,
  activeAuthTab
}) => {
  const { isAddingFamily, isAddingSchool } = useAppState();

  // Only show step indicator for signup flow and after account creation
  const showStepIndicator = activeAuthTab === 'signup' && step > 0;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {showStepIndicator && <StepIndicator currentStep={step} steps={ONBOARDING_STEPS} />}

      {step === 0 && (
        <div className="w-full max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {activeAuthTab === 'login' ? 'Welcome Back to CombineNation' : 'Welcome to CombineNation'}
          </h1>
          <AccountCreationStep 
            onSubmit={onSignupSubmit}
            isLoading={isLoading || isProcessing}
          />
        </div>
      )}

      {step === 1 && (
        <WelcomeStep 
          selectedOptionIndex={null} 
          onOptionSelect={onOptionSelect} 
        />
      )}

      {step === 2 && (
        <ProfileDetailsStep 
          onSubmit={onProfileSubmit} 
          isLoading={isProcessing} 
        />
      )}

      {isAddingFamily && step === 3 && (
        <FamilySetupStep 
          onComplete={onFamilySetupComplete} 
          isLoading={isProcessing} 
        />
      )}

      {isAddingSchool && (
        ((!isAddingFamily && step === 3) || (isAddingFamily && step === 4)) && (
          <SchoolSetupStep 
            onComplete={onSchoolSetupComplete} 
            isLoading={isProcessing} 
          />
        )
      )}
    </div>
  );
};

export default OnboardingContent;
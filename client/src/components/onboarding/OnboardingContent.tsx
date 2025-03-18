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
  'Create your account',
  'Personal details',
  'Choose your experience'
];

interface OnboardingContentProps {
  step: number;
  onStepComplete: (data: any) => Promise<void>;
  onOptionSelect: (optionIndex: number) => void;
  onFamilySetupComplete: () => void;
  onSchoolSetupComplete: () => void;
  isLoading: boolean;
  isProcessing: boolean;
  accountExists?: boolean;
  activeAuthTab?: string;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  displayName: string;
  setDisplayName: (displayName: string) => void;

}

const OnboardingContent: React.FC<OnboardingContentProps> = ({
  step,
  onStepComplete,
  onOptionSelect,
  onFamilySetupComplete,
  onSchoolSetupComplete,
  isLoading,
  isProcessing,
  accountExists,
  activeAuthTab,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  displayName,
  setDisplayName
}) => {
  const { isAddingFamily, isAddingSchool } = useAppState();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <StepIndicator currentStep={step} steps={ONBOARDING_STEPS} />

      {step === 0 && (
        <AccountCreationStep 
          onStepComplete={onStepComplete}
          isLoading={isLoading || isProcessing}
          accountExists={accountExists}
          activeTab={activeAuthTab}
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          confirmPassword={confirmPassword} 
          setConfirmPassword={setConfirmPassword}
          displayName={displayName}
          setDisplayName={setDisplayName}
        />
      )}

      {step === 1 && (
        <ProfileDetailsStep 
          onSubmit={onStepComplete} 
          isLoading={isProcessing} 
        />
      )}

      {step === 2 && (
        <WelcomeStep 
          selectedOptionIndex={null} 
          onOptionSelect={onOptionSelect} 
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
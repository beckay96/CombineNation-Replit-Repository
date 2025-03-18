import React from 'react';
import { ProfileDetails } from '@/hooks/auth/services/profileUpdateService';
import AccountCreationStep from './AccountCreationStep';
import ProfileDetailsStep from './ProfileDetailsStep';
import SchoolSetupStep from './SchoolSetupStep';
import FamilySetupStep from './FamilySetupStep';
import WelcomeStep from './WelcomeStep';
import { useAppState } from '@/hooks/appState/AppStateContext';

interface OnboardingContentProps {
  step: number;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  displayName: string;
  setDisplayName: (displayName: string) => void;
  onOptionSelect: (optionIndex: number) => void;
  onSignupSubmit: (e: React.FormEvent) => Promise<void>;
  onProfileSubmit: (data: ProfileDetails) => Promise<void>;
  onFamilySetupComplete: () => void;
  onSchoolSetupComplete: () => void;
  isLoading: boolean;
  isProcessing: boolean;
  accountExists?: boolean;
  activeAuthTab?: string;
}

const OnboardingContent: React.FC<OnboardingContentProps> = ({
  step,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  displayName,
  setDisplayName,
  onOptionSelect,
  onSignupSubmit,
  onProfileSubmit,
  onFamilySetupComplete,
  onSchoolSetupComplete,
  isLoading,
  isProcessing,
  accountExists,
  activeAuthTab
}) => {
  const { isAddingFamily, isAddingSchool } = useAppState();
  
  console.log('OnboardingContent rendering with step:', step);
  console.log('App state flags - isAddingFamily:', isAddingFamily, 'isAddingSchool:', isAddingSchool);
  
  // Step 0: Account Creation (Login/Signup)
  if (step === 0) {
    return <div className="w-full max-w-lg mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {activeAuthTab === 'login' ? 'Welcome Back to CombineNation' : 'Welcome to CombineNation'}
        </h1>
        <AccountCreationStep 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          confirmPassword={confirmPassword} 
          setConfirmPassword={setConfirmPassword}
          displayName={displayName}
          setDisplayName={setDisplayName}
          onSubmit={onSignupSubmit} 
          isLoading={isLoading || isProcessing} 
          accountExists={accountExists} 
          activeTab={activeAuthTab} 
        />
      </div>;
  }

  // Step 1: Profile Details
  if (step === 1) {
    return <ProfileDetailsStep onSubmit={onProfileSubmit} isLoading={isProcessing} />;
  }

  // Step 2: Role Selection
  if (step === 2) {
    return <WelcomeStep selectedOptionIndex={null} onOptionSelect={onOptionSelect} />;
  }

  // Family setup step for 'family' or 'both' roles
  if (isAddingFamily && step === 3) {
    console.log('Rendering family setup step');
    return <FamilySetupStep onComplete={onFamilySetupComplete} isLoading={isProcessing} />;
  }

  // School setup step
  // For educator role - it's step 3
  // For both role - it's step 4 (after family setup)
  if (isAddingSchool && !isAddingFamily && step === 3) {
    console.log('Rendering school setup step for educator');
    return <SchoolSetupStep onComplete={onSchoolSetupComplete} isLoading={isProcessing} />;
  }
  
  if (isAddingSchool && isAddingFamily && step === 4) {
    console.log('Rendering school setup step for both role');
    return <SchoolSetupStep onComplete={onSchoolSetupComplete} isLoading={isProcessing} />;
  }

  console.log('No matching step/role content found');
  return null;
};

export default OnboardingContent;

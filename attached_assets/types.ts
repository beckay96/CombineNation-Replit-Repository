
import { ProfileDetails } from '@/hooks/auth/services/profileUpdateService';

export interface OnboardingStep {
  title: string;
  description: string;
}

export interface OnboardingState {
  email: string;
  password: string;
  confirmPassword: string;
  step: number;
  isProcessing: boolean;
  accountExists: boolean;
  activeAuthTab: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setActiveAuthTab: (tab: string) => void;
}

export interface OnboardingActions {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  handleRoleSelect: (role: 'educator' | 'family' | 'both' | 'solo') => void;
  handleNext: () => void;
  handleBack: () => void;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  handleProfileSubmit: (data: ProfileDetails) => Promise<void>;
  handleFamilySetupComplete: () => void;
  handleSchoolSetupComplete: () => void;
}

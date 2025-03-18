
import { useAuthenticationActions } from './useAuthenticationActions';
import { useOnboardingNavigation } from './useOnboardingNavigation';
import { useProfileActions } from './useProfileActions';
import { useAppState } from '@/hooks/appState/AppStateContext';

export function useOnboardingActions(
  email: string,
  setEmail: (email: string) => void,
  password: string,
  setPassword: (password: string) => void,
  confirmPassword: string,
  setConfirmPassword: (confirmPassword: string) => void,
  displayName: string,
  setDisplayName: (displayName: string) => void,
  step: number,
  setStep: (step: number) => void,
  selectedOptionIndex: number | null,
  setSelectedOptionIndex: (optionIndex: number | null) => void,
  isProcessing: boolean,
  setIsProcessing: (isProcessing: boolean) => void,
  accountExists: boolean,
  setAccountExists: (exists: boolean) => void,
  getSteps: () => string[],
  onComplete: () => void,
  resetFormFields: () => void
) {
  const { 
    setIsAddingSchool, 
    setIsAddingFamily, 
    setFamilyFinishedAdding,
    setSchoolCreatedFully
  } = useAppState();

  // Authentication actions (sign up/sign in)
  const { handleSignup } = useAuthenticationActions(
    email,
    password,
    confirmPassword,
    displayName,
    setStep,
    selectedOptionIndex,
    setIsProcessing,
    accountExists,
    setAccountExists,
    resetFormFields
  );

  // Navigation actions (next/back)
  const { 
    handleNext, 
    handleBack, 
    handleOptionSelect: navigationOptionSelect,
    isUpdatingRole 
  } = useOnboardingNavigation(
    step,
    setStep,
    selectedOptionIndex,
    getSteps
  );

  // Profile actions
  const {
    handleProfileSubmit,
    handleFamilySetupComplete,
    handleSchoolSetupComplete
  } = useProfileActions(
    setStep,
    selectedOptionIndex,
    setIsProcessing,
    onComplete,
    setFamilyFinishedAdding,
    setSchoolCreatedFully
  );

  // Option selection handler
  const handleRoleSelect = (optionIndex: number) => {
    console.log('Setting selected option index to:', optionIndex);
    setSelectedOptionIndex(optionIndex);
    
    // Set the app state based on option
    if (optionIndex === 0 || optionIndex === 2) {
      // Educator (0) or Both (2)
      setIsAddingSchool(true);
    } else {
      setIsAddingSchool(false);
    }

    if (optionIndex === 1 || optionIndex === 2) {
      // Family (1) or Both (2)
      setIsAddingFamily(true);
    } else {
      setIsAddingFamily(false);
    }
    
    // If solo option (3), complete the onboarding immediately after updating the option
    if (optionIndex === 3) {
      setIsProcessing(true);
      navigationOptionSelect(optionIndex).then(() => {
        console.log('Solo option setup complete, finishing onboarding');
        setIsProcessing(false);
        onComplete();
      }).catch(error => {
        console.error('Error during solo option setup:', error);
        setIsProcessing(false);
      });
    } else {
      // For other options, just call the navigation handler which will move to the next step
      navigationOptionSelect(optionIndex);
    }
  };

  return {
    handleSignup,
    handleNext,
    handleBack,
    handleRoleSelect,
    handleProfileSubmit,
    handleFamilySetupComplete,
    handleSchoolSetupComplete
  };
}

export * from './useAuthenticationActions';
export * from './useOnboardingNavigation';
export * from './useProfileActions';

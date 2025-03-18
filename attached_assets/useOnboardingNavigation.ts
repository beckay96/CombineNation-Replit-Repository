
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/hooks/appState/AppStateContext';

export function useOnboardingNavigation(
  step: number,
  setStep: (step: number) => void,
  selectedOptionIndex: number | null,
  getSteps: () => string[]
) {
  const { toast } = useToast();
  const { updateUserProfile } = useAuth();
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const { 
    isAddingSchool, 
    isAddingFamily,
    setSchoolCreatedFully,
    setFamilyFinishedAdding
  } = useAppState();

  const handleOptionSelect = async (optionIndex: number) => {
    console.log('Option selected:', optionIndex);
    try {
      setIsUpdatingRole(true);
      
      // If option is 3 (solo), we'll skip to completion in the parent handler
      if (optionIndex === 3) {
        console.log('Solo option selected, completing onboarding');
        // The completion will be handled by the parent component
      } else if (isAddingFamily) {
        // For family or both options, proceed to the next step (family setup)
        console.log('Family option selected, moving to family setup');
        handleNext();
      } else if (isAddingSchool) {
        // For educator option, proceed to the next step (school setup)
        console.log('Educator option selected, moving to school setup');
        handleNext();
      }
    } catch (error) {
      console.error('Error updating option:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your selection. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const handleNext = () => {
    const steps = getSteps();
    if (step < steps.length - 1) {
      console.log('Moving to next step:', step + 1);
      setStep(step + 1);
    } else {
      console.log('Completing onboarding, no more steps');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      console.log('Moving to previous step:', step - 1);
      setStep(step - 1);
    }
  };

  return {
    handleOptionSelect,
    handleNext,
    handleBack,
    isUpdatingRole
  };
}

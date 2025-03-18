import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
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

      if (optionIndex === 3) { // Solo option
        console.log('Solo option selected, completing onboarding');
        // Skip family and school setup steps
        setFamilyFinishedAdding(false);
        setSchoolCreatedFully(false);
        handleNext(); // Move to the next step (profile details)
      } else if (optionIndex === 0) { // Family option
        console.log('Family option selected, moving to family setup');
        setFamilyFinishedAdding(true);
        setSchoolCreatedFully(false);
        handleNext();
      } else if (optionIndex === 1) { // Educator option
        console.log('Educator option selected, moving to school setup');
        setFamilyFinishedAdding(false);
        setSchoolCreatedFully(true);
        handleNext();
      } else if (optionIndex === 2) { // Both option
        console.log('Both option selected, moving to family setup first');
        setFamilyFinishedAdding(true);
        setSchoolCreatedFully(true);
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
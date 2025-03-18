
import { OnboardingStep } from './types';
import { useAppState } from '@/hooks/appState/AppStateContext';

export function useOnboardingSteps(): {
  getSteps: () => string[];
} {
  const { isAddingFamily, isAddingSchool } = useAppState();
  
  const getSteps = (): string[] => {
    const baseSteps = [
      'Create your account',
      'Personal details',
      'Choose your experience'
    ];

    if (isAddingFamily) {
      baseSteps.push('Family setup');
    }

    if (isAddingSchool) {
      baseSteps.push('School setup');
    }

    // Solo option doesn't need additional steps
    // The flow will complete after selection for solo users

    return baseSteps;
  };

  return { getSteps };
}

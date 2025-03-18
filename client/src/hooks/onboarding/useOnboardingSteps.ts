import { useAppState } from '@/hooks/appState/AppStateContext';

export function useOnboardingSteps(): {
  getSteps: () => string[];
} {
  const { isAddingFamily, isAddingSchool } = useAppState();

  const getSteps = (): string[] => {
    const baseSteps = [
      'Create your account',
      'Choose your experience',
      'Personal details'
    ];

    if (isAddingFamily) {
      baseSteps.push('Family setup');
    }

    if (isAddingSchool) {
      baseSteps.push('School setup');
    }

    return baseSteps;
  };

  return { getSteps };
}
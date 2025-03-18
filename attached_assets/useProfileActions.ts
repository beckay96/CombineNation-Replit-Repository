
import { useToast } from '@/hooks/use-toast';
import { ProfileDetails, updateProfileDetails } from '@/hooks/auth/services/profileUpdateService';
import { useAuth } from '@/hooks/auth';
import { useAppState } from '@/hooks/appState/AppStateContext';

export function useProfileActions(
  setStep: (step: number) => void,
  selectedOptionIndex: number | null,
  setIsProcessing: (isProcessing: boolean) => void,
  onComplete: () => void,
  setFamilyFinishedAdding: (value: boolean) => void,
  setSchoolCreatedFully: (value: boolean) => void
) {
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const { isAddingFamily, isAddingSchool } = useAppState();

  const handleProfileSubmit = async (data: ProfileDetails) => {
    if (!userProfile) {
      toast({
        title: 'Authentication error 🫣',
        description: 'Please try signing in again..',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      await updateProfileDetails(userProfile.id, data);
      toast({
        title: 'Profile updated!',
        description: 'Your profile details have been saved! 🚀',
      });
      
      // After profile details, go to role selection step
      setStep(2); // Move to role selection (now step 2)
    } catch (error: any) {
      toast({
        title: 'Error saving profile',
        description: error.message || 'Please try again 🫣',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFamilySetupComplete = () => {
    // Update our app state to indicate family setup is complete
    setFamilyFinishedAdding(true);
    
    if (isAddingSchool) {
      // If also adding school, go to school setup
      setStep(4); 
    } else {
      // Otherwise complete the onboarding flow
      onComplete();
    }
  };

  const handleSchoolSetupComplete = () => {
    // Update our app state to indicate school setup is complete
    setSchoolCreatedFully(true);
    
    // Complete the onboarding flow
    onComplete();
  };

  return {
    handleProfileSubmit,
    handleFamilySetupComplete,
    handleSchoolSetupComplete
  };
}

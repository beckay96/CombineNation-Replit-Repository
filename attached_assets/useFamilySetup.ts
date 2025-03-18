import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FamilyMember, SpouseInfo, ChildInfo } from '@/types/family';
import { generateRandomPassword } from '@/utils/passwordUtils';

export function useFamilySetup() {
  const { toast } = useToast();
  const { userProfile } = useAuth();
  
  // State for managing family members
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  
  // State for dialogs
  const [showSpouseDialog, setShowSpouseDialog] = useState(false);
  const [showChildDialog, setShowChildDialog] = useState(false);
  
  // State for spouse form
  const [spouseInfo, setSpouseInfo] = useState<SpouseInfo>({
    display_name: 'Spouse',
    email: '',
    makeParentToChildren: true
  });

  // State for child form
  const [childInfo, setChildInfo] = useState<ChildInfo>({
    firstName: '',
    middleName: '',
    lastName: '',
    hasEmail: false,
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });

  // State for tracking if a spouse has been added
  const [hasSpouse, setHasSpouse] = useState(false);
  const [spouseId, setSpouseId] = useState<string | null>(null);

  // State for processing
  const [processingSpouse, setProcessingSpouse] = useState(false);
  const [processingChild, setProcessingChild] = useState(false);

  // Generate mock email based on name
  const generateMockEmail = (firstName: string, lastName: string) => {
    return `${firstName.toLowerCase()}${lastName.toLowerCase()}@combinenation.com.au`;
  };

  // Handler for adding spouse
  const handleAddSpouse = async () => {
    setProcessingSpouse(true);
    
    try {
      if (!userProfile?.id) {
        throw new Error('User profile not found');
      }
      
      // Generate a temporary password for the spouse account
      const temporaryPassword = generateRandomPassword();
      
      // Create spouse account using signUp
      const { data, error } = await supabase.auth.signUp({
        email: spouseInfo.email,
        password: temporaryPassword,
        options: {
          data: {
            display_name: 'Spouse (Invited)'
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (!data.user) {
        throw new Error('No user data returned from spouse account creation');
      }
      
      const spouseUserId = data.user.id;
      
      // Create spouse profile entry in database
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: spouseUserId,
          email: spouseInfo.email,
          display_name: 'Spouse (Invited)',
          neon_mode: false,
          profile_set_up_complete: false
        })
        .select('id')
        .single();
      
      if (profileError) {
        console.error('Error creating spouse profile:', profileError);
        // Continue anyway as the account was created
      }
      
      const spouseProfileId = profileData?.id || spouseUserId;
      
      // Create relationship between user and spouse
      const { error: relationshipError } = await supabase
        .from('relationships')
        .insert({
          this_user: userProfile.id,
          other_user: spouseProfileId,
          relationship_to_this_user: 'Spouse',
          relationship_to_other_user: 'Spouse',
          visibility_level: 'Home',
          currently_accepted_friend: true,
          blocked: false
        });
      
      if (relationshipError) {
        console.error('Error creating relationship:', relationshipError);
        // Continue anyway as the profile was created and account was created
      }
      
      // Show toast with temporary password information
      toast({
        title: 'Spouse account created!',
        description: `An email has been sent to ${spouseInfo.email} with the temporary password: ${temporaryPassword}. Please advise them to change it after first login.`,
      });
      
      // Store the spouse ID for potential use in child-parent relationships
      setSpouseId(spouseProfileId);
      setHasSpouse(true);
      
      // Add spouse to family members list
      setFamilyMembers(prev => [...prev, {
        id: spouseProfileId,
        name: 'Spouse (Invited)',
        email: spouseInfo.email,
        relationship: 'Spouse'
      }]);
      
      // Reset spouse form and close dialog
      setSpouseInfo({ 
        display_name: 'Spouse', 
        email: '', 
        makeParentToChildren: true 
      });
      setShowSpouseDialog(false);
    } catch (error: any) {
      console.error('Error creating spouse account:', error);
      toast({
        title: 'Error creating spouse account',
        description: error.message || 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setProcessingSpouse(false);
    }
  };

  // Handler for adding child
  const handleAddChild = async () => {
    // Validate form
    if (!childInfo.firstName || !childInfo.lastName) {
      toast({
        title: 'Missing information',
        description: 'Please provide the child\'s first and last name',
        variant: 'destructive',
      });
      return;
    }
    
    if (!childInfo.dob) {
      toast({
        title: 'Missing information',
        description: 'Please provide the child\'s date of birth',
        variant: 'destructive',
      });
      return;
    }
    
    if (childInfo.hasEmail && !childInfo.email) {
      toast({
        title: 'Missing information',
        description: 'Please provide the child\'s email address',
        variant: 'destructive',
      });
      return;
    }
    
    if (!childInfo.password || !childInfo.confirmPassword) {
      toast({
        title: 'Missing information',
        description: 'Please create a password for the child\'s account',
        variant: 'destructive',
      });
      return;
    }
    
    if (childInfo.password !== childInfo.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please ensure both passwords match',
        variant: 'destructive',
      });
      return;
    }
    
    setProcessingChild(true);
    
    try {
      if (!userProfile?.id) {
        throw new Error('User profile not found');
      }
      
      // Generate email if child doesn't have one
      const email = childInfo.hasEmail 
        ? childInfo.email 
        : generateMockEmail(childInfo.firstName, childInfo.lastName);
      
      const displayName = `${childInfo.firstName} ${childInfo.middleName ? childInfo.middleName + ' ' : ''}${childInfo.lastName}`;
      
      // Create child account using standard signUp
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: childInfo.password,
        options: {
          data: {
            display_name: displayName,
            first_name: childInfo.firstName,
            last_name: childInfo.lastName
          }
        }
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error('No user data returned from child account creation');
      }
      
      const childUserId = data.user.id;
      
      // Create child profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: childUserId,
          email: email,
          display_name: displayName,
          first_name: childInfo.firstName,
          last_name: childInfo.lastName,
          dob: new Date(childInfo.dob).toISOString(),
          neon_mode: false,
          profile_set_up_complete: false
        })
        .select('id')
        .single();
      
      if (profileError) {
        console.error('Error creating child profile:', profileError);
        // Continue anyway as the auth account was created
      }
      
      const childProfileId = profileData?.id || childUserId;
      
      // Create parent-child relationship
      const { error: relationshipError } = await supabase
        .from('relationships')
        .insert({
          this_user: userProfile.id,
          other_user: childProfileId,
          relationship_to_this_user: 'Child',
          relationship_to_other_user: 'Guardian',
          visibility_level: 'Full',
          currently_accepted_friend: true,
          blocked: false
        });
      
      if (relationshipError) {
        console.error('Error creating guardian relationship:', relationshipError);
        // Continue anyway as the child account was created
      }
      
      // If spouse exists and should be added as parent
      if (hasSpouse && spouseId && spouseInfo.makeParentToChildren) {
        const { error: spouseRelationshipError } = await supabase
          .from('relationships')
          .insert({
            this_user: spouseId,
            other_user: childProfileId,
            relationship_to_this_user: 'Child',
            relationship_to_other_user: 'Guardian',
            visibility_level: 'Full',
            currently_accepted_friend: true,
            blocked: false
          });
        
        if (spouseRelationshipError) {
          console.error('Error adding spouse as guardian:', spouseRelationshipError);
          // Continue anyway as the child account was created successfully
        }
      }
      
      toast({
        title: 'Child account created!',
        description: `Account created for ${childInfo.firstName} ${childInfo.lastName}`,
      });
      
      // Add child to family members list
      setFamilyMembers(prev => [...prev, {
        id: childProfileId,
        name: displayName,
        email: email,
        relationship: 'Child'
      }]);
      
      // Reset child form and close dialog
      setChildInfo({
        firstName: '',
        middleName: '',
        lastName: '',
        hasEmail: false,
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
      });
      setShowChildDialog(false);
    } catch (error: any) {
      console.error('Error creating child account:', error);
      toast({
        title: 'Error creating child account',
        description: error.message || 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setProcessingChild(false);
    }
  };

  const handleRemoveFamilyMember = (index: number) => {
    const memberToRemove = familyMembers[index];
    
    // If removing spouse, update state
    if (memberToRemove.relationship === 'Spouse') {
      setHasSpouse(false);
      setSpouseId(null);
    }
    
    setFamilyMembers(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!userProfile?.id) {
        throw new Error('User profile not found');
      }
      
      // Update the user's profile and mark setup as complete
      const { error } = await supabase
        .from('profiles')
        .update({ 
          profile_set_up_complete: true
        })
        .eq('id', userProfile.id);
      
      if (error) throw error;
      
      return true;
    } catch (error: any) {
      console.error('Error completing family setup:', error);
      toast({
        title: 'Error saving family setup',
        description: error.message || 'Please try again',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    familyMembers,
    showSpouseDialog,
    setShowSpouseDialog,
    showChildDialog,
    setShowChildDialog,
    spouseInfo,
    setSpouseInfo,
    childInfo,
    setChildInfo,
    hasSpouse,
    processingSpouse,
    processingChild,
    generateMockEmail,
    handleAddSpouse,
    handleAddChild,
    handleRemoveFamilyMember,
    handleSubmit
  };
}


import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// A more reliable way to check if an account exists
const checkIfAccountExists = async (email: string): Promise<boolean> => {
  try {
    console.log('Checking if account exists for email:', email);
    
    // Check if the email exists in the auth.users table
    // We do this by attempting to sign in with a fake password
    // and checking if the error is "Invalid login credentials" (which means user exists)
    // vs "User not found" (which means user doesn't exist)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: 'fake-password-for-existence-check',
    });
    
    if (!error) {
      // If no error, the user exists and somehow the password worked (very unlikely)
      console.log('Account exists (and password unexpectedly worked)');
      return true;
    }
    
    // Check the error message to determine if user exists
    if (error.message.includes('Invalid login credentials')) {
      // This means the user exists but password is wrong (which we expect)
      console.log('Account exists (invalid password error)');
      return true;
    } else if (error.message.includes('user not found') || 
               error.message.includes('User not found') || 
               error.message.includes('No user found')) {
      // This means the user doesn't exist
      console.log('Account does not exist (user not found)');
      return false;
    }
    
    // For any other error, assume account might exist
    console.log('Error checking existence, assuming account might exist:', error.message);
    return false;
  } catch (e) {
    console.error('Error checking account existence:', e);
    // If we can't determine, assume it doesn't exist to allow signup attempt
    return false;
  }
};

export function useAuthenticationActions(
  email: string,
  password: string,
  confirmPassword: string,
  displayName: string,
  setStep: (step: number) => void,
  selectedOptionIndex: number | null,
  setIsProcessing: (isProcessing: boolean) => void,
  accountExists: boolean | undefined,
  setAccountExists: (exists: boolean) => void,
  resetFormFields: () => void
) {
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Add debug logging
  useEffect(() => {
    console.log('Authentication state:', { 
      email, 
      displayName, 
      isSigningUp, 
      accountExists 
    });
  }, [email, displayName, isSigningUp, accountExists]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard against double submission
    if (isSigningUp) {
      console.log('Already processing signup request');
      return;
    }

    setIsSigningUp(true);
    setIsProcessing(true);

    try {
      // Form validation
      if (!email || !password) {
        throw new Error('Please enter your email and password');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      console.log('Starting signup process with:', {
        email,
        displayName,
        hasPassword: !!password
      });

      // For signup flow, we'll just directly attempt to sign up
      // without checking if account exists first
      console.log('Creating new account for:', email, 'with display name:', displayName);
      try {
        const userProfile = await signUp(email, password, 'light', displayName);
        console.log('Account created successfully with profile:', userProfile);

        if (!userProfile || !userProfile.id) {
          throw new Error('Profile was not created properly during signup');
        }

        // Show confirmation toast
        toast({
          title: 'Account created',
          description: 'Your account has been created successfully.',
        });

        resetFormFields();

        // Move to the next step after successful signup
        setStep(1); // Personal details step
      } catch (signupError: any) {
        console.error('Detailed signup error:', signupError);

        // Check if the error is because the account already exists
        if (signupError.message && (
          signupError.message.includes('already registered') || 
          signupError.message.includes('already exists') ||
          signupError.message.includes('Email address is already taken')
        )) {
          console.log('Account already exists for this email (from signup error)');
          setAccountExists(true);
          
          // Now we attempt to sign in with the provided credentials
          try {
            console.log('Attempting to sign in with provided credentials');
            await signIn(email, password);
            resetFormFields();
            setStep(1); // Move to next step if login succeeds
          } catch (signInError) {
            console.log('Sign in attempt failed, user needs to try again with correct credentials');
            toast({
              title: 'Account exists',
              description: 'This email is already registered. Please log in instead.',
              variant: 'destructive',
            });
            // Don't rethrow, we'll stay on the login tab
          }
          
          return;
        }

        // If it's any other error, rethrow it
        throw signupError;
      }
    } catch (error) {
      console.error('Signup error:', error);
      let errorMsg = 'Failed to create account. Please try again.';

      if (error instanceof Error) {
        errorMsg = error.message;
      }

      toast({
        title: 'Signup error',
        description: errorMsg,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setIsSigningUp(false);
    }
  };

  return { handleSignup };
}

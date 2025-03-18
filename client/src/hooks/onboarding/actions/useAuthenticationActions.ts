import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const checkIfAccountExists = async (email: string): Promise<boolean> => {
  try {
    console.log('Checking if account exists for email:', email);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: 'fake-password-for-existence-check',
    });

    if (!error) {
      console.log('Account exists (and password unexpectedly worked)');
      return true;
    }

    if (error.message.includes('Invalid login credentials')) {
      console.log('Account exists (invalid password error)');
      return true;
    } else if (error.message.includes('user not found') || 
               error.message.includes('User not found') || 
               error.message.includes('No user found')) {
      console.log('Account does not exist (user not found)');
      return false;
    }

    console.log('Error checking existence, assuming account might exist:', error.message);
    return false;
  } catch (e) {
    console.error('Error checking account existence:', e);
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

    if (isSigningUp) {
      console.log('Already processing signup request');
      return;
    }

    setIsSigningUp(true);
    setIsProcessing(true);

    try {
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

      try {
        const userProfile = await signUp(email, password, 'light', displayName);
        console.log('Account created successfully with profile:', userProfile);

        if (!userProfile || !userProfile.id) {
          throw new Error('Profile was not created properly during signup');
        }

        toast({
          title: 'Account created',
          description: 'Your account has been created successfully.',
        });

        resetFormFields();

        // Move to role selection step (step 1) after successful signup
        setStep(1);
      } catch (signupError: any) {
        console.error('Detailed signup error:', signupError);

        if (signupError.message && (
          signupError.message.includes('already registered') || 
          signupError.message.includes('already exists') ||
          signupError.message.includes('Email address is already taken')
        )) {
          console.log('Account already exists for this email (from signup error)');
          setAccountExists(true);

          try {
            console.log('Attempting to sign in with provided credentials');
            await signIn(email, password);
            resetFormFields();
            setStep(1); // Move to role selection after successful login
          } catch (signInError) {
            console.log('Sign in attempt failed, user needs to try again with correct credentials');
            toast({
              title: 'Account exists',
              description: 'This email is already registered. Please log in instead.',
              variant: 'destructive',
            });
          }

          return;
        }

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
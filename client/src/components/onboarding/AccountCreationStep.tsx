import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import { useAuthTabSync } from '@/hooks/onboarding/useAuthTabSync';

interface AccountCreationStepProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  displayName: string;
  setDisplayName: (displayName: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  accountExists?: boolean;
  activeTab?: string;
}

const AccountCreationStep: React.FC<AccountCreationStepProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  displayName,
  setDisplayName,
  onSubmit,
  isLoading,
  accountExists,
  activeTab: propActiveTab
}) => {
  const { activeTab, handleTabChange } = useAuthTabSync(propActiveTab, accountExists);

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Create Account</TabsTrigger>
        </TabsList>
        
        {/* Login Tab Content */}
        <TabsContent value="login">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </TabsContent>
        
        {/* Signup Tab Content */}
        <TabsContent value="signup">
          <SignupForm
            displayName={displayName}
            setDisplayName={setDisplayName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountCreationStep;

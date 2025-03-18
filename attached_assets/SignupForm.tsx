
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SignupFormProps {
  displayName: string;
  setDisplayName: (displayName: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({
  displayName,
  setDisplayName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  isLoading
}) => {
  return (
    <form id="signup-form" onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="signup-display-name" className="block text-sm font-medium font-opensans">
          Display Name
        </label>
        <Input
          id="signup-display-name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-3 rounded-lg border border-border bg-background font-opensans"
          placeholder="Your name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="signup-email" className="block text-sm font-medium font-opensans">
          Email
        </label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-border bg-background font-opensans"
          placeholder="your.email@example.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="signup-password" className="block text-sm font-medium font-opensans">
          Password
        </label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-border bg-background font-opensans"
          placeholder="••••••••"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium font-opensans">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-border bg-background font-opensans"
          placeholder="••••••••"
          required
        />
      </div>
      
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-primary/90 transition-all font-medium font-opensans"
        >
          {isLoading ? 'Processing...' : 'Create Account'}
          {!isLoading && <ArrowRight size={18} />}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;

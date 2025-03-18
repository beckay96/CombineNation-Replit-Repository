
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  isLoading
}) => {
  return (
    <form id="login-form" onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="login-email" className="block text-sm font-medium font-opensans">
          Email
        </label>
        <Input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-border bg-background font-opensans"
          placeholder="your.email@example.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="login-password" className="block text-sm font-medium font-opensans">
          Password
        </label>
        <Input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {isLoading ? 'Processing...' : 'Log In'}
          {!isLoading && <ArrowRight size={18} />}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

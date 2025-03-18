
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface SchoolSetupStepProps {
  onComplete: () => void;
  isLoading?: boolean;
}

const SchoolSetupStep: React.FC<SchoolSetupStepProps> = ({
  onComplete,
  isLoading = false
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-medium font-dyslexic">School Setup</h2>
        <p className="text-muted-foreground font-opensans">
          Let's set up your school details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>School Information</CardTitle>
          <CardDescription>
            Provide information about your educational institution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">School Name</label>
              <Input placeholder="Enter school name" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">School Location</label>
              <Input placeholder="Address" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">School Description</label>
              <Textarea placeholder="Tell us about your school" />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolSetupStep;

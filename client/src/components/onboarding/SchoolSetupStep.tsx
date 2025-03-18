import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schoolSchema = z.object({
  schoolName: z.string().min(2, 'School name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
});

type SchoolSetupData = z.infer<typeof schoolSchema>;

interface SchoolSetupStepProps {
  onComplete: () => void;
  isLoading?: boolean;
}

const SchoolSetupStep: React.FC<SchoolSetupStepProps> = ({
  onComplete,
  isLoading = false
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SchoolSetupData>({
    resolver: zodResolver(schoolSchema)
  });

  const onSubmit = async (data: SchoolSetupData) => {
    try {
      // Here you would typically save the school data
      console.log('School setup data:', data);
      onComplete();
    } catch (error) {
      console.error('Error setting up school:', error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-medium font-dyslexic">School Setup</h2>
        <p className="text-muted-foreground font-opensans">
          Set up your school information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>School Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                {...register('schoolName')}
                error={errors.schoolName?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">School Address</Label>
              <Input
                id="address"
                {...register('address')}
                error={errors.address?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Input
                id="role"
                {...register('role')}
                placeholder="e.g. Principal, Teacher, Administrator"
                error={errors.role?.message}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolSetupStep;

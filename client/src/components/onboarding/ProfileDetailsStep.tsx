import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileDetails } from '@/hooks/auth/services/profileUpdateService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  bio: z.string().optional(),
});

interface ProfileDetailsStepProps {
  onSubmit: (data: ProfileDetails) => Promise<void>;
  isLoading: boolean;
}

const ProfileDetailsStep: React.FC<ProfileDetailsStepProps> = ({
  onSubmit,
  isLoading
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileDetails>({
    resolver: zodResolver(profileSchema)
  });

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-medium font-dyslexic">Profile Details</h2>
        <p className="text-muted-foreground font-opensans">
          Tell us more about yourself
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Input
                id="bio"
                {...register('bio')}
                error={errors.bio?.message}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetailsStep;

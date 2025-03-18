import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ChildDialogProps } from './types';

export const ChildDialog: React.FC<ChildDialogProps> = ({
  open,
  onOpenChange,
  childInfo,
  setChildInfo,
  onAddChild,
  isProcessing,
  generateMockEmail
}) => {
  const handleFirstNameChange = (firstName: string) => {
    setChildInfo({ ...childInfo, firstName });
    if (firstName && childInfo.lastName) {
      const email = generateMockEmail(firstName, childInfo.lastName);
      setChildInfo(prev => ({ ...prev, firstName, email }));
    }
  };

  const handleLastNameChange = (lastName: string) => {
    setChildInfo({ ...childInfo, lastName });
    if (childInfo.firstName && lastName) {
      const email = generateMockEmail(childInfo.firstName, lastName);
      setChildInfo(prev => ({ ...prev, lastName, email }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Child</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={childInfo.firstName}
              onChange={(e) => handleFirstNameChange(e.target.value)}
              placeholder="Enter first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name (Optional)</Label>
            <Input
              id="middleName"
              value={childInfo.middleName}
              onChange={(e) =>
                setChildInfo({ ...childInfo, middleName: e.target.value })
              }
              placeholder="Enter middle name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={childInfo.lastName}
              onChange={(e) => handleLastNameChange(e.target.value)}
              placeholder="Enter last name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={childInfo.dob}
              onChange={(e) =>
                setChildInfo({ ...childInfo, dob: e.target.value })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasEmail"
              checked={childInfo.hasEmail}
              onCheckedChange={(checked) =>
                setChildInfo({ ...childInfo, hasEmail: checked as boolean })
              }
            />
            <Label htmlFor="hasEmail">Child has email address</Label>
          </div>

          {childInfo.hasEmail && (
            <>
              <div className="space-y-2">
                <Label htmlFor="childEmail">Email</Label>
                <Input
                  id="childEmail"
                  type="email"
                  value={childInfo.email}
                  onChange={(e) =>
                    setChildInfo({ ...childInfo, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={childInfo.password}
                  onChange={(e) =>
                    setChildInfo({ ...childInfo, password: e.target.value })
                  }
                  placeholder="Create password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={childInfo.confirmPassword}
                  onChange={(e) =>
                    setChildInfo({ ...childInfo, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm password"
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={onAddChild}
            disabled={
              isProcessing ||
              !childInfo.firstName ||
              !childInfo.lastName ||
              !childInfo.dob ||
              (childInfo.hasEmail &&
                (!childInfo.email ||
                  !childInfo.password ||
                  !childInfo.confirmPassword ||
                  childInfo.password !== childInfo.confirmPassword))
            }
          >
            {isProcessing ? 'Adding...' : 'Add Child'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

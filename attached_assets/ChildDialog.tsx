
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
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { ChildDialogProps } from './types';

const ChildDialog: React.FC<ChildDialogProps> = ({
  open,
  onOpenChange,
  childInfo,
  setChildInfo,
  onAddChild,
  isProcessing,
  generateMockEmail
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Child</DialogTitle>
          <DialogDescription>
            Create an account for your child to use CombineNation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="child-first-name">First Name</Label>
              <Input 
                id="child-first-name" 
                placeholder="First name"
                value={childInfo.firstName}
                onChange={(e) => setChildInfo({...childInfo, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="child-last-name">Last Name</Label>
              <Input 
                id="child-last-name" 
                placeholder="Last name"
                value={childInfo.lastName}
                onChange={(e) => setChildInfo({...childInfo, lastName: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="child-middle-name">Middle Name (Optional)</Label>
            <Input 
              id="child-middle-name" 
              placeholder="Middle name"
              value={childInfo.middleName}
              onChange={(e) => setChildInfo({...childInfo, middleName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="child-dob">Date of Birth</Label>
            <Input 
              id="child-dob" 
              type="date"
              value={childInfo.dob}
              onChange={(e) => setChildInfo({...childInfo, dob: e.target.value})}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="child-has-email" 
              checked={childInfo.hasEmail}
              onCheckedChange={(checked) => 
                setChildInfo({...childInfo, hasEmail: !!checked})
              }
            />
            <Label htmlFor="child-has-email">
              Child has their own email address
            </Label>
          </div>

          {childInfo.hasEmail ? (
            <div className="space-y-2">
              <Label htmlFor="child-email">Email Address</Label>
              <Input 
                id="child-email" 
                placeholder="Enter child's email"
                value={childInfo.email}
                onChange={(e) => setChildInfo({...childInfo, email: e.target.value})}
              />
            </div>
          ) : (
            childInfo.firstName && childInfo.lastName ? (
              <div className="space-y-2">
                <Label htmlFor="child-mock-email">Generated Email</Label>
                <Input 
                  id="child-mock-email" 
                  value={generateMockEmail(childInfo.firstName, childInfo.lastName)}
                  readOnly
                  disabled
                />
              </div>
            ) : null
          )}
          
          {/* Always show password fields for child accounts */}
          <div className="space-y-2 pt-2">
            <Label htmlFor="child-password">Set Password</Label>
            <Input 
              id="child-password" 
              type="password"
              placeholder="Create a password"
              value={childInfo.password}
              onChange={(e) => setChildInfo({...childInfo, password: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="child-confirm-password">Confirm Password</Label>
            <Input 
              id="child-confirm-password" 
              type="password"
              placeholder="Confirm password"
              value={childInfo.confirmPassword}
              onChange={(e) => setChildInfo({...childInfo, confirmPassword: e.target.value})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onAddChild}
            disabled={isProcessing}
          >
            {isProcessing ? 'Creating...' : 'Add Child'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChildDialog;

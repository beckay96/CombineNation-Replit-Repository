
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
import { SpouseDialogProps } from './types';

const SpouseDialog: React.FC<SpouseDialogProps> = ({
  open,
  onOpenChange,
  spouseInfo,
  setSpouseInfo,
  onAddSpouse,
  isProcessing
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Spouse</DialogTitle>
          <DialogDescription>
            Enter your spouse's email to create an account and send them an invitation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="spouse-email">Email Address</Label>
            <Input 
              id="spouse-email" 
              placeholder="Enter your spouse's email"
              value={spouseInfo.email}
              onChange={(e) => setSpouseInfo({...spouseInfo, email: e.target.value})}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="spouse-parent" 
              checked={spouseInfo.makeParentToChildren}
              onCheckedChange={(checked) => 
                setSpouseInfo({...spouseInfo, makeParentToChildren: !!checked})
              }
            />
            <Label htmlFor="spouse-parent" className="text-sm">
              Add as parent to all child accounts
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onAddSpouse}
            disabled={!spouseInfo.email || isProcessing}
          >
            {isProcessing ? 'Creating...' : 'Create & Send Invite'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SpouseDialog;

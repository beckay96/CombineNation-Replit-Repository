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
import { SpouseDialogProps } from './types';

export const SpouseDialog: React.FC<SpouseDialogProps> = ({
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
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="display_name">Display Name</Label>
            <Input
              id="display_name"
              value={spouseInfo.display_name}
              onChange={(e) =>
                setSpouseInfo({ ...spouseInfo, display_name: e.target.value })
              }
              placeholder="Enter display name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={spouseInfo.email}
              onChange={(e) =>
                setSpouseInfo({ ...spouseInfo, email: e.target.value })
              }
              placeholder="Enter email address"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="makeParent"
              checked={spouseInfo.makeParentToChildren}
              onCheckedChange={(checked) =>
                setSpouseInfo({
                  ...spouseInfo,
                  makeParentToChildren: checked as boolean,
                })
              }
            />
            <Label htmlFor="makeParent">
              Make parent to all children in family group
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={onAddSpouse}
            disabled={isProcessing || !spouseInfo.display_name || !spouseInfo.email}
          >
            {isProcessing ? 'Adding...' : 'Add Spouse'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

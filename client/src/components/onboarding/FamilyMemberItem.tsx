import React from 'react';
import { Button } from '@/components/ui/button';
import { FamilyMember } from './types';

interface FamilyMemberItemProps {
  member: FamilyMember;
  onRemove: () => void;
}

export const FamilyMemberItem: React.FC<FamilyMemberItemProps> = ({
  member,
  onRemove
}) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <h3 className="font-medium">{member.name}</h3>
        <p className="text-sm text-muted-foreground">
          {member.email} • {member.relationship}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-destructive hover:text-destructive/90"
      >
        Remove
      </Button>
    </div>
  );
};

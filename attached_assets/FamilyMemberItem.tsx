
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, UserRound, User } from 'lucide-react';
import { FamilyMemberItemProps } from './types';

const FamilyMemberItem: React.FC<FamilyMemberItemProps> = ({ member, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-muted rounded">
      <div className="flex items-center">
        {member.relationship === 'Spouse' ? (
          <UserRound size={16} className="mr-2" />
        ) : (
          <User size={16} className="mr-2" />
        )}
        <div>
          <p className="text-sm font-medium">{member.name}</p>
          <p className="text-xs text-muted-foreground">{member.email}</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onRemove}
      >
        <X size={16} />
      </Button>
    </div>
  );
};

export default FamilyMemberItem;

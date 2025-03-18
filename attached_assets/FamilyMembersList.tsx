
import React from 'react';
import FamilyMemberItem from './FamilyMemberItem';
import { FamilyMembersListProps } from './types';

const FamilyMembersList: React.FC<FamilyMembersListProps> = ({ 
  familyMembers, 
  onRemoveMember 
}) => {
  if (familyMembers.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No family members added yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {familyMembers.map((member, index) => (
        <FamilyMemberItem 
          key={index} 
          member={member}
          onRemove={() => onRemoveMember(index)}
        />
      ))}
    </div>
  );
};

export default FamilyMembersList;

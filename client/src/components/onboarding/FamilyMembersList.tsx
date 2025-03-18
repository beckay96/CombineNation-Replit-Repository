import React from 'react';
import { FamilyMember } from './types';
import { FamilyMemberItem } from './FamilyMemberItem';

interface FamilyMembersListProps {
  familyMembers: FamilyMember[];
  onRemoveMember: (index: number) => void;
}

export const FamilyMembersList: React.FC<FamilyMembersListProps> = ({
  familyMembers,
  onRemoveMember
}) => {
  if (familyMembers.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No family members added yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {familyMembers.map((member, index) => (
        <FamilyMemberItem
          key={member.id}
          member={member}
          onRemove={() => onRemoveMember(index)}
        />
      ))}
    </div>
  );
};

import { z } from 'zod';

export interface FamilyMember {
  id: string;
  name: string;
  email: string;
  relationship: 'Spouse' | 'Child';
}

export interface SpouseInfo {
  display_name: string;
  email: string;
  makeParentToChildren: boolean;
}

export interface ChildInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  hasEmail: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
}

export interface FamilyMemberItemProps {
  member: FamilyMember;
  onRemove: () => void;
}

export interface SpouseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spouseInfo: SpouseInfo;
  setSpouseInfo: (info: SpouseInfo) => void;
  onAddSpouse: () => void;
  isProcessing: boolean;
}

export interface ChildDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  childInfo: ChildInfo;
  setChildInfo: (info: ChildInfo) => void;
  onAddChild: () => void;
  isProcessing: boolean;
  generateMockEmail: (firstName: string, lastName: string) => string;
}

export interface FamilyMembersListProps {
  familyMembers: FamilyMember[];
  onRemoveMember: (index: number) => void;
}

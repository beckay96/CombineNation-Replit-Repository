
import { FamilyMember, SpouseInfo, ChildInfo } from '@/types/family';

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

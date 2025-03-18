import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FamilyMembersList } from './FamilyMembersList';
import { SpouseInfo, ChildInfo, FamilyMember } from './types';
import { SpouseDialog } from './SpouseDialog';
import { ChildDialog } from './ChildDialog';

interface FamilySetupStepProps {
  onComplete: () => void;
  isLoading?: boolean;
}

const FamilySetupStep: React.FC<FamilySetupStepProps> = ({
  onComplete,
  isLoading = false
}) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [spouseDialogOpen, setSpouseDialogOpen] = useState(false);
  const [childDialogOpen, setChildDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [spouseInfo, setSpouseInfo] = useState<SpouseInfo>({
    display_name: '',
    email: '',
    makeParentToChildren: true
  });

  const [childInfo, setChildInfo] = useState<ChildInfo>({
    firstName: '',
    middleName: '',
    lastName: '',
    hasEmail: false,
    email: '',
    password: '',
    confirmPassword: '',
    dob: ''
  });

  const handleAddSpouse = () => {
    const newFamilyMember: FamilyMember = {
      id: Date.now().toString(),
      name: spouseInfo.display_name,
      email: spouseInfo.email,
      relationship: 'Spouse'
    };
    setFamilyMembers([...familyMembers, newFamilyMember]);
    setSpouseDialogOpen(false);
  };

  const handleAddChild = () => {
    const newFamilyMember: FamilyMember = {
      id: Date.now().toString(),
      name: `${childInfo.firstName} ${childInfo.lastName}`,
      email: childInfo.email,
      relationship: 'Child'
    };
    setFamilyMembers([...familyMembers, newFamilyMember]);
    setChildDialogOpen(false);
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
  };

  const generateMockEmail = (firstName: string, lastName: string): string => {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-medium font-dyslexic">Family Setup</h2>
        <p className="text-muted-foreground font-opensans">
          Add your family members to get started
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Family Members</CardTitle>
          <CardDescription>
            Add spouse and children to your family group
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button
                onClick={() => setSpouseDialogOpen(true)}
                variant="outline"
                className="flex-1"
              >
                Add Spouse
              </Button>
              <Button
                onClick={() => setChildDialogOpen(true)}
                variant="outline"
                className="flex-1"
              >
                Add Child
              </Button>
            </div>

            <FamilyMembersList
              familyMembers={familyMembers}
              onRemoveMember={handleRemoveMember}
            />

            <Button
              onClick={onComplete}
              className="w-full"
              disabled={isLoading || isProcessing}
            >
              {isLoading ? 'Saving...' : 'Complete Setup'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <SpouseDialog
        open={spouseDialogOpen}
        onOpenChange={setSpouseDialogOpen}
        spouseInfo={spouseInfo}
        setSpouseInfo={setSpouseInfo}
        onAddSpouse={handleAddSpouse}
        isProcessing={isProcessing}
      />

      <ChildDialog
        open={childDialogOpen}
        onOpenChange={setChildDialogOpen}
        childInfo={childInfo}
        setChildInfo={setChildInfo}
        onAddChild={handleAddChild}
        isProcessing={isProcessing}
        generateMockEmail={generateMockEmail}
      />
    </div>
  );
};

export default FamilySetupStep;


import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import { useFamilySetup } from './family/useFamilySetup';
import FamilyMembersList from './family/FamilyMembersList';
import SpouseDialog from './family/SpouseDialog';
import ChildDialog from './family/ChildDialog';

interface FamilySetupStepProps {
  onComplete: () => void;
  isLoading?: boolean;
}

const FamilySetupStep: React.FC<FamilySetupStepProps> = ({
  onComplete,
  isLoading = false
}) => {
  const {
    familyMembers,
    showSpouseDialog,
    setShowSpouseDialog,
    showChildDialog,
    setShowChildDialog,
    spouseInfo,
    setSpouseInfo,
    childInfo,
    setChildInfo,
    hasSpouse,
    processingSpouse,
    processingChild,
    generateMockEmail,
    handleAddSpouse,
    handleAddChild,
    handleRemoveFamilyMember,
    handleSubmit
  } = useFamilySetup();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit(e);
    if (success) {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-medium font-dyslexic">Family Setup</h2>
        <p className="text-muted-foreground font-opensans">
          Let's set up your family profile
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Family Members</CardTitle>
          <CardDescription>
            Add family members who will use CombineNation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Family Members</h3>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    type="button"
                    onClick={() => setShowSpouseDialog(true)}
                    disabled={hasSpouse}
                  >
                    <UserPlus size={16} className="mr-1" /> Add Spouse
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    type="button"
                    onClick={() => setShowChildDialog(true)}
                  >
                    <UserPlus size={16} className="mr-1" /> Add Child
                  </Button>
                </div>
              </div>
              
              <FamilyMembersList 
                familyMembers={familyMembers}
                onRemoveMember={handleRemoveFamilyMember}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <SpouseDialog
        open={showSpouseDialog}
        onOpenChange={setShowSpouseDialog}
        spouseInfo={spouseInfo}
        setSpouseInfo={setSpouseInfo}
        onAddSpouse={handleAddSpouse}
        isProcessing={processingSpouse}
      />

      <ChildDialog
        open={showChildDialog}
        onOpenChange={setShowChildDialog}
        childInfo={childInfo}
        setChildInfo={setChildInfo}
        onAddChild={handleAddChild}
        isProcessing={processingChild}
        generateMockEmail={generateMockEmail}
      />
    </div>
  );
};

export default FamilySetupStep;

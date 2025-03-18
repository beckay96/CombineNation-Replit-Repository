
import React from 'react';
import RoleSelection from '../RoleSelection';

interface WelcomeStepProps {
  selectedOptionIndex: number | null;
  onOptionSelect: (optionIndex: number) => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ selectedOptionIndex, onOptionSelect }) => {
  return (
    <div className="w-full space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3 animate-fade-in">
        <h2 className="text-3xl font-medium tracking-tight font-dyslexic">
          Welcome to Smart Nation
        </h2>
        <p className="text-muted-foreground font-opensans">
          Let's personalise your experience. How do you plan to use our platform?
        </p>
      </div>
      <RoleSelection 
        selectedOptionIndex={selectedOptionIndex} 
        onOptionSelect={onOptionSelect} 
      />
    </div>
  );
};

export default WelcomeStep;

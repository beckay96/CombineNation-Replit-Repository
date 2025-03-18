import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WelcomeStepProps {
  selectedOptionIndex: number | null;
  onOptionSelect: (optionIndex: number) => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({
  selectedOptionIndex,
  onOptionSelect,
}) => {
  const options = [
    {
      title: 'Educator',
      description: 'I want to manage my school and students',
    },
    {
      title: 'Family',
      description: 'I want to manage my family',
    },
    {
      title: 'Both',
      description: 'I want to manage both school and family',
    },
    {
      title: 'Solo',
      description: 'I want to use this platform individually',
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-medium font-dyslexic">Choose Your Experience</h2>
        <p className="text-muted-foreground font-opensans">
          Select how you want to use CombineNation
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all ${
              selectedOptionIndex === index
                ? 'border-primary bg-primary/5'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onOptionSelect(index)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{option.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{option.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WelcomeStep;

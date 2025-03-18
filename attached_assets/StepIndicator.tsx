import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index < currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : index === currentStep 
                    ? 'bg-primary/20 text-primary border border-primary' 
                    : 'bg-muted text-muted-foreground'
                } transition-all duration-300`}
              >
                {index < currentStep ? <Check size={18} /> : index + 1}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium font-dyslexic ${index === currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`h-[2px] flex-1 mx-2 ${
                  index < currentStep ? 'bg-primary' : 'bg-border'
                } transition-all duration-300`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
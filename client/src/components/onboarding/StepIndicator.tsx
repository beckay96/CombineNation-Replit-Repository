import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isActive ? 'bg-purple-500 text-white' : 
                      isCompleted ? 'bg-green-500 text-white' : 
                      'bg-gray-200 text-gray-600'}
                  `}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm text-muted-foreground">{step}</span>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`
                    h-[2px] w-[100px] mx-4
                    ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

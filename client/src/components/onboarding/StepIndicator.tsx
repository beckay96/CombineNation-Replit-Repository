import React from 'react';

interface StepIndicatorProps {
  steps: Array<{
    number: number;
    title: string;
  }>;
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${isCurrent ? 'bg-purple-500 text-white' : 
                      isCompleted ? 'bg-green-500 text-white' : 
                      'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                  `}
                >
                  {step.number}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {step.title}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div className={`
                  h-[2px] flex-1 mx-4
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
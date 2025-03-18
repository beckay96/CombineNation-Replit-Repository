
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  disableNext?: boolean;
  hideNext?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  disableNext = false,
  hideNext = false
}) => {
  return (
    <div className="w-full max-w-md mx-auto mt-8 flex justify-between">
      {currentStep > 0 ? (
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg border border-border hover:bg-muted transition-all font-opensans"
        >
          Back
        </button>
      ) : (
        <div />
      )}
      {currentStep < totalSteps - 1 && !hideNext && (
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-2 font-opensans"
          disabled={disableNext}
        >
          Next
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
};

export default StepNavigation;

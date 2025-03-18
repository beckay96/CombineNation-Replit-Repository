
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import OnboardingFlow from '@/components/OnboardingFlow';

interface OnboardingInitialProps {
  onComplete: () => void;
}

const OnboardingInitial: React.FC<OnboardingInitialProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <OnboardingFlow onComplete={onComplete} />
      </main>
    </div>
  );
};

export default OnboardingInitial;

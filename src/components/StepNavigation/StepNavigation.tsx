import { type FC } from 'react';
import './StepNavigation.css';

interface StepNavigationProps {
  totalSteps: number;
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

export const StepNavigation: FC<StepNavigationProps> = ({
  totalSteps,
  currentStep,
  onStepClick,
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="step-navigation">
      {steps.map((stepNumber) => (
        <div
          key={stepNumber}
          className={`step-navigation__item ${stepNumber === currentStep ? 'step-navigation__item--active' : ''}`}
          onClick={() => onStepClick(stepNumber)}
        >
          <span className="step-navigation__number">{stepNumber}</span>
        </div>
      ))}
    </div>
  );
};

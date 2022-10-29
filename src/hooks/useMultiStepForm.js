import { useState } from 'react';

const useMultiStepForm = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((index) => {
      if (index >= steps.length - 1) return index;
      return index + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((index) => {
      if (index <= 0) return index;
      return index - 1;
    });
  };

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
  };
};

export default useMultiStepForm;

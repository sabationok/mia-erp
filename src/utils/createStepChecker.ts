import { FilterOption } from '../components/atoms/ModalFilter';
import { useCallback, useMemo, useState } from 'react';

export default function createStepsChecker<V extends string | number | symbol = any>(steps: FilterOption<V>[]) {
  return (currentIdx: number): Partial<Record<V, boolean | undefined>> => {
    const currentStep = steps[currentIdx];

    return {
      [currentStep?.value]: true,
    } as unknown as Partial<Record<V, boolean | undefined>>;
  };
}

export function useStepChecker<V extends string | number | symbol = any>(
  steps: FilterOption<V>[],
  currentIdx: number
): (step: V) => boolean {
  const currentStep = steps[currentIdx];

  return (step): boolean => currentStep?.value === step;
}
export function useStepsHandler<V extends string | number | symbol = any>(steps: FilterOption<V>[] = []) {
  const [stepIdx, setStepIdx] = useState(0);

  const stepsMap = useMemo(() => createStepsChecker(steps)(stepIdx), [stepIdx, steps]);
  const stepCheck = useCallback((step: V) => stepsMap[step], [stepsMap]);
  const getCurrentStep = useCallback(() => steps[stepIdx], [stepIdx, steps]);
  const setNextStep = useCallback(() => {
    setStepIdx(current => {
      const nextStep = current + 1;
      if (nextStep < steps.length) return nextStep;

      return current;
    });
  }, [steps.length]);
  const setPrevStep = useCallback(() => {
    setStepIdx(current => {
      const nextStep = current - 1;
      if (nextStep >= 0) return nextStep;

      return current;
    });
  }, []);

  return {
    stepsMap,
    stepCheck,
    setStepIdx,
    stepIdx,
    getCurrentStep,
    stepsCount: steps.length,
    isLast: steps.length === stepIdx + 1,
    setNextStep,
    setPrevStep,
  };
}

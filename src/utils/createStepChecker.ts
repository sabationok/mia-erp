import { FilterOption } from '../components/ModalForm/ModalFilter';
import { checks } from './index';

export default function createStepsChecker<V extends string | symbol = any>(steps: FilterOption<V>[]) {
  return (currentIdx: number): Partial<Record<V, boolean | undefined>> | undefined => {
    const currentStep = steps[currentIdx];

    if (!checks.isStr(currentStep?.value)) {
      return;
    }
    return {
      [currentStep?.value]: true,
    } as unknown as Partial<Record<V, boolean | undefined>> | undefined;
  };
}

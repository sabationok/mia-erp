import { UseFormReturn } from 'react-hook-form/dist/types';

export interface FormOrderStepBaseProps<N extends string | number | symbol = any> {
  onFinish?: (name?: N) => void;
  name?: N;
  getForm?: () => UseFormReturn;
}

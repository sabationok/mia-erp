export interface FormOrderStepBaseProps<N extends string | number | symbol = any> {
  onFinish?: (name?: N) => void;
  onValid?: (data: any) => void;
  onChangeValidStatus?: (value: boolean) => void;
  name?: N;
}

import { Path, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form/dist/types';
import { useCallback, useState } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { InputLabelProps } from '../components/atoms/Inputs/InputLabel';
import { CustomSelectBaseProps } from '../components/atoms/Inputs/CustomSelect/CustomSelect';

export type CustomSelectProps = CustomSelectBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'> &
  Omit<InputLabelProps, 'onSelect'>;

export type RegisterSelect<TFieldValues extends FieldValues = FieldValues> = (
  name: Path<TFieldValues>,
  props?: Omit<CustomSelectProps, 'name'>,
  childControl?: {
    childName?: Path<TFieldValues>;
  }
) => CustomSelectProps;

export interface UseAppFormReturn<TFieldValues extends FieldValues = FieldValues, TContext = any>
  extends UseFormReturn<TFieldValues, TContext> {
  registerSelect: RegisterSelect<TFieldValues>;
  formValues: TFieldValues;
  onSubmitHandler?: (
    onValid: SubmitHandler<TFieldValues>,
    onInvalid: SubmitErrorHandler<TFieldValues>
  ) => UseFormHandleSubmit<TFieldValues>;
  toggleAfterSubmitOption: (option: keyof UseAppFormSubmitOptions) => void;
}

export interface UseAppFormSubmitOptions {
  closeAfterSave?: boolean;
  clearAfterSave?: boolean;
  // onOptionsChange?: (options: UseAppFormSubmitOptions) => void;
}

export type AppSubmitHandler<D = any, O = any> = (data: D, options?: UseAppFormSubmitOptions & O) => void;

export type AppErrorSubmitHandler<E = any, O = any> = (errors: E, options?: UseAppFormSubmitOptions & O) => void;
const useAppForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  formProps?: UseFormProps<TFieldValues, TContext>
): UseAppFormReturn<TFieldValues, TContext> & UseAppFormSubmitOptions => {
  const form = useForm<TFieldValues>(formProps);
  const { setValue, unregister, register, watch } = form;
  const [afterSubmitOptions, setAfterSubmitOptions] = useState<UseAppFormSubmitOptions>({
    closeAfterSave: true,
    clearAfterSave: true,
  });
  const formValues = watch();

  // function onSubmitHandler(onValid: AppSubmitHandler<TFieldValues>, onInvalid: AppErrorSubmitHandler<TFieldValues>) {
  //   if (!onValid) return;
  //   const onValidSubmit: SubmitHandler<TFieldValues> = data => onValid(data, afterSubmitOptions);
  //
  //   const onInvalidSubmit: SubmitErrorHandler<TFieldValues> = errors => onInvalid(errors as any);
  //   return handleSubmit(onValidSubmit, onInvalidSubmit);
  // }

  const registerSelect = useCallback(
    (
      name: Path<TFieldValues>,
      props?: Omit<CustomSelectProps, 'name'>,
      childControl?: {
        childName?: Path<TFieldValues>;
      }
    ): CustomSelectProps => {
      return {
        ...register(name),
        onSelect: (option, _value) => {
          setValue<Path<TFieldValues>>(name, option as any);
          // if (childControl?.childName) clearChild(childControl?.childName);
        },
        name,
        selectValue: formValues[name],
        onClear: () => {
          if (!formValues[name]) return;

          // setValue(name, null as any);
          unregister(name);

          if (childControl?.childName) unregister(childControl?.childName);

          if (!props?.options || props.options.length === 0) {
          }
        },
        disabled: !props?.options || props?.options?.length === 0,
        ...props,
      };
    },
    [formValues, register, setValue, unregister]
  );

  const toggleAfterSubmitOption = useCallback(
    (option: keyof UseAppFormSubmitOptions) =>
      setAfterSubmitOptions(prev => ({
        ...prev,
        [option]: !prev[option],
      })),
    []
  );

  return {
    ...form,
    ...afterSubmitOptions,
    formValues,
    registerSelect,
    toggleAfterSubmitOption,
  };
};

export default useAppForm;

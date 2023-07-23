import { Path, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form/dist/types';
import { useCallback, useMemo, useState } from 'react';
import { CustomSelectProps } from '../components/atoms/Inputs/CustomSelect';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';

export type RegisterSelect<TFieldValues extends FieldValues = FieldValues> = (
  name: Path<TFieldValues>,
  props?: Omit<CustomSelectProps<TFieldValues[Path<TFieldValues>]>, 'name'>,
  childControl?: {
    childName?: Path<TFieldValues>;
  }
) => CustomSelectProps<TFieldValues[Path<TFieldValues>]>;

export interface UseAppFormReturn<TFieldValues extends FieldValues = FieldValues, TContext = any>
  extends UseFormReturn<TFieldValues, TContext> {
  registerSelect: RegisterSelect<TFieldValues>;
  formValues: TFieldValues;
  onSubmitHandler?: (
    onValid: SubmitHandler<TFieldValues>,
    onInvalid: SubmitErrorHandler<TFieldValues>
  ) => UseFormHandleSubmit<TFieldValues>;
  toggleAfterSubmitOption: (option: keyof UseAppFormAfterSubmitOptions) => void;
}

export interface UseAppFormAfterSubmitOptions {
  closeAfterSave?: boolean;
  clearAfterSave?: boolean;
  // onOptionsChange?: (options: UseAppFormAfterSubmitOptions) => void;
}

export type AppSubmitHandler<D = any> = (data: D, options?: UseAppFormAfterSubmitOptions) => void;
export type AppErrorSubmitHandler<E = any> = (errors: E, options?: UseAppFormAfterSubmitOptions) => void;
const useAppForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  formProps?: UseFormProps<TFieldValues, TContext>
): UseAppFormReturn<TFieldValues, TContext> & UseAppFormAfterSubmitOptions => {
  const form = useForm<TFieldValues>(formProps);
  const { setValue, unregister, register, watch } = form;
  const formValues = watch();
  const [afterSubmitOptions, setAfterSubmitOptions] = useState<UseAppFormAfterSubmitOptions>({
    closeAfterSave: true,
    clearAfterSave: true,
  });

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
      props?: Omit<CustomSelectProps<TFieldValues[Path<TFieldValues>]>, 'name'>,
      childControl?: {
        childName?: Path<TFieldValues>;
      }
    ): CustomSelectProps<TFieldValues[Path<TFieldValues>]> => {
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

  return useMemo(
    () => ({
      ...form,
      formValues,
      registerSelect,
      ...afterSubmitOptions,
      toggleAfterSubmitOption: (option: keyof UseAppFormAfterSubmitOptions) =>
        setAfterSubmitOptions(prev => ({
          ...prev,
          [option]: !prev[option],
        })),
    }),
    [afterSubmitOptions, form, formValues, registerSelect]
  );
};

export default useAppForm;

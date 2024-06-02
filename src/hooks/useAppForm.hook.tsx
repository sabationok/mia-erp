import { Path, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form/dist/types';
import { createContext, useCallback, useContext } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { InputLabelProps } from '../components/atoms/Inputs/InputLabel';
import { CustomSelectBaseProps } from '../components/atoms/Inputs/CustomSelect';
import { AnyFn } from '../utils/types';

export type CustomSelectProps = CustomSelectBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'> &
  Omit<InputLabelProps, 'onSelect'>;

export type RegisterSelect<TFieldValues extends FieldValues = FieldValues> = (
  name: Path<TFieldValues>,

  props?: Omit<CustomSelectProps, 'name'> & { onlyValue?: true },
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
}

export interface UseAppFormSubmitOptions {
  onLoading?: (l: boolean) => void;
  onSuccess?: AnyFn;
  onError?: AnyFn;
  close?: boolean;
  clear?: boolean;
  // onOptionsChange?: (options: UseAppFormSubmitOptions) => void;
}

export type AppSubmitHandler<D = any, O = any> = (data: D, options?: O & UseAppFormSubmitOptions) => void;

export type AppErrorSubmitHandler<E = any, O = any> = (errors: E, options?: UseAppFormSubmitOptions & O) => void;

export const AppFormCTX = createContext<UseAppFormReturn<any>>({} as UseAppFormReturn<any>);

export const useAppFormProvider = <TFieldValues extends FieldValues = FieldValues, TContext = any>() =>
  useContext<UseAppFormReturn<TFieldValues, TContext>>(AppFormCTX);

export const AppFormProvider = <TFieldValues extends FieldValues = FieldValues, TContext = any>({
  children,
  value,
}: {
  children?: React.ReactNode;
  value: UseAppFormReturn<TFieldValues, TContext>;
}) => {
  return <AppFormCTX.Provider value={value}>{children}</AppFormCTX.Provider>;
};

const useAppForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  formProps?: UseFormProps<TFieldValues, TContext>
): UseAppFormReturn<TFieldValues, TContext> => {
  const form = useForm<TFieldValues>(formProps);
  const { setValue, unregister, register, watch } = form;
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
      props?: Omit<CustomSelectProps, 'name'> & { onlyValue?: true },
      childControl?: {
        childName?: Path<TFieldValues>;
      }
    ): CustomSelectProps => {
      return {
        ...register(name),
        onSelect: (option, value) => {
          setValue<Path<TFieldValues>>(name, props?.onlyValue ? value : (option as any));
          // if (childControl?.childName) clearChild(childControl?.childName);
        },
        name,
        selectedOption: formValues[name],
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

  return {
    ...form,
    formValues,
    registerSelect,
  };
};

export default useAppForm;

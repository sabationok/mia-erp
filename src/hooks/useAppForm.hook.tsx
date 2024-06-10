import { Path, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form/dist/types';
import { createContext, useCallback, useContext } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { CustomSelectProps } from '../components/atoms/Inputs/CustomSelect';
import { AnyFn } from '../utils/types';
import { getValueByPath } from '../utils';

type UseRegisterSelectProps<Path extends string> = Omit<CustomSelectProps, 'name'> & {
  onlyValue?: boolean;
  inputName?: Path;
  optionPath?: Path;
  valuePath?: Path;
};

export type UseRegisterSelect<TFieldValues extends FieldValues = FieldValues, P extends Path<TFieldValues> = any> = (
  name: P,
  props?: UseRegisterSelectProps<P>,
  childControl?: {
    childName?: P;
  }
) => CustomSelectProps;

export interface UseAppFormReturn<TFieldValues extends FieldValues = FieldValues, TContext = any>
  extends UseFormReturn<TFieldValues, TContext> {
  registerSelect: UseRegisterSelect<TFieldValues>;
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
  type IntPath = Path<TFieldValues>;

  const form = useForm<TFieldValues>(formProps);
  const { setValue, unregister, watch, getFieldState } = form;
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
      name: IntPath,
      props?: UseRegisterSelectProps<IntPath>,
      childControl?: {
        childName?: IntPath;
      }
    ): CustomSelectProps => {
      const onlyValue = props?.onlyValue;

      const optionPath = props?.optionPath ?? name;
      const valuePath = props?.valuePath ?? name;

      return {
        ref: props?.ref,
        ...getFieldState(onlyValue ? valuePath : optionPath),
        onSelect: (option, value) => {
          setValue<Path<TFieldValues>>(onlyValue ? valuePath : optionPath, onlyValue ? value : (option as any), {
            shouldDirty: true,
            shouldTouch: true,
          });
        },
        name,
        selectedOption: !optionPath || onlyValue ? undefined : getValueByPath({ data: formValues, path: optionPath }),
        selectedValue: props?.selectedValue
          ? props?.selectedValue
          : !valuePath
            ? undefined
            : getValueByPath({ data: formValues, path: valuePath }),

        onClear: () => {
          unregister(onlyValue ? valuePath : optionPath);
          if (childControl?.childName) unregister(childControl?.childName);
        },
        disabled: props?.options ? props?.options?.length === 0 : undefined,
        ...props,
      };
    },
    [formValues, getFieldState, setValue, unregister]
  );

  return {
    ...form,
    formValues,
    registerSelect,
  };
};

export default useAppForm;

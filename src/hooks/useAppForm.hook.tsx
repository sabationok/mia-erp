import { Path, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form/dist/types';
import { createContext, useCallback, useContext } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { CustomSelectProps } from '../components/atoms/Inputs/CustomSelect';
import { AnyFn } from '../utils/types';

type UseRegisterSelectProps<Path extends string> = Omit<CustomSelectProps, 'name'> & {
  onlyValue?: boolean;
  inputName?: Path;
  optionPath?: Path;
  valuePath?: Path;
};

export type UseRegisterSelect<
  TFieldValues extends FieldValues = FieldValues,
  P extends Path<TFieldValues> = Path<TFieldValues>,
> = (
  name: P,
  props?: UseRegisterSelectProps<P>,
  childControl?: {
    childName?: P;
  }
) => CustomSelectProps;

export type UseIdsTogglerProps = { multiple?: boolean };
export type UseIdsToggler<
  TFieldValues extends FieldValues,
  Name extends Path<TFieldValues> = Path<TFieldValues>,
  Value extends string | string[] = string | string[],
> = (name: Name, options?: UseIdsTogglerProps) => UseIdsTogglerReturn<TFieldValues, Name, Value> & UseIdsTogglerProps;

export type UseIdsTogglerReturn<
  TFieldValues extends FieldValues,
  Name extends Path<TFieldValues> = Path<TFieldValues>,
  Value extends string | string[] = string | string[],
> = {
  name: Name;
  value: Value;
  onChangeIds: (info: { value: Value; name: Name }) => void;
};

// export type UseRegisterSelect<TFieldValues extends FieldValues = FieldValues, P extends Path<TFieldValues> = any> = (
//   name: P,
//   props?: UseRegisterSelectProps<P>,
//   childControl?: {
//     childName?: P;
//   }
// ) => CustomSelectProps;

export interface UseAppFormReturn<TFieldValues extends FieldValues = FieldValues, TContext = any>
  extends UseFormReturn<TFieldValues, TContext> {
  registerSelect: UseRegisterSelect<TFieldValues>;
  registerIdsToggler: UseIdsToggler<TFieldValues>;
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
  // type IntPathValue = PathValue<TFieldValues, IntPath>;

  const form = useForm<TFieldValues>(formProps);
  const { setValue, unregister, watch, getFieldState } = form;
  const formValues = watch();

  const registerIdsToggler = useCallback(
    (name: IntPath, props?: UseIdsTogglerProps) => {
      const value = form.getValues(name);
      const set = new Set<string>(value);
      const toggleId = (id: string) => (set.has(id) ? set.delete(id) : set.add(id));

      return {
        ...props,
        name,
        value,
        onChangeIds: ({ value: maybeIdsArr, name }: { name: IntPath; value: string | string[] }) => {
          if (props?.multiple) {
            Array.isArray(maybeIdsArr) ? maybeIdsArr.forEach(toggleId) : toggleId(maybeIdsArr);

            form.setValue(name, [...set] as never, { shouldDirty: true, shouldTouch: true });
          } else {
            form.setValue(name, maybeIdsArr as never, { shouldDirty: true, shouldTouch: true });
          }
        },
      };
    },
    [form]
  );

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
      const valuePath = props?.valuePath;

      return {
        ref: props?.ref,
        ...getFieldState(onlyValue && valuePath ? valuePath : optionPath),
        onSelect: (option, value) => {
          setValue<Path<TFieldValues>>(
            onlyValue && valuePath ? valuePath : optionPath,
            onlyValue ? value : (option as any),
            {
              shouldDirty: true,
              shouldTouch: true,
            }
          );
        },
        name,
        selectedOption: !optionPath || onlyValue ? undefined : form.getValues(optionPath),
        selectedValue: props?.selectedValue ? props?.selectedValue : !valuePath ? undefined : form.getValues(valuePath),

        onClear: () => {
          unregister(onlyValue && valuePath ? valuePath : optionPath);
          if (childControl?.childName) unregister(childControl?.childName);
        },
        disabled: props?.options ? props?.options?.length === 0 : undefined,
        ...props,
      };
    },
    [form, getFieldState, setValue, unregister]
  );

  return {
    ...form,
    formValues,
    registerSelect,
    registerIdsToggler,
  };
};

export default useAppForm;

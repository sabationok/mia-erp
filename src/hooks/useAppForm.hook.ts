import { Path, useForm } from 'react-hook-form';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form/dist/types';
import { useCallback } from 'react';
import { CustomSelectProps } from '../components/atoms/Inputs/CustomSelect';

export type RegisterSelect<TFieldValues extends FieldValues = FieldValues> = (
  name: Path<TFieldValues>,
  props?: Omit<CustomSelectProps<TFieldValues[Path<TFieldValues>]>, 'name'>,
  childControl?: {
    childName?: Path<TFieldValues>;
  }
) => CustomSelectProps<TFieldValues[Path<TFieldValues>]>;

export interface UseAppFromReturn<TFieldValues extends FieldValues = FieldValues, TContext = any>
  extends UseFormReturn<TFieldValues, TContext> {
  registerSelect: RegisterSelect<TFieldValues>;
  formValues: TFieldValues;
}

const useAppForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  formProps?: UseFormProps<TFieldValues, TContext>
): UseAppFromReturn<TFieldValues, TContext> => {
  const form = useForm<TFieldValues>(formProps);
  const { setValue, unregister, register, watch } = form;
  const formValues = watch();

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

  return { ...form, formValues, registerSelect };
};

export default useAppForm;

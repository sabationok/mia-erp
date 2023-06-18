import { UseFormSetValue, UseFormUnregister } from 'react-hook-form';
import { ITransaction } from '../redux/transactions/transactions.types';
import { useCallback } from 'react';
import { CustomSelectProps } from '../components/atoms/Inputs/CustomSelect';

export const useRegisterTrSelectHook = (
  setValue: UseFormSetValue<ITransaction>,
  formValues: ITransaction,
  unregister: UseFormUnregister<ITransaction>
) =>
  useCallback(
    <K extends keyof ITransaction = keyof ITransaction>(
      name: K,
      props?: Omit<CustomSelectProps<ITransaction[K]>, 'name'>,
      childControl?: {
        childName?: keyof ITransaction;
      }
    ): CustomSelectProps<ITransaction[K]> => {
      return {
        onSelect: (option, value) => {
          console.log({
            option,
            formValues,
            name,
            props,
            childControl,
            setValue,
            unregister,
          });
          setValue<K>(name, option as any);
        },
        name,
        selectValue: formValues[name],
        onClear: () => {
          if (!formValues[name]) return;

          setValue(name, null as any);
          unregister(name);
          console.log('cleared input', name, formValues[name]);

          if (childControl?.childName) {
            console.log('cleared child', childControl.childName);
            setValue(childControl.childName, null as any);
            unregister(childControl.childName);
            console.log('cleared child', childControl.childName, formValues[childControl.childName]);
          }
          if (!props?.options || props.options.length === 0) {
          }
        },
        disabled: !props?.options || props?.options?.length === 0,
        ...props,
      };
    },
    [formValues, setValue, unregister]
  );

import {
  useCheckoutPaymentsSelector,
  useCommunicationSelector,
  useInvoicesSelector,
  useShipmentsSelector,
} from '../redux/selectors.store';
import { useMemo } from 'react';
import { getTranslatedString, LangKey, LangPack } from '../lang';
import { ICheckoutPaymentMethod } from '../redux/payments/payments.types';
import { ExtPaymentService, ICommunicationMethod, IDeliveryMethod } from '../redux/integrations/integrations.types';
import { IInvoicingMethod } from '../redux/invoices/invoices.types';

interface UseTranslatedListDataOtions {
  langKey?: LangKey;
  withFullLabel?: boolean;
  getLabel?: (
    option: IInvoicingMethod & {
      parent?: ExtPaymentService;
      fullLabel?: string;
    }
  ) => React.ReactNode;
}
export const useTranslatedPaymentMethods = (options?: UseTranslatedListDataOtions) => {
  const paymentsState = useCheckoutPaymentsSelector();
  return useMemo((): (ICheckoutPaymentMethod & { parent?: ExtPaymentService })[] => {
    return paymentsState.methods.map(el => {
      const parent = el?.service
        ? {
            ...el?.service,
            label: el.service?.lang ? getTranslatedString(el.service?.lang, options?.langKey) : el.service?.label,
          }
        : undefined;

      return {
        ...el,
        value: el._id,
        label: el.labels ? getTranslatedString(el.labels, options?.langKey) : el.label,
        service: parent,
        parent,
      };
    });
  }, [options?.langKey, paymentsState.methods]);
};
export const useTranslatedInvoicingMethods = ({
  langKey = 'ua',
  withFullLabel = false,
  getLabel,
}: UseTranslatedListDataOtions = {}) => {
  const invState = useInvoicesSelector();

  return useMemo((): (IInvoicingMethod & {
    parent?: ExtPaymentService;
    fullLabel?: string;
  })[] => {
    return invState.methods.map(el => {
      const label = el.labels ? getTranslatedString(el.labels, langKey) : el.label;

      const parent = el?.service
        ? {
            ...el?.service,
            label: el.service?.lang ? getTranslatedString(el.service?.lang, langKey) : el.service?.label,
            labels: el.service?.lang ? getTranslatedString(el.service?.lang, langKey) : el.service?.label,
          }
        : undefined;

      const fullLabel = parent?.label ? `${parent?.label} | ${label}` : label;

      return {
        ...el,
        value: el._id,
        label: getLabel ? getLabel({ ...el, label, parent }) : withFullLabel ? fullLabel : label,
        fullLabel,
        service: parent,
        parent,
      };
    });
  }, [getLabel, invState.methods, langKey, withFullLabel]);
};

export const useTranslatedDeliveryMethods = (options?: UseTranslatedListDataOtions) => {
  const state = useShipmentsSelector();
  return useMemo((): IDeliveryMethod[] => {
    return state.methods.map(el => ({
      ...el,
      value: el._id,
      label: el.labels ? getTranslatedString(el.labels, options?.langKey) : el.label,
    }));
  }, [options?.langKey, state.methods]);
};

export const useTranslatedCommunicationMethods = (options?: UseTranslatedListDataOtions) => {
  const methods = useCommunicationSelector().methods;
  return useMemo((): ICommunicationMethod[] => {
    return methods.map(el => ({
      ...el,
      value: el._id,
      label: el.labels ? getTranslatedString(el.labels, options?.langKey) : el.label,
    }));
  }, [options?.langKey, methods]);
};

// export const useTranslatedShipmentMethods = (options?: UseTranslatedMethodsOptionsBase) => {
//   const state = useShipmentsSelector();
//   return useMemo((): IDeliveryMethod[] => {
//     return state.methods.map(el => ({
//       ...el,
//       value: el._id,
//       label: el.labels ? getTranslatedString(el.labels, options?.langKey) : el.label,
//     }));
//   }, [options?.langKey, state.methods]);
// };

export const useTranslatedListData = <
  T extends {
    label?: string;
    labels?: LangPack;
    value?: any;
    type?: string;
    _id: string;
    parent?: any;
    service?: any;
  } = any
>(
  data: T[] = [],
  options?: UseTranslatedListDataOtions
) => {
  return useMemo((): T[] => {
    const trList = data.map(el => {
      const label = el.labels ? getTranslatedString(el.labels, options?.langKey) : el.label ?? el?.type;

      const parent = el?.service
        ? {
            ...el?.service,
            label: el.service?.lang ? getTranslatedString(el.service?.lang, options?.langKey) : el.service?.label,
            labels: el.service?.lang ? getTranslatedString(el.service?.lang, options?.langKey) : el.service?.label,
          }
        : undefined;

      const fullLabel = parent?.label ? `${parent?.label} | ${label}` : label;

      return {
        ...el,
        value: el._id,
        label: options?.getLabel
          ? options?.getLabel({ ...el, label, parent })
          : options?.withFullLabel
          ? fullLabel
          : label,
        parent,
      };
    });
    return trList;
  }, [data, options]);
};

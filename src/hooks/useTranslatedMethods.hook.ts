import {
  useCommunicationSelector,
  useInvoicesSelector,
  usePaymentsSelector,
  useShipmentsSelector,
} from '../redux/selectors.store';
import { useMemo } from 'react';
import { getTranslatedString, LangKey } from '../lang';
import { IPaymentMethod } from '../redux/payments/payments.types';
import { ExtPaymentService, ICommunicationMethod, IShipmentMethod } from '../redux/integrations/integrations.types';
import { IInvoicingMethod } from '../redux/invoices/invoices.types';

interface UseTranslatedMethodsOptionsBase {
  langKey?: LangKey;
  withFullLabel?: boolean;
  getLabel?: (
    option: IInvoicingMethod & {
      parent?: ExtPaymentService;
      fullLabel?: string;
    }
  ) => React.ReactNode;
}
export const useTranslatedPaymentMethods = (options?: UseTranslatedMethodsOptionsBase) => {
  const paymentsState = usePaymentsSelector();
  return useMemo((): (IPaymentMethod & { parent?: ExtPaymentService })[] => {
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
}: UseTranslatedMethodsOptionsBase = {}) => {
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

export const useTranslatedShipmentMethods = (options?: UseTranslatedMethodsOptionsBase) => {
  const state = useShipmentsSelector();
  return useMemo((): IShipmentMethod[] => {
    return state.methods.map(el => ({
      ...el,
      value: el._id,
      label: el.labels ? getTranslatedString(el.labels, options?.langKey) : el.label,
    }));
  }, [options?.langKey, state.methods]);
};

export const useTranslatedCommunicationMethods = (options?: UseTranslatedMethodsOptionsBase) => {
  const methods = useCommunicationSelector().methods;
  return useMemo((): ICommunicationMethod[] => {
    return methods.map(el => ({
      ...el,
      value: el._id,
      label: el.labels ? getTranslatedString(el.labels, options?.langKey) : el.label,
    }));
  }, [options?.langKey, methods]);
};

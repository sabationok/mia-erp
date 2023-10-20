import { usePaymentsSelector } from '../redux/selectors.store';
import { useMemo } from 'react';
import { getTranslatedString, LangKey } from '../lang';
import { IPaymentMethod, PaymentServProvider } from '../redux/payments/payments.types';

const useTranslatedPaymentMethods = (langKey: LangKey = 'ua') => {
  const paymentsState = usePaymentsSelector();
  return useMemo((): (IPaymentMethod & { parent?: PaymentServProvider })[] => {
    return paymentsState.methods.map(el => {
      const parent = el?.provider
        ? {
            ...el?.provider,
            label: el.provider?.lang ? getTranslatedString(el.provider?.lang, langKey) : el.provider?.label,
          }
        : undefined;

      return {
        ...el,
        value: el._id,
        label: el.lang ? getTranslatedString(el.lang, langKey) : el.label,
        provider: parent,
        parent,
      };
    });
  }, [langKey, paymentsState.methods]);
};
export default useTranslatedPaymentMethods;

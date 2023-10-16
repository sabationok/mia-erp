import { usePaymentsSelector } from '../redux/selectors.store';
import { useMemo } from 'react';
import { getTranslatedString, LangKey } from '../lang';

export const useTranslatedPaymentMethods = (langKey?: LangKey) => {
  const paymentsState = usePaymentsSelector();
  return useMemo(() => {
    return paymentsState.methods.map(el => ({
      ...el,
      value: el._id,
      label: el.lang ? getTranslatedString(el.lang, langKey) : el.label,
    }));
  }, [langKey, paymentsState.methods]);
};

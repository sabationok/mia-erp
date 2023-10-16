import { useShipmentsSelector } from '../redux/selectors.store';
import { useMemo } from 'react';
import { getTranslatedString, LangKey } from '../lang';

const useTranslatedShipmentMethods = (langKey?: LangKey) => {
  const state = useShipmentsSelector();
  return useMemo(() => {
    return state.methods.map(el => ({
      ...el,
      value: el._id,
      label: el.lang ? getTranslatedString(el.lang, langKey) : el.label,
    }));
  }, [langKey, state.methods]);
};
export default useTranslatedShipmentMethods;

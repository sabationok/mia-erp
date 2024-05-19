import { useProductsSelector } from '../redux/selectors.store';

export const useCurrentOffer = ({ id }: { id?: string } = {}) => {
  const state = useProductsSelector();
  return id ? state.dataMap?.[id] : undefined;
};

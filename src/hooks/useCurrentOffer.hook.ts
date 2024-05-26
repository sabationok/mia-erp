import { useProductsSelector } from '../redux/selectors.store';

export const useCurrentOffer = ({ _id }: { _id?: string } = {}) => {
  const state = useProductsSelector();
  return _id ? state.dataMap?.[_id] : undefined;
};

import { useProductsSelector } from '../redux/selectors.store';
import { useAppParams } from './index';

export const useCurrentOffer = ({ _id }: { _id?: string } = {}) => {
  const param = useAppParams();
  const id = _id ?? param?.offerId;
  const state = useProductsSelector();
  return id ? state.dataMap?.[id] : undefined;
};

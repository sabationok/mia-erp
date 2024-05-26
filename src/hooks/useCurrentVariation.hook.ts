import { useProductsSelector } from '../redux/selectors.store';

export const useCurrentVariation = ({ id }: { id?: string } = {}) => {
  const state = useProductsSelector();

  return {
    variation: id ? state.variationsMap?.[id] : undefined,
  };
};

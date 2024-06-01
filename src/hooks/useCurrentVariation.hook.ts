import { useOffersSelector } from '../redux/selectors.store';

export const useCurrentVariation = ({ id }: { id?: string } = {}) => {
  const state = useOffersSelector();

  return {
    variation: id ? state.variationsMap?.[id] : undefined,
  };
};

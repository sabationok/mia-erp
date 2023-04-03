import { useCategoriesSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';

const useCategoriesService = () => {
  const dispatch = useAppDispatch();
  const state = useCategoriesSelector();

  return {
    dispatch,
    ...state,
  };
};

export default useCategoriesService;

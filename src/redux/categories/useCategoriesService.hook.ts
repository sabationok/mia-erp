import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store.store';
export const useCategoriesSelector = () => useSelector((state: RootState) => state.categories);

const useCategoriesService = () => {
  const dispatch = useAppDispatch();
  const state = useCategoriesSelector();

  return {
    dispatch,
    ...state,
  };
};

export default useCategoriesService;

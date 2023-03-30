import { useCountsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';

const useCountsService = () => {
  const dispatch = useAppDispatch();
  const countsState = useCountsSelector();

  return {
    dispatch,
    ...countsState,
  };
};

export default useCountsService;

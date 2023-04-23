import { useCountsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';
import { ICount } from './counts.types';

const useCountsService = () => {
  const dispatch = useAppDispatch();
  const state = useCountsSelector();

  function create(submitData: Partial<ICount>) {
    console.log({ submitData });
  }

  function editById(_id: string, submitData: Partial<ICount>) {
    console.log({ _id, submitData });
  }

  function getById(_id: string) {
    return state.counts.find(el => el._id === _id);
  }

  function deleteById(_id: string) {
    const { counts } = state;
    const countForDelete = counts.find(c => c._id === _id);
    const result = window.confirm(`Видалити "${countForDelete?.name}"?`);
    if (result) {
      console.log('deleteCount', _id);
    }
  }

  return {
    dispatch,
    ...state,
    create,
    editById,
    getById,
    deleteById,
  };
};

export default useCountsService;

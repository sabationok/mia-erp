import { useCategoriesSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';
import { ICategory } from '../../data/categories.types';

const useCategoriesService = () => {
  const dispatch = useAppDispatch();
  const state = useCategoriesSelector();

  function create(submitData: Partial<ICategory>) {
    console.log({ submitData });
  }

  function deleteById(_id: string) {
    console.log({ _id });
  }

  function editById(_id: string, submitData: Partial<ICategory>) {
    console.log({ _id, submitData });
  }

  function getById(_id: string) {
    return state.categories.find(el => el._id === _id);
  }


  return {
    dispatch,
    ...state,
    create,
    deleteById,
    editById,
    getById,
  };
};

export default useCategoriesService;

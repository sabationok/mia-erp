import { useCategoriesSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';
import { ICategoryFormData } from '../../data/categories.types';

const useCategoriesService = () => {
  const dispatch = useAppDispatch();
  const state = useCategoriesSelector();

  function create(submitData: ICategoryFormData) {
    console.log({ submitData });
  }

  function deleteById(_id: string) {
    const categoryForDel = getById(_id);
    if (window.confirm(`Бажаєте видалити ${categoryForDel?.owner ? 'під-категорію' : 'категорію'}: ${categoryForDel?.label || categoryForDel?.name}`))
      console.log({ _id });
  }

  function editById(_id: string, submitData: ICategoryFormData) {
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

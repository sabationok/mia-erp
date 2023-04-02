import { CountFormData } from 'components/Directories/DirCounts/FormCreateCount';
import { useCountsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';

const useCountsService = () => {
  const dispatch = useAppDispatch();
  const state = useCountsSelector();
  function createNewCount(formData: CountFormData) {
    console.log('createNewCount', formData);
  }
  function editCount(formData: CountFormData) {
    console.log('editCount', formData);
  }
  function deleteCount(_id: string) {
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
    createNewCount,
    editCount,
    deleteCount,
  };
};

export default useCountsService;

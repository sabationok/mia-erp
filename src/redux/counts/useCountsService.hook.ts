import { CountFormData } from 'components/Directories/DirCounts/FormCreateCount';
import { useCountsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';

const useCountsService = () => {
  const dispatch = useAppDispatch();
  const countsState = useCountsSelector();
  function createNewCount(formData: CountFormData) {
    console.log('createNewCount', formData);
  }
  function editCount(formData: CountFormData) {
    console.log('editCount', formData);
  }
  function deleteCount(_id: string) {
    console.log('deleteCount', _id);
  }

  return {
    dispatch,
    ...countsState,
    createNewCount,
    editCount,
    deleteCount,
  };
};

export default useCountsService;

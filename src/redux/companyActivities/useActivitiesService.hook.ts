import { useAppDispatch } from '../store.store';
import { activitiesMockData } from 'data';

const useActivitiesService = () => {
  const dispatch = useAppDispatch();
  const activities = activitiesMockData;

  function getById(id: string) {
    return activities.find(el => el._id === id);
  }

  return {
    dispatch,
    activities,
    getById,
  };

};

export type ActivitiesService = ReturnType<typeof useActivitiesService>
export default useActivitiesService as typeof useActivitiesService;

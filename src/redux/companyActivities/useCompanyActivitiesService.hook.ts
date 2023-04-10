import { useAppDispatch } from '../store.store';
import { activitiesMockData } from 'data';

const useCompanyActivitiesService = () => {
  const dispatch = useAppDispatch();
  const companyActivities = activitiesMockData;

  function getById(id: string) {
    return companyActivities.find(el => el._id === id);
  }

  return {
    dispatch,
    companyActivities,
    getById,
  };

};
export type CompanyActivitiesService = typeof useCompanyActivitiesService
export default useCompanyActivitiesService as CompanyActivitiesService;

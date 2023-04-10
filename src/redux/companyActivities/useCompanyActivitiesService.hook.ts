import { useAppDispatch } from '../store.store';
import { activitiesMockData } from 'data';

const useCompanyActivitiesService = () => {
  const dispatch = useAppDispatch();
  const companyActivities = activitiesMockData;

  return {
    dispatch,
    companyActivities,
  };

};
export type CompanyActivitiesService = typeof useCompanyActivitiesService
export default useCompanyActivitiesService as CompanyActivitiesService;

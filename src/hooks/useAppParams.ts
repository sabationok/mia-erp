import { useParams } from 'react-router-dom';

export type AppUrlParams = {
  companyId?: string;
};
const useAppParams = (): Readonly<Partial<AppUrlParams>> => useParams<AppUrlParams>();

export default useAppParams;

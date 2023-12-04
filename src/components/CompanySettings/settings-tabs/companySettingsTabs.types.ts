import { ICompany } from '../../../types/companies.types';

export interface CompanySettingsTabBaseProps {
  onClose?: () => void;
  compId: string;
  isInFocus?: boolean;
  company?: ICompany;
}

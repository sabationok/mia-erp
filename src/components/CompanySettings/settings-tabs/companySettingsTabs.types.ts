import { CompanyEntity } from '../../../types/companies.types';

export interface CompanySettingsTabBaseProps {
  onClose?: () => void;
  compId: string;
  isInFocus?: boolean;
  company?: CompanyEntity;
}

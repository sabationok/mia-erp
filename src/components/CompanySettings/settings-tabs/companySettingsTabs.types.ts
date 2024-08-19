import { CompanyEntity, CompanyPoliciesFormDataMap } from '../../../types/companies/companies.types';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { Keys } from '../../../types/utils.types';

export enum CompanySettingsTabs {
  invoicing = 'invoicing',
  payment = 'payment',
  delivery = 'delivery',
  warehousing = 'warehousing',
  fiscalization = 'fiscal',
  // Supplement = 'Supplement',
}

export interface CompanySettingsTabBaseProps<PName extends Keys<CompanyPoliciesFormDataMap> = any, InnerTabs = any> {
  onClose?: () => void;
  compId: string;
  isInFocus?: boolean;
  company?: CompanyEntity;

  policyEnum?: InnerTabs; // Enum for dynamic tab types
  policyFormKey: PName; // Key for dynamic form values
  methodsSelector?: () => any; // Method selector function
  formDefaultValues?: CompanyPoliciesFormDataMap[PName]; // Optional default form values

  isSubmitting?: boolean;
  onSubmit?: AppSubmitHandler<{
    name: PName;
    data: CompanyPoliciesFormDataMap[PName];
  }>;
}

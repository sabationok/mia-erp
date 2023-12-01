import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { ICompanyConfigsFormData } from '../../../types/companies.types';
import { useWarehousesSelector } from '../../../redux/selectors.store';
import { useMemo } from 'react';
import { FilterOption } from '../../ModalForm/ModalFilter';
import FlexBox from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { t } from '../../../lang';

export interface SupplementPolicyTabProps extends CompanySettingsTabBaseProps {}

const SupplementPolicyTab = ({ onClose }: SupplementPolicyTabProps) => {
  const form = useAppForm<ICompanyConfigsFormData>();

  const warehouses = useWarehousesSelector().warehouses;
  const warehousesSelectOptions = useMemo(
    (): FilterOption<string>[] => warehouses.map(w => ({ ...w, value: w._id })),
    [warehouses]
  );

  // const onValid = (data: ICompanyConfigsFormData) => {};

  return (
    <FlexBox>
      <CustomSelect
        {...form.registerSelect('warehouse', {
          options: warehousesSelectOptions,
          label: t('warehouse'),
          placeholder: t('Select warehouse'),
        })}
      />
    </FlexBox>
  );
};

export default SupplementPolicyTab;

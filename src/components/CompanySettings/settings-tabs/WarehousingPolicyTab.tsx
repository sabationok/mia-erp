import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { ICompanyFormData } from '../../../types/companies.types';
import { useWarehousesSelector } from '../../../redux/selectors.store';
import { useMemo } from 'react';
import { FilterOption } from '../../ModalForm/ModalFilter';
import FlexBox from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { t } from '../../../lang';

export interface WarehousingPolicyTabProps extends CompanySettingsTabBaseProps {}

const WarehousingPolicyTab = ({ onClose }: WarehousingPolicyTabProps) => {
  const form = useAppForm<ICompanyFormData>();

  const warehouses = useWarehousesSelector().warehouses;
  const warehousesSelectOptions = useMemo(
    (): FilterOption<string>[] => warehouses.map(w => ({ ...w, value: w._id })),
    [warehouses]
  );

  // const onValid = (data: ICompanyConfigsFormData) => {};

  return (
    <FlexBox>
      <CustomSelect
        {...form.registerSelect('warehousingPolicy.warehouse', {
          options: warehousesSelectOptions,
          label: t('Default warehouse'),
          placeholder: t('Select default warehouse'),
        })}
      />
    </FlexBox>
  );
};

export default WarehousingPolicyTab;

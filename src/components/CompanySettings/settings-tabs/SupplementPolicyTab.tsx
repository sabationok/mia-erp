import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { ICompanyConfigsFormData } from '../../../types/companies.types';
import { useWarehousesSelector } from '../../../redux/selectors.store';
import { useMemo } from 'react';
import { FilterOption } from '../../atoms/ModalFilter';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { t } from '../../../lang';
import ModalFooter from '../../Modal/ModalFooter';

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
    <FlexForm flex={1} overflow={'hidden'}>
      <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 4px 8px'}>
        <CustomSelect
          {...form.registerSelect('warehouse', {
            options: warehousesSelectOptions,
            label: t('warehouse'),
            placeholder: t('Select warehouse'),
          })}
        />
      </FlexBox>

      <ModalFooter onSubmitPassed isLoading={false}></ModalFooter>
    </FlexForm>
  );
};

export default SupplementPolicyTab;

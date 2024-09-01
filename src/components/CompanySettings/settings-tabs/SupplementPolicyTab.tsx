import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { useWarehousesSelector } from '../../../redux/selectors.store';
import { useMemo } from 'react';
import { FilterOption } from '../../atoms/TabSelector';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { t } from '../../../i18e';

export interface SupplementPolicyTabProps extends CompanySettingsTabBaseProps<'supplement'> {}

const SupplementPolicyTab = ({ onClose, onSubmit, policyFormKey }: SupplementPolicyTabProps) => {
  const form = useAppForm<any>();

  const warehouses = useWarehousesSelector().list;
  const warehousesSelectOptions = useMemo(
    (): FilterOption<string>[] => warehouses.map(w => ({ ...w, value: w._id })),
    [warehouses]
  );

  const onValid = (data: SupplementPolicyTabProps['formDefaultValues']) => {
    console.log('SupplementPolicyTabProps', data);
    if (onSubmit && data) {
      return onSubmit({ name: policyFormKey, data });
    }
  };

  return (
    <FlexForm flex={1} overflow={'hidden'} id={policyFormKey} onSubmit={form.handleSubmit(onValid)}>
      <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 4px 8px'}>
        <CustomSelect
          {...form.registerSelect('supplier', {
            options: warehousesSelectOptions,
            label: t('warehouse'),
            placeholder: t('Select warehouse'),
          })}
        />
      </FlexBox>
    </FlexForm>
  );
};

export default SupplementPolicyTab;

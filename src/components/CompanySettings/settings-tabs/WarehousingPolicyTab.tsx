import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { ICompanyWarehousingPolicyFormData } from '../../../types/companies.types';
import { usePermissionsSelector, useWarehousesSelector } from '../../../redux/selectors.store';
import { useMemo } from 'react';
import { FilterOption } from '../../atoms/ModalFilter';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { t } from '../../../lang';
import { toReqData } from '../../../utils';
import ModalFooter from '../../ModalForm/ModalFooter';

export interface WarehousingPolicyTabProps extends CompanySettingsTabBaseProps {}

const WarehousingPolicyTab = ({ onClose }: WarehousingPolicyTabProps) => {
  const company = usePermissionsSelector().permission.company;

  const warehouses = useWarehousesSelector().warehouses;
  const warehousesSelectOptions = useMemo(
    (): FilterOption<string>[] => warehouses.map(w => ({ ...w, value: w._id })),
    [warehouses]
  );
  const form = useAppForm<ICompanyWarehousingPolicyFormData>({ defaultValues: company as never });
  const formValues = form.watch();

  // const registerSwitch = (name: keyof Omit<ICompanyDeliveryPolicyFormData, 'method'>) => {
  //   return {
  //     name: name,
  //     onChange(v: boolean) {
  //       form.setValue(`deliveryPolicy.${name}`, v, { shouldTouch: true });
  //     },
  //     value: formValues?.deliveryPolicy ? formValues?.deliveryPolicy[name] : false,
  //   };
  // };

  const onValid = (fData: ICompanyWarehousingPolicyFormData) => {
    console.log(toReqData(fData));
  };
  // const onValid = (data: ICompanyConfigsFormData) => {};

  return (
    <FlexForm flex={1} overflow={'hidden'} onSubmit={form.handleSubmit(onValid)}>
      <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 8px 8px'}>
        <CustomSelect
          onSelect={option => {
            form.setValue('warehouse', option);
          }}
          {...{
            options: warehouses,
            label: t('Default warehouse'),
            placeholder: t('Select default warehouse'),
          }}
        />
      </FlexBox>

      <ModalFooter onSubmitPassed isLoading={false}></ModalFooter>
    </FlexForm>
  );
};

export default WarehousingPolicyTab;

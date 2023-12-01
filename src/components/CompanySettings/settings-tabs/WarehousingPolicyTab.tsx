import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { ICompanyFormData } from '../../../types/companies.types';
import { usePermissionsSelector, useWarehousesSelector } from '../../../redux/selectors.store';
import { useMemo } from 'react';
import { FilterOption } from '../../ModalForm/ModalFilter';
import FlexBox from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { t } from '../../../lang';
import { toReqData } from '../../../utils';
import { SettingsStyles } from '../components/styles';
import ModalFooter from '../../ModalForm/ModalFooter';

export interface WarehousingPolicyTabProps extends CompanySettingsTabBaseProps {}

const WarehousingPolicyTab = ({ onClose }: WarehousingPolicyTabProps) => {
  const company = usePermissionsSelector().permission.company;

  const warehouses = useWarehousesSelector().warehouses;
  const warehousesSelectOptions = useMemo(
    (): FilterOption<string>[] => warehouses.map(w => ({ ...w, value: w._id })),
    [warehouses]
  );
  const form = useAppForm<ICompanyFormData>({ defaultValues: company as never });
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

  const onValid = (fData: ICompanyFormData) => {
    console.log(toReqData(fData));
  };
  // const onValid = (data: ICompanyConfigsFormData) => {};

  return (
    <SettingsStyles.Form>
      <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 8px 8px'}>
        <CustomSelect
          {...form.registerSelect('warehousingPolicy.warehouse', {
            options: warehousesSelectOptions,
            label: t('Default warehouse'),
            placeholder: t('Select default warehouse'),
          })}
        />
      </FlexBox>

      <ModalFooter onClick={onClose} onSubmitPassed isLoading={false}></ModalFooter>
    </SettingsStyles.Form>
  );
};

export default WarehousingPolicyTab;

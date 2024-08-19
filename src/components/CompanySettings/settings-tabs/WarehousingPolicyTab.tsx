import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { usePermissionsSelector, useWarehousesSelector } from '../../../redux/selectors.store';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { t } from '../../../lang';
import { WarehousingPolicy } from 'types/companies/policies';

export interface WarehousingPolicyTabProps extends CompanySettingsTabBaseProps<'warehousing'> {}

const WarehousingPolicyTab: React.FC<WarehousingPolicyTabProps> = ({ policyFormKey, onSubmit }) => {
  const company = usePermissionsSelector().permission.company;
  const warehouses = useWarehousesSelector().list;

  // const warehousesSelectOptions = useMemo(
  //   (): FilterOption<string>[] => warehouses.map(w => ({ ...w, value: w._id })),
  //   [warehouses]
  // );
  const form = useAppForm<WarehousingPolicy.FormData>({
    defaultValues: { warehouseId: company?.warehousingPolicy?.warehouse?._id },
  });

  // const registerSwitch = (name: keyof Omit<ICompanyDeliveryPolicyFormData, 'method'>) => {
  //   return {
  //     name: name,
  //     onChange(v: boolean) {
  //       form.setValue(`deliveryPolicy.${name}`, v, { shouldTouch: true });
  //     },
  //     value: formValues?.deliveryPolicy ? formValues?.deliveryPolicy[name] : false,
  //   };
  // };

  const onValid = (fData: WarehousingPolicy.FormData) => {
    if (onSubmit) {
      return onSubmit({ name: policyFormKey, data: fData });
    }
  };

  return (
    <FlexForm flex={1} id={policyFormKey} overflow={'hidden'} onSubmit={form.handleSubmit(onValid)}>
      <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 8px 8px'}>
        <CustomSelect
          onSelect={option => {
            form.setValue('warehouseId', option?._id ?? '');
          }}
          {...{
            options: warehouses,
            label: t('Default warehouse'),
            placeholder: t('Select default warehouse'),
          }}
        />
      </FlexBox>
    </FlexForm>
  );
};

export default WarehousingPolicyTab;

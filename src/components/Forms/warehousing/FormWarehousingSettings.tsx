import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useAppForm } from '../../../hooks';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { usePermissionsSelector, useWarehousesSelector } from '../../../redux/selectors.store';
import { FilterOption } from '../../ModalForm/ModalFilter';
import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import { IWarehouse, WarehousingSettingsFormData } from '../../../redux/warehouses/warehouses.types';
import { t } from 'lang';
import { ICompany, ICompanyDto, ICompanyForReq, ICompanyWithConfigs } from 'redux/companies/companies.types';
import { Text } from '../../atoms/Text';
import Switch from '../../atoms/Switch';
import { getIdRef } from '../../../utils/dataTransform';
import { useMemo } from 'react';

export interface FormWarehousingSettingsProps
  extends Omit<ModalFormProps<any, any, ICompany>, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<ICompanyForReq>;
}
export function createWarehousingSettingsFormData(
  company?: Partial<ICompanyWithConfigs>
): WarehousingSettingsFormData | undefined {
  if (!createWarehousingSettingsFormData) return;
  return {
    warehouse: company?.warehouse,
  };
}
export function createWarehousingSettingsReqData(fData?: WarehousingSettingsFormData): ICompanyDto | undefined {
  if (!fData) return;
  if (!fData?.warehouse) return;
  return {
    warehouse: getIdRef(fData?.warehouse),
  };
}
const useWarehousesAsSelectOptions = (): FilterOption[] => {
  return useWarehousesSelector().warehouses.map(w => ({ ...w, value: w._id }));
};
export const FormWarehousingSettings: React.FC<FormWarehousingSettingsProps> = ({
  defaultState,
  onSubmit,
  onClose,
  ...p
}) => {
  const prServ = useAppServiceProvider()[ServiceName.permissions];
  const currentPermission = usePermissionsSelector()?.permission;
  const warehousesSelectOptions = useWarehousesAsSelectOptions();

  const currenCompanyData = useMemo(
    () => defaultState || currentPermission?.company,
    [currentPermission?.company, defaultState]
  );

  const { setValue, formValues, handleSubmit, registerSelect } = useAppForm<WarehousingSettingsFormData>({
    defaultValues: createWarehousingSettingsFormData(currenCompanyData),
  });

  const onValid = (fData: WarehousingSettingsFormData) => {
    const reqData = createWarehousingSettingsReqData(fData);

    reqData && prServ.updateCurrentCompany({ data: { _id: currenCompanyData?._id, data: reqData } });
  };

  return (
    <ModalForm
      fillHeight
      title={p.title || t('Warehousing settings')}
      onClose={onClose}
      {...p}
      onSubmit={handleSubmit(onValid)}
    >
      <Content flex={1} overflow={'auto'} padding={'0 8px'}>
        <CustomSelect
          {...registerSelect('warehouse', {
            options: warehousesSelectOptions,
            label: t('Default warehouse'),
            placeholder: t('Select default warehouse'),
            getLabel: (d: Partial<IWarehouse>) => {
              return `${d.label} | ${d?.code}`;
            },
          })}
        />

        <FlexBox fxDirection={'row'} justifyContent={'space-between'} alignItems={'center'} padding={'0 0 0 8px'}>
          <Text>{'Reservation available'}</Text>

          <Switch
            size={'32px'}
            checked={formValues?.isReservationAvailable}
            onChange={v => {
              setValue('isReservationAvailable', v.checked);
            }}
          />
        </FlexBox>
      </Content>
    </ModalForm>
  );
};
const Content = styled(FlexBox)``;
export default FormWarehousingSettings;

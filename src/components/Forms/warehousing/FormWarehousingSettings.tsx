import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useAppForm } from '../../../hooks';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { useWarehousesSelector } from '../../../redux/selectors.store';
import { FilterOption } from '../../ModalForm/ModalFilter';
import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import { IWarehouse, WarehousingSettingsFormData } from '../../../redux/warehouses/warehouses.types';
import { t } from 'lang';
import { ICompanyConfigs, ICompanyConfigsDto } from 'redux/companies/companies.types';
import { Text } from '../../atoms/Text';
import Switch from '../../atoms/Switch';
import { ExtractId } from '../../../utils/dataTransform';

export interface FormWarehousingSettingsProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<ICompanyConfigsDto>;
}
function createWarehouseFormData(configs: ICompanyConfigs): WarehousingSettingsFormData {
  return {
    warehouse: configs?.warehouse,
  };
}
function createWarehouseReqData(fData: WarehousingSettingsFormData): ICompanyConfigsDto {
  return {
    warehouse: fData?.warehouse ? ExtractId(fData?.warehouse) : undefined,
  };
}
export const FormWarehousingSettings: React.FC<FormWarehousingSettingsProps> = ({ onSubmit, onClose, ...p }) => {
  const prServ = useAppServiceProvider()[ServiceName.permissions];

  const warehousesSelectOptions: FilterOption[] = useWarehousesSelector().warehouses.map(w => ({ ...w, value: w._id }));

  const { setValue, formValues, handleSubmit, registerSelect } = useAppForm<WarehousingSettingsFormData>();

  const onValid = (fData: WarehousingSettingsFormData) => {
    prServ.setCurrentConfigs({ data: { data: createWarehouseReqData(fData) } });
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

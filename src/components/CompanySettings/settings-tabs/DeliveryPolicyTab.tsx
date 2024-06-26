import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { DeliveryPolicyJsonData, ICompanyDeliveryPolicyFormData } from '../../../types/companies.types';
import { useCompaniesSelector, useDeliveriesSelector } from '../../../redux/selectors.store';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { t } from '../../../lang';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useState } from 'react';
import ModalFooter from '../../atoms/Modal/ModalFooter';
import { _enumToTabs } from '../../../utils';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import TabSelector from '../../atoms/TabSelector';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { useAppForm } from '../../../hooks';
import InputText from '../../atoms/Inputs/InputText';

export interface DeliveryPolicyTabProps extends CompanySettingsTabBaseProps {
  onSubmit?: AppSubmitHandler<{
    data: ICompanyDeliveryPolicyFormData[keyof ICompanyDeliveryPolicyFormData];
    tab: keyof ICompanyDeliveryPolicyFormData;
  }>;
}
export type DeliverySalesPolicyBooleanFieldKeys = keyof Omit<
  DeliveryPolicyJsonData,
  'method' | 'minInsuranceAmount' | 'insurancePercentage'
>;

export enum DeliveryPolicyTabs {
  sales = 'sales',
  returns = 'returns',
}

const tabs = _enumToTabs(DeliveryPolicyTabs);
const DeliveryPolicyTab = ({ onClose, onSubmit }: DeliveryPolicyTabProps) => {
  const service = useAppServiceProvider()[AppModuleName.companies];
  const company = useCompaniesSelector().current;
  const methods = useTranslatedMethodsList(useDeliveriesSelector().methods, { withFullLabel: true });
  const [current, setCurrent] = useState<DeliveryPolicyTabs>(DeliveryPolicyTabs.sales);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useAppForm<ICompanyDeliveryPolicyFormData>({
    defaultValues: company?.deliveryPolicy as ICompanyDeliveryPolicyFormData,
  });

  const formValues = form.watch();

  const registerSwitch = (name: DeliverySalesPolicyBooleanFieldKeys) => {
    const value = formValues[current];
    return {
      name: name,
      onChange(v: boolean) {
        form.setValue(`${current}.${name}`, v, { shouldTouch: true });
      },
      value: value && value[name],
    };
  };

  const onValid = (fData: ICompanyDeliveryPolicyFormData) => {
    // onSubmit && onSubmit({ data: fData, tab: current });

    if (company?._id) {
      service.update({
        data: { _id: company?._id, data: { deliveryPolicy: { [current]: fData[current] } } },
        onLoading: setLoading,
        onSuccess: () => {
          onClose && onClose();
        },
      });
    }
  };

  return (
    <>
      <TabSelector options={tabs} onChangeIndex={index => setCurrent(tabs[index].value)} />

      <FlexForm flex={1} overflow={'hidden'} onSubmit={form.handleSubmit(onValid)}>
        <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 8px 8px'}>
          <CustomSelect
            onSelect={option => form.setValue(`${current}.method`, option.value)}
            defaultValue={formValues[current]?.method}
            options={methods}
            {...{
              label: t('Default method'),
              placeholder: t('Select default method'),
            }}
          />

          <InputLabel label={t(`Auto creating delivery for ${current.toUpperCase()}`)}>
            <ButtonSwitch {...registerSwitch('autoCreate')} />
          </InputLabel>

          <InputLabel label={t('Client can select method')}>
            <ButtonSwitch {...registerSwitch('selectByClient')} />
          </InputLabel>

          <InputLabel label={t(`Auto publishing delivery for ${current.toUpperCase()}, to external service`)}>
            <ButtonSwitch {...registerSwitch('autoPublish')} />
          </InputLabel>

          <InputLabel label={t(`Has insurance amount`)}>
            <ButtonSwitch {...registerSwitch('hasInsurance')} />
          </InputLabel>

          {formValues?.sales?.hasInsurance && (
            <FlexBox fxDirection={'row'} gap={8}>
              <InputLabel label={t(`Minimum insurance amount`)}>
                <InputText {...form.register('sales.minInsuranceAmount')} />
              </InputLabel>

              <InputLabel label={t(`Insurance percentage total amount`)}>
                <InputText {...form.register('sales.insurancePercentage')} />
              </InputLabel>
            </FlexBox>
          )}
        </FlexBox>

        <ModalFooter hasOnSubmit isLoading={loading} />
      </FlexForm>
    </>
  );
};

export default DeliveryPolicyTab;

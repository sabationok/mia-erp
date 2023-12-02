import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { DeliveryPolicyJsonData, ICompanyDeliveryPolicyFormData } from '../../../types/companies.types';
import { useDeliveriesSelector, usePermissionsSelector } from '../../../redux/selectors.store';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { t } from '../../../lang';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useEffect, useState } from 'react';
import ModalFooter from '../../ModalForm/ModalFooter';
import { enumToTabs, toReqData } from '../../../utils';
import FlexBox from '../../atoms/FlexBox';
import { SettingsStyles } from '../components/styles';
import ModalFilter from '../../ModalForm/ModalFilter';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';

export interface DeliveryPolicyTabProps extends CompanySettingsTabBaseProps {
  onSubmit?: AppSubmitHandler<{
    data: ICompanyDeliveryPolicyFormData[keyof ICompanyDeliveryPolicyFormData];
    tab: keyof ICompanyDeliveryPolicyFormData;
  }>;
}
export enum DeliveryPolicyTabs {
  sales = 'sales',
  returns = 'returns',
}
const tabs = enumToTabs(DeliveryPolicyTabs);
const DeliveryPolicyTab = ({ onClose, onSubmit }: DeliveryPolicyTabProps) => {
  const service = useAppServiceProvider()[AppModuleName.companies];
  const company = usePermissionsSelector().permission.company;
  const methods = useTranslatedMethodsList(useDeliveriesSelector().methods, { withFullLabel: true });
  const [current, setCurrent] = useState<keyof ICompanyDeliveryPolicyFormData>(DeliveryPolicyTabs.sales);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useAppForm<ICompanyDeliveryPolicyFormData>({
    defaultValues: company?.deliveryPolicy as ICompanyDeliveryPolicyFormData,
    shouldUnregister: true,
  });
  const formValues = form.watch();

  const registerSwitch = (name: keyof Omit<DeliveryPolicyJsonData, 'method'>) => {
    return {
      name: name,
      onChange(v: boolean) {
        form.setValue(`${current}.${name}`, v, { shouldTouch: true });
      },
      value: formValues?.sales ? formValues?.sales[name] : false,
    };
  };

  const onValid = (fData: ICompanyDeliveryPolicyFormData) => {
    onSubmit && onSubmit({ data: fData[current], tab: current });

    console.log(toReqData(fData));
    if (company?._id) {
      service.update({
        data: { _id: company?._id, id: company?._id, data: { deliveryPolicy: { [current]: formValues[current] } } },
        logRes: true,
        onLoading: setLoading,
      });
    }
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <>
      <ModalFilter filterOptions={tabs} onChangeIndex={index => setCurrent(tabs[index].value)} />

      <SettingsStyles.Form onSubmit={form.handleSubmit(onValid)}>
        <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 8px 8px'}>
          <CustomSelect
            onSelect={option => form.setValue(`${current}.method`, option.value)}
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

          <InputLabel label={t(`Auto publishing delivery for ${current.toUpperCase()}`)}>
            <ButtonSwitch {...registerSwitch('autoPublish')} />
          </InputLabel>
        </FlexBox>

        <ModalFooter onClick={onClose} onSubmitPassed isLoading={loading}></ModalFooter>
      </SettingsStyles.Form>
    </>
  );
};

export default DeliveryPolicyTab;

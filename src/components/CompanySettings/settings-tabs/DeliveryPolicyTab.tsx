import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { ICompanyDeliveryPolicyFormData, ICompanyFormData } from '../../../types/companies.types';
import { useDeliveriesSelector, usePermissionsSelector } from '../../../redux/selectors.store';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { t } from '../../../lang';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useEffect } from 'react';
import ModalFooter from '../../ModalForm/ModalFooter';
import { toReqData } from '../../../utils';
import FlexBox from '../../atoms/FlexBox';
import { SettingsStyles } from '../components/styles';

export interface DeliveryPolicyTabProps extends CompanySettingsTabBaseProps {}

const DeliveryPolicyTab = ({ onClose }: DeliveryPolicyTabProps) => {
  const company = usePermissionsSelector().permission.company;
  const methods = useTranslatedMethodsList(useDeliveriesSelector().methods);
  const form = useAppForm<ICompanyFormData>({ defaultValues: company as never });
  const formValues = form.watch();

  const registerSwitch = (name: keyof Omit<ICompanyDeliveryPolicyFormData, 'method'>) => {
    return {
      name: name,
      onChange(v: boolean) {
        form.setValue(`deliveryPolicy.${name}`, v, { shouldTouch: true });
      },
      value: formValues?.deliveryPolicy ? formValues?.deliveryPolicy[name] : false,
    };
  };

  const onValid = (fData: ICompanyFormData) => {
    console.log(toReqData(fData));
  };
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <SettingsStyles.Form onSubmit={form.handleSubmit(onValid)}>
      <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 8px 8px'}>
        <InputLabel label={t('Auto creating invoice for delivery')}>
          <ButtonSwitch {...registerSwitch('autoCreate')} />
        </InputLabel>

        <CustomSelect
          {...form.registerSelect('deliveryPolicy.method', {
            options: methods,
            label: t('Default method'),
            placeholder: t('Select default method'),
          })}
        />

        <InputLabel label={t('Client can select method')}>
          <ButtonSwitch {...registerSwitch('selectByClient')} />
        </InputLabel>

        <InputLabel label={t('Auto publishing invoice for delivery')}>
          <ButtonSwitch {...registerSwitch('autoPublish')} />
        </InputLabel>
      </FlexBox>

      <ModalFooter onClick={onClose} onSubmitPassed isLoading={false}></ModalFooter>
    </SettingsStyles.Form>
  );
};

export default DeliveryPolicyTab;

import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { ICompanyDeliveryPolicyFormData, ICompanyFormData } from '../../../types/companies.types';
import { useDeliveriesSelector, usePermissionsSelector } from '../../../redux/selectors.store';
import FlexBox from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { t } from '../../../lang';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useEffect } from 'react';

export interface DeliveryPolicyTabProps extends CompanySettingsTabBaseProps {}

const DeliveryPolicyTab = ({}: DeliveryPolicyTabProps) => {
  const company = usePermissionsSelector().permission.company;
  const form = useAppForm<ICompanyFormData>({ defaultValues: company });
  const formValues = form.watch();
  const methods = useTranslatedMethodsList(useDeliveriesSelector().methods);

  const registerSwitch = (name: keyof Omit<ICompanyDeliveryPolicyFormData, 'method'>) => {
    return {
      name: name,
      onChange(v: boolean) {
        form.setValue(`deliveryPolicy.${name}`, v, { shouldTouch: true });
      },
      value: formValues?.deliveryPolicy ? formValues?.deliveryPolicy[name] : false,
    };
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <FlexBox>
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
  );
};

export default DeliveryPolicyTab;

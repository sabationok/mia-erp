import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { usePaymentsSelector } from '../../../redux/selectors.store';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { _enumToTabs } from '../../../utils';
import { useCallback, useState } from 'react';
import TabSelector from '../../atoms/TabSelector';
import { useForm } from 'react-hook-form';
import { PaymentPolicy } from 'types/companies/policies';

export interface PaymentPolicyTabProps extends CompanySettingsTabBaseProps<'payment'> {}

const tabs = _enumToTabs(PaymentPolicy.TypeEnum);

const PaymentPolicyTab = ({ policyFormKey, isSubmitting, onSubmit, company }: PaymentPolicyTabProps) => {
  const methods = useTranslatedMethodsList(usePaymentsSelector().methods, { withFullLabel: true });

  const [current, setCurrent] = useState<PaymentPolicy.TypeEnum>(PaymentPolicy.TypeEnum.sales);

  const form = useForm<PaymentPolicy.FormData>({
    defaultValues: company?.paymentPolicy ?? {},
  });

  const formValues = form.watch();

  const registerSwitch = useCallback(
    (name: keyof Omit<PaymentPolicy.JsonData, 'methodId'>) => {
      const value = formValues[current];

      return {
        name: name,
        onChange(v: boolean) {
          form.setValue(`${current}.${name}`, v, { shouldTouch: true });
        },
        value: value && value[name],
      };
    },
    [current, form, formValues]
  );

  const onValid = (fData: PaymentPolicy.FormData) => {
    if (onSubmit) {
      return onSubmit({ name: policyFormKey, data: fData });
    }
  };

  return (
    <>
      <TabSelector
        options={tabs}
        onChangeIndex={index => {
          const v = tabs[index].value;
          if (v) setCurrent(v);
        }}
      />

      <FlexForm flex={1} overflow={'hidden'} id={policyFormKey} onSubmit={form.handleSubmit(onValid)}>
        <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 4px 8px'}>
          <CustomSelect
            onSelect={option => {
              option._id && form.setValue(`${current}.methodId`, option._id);
            }}
            selectedValue={formValues[current]?.methodId}
            {...{
              options: methods,
              label: t('Default method'),
              placeholder: t('Select default method'),
            }}
          />

          <InputLabel label={t(`Auto creating payment for ${current.toUpperCase()}`)}>
            <ButtonSwitch {...registerSwitch('autoCreate')} />
          </InputLabel>

          <InputLabel label={t('Client can select method')}>
            <ButtonSwitch {...registerSwitch('selectByClient')} />
          </InputLabel>

          <InputLabel label={t(`Auto publishing payment for ${current.toUpperCase()}`)}>
            <ButtonSwitch {...registerSwitch('autoPublish')} />
          </InputLabel>
        </FlexBox>
      </FlexForm>
    </>
  );
};

export default PaymentPolicyTab;

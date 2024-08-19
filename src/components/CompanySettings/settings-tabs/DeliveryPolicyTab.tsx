import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useDeliveriesSelector } from '../../../redux/selectors.store';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { t } from '../../../lang';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useState } from 'react';
import { _enumToTabs } from '../../../utils';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import TabSelector from '../../atoms/TabSelector';
import { useAppForm } from '../../../hooks';
import InputText from '../../atoms/Inputs/InputText';
import { DeliveryPolicy } from 'types/companies/policies';
import { yupResolver } from '@hookform/resolvers/yup';
import { delivery_policy_json_data_schema } from '../../../validations/companies';

export interface DeliveryPolicyTabProps extends CompanySettingsTabBaseProps<'delivery'> {}

const tabs = _enumToTabs(DeliveryPolicy.TypeEnum);

const DeliveryPolicyTab = ({ onSubmit, company, policyFormKey }: DeliveryPolicyTabProps) => {
  const methods = useTranslatedMethodsList(useDeliveriesSelector().methods, { withFullLabel: true });
  const [current, setCurrent] = useState<DeliveryPolicy.TypeEnum>(DeliveryPolicy.TypeEnum.sales);

  const {
    formValues,
    formState: { errors },
    ...form
  } = useAppForm<DeliveryPolicy.FormData>({
    defaultValues: company?.deliveryPolicy ?? {},
    resolver: yupResolver(delivery_policy_json_data_schema, { stripUnknown: true }),
    reValidateMode: 'onSubmit',
  });

  const registerSwitch = (name: keyof DeliveryPolicy.JsonDataBoolValues | 'insurance.allowed') => {
    return {
      name: name,
      onChange(v: boolean) {
        form.setValue(`${current}.${name}`, v, { shouldTouch: true });
      },
      value: form.getValues(`${current}.${name}`),
    };
  };

  const onValid = (fData: DeliveryPolicy.FormData) => {
    console.log('DeliveryPolicy.FormData', fData);

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
        <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 8px 16px'}>
          <CustomSelect
            onSelect={option => {
              const v = option._id;
              if (v) form.setValue(`${current}.methodId`, v);
            }}
            defaultValue={formValues[current]?.methodId}
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

          <InputLabel label={t(`Has insurance`)}>
            <ButtonSwitch {...registerSwitch('insurance.allowed')} />
          </InputLabel>

          {formValues?.[current]?.insurance?.allowed && (
            <FlexBox fxDirection={'row'} gap={8} alignItems={'flex-end'}>
              <InputLabel label={t(`Minimum amount`)} error={form.getFieldState(`${current}.insurance.amount`).error}>
                <InputText
                  $align={'center'}
                  {...form.register(`${current}.insurance.amount`, { valueAsNumber: true })}
                />
              </InputLabel>

              <InputLabel
                label={t(`Minimum percentage`)}
                error={form.getFieldState(`${current}.insurance.percentage`).error}
              >
                <InputText
                  $align={'center'}
                  {...form.register(`${current}.insurance.percentage`, { valueAsNumber: true })}
                />
              </InputLabel>
            </FlexBox>
          )}
        </FlexBox>
      </FlexForm>
    </>
  );
};

export default DeliveryPolicyTab;

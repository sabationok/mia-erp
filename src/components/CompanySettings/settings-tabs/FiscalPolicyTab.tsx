import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiscalPolicy } from 'types/companies/policies';

export interface FiscalPolicyTabProps extends CompanySettingsTabBaseProps<'fiscal'> {}

// const tabs = enumToTabs(InvoicingPolicyTypeEnum);

const FiscalPolicyTab = ({ onClose, onSubmit, company, policyFormKey }: FiscalPolicyTabProps) => {
  const [_current] = useState<FiscalPolicy.TypeEnum>(FiscalPolicy.TypeEnum.sales);
  console.log('FiscalPolicyTab', { _current });
  const form = useForm<FiscalPolicy.FormData>({
    defaultValues: company?.fiscalPolicy ?? {},
  });

  const onValid = (fData: FiscalPolicy.FormData) => {
    if (onSubmit) {
      return onSubmit({ name: 'fiscal', data: fData });
    } else {
      console.log({ policyName: 'fiscal', data: fData });
    }
  };

  return (
    <>
      {/*<ModalFilter filterOptions={tabs} onChangeIndex={index => setCurrent(tabs[index].value)} />*/}

      <FlexForm flex={1} overflow={'hidden'} onSubmit={form.handleSubmit(onValid)}>
        <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 4px 8px'}>
          {/*<CustomSelect*/}
          {/*  onSelect={option => form.setValue(`${current}.method`, option.value)}*/}
          {/*  selectedValue={formValues[current]?.method}*/}
          {/*  {...{*/}
          {/*    options: methods,*/}
          {/*    label: t('Default method'),*/}
          {/*    placeholder: t('Select default method'),*/}
          {/*  }}*/}
          {/*/>*/}

          {/*<InputLabel label={t(`Auto creating invoice for ${current.toUpperCase()}`)}>*/}
          {/*  <ButtonSwitch {...registerSwitch('autoCreate')} />*/}
          {/*</InputLabel>*/}

          {/*<InputLabel label={t('Client can select method')}>*/}
          {/*  <ButtonSwitch {...registerSwitch('selectByClient')} />*/}
          {/*</InputLabel>*/}

          {/*<InputLabel label={t(`Auto publishing invoice for ${current.toUpperCase()}`)}>*/}
          {/*  <ButtonSwitch {...registerSwitch('autoPublish')} />*/}
          {/*</InputLabel>*/}
        </FlexBox>
      </FlexForm>
    </>
  );
};

export default FiscalPolicyTab;

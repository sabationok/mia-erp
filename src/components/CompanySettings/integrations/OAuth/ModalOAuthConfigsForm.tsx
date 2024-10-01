import * as yup from 'yup';
import { IsDynamicValue, IsEmail, IsString255, IsUaMobilePhone, IsUrl, IsUUID } from '../../../../schemas';
import { OAuth } from '../../../../types/auth/o-auth.namespace';
import { Connection } from '../../../../types/integrations.types';
import { useAppDispatch } from '../../../../redux/store.store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createOAuthConfigsThunk, updateOAuthConfigsThunk } from '../../../../redux/auth/o-auth.thunks';
import { arrayToFilterOptions, enumToArray, enumToFilterOptions, ObjectValues, toReqData } from '../../../../utils';
import ModalBase from '../../../atoms/Modal';
import FlexBox, { FlexForm } from '../../../atoms/FlexBox';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { t } from '../../../../i18e';
import InputText from '../../../atoms/Inputs/InputText';
import TagButtonsFilter from '../../../atoms/TagButtonsFilter';
import FormAccordionItem from '../../../atoms/FormAccordionItem';
import ModalFooter from '../../../atoms/Modal/ModalFooter';
import { omit, pick } from 'lodash';
import { useEffect, useMemo } from 'react';
import { debounceCallback } from '../../../../utils/lodash.utils';
import { StorageService } from '../../../../services';
import ProviderEnum = OAuth.ProviderEnum;

const endpointNames = enumToArray(OAuth.Consumer.EndpointName);
const requiredEndpoints = ObjectValues(pick(OAuth.Consumer.EndpointName, ['auth', 'terms', 'privacyPolicy']));
const optionalEndpoints = ObjectValues(omit(OAuth.Consumer.EndpointName, requiredEndpoints));
const providersList = enumToFilterOptions(OAuth.ProviderEnum);

const formSchema = yup.object().shape({
  label: IsString255().required(),
  connectionId: IsUUID().optional(),
  domain: IsUrl({ require_protocol: true }).required(),
  supportInfo: yup.object().shape({
    email: IsEmail().optional(),
    phone: IsUaMobilePhone(),
  }),

  publicKey: IsString255().when('provider', ([value], schema) => {
    return value === 'mia' ? schema.strip() : schema.required();
  }),
  privateKey: IsString255().when('provider', ([value], schema) => {
    return value === 'mia' ? schema.strip() : schema.required();
  }),

  endpoints: yup
    .object()
    .shape(
      Object.assign(
        {},
        ...requiredEndpoints.map(key => ({ [key]: IsUrl().optional() })),
        ...optionalEndpoints.map(key => ({ [key]: IsUrl().optional() }))
      )
    ),
  scopes: IsDynamicValue('provider', OAuth.ScopesByProvider).required(),
});

export const ModalOAuthConfigsForm = ({
  conn,
  config,
}: {
  conn: Connection.Output.Entity;
  config?: OAuth.Consumer.Entity;
}) => {
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    ...form
  } = useForm<OAuth.Consumer.CreateDto>({
    defaultValues: { provider: ProviderEnum.mia, ...config, connectionId: conn._id },
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const FV = form.watch();
  const onValid = (fData: OAuth.Consumer.CreateDto) => {
    const thunk = config ? updateOAuthConfigsThunk : createOAuthConfigsThunk;

    StorageService.setToLocal('created_oauth_config', toReqData(fData));

    dispatch(
      thunk({
        data: { data: toReqData(fData) as OAuth.Consumer.CreateDto },
        onSuccess: ({ data }) => {
          StorageService.setToLocal('prepared_oauth_config', data);
        },
      })
    );
  };

  const scopes = useMemo(() => {
    const array = FV.provider && OAuth.ScopesByProvider[FV.provider] ? OAuth.ScopesByProvider[FV.provider] || [] : [];

    return arrayToFilterOptions(array);
  }, [FV.provider]);

  useEffect(() => {
    if (!config && FV.domain) {
      debounceCallback(() => {
        endpointNames.forEach(key => {
          !form.getValues(`endpoints.${key}`) && form.setValue(`endpoints.${key}`, FV.domain);
        });
      });
    }
  }, [FV.domain, config, form]);

  const renderApiKeysInputs = useMemo(() => {
    if (FV.provider === ProviderEnum.mia) {
      return null;
    }
    return (
      <FormAccordionItem title={'Api keys'} expandable={false} open>
        <InputLabel label={t('Public key')} error={form.getFieldState('publicKey').error} required>
          <InputText placeholder={t('Public key')} {...form.register('publicKey', { required: true })} />
        </InputLabel>

        <InputLabel label={t('Private key')} error={form.getFieldState('privateKey').error} required>
          <InputText placeholder={t('Private key')} {...form.register('privateKey', { required: true })} />
        </InputLabel>
      </FormAccordionItem>
    );
  }, [FV.provider, form]);

  return (
    <ModalBase title={'OAuth configs'} fillHeight>
      <FlexForm
        gap={12}
        flex={1}
        onSubmit={form.handleSubmit(onValid, errors => {
          console.warn('[OAuth configs]', errors);
        })}
      >
        <FlexBox flex={1} overflow={'auto'}>
          <FormAccordionItem title={t('Main')} expandable={false} open>
            <FlexBox padding={'0 0 16px'}>
              <InputLabel label={'Provider'} error={errors.provider}>
                <TagButtonsFilter
                  options={providersList}
                  placeholder={t('Please select provider')}
                  value={FV.provider}
                  onSelectValue={({ value }) => {
                    form.setValue('provider', value as never, { shouldDirty: true, shouldTouch: true });
                    form.setValue('scopes', []);
                  }}
                />
              </InputLabel>

              <InputLabel label={'Permissions'} error={errors.scopes?.root}>
                <TagButtonsFilter
                  options={scopes}
                  multiple
                  value={FV.scopes}
                  onChangeIds={({ value }) => {
                    form.setValue('scopes', value as never, { shouldDirty: true, shouldTouch: true });
                  }}
                />
              </InputLabel>

              <InputLabel label={t('Label')} error={errors.label}>
                <InputText placeholder={t('Label')} {...form.register('label')} />
              </InputLabel>

              <InputLabel label={t('Domain')} error={errors.domain}>
                <InputText placeholder={t('Domain')} {...form.register('domain')} />
              </InputLabel>

              <InputLabel label={t('Support email')} error={errors.supportInfo?.email}>
                <InputText placeholder={t('Support email')} {...form.register('supportInfo.email')} />
              </InputLabel>
            </FlexBox>
          </FormAccordionItem>

          {renderApiKeysInputs}

          <FormAccordionItem title={'Endpoints'} expandable={false} open>
            <FlexBox padding={'8px 0'}>
              {requiredEndpoints.map(name => {
                return (
                  <InputLabel textTransform={'capitalize'} label={t(name)} required error={errors.endpoints?.[name]}>
                    <InputText placeholder={t(name)} {...form.register(`endpoints.${name}`, { required: false })} />
                  </InputLabel>
                );
              })}
              {optionalEndpoints.map(name => {
                return (
                  <InputLabel textTransform={'capitalize'} label={t(name)} error={errors.endpoints?.[name]}>
                    <InputText placeholder={t(name)} {...form.register(`endpoints.${name}`)} />
                  </InputLabel>
                );
              })}
            </FlexBox>
          </FormAccordionItem>
        </FlexBox>

        <ModalFooter />
      </FlexForm>
    </ModalBase>
  );
};

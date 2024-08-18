import * as yup from 'yup';
import { isDynamicValue, isString255, isUrl, isUUID } from '../../../../validations';
import { OAuth } from '../../../../types/auth/o-auth.namespace';
import { Integration } from '../../../../types/integrations.types';
import { useAppDispatch } from '../../../../redux/store.store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createOAuthConfigsThunk, updateOAuthConfigsThunk } from '../../../../redux/auth/o-auth.thunks';
import { enumToFilterOptions, ObjectValues, toReqData } from '../../../../utils';
import ModalBase from '../../../atoms/Modal';
import FlexBox, { FlexForm } from '../../../atoms/FlexBox';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { t } from '../../../../lang';
import InputText from '../../../atoms/Inputs/InputText';
import TagButtonsFilter from '../../../atoms/TagButtonsFilter';
import FormAccordionItem from '../../../atoms/FormAccordionItem';
import ModalFooter from '../../../atoms/Modal/ModalFooter';
import { omit, pick } from 'lodash';

const requiredEndpoints = ObjectValues(pick(OAuth.Consumer.Configs.EndpointName, ['auth', 'terms', 'privacyPolicy']));
const optionalEndpoints = ObjectValues(omit(OAuth.Consumer.Configs.EndpointName, requiredEndpoints));
const providersList = enumToFilterOptions(OAuth.ProviderEnum);

const schema = yup.object().shape({
  label: isString255,
  connectionId: isUUID.required(),
  domain: isUrl({ require_protocol: true }).required(),
  endpoints: yup
    .object()
    .shape(
      Object.assign(
        {},
        ...requiredEndpoints.map(key => ({ [key]: isUrl().required() })),
        ...optionalEndpoints.map(key => ({ [key]: isUrl().optional() }))
      )
    ),
  scopes: isDynamicValue('provider', OAuth.ScopesByProvider),
});

export const ModalOAuthConfigsForm = ({
  conn,
  config,
}: {
  conn: Integration.Output.Entity;
  config?: OAuth.Consumer.Configs.Entity;
}) => {
  const dispatch = useAppDispatch();

  const form = useForm<OAuth.Consumer.Configs.Dto>({
    defaultValues: config,
    resolver: yupResolver(schema),
  });

  const FV = form.watch();
  const onValid = (fData: OAuth.Consumer.Configs.Dto) => {
    const thunk = config ? updateOAuthConfigsThunk : createOAuthConfigsThunk;

    dispatch(
      thunk({
        data: { data: toReqData(fData) as OAuth.Consumer.Configs.Dto },
      })
    );
  };

  const scopes = FV.provider
    ? OAuth.ScopesByProvider[FV.provider]?.map(key => {
        return { value: key, label: key };
      })
    : [];

  return (
    <ModalBase title={'OAuth configs'} fillHeight>
      <FlexForm
        padding={'0 8px'}
        gap={12}
        flex={1}
        onSubmit={form.handleSubmit(onValid, errors => {
          console.log('[OAuth configs]', errors);
        })}
      >
        <FlexBox flex={1} overflow={'auto'}>
          <FlexBox>
            <InputLabel label={t('Label')}>
              <InputText placeholder={t('Label')} {...form.register('label')} />
            </InputLabel>

            <InputLabel label={t('Domain')}>
              <InputText placeholder={t('Domain')} {...form.register('domain')} />
            </InputLabel>

            <InputLabel label={t('Support email')}>
              <InputText placeholder={t('Support email')} {...form.register('supportInfo.email')} />
            </InputLabel>
          </FlexBox>

          <InputLabel label={'Provider'}>
            <TagButtonsFilter
              options={providersList}
              value={FV.provider}
              onSelectValue={({ value }) => {
                form.setValue('provider', value as never);
              }}
            />
          </InputLabel>

          <InputLabel label={'Permissions'}>
            <TagButtonsFilter
              options={scopes}
              multiple
              value={form.getValues('scopes')}
              onChangeIds={({ value }) => {
                form.setValue('scopes', value as never);
              }}
            />
          </InputLabel>

          <FormAccordionItem title={'Endpoints'}>
            {requiredEndpoints.map(name => {
              return (
                <InputLabel label={t(name)} required>
                  <InputText placeholder={t(name)} {...form.register(`endpoints.${name}`, { required: true })} />
                </InputLabel>
              );
            })}
            {optionalEndpoints.map(name => {
              return (
                <InputLabel label={t(name)}>
                  <InputText placeholder={t(name)} {...form.register(`endpoints.${name}`)} />
                </InputLabel>
              );
            })}
          </FormAccordionItem>
        </FlexBox>

        <ModalFooter />
      </FlexForm>
    </ModalBase>
  );
};

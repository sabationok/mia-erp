import styled from 'styled-components';
import FlexBox, { FlexForm } from '../atoms/FlexBox';
import { useOffersSelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { sortIds, toVariationFormData, toVariationReqData } from '../../utils';
import { VariationEntity, VariationFormData } from '../../types/offers/variations.types';
import { ToastService } from '../../services';
import { ModalFormProps } from '../ModalForm';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../atoms/FormAfterSubmitOptions';
import { OverlayFooter } from './index';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppForm, useCurrentOffer, useCurrentVariation } from '../../hooks';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { t } from '../../lang';
import LangButtonsGroup from '../atoms/LangButtonsGroup';
import { UUID } from '../../types/utils.types';
import OfferPropertySelector from '../Forms/offers/variations/OfferPropertySelector';
import { PropertiesGroupEntity, PropertyEntity } from '../../types/offers/properties.types';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';
import { OfferEntity, OfferFullFormData, PropertyValuesMap } from '../../types/offers/offers.types';
import DrawerBase from './OverlayBase';
import { PropertiesGroupSelector } from '../atoms/PropertiesGroupSelector';
import { AccordionFormArea } from '../atoms/FormArea/AccordionForm';

export interface CreateVariationModalProps
  extends CreatedOverlay,
    Omit<ModalFormProps<any, any, VariationEntity>, 'onSubmit' | 'defaultState'> {
  onSubmit?: AppSubmitHandler<VariationFormData>;
  offer?: OfferEntity;
  offerId?: UUID;
  updateId?: UUID;

  create?: boolean;

  defaultState?: Partial<VariationEntity>;
}
const _schema = yup.object().shape({
  label: yup.string().required().min(5).max(128),
  sku: yup.string().required().min(8).max(32),
  barCode: yup.string().max(32),
  cms: yup.object().shape({
    labels: yup.object().shape({
      ua: yup.string().min(5).max(64),
      en: yup.string().min(5).max(64),
    }),
  }),
  propertiesMap: yup
    .object()
    .shape({
      // Ваша схема для propertiesMap
    })
    .nonNullable()
    .required(),
  offer: yup.object().shape({
    _id: yup.string().required(),
    label: yup.string(),
    labels: yup.object().shape({
      ua: yup.string().min(5).max(64),
      en: yup.string().min(5).max(64),
    }),
  }),
  timeFrom: yup.date(),
  timeTo: yup.date(),
  price: yup.object().shape({
    out: yup.string(),
  }),
});
const CreateVariationOverlay: React.FC<CreateVariationModalProps> = ({
  onClose,
  title,
  onSubmit,
  updateId,
  create,
  offerId,
  offer,
  ...props
}) => {
  const state = useOffersSelector();
  const service = useAppServiceProvider()[ServiceName.offers];
  const loaders = useLoaders<'create' | 'update' | 'refresh'>();
  const Variation = useCurrentVariation({ _id: updateId });
  const Offer = useCurrentOffer({ _id: Variation?.offer?._id || offerId || offer?._id });

  const submitOptions = useAfterSubmitOptions();

  const [currentTemplate, setCurrentTemplate] = useState<PropertiesGroupEntity | undefined>(Variation.template);

  const formMethods = useAppForm<OfferFullFormData>({
    defaultValues: toVariationFormData(
      Variation
        ? { ...Variation, offer: Offer, template: currentTemplate }
        : { offer: Offer, template: currentTemplate },
      Offer
    ),
    resolver: yupResolver(_schema),
    reValidateMode: 'onSubmit',
  });

  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
    formValues,
    reset,
    resetField,
    getValues,
  } = formMethods;

  const propertiesList = useMemo(() => {
    if (currentTemplate?.childrenList?.length) {
      return currentTemplate?.childrenList.filter(item => item.isSelectable && item?.childrenList?.length);
    }

    const _rootId = currentTemplate?._id;
    const _propertiesList: PropertyEntity[] = [];
    // const _sortedPropertiesIds=sortIds(ObjectKeys(state.propertiesKeysMap))

    const _propertiesIds = state.propertiesKeysMap?.[_rootId ?? 'def'] ?? [];

    for (const propId of _propertiesIds) {
      const prop = state.propertiesDataMap?.[propId];
      if (prop?.isSelectable) {
        const childrenIds = state.propertiesKeysMap[prop?._id];
        if (childrenIds?.length) {
          _propertiesList.push(prop);
        }
      }
    }

    return _propertiesList;
  }, [currentTemplate?._id, currentTemplate?.childrenList, state.propertiesDataMap, state.propertiesKeysMap]);

  const compileLabel = useCallback(
    (valuesMap: PropertyValuesMap) => {
      if (!valuesMap) {
        return `${Offer?.label}. {{VARIATION_LABEL}}`;
      }

      const _sortedIds = !valuesMap ? [] : sortIds(Object.keys(valuesMap));

      const _labels: string[] = Offer?.label ? [Offer?.label] : [];

      for (const propId of _sortedIds) {
        const value = valuesMap[propId];

        value?.label && _labels.push(value?.label);
      }
      const _compiled = !_labels?.length
        ? Variation?.label || `${Offer?.label}. {{VARIATION_LABEL}}`
        : _labels.join('. ');

      return _compiled;
    },
    [Offer?.label, Variation?.label]
  );

  // useEffect(() => {
  //   setValue('label', compiledLabel);
  // }, [compiledLabel, setValue, Variation]);

  const onValid = useCallback(
    (data: VariationFormData) => {
      if (updateId) {
        service.updateVariationById({
          onSuccess: loaders.onSuccess('update', onClose),
          onLoading: loaders.onLoading('update'),
          onError: ToastService.toastAxiosError,
          data: { data: toVariationReqData(data) },
        });
      } else {
        service.createVariation({
          onError: ToastService.toastAxiosError,
          onLoading: loaders.onLoading('create'),
          onSuccess: data => {
            submitOptions.state.close && onClose && onClose();
            submitOptions.state.clear && reset();
          },
          data: { data: toVariationReqData(data) },
        });
      }

      // onSubmit && onSubmit(data);
    },
    [loaders, onClose, reset, service, submitOptions.state.clear, submitOptions.state.close, updateId]
  );

  const handleSelect = useCallback(
    (parentId: string, id: string) => {
      const key = `propertiesMap.${parentId}` as const;
      const exist = getValues(key);

      if (exist && exist._id === id) {
        resetField(key);
      } else {
        const value = state.propertiesDataMap?.[id];
        console.log('handleSelect value');
        if (value) {
          setValue(key, value);
        }
      }
    },
    [getValues, resetField, setValue, state.propertiesDataMap]
  );

  const handleClearMap = useCallback(() => {
    resetField('propertiesMap');
  }, [resetField]);

  const selectedIds = useMemo(() => {
    return formValues?.propertiesMap ? Object.values(formValues?.propertiesMap) : [];
    // eslint-disable-next-line
  }, [formValues?.propertiesMap, formValues]);

  const canSubmit = useMemo(() => {
    return selectedIds.length > 0;
  }, [selectedIds.length]);

  const renderPropertiesList = useMemo(() => {
    return propertiesList?.map(prop => {
      const selectedId = formValues?.propertiesMap?.[prop._id]?._id;
      console.log('selectedId', selectedId);
      return (
        <OfferPropertySelector
          key={`prop_${prop._id}`}
          item={prop}
          selectedIds={selectedId ? [selectedId] : undefined}
          onSelect={handleSelect}
        />
      );
    });
  }, [propertiesList, formValues?.propertiesMap, handleSelect]);

  return (
    <DrawerBase fillHeight onBackPress={onClose} okButton={false} title={title || 'Create variation'}>
      <FormContainer
        onSubmit={handleSubmit(onValid, errors => {
          console.error('[SUBMIT ERROR]', errors);
        })}
        onReset={handleClearMap}
        {...props}
      >
        <Content flex={1} fillWidth overflow={'auto'}>
          <AccordionFormArea label={'Offer'} hideFooter isOpen={false}>
            <InputLabel label={t('Offer label')} required disabled>
              <InputText value={Offer?.label ?? undefined} placeholder={t('label')} required disabled />
            </InputLabel>

            <FlexBox fxDirection={'row'} gap={12} fillWidth>
              <InputLabel label={t('sku')} disabled>
                <InputText value={Offer?.sku ?? undefined} placeholder={t('sku')} disabled />
              </InputLabel>

              <InputLabel label={t('barCode')} disabled>
                <InputText value={Offer?.barCode ?? undefined} placeholder={t('barCode')} disabled />
              </InputLabel>
            </FlexBox>
          </AccordionFormArea>

          <AccordionFormArea label={'Main info'} expandable={false} hideFooter>
            <InputLabel label={t('label')} error={errors.label}>
              <InputText {...register('label', { required: true })} placeholder={t('label')} required />
            </InputLabel>

            <FlexBox fxDirection={'row'} gap={12} fillWidth>
              <InputLabel label={t('sku')} error={errors.sku}>
                <InputText {...register('sku', { required: true })} placeholder={t('sku')} required />
              </InputLabel>

              <InputLabel label={t('barCode')} error={errors.barCode}>
                <InputText {...register('barCode')} placeholder={t('barCode')} />
              </InputLabel>
            </FlexBox>

            {/*<DimensionsInputs form={formMethods} />*/}
          </AccordionFormArea>

          <AccordionFormArea label={t('Properties')} expandable={false} hideFooter>
            <PropertiesGroupSelector
              onSelect={opt => {
                setValue('template', opt);
                setCurrentTemplate(opt);
              }}
              selected={currentTemplate}
            />

            <TemplateBox padding={'0 8px'} margin={'8px 0'}>
              {renderPropertiesList}
            </TemplateBox>
          </AccordionFormArea>

          {Variation && (
            <AccordionFormArea label={t('Cms information')} expandable={false} hideFooter>
              <FlexBox className={'CmsConfigs'} padding={'8px 0'} fillWidth>
                <Inputs>
                  <InputLabel label={t('Language key')} error={errors?.cmsConfigs?.key}>
                    <LangButtonsGroup disabled />
                  </InputLabel>

                  <InputLabel label={t('Label by lang key')} error={errors?.cmsConfigs?.labels?.ua}>
                    <InputText placeholder={'Label'} {...register('cmsConfigs.labels.ua')} />
                  </InputLabel>
                </Inputs>
              </FlexBox>
            </AccordionFormArea>
          )}
        </Content>

        <OverlayFooter
          loading={loaders.isLoading?.create}
          resetButtonShown
          onGoBackPress={onClose}
          submitButtonText={t('Accept')}
          canSubmit={canSubmit}
          extraFooter={
            <ExtraFooterBox>
              <FormAfterSubmitOptions {...submitOptions} />
            </ExtraFooterBox>
          }
        />
      </FormContainer>
    </DrawerBase>
  );
};

const FormContainer = styled(FlexForm)`
  flex: 1;
  max-height: 100%;
  height: 100vh;

  width: 100%;
  //padding: 0 12px;

  overflow: hidden;

  //max-width: 380px;
  color: ${p => p.theme.fontColorSidebar};
  background-color: ${p => p.theme.tableBackgroundColor};
`;
const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const TemplateBox = styled(FlexBox)`
  padding-bottom: 8px;
`;

const Inputs = styled(FlexBox)`
  padding: 0 4px;
`;

const ExtraFooterBox = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

export default CreateVariationOverlay;

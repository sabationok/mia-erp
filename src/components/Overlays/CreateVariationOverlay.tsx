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
import { UUID } from '../../types/utils.types';
import OfferPropertySelector from '../Forms/offers/variations/OfferPropertySelector';
import { PropertiesGroupEntity, PropertyEntity } from '../../types/offers/properties.types';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';
import { OfferEntity, PropertyValuesMap } from '../../types/offers/offers.types';
import DrawerBase from './OverlayBase';
import { PropertiesGroupSelector } from '../atoms/PropertiesGroupSelector';
import { AccordionFormArea } from '../atoms/FormArea/AccordionForm';
import { LoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import _ from 'lodash';
import { nanoid } from '@reduxjs/toolkit';

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

  const formMethods = useAppForm<VariationFormData>({
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

      setValue('label', _compiled);
      return _compiled;
    },
    [Offer?.label, Variation?.label, setValue]
  );

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
            if (submitOptions.state.close) {
              onClose && onClose();
            } else {
              submitOptions.state.clear && reset();
              setValue('sku', (Offer?.sku ?? '') + nanoid(12));
            }
          },
          data: { data: toVariationReqData(data) },
        });
      }

      // onSubmit && onSubmit(data);
    },
    [
      Offer?.sku,
      loaders,
      onClose,
      reset,
      service,
      setValue,
      submitOptions.state.clear,
      submitOptions.state.close,
      updateId,
    ]
  );

  const handleSelect = useCallback(
    (parentId: string, valueId: string) => {
      const exist = formValues.propertiesMap?.[parentId];
      if (exist && exist._id === valueId) {
        const newMap = _.omit(formValues.propertiesMap, parentId);
        setValue('propertiesMap', newMap);
        compileLabel(newMap);
      } else {
        const value = state.propertiesDataMap?.[valueId];
        if (value) {
          const newMap = { ...formValues.propertiesMap, [parentId]: value };
          setValue('propertiesMap', newMap);
          compileLabel(newMap);
        }
      }
    },
    [compileLabel, formValues.propertiesMap, setValue, state.propertiesDataMap]
  );

  const selectedIds = useMemo(() => {
    return formValues?.propertiesMap ? Object.values(formValues?.propertiesMap).map(item => item._id) : [];
  }, [formValues]);

  const canSubmit = useMemo(() => {
    const _sortedInit = !Variation.propValuesIdsSet ? undefined : sortIds(Variation.propValuesIdsSet)?.join('.');

    const _sortedCurrent = !selectedIds ? undefined : sortIds(selectedIds)?.join('.');

    return !!_sortedCurrent && _sortedCurrent !== _sortedInit;
  }, [Variation.propValuesIdsSet, selectedIds]);

  const propValuesIds = useMemo((): Record<string, string | undefined> => {
    return formValues?.propertiesMap
      ? Object.fromEntries(
          Object.entries(formValues?.propertiesMap).map(([propId, item]) => {
            return [propId, item?._id];
          })
        )
      : {};
  }, [formValues?.propertiesMap]);

  const renderPropertiesList = useMemo(() => {
    return propertiesList?.map(prop => {
      const selectedId = propValuesIds[prop._id];

      return (
        <OfferPropertySelector
          key={`prop_${prop._id}`}
          item={prop}
          selectedIds={selectedId ? [selectedId] : []}
          onSelect={handleSelect}
        />
      );
    });
  }, [propertiesList, propValuesIds, handleSelect]);

  return (
    <DrawerBase fillHeight onBackPress={onClose} okButton={false} title={title || 'Create variation'}>
      <LoadersProvider value={loaders}>
        <FormContainer
          onSubmit={handleSubmit(onValid, errors => {
            console.error('[SUBMIT ERROR]', errors);
          })}
          {...props}
        >
          <Content flex={1} fillWidth overflow={'auto'}>
            <AccordionFormArea label={'Offer'} hideFooter isOpen={false}>
              {(
                [
                  { title: t('Offer label'), name: 'label' },
                  { title: t('SKU'), name: 'sku' },
                  { title: t('Bar-code'), name: 'barCode' },
                ] as const
              ).map(({ name, title }) => {
                return (
                  <InputLabel key={name} label={title} disabled>
                    <InputText value={Offer?.[name] ?? undefined} placeholder={t('label')} disabled />
                  </InputLabel>
                );
              })}
            </AccordionFormArea>

            <AccordionFormArea label={'Main info'} expandable={false} hideFooter>
              {(
                [
                  { title: t('Offer label'), name: 'label', required: true },
                  { title: t('SKU'), name: 'sku', required: true },
                  { title: t('Bar-code'), name: 'barCode', required: false },
                ] as const
              ).map(({ name, title, required }) => {
                return (
                  <InputLabel key={name} label={title} error={errors?.[name]} required={required}>
                    <InputText {...register(name, { required })} placeholder={t('label')} />
                  </InputLabel>
                );
              })}
            </AccordionFormArea>

            <AccordionFormArea label={t('Properties')} expandable={false} hideFooter>
              <PropertiesGroupSelector
                onSelect={opt => {
                  setValue('template', opt);
                  setCurrentTemplate(opt);
                }}
                selected={currentTemplate}
              />

              <FlexBox padding={'0 8px'}>{renderPropertiesList}</FlexBox>
            </AccordionFormArea>
          </Content>

          <OverlayFooter
            loading={loaders.isLoading?.create}
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
      </LoadersProvider>
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

const ExtraFooterBox = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

export default CreateVariationOverlay;

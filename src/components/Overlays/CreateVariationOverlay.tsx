import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import { usePropertiesSelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from '../atoms/Text';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { toVariationFormData, toVariationReqData } from '../../utils';
import { IVariationFormData, VariationEntity } from '../../types/offers/variations.types';
import { ToastService } from '../../services';
import { ModalFormProps } from '../ModalForm';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../Forms/components/FormAfterSubmitOptions';
import { OverlayFooter, OverlayHeader } from './index';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppForm, useCurrentOffer } from '../../hooks';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { t } from '../../lang';
import LangButtonsGroup from '../atoms/LangButtonsGroup';
import { MaybeNull, UUID } from '../../types/utils.types';
import OfferVariationPropertySelector from '../Forms/offers/variations/OfferVariationPropertySelector';
import { IProperiesGroup, IProperty, IPropertyValue } from '../../types/offers/properties.types';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';
import { OfferEntity } from '../../types/offers/offers.types';

export interface CreateVariationModalProps
  extends CreatedOverlay,
    Omit<ModalFormProps<any, any, VariationEntity>, 'onSubmit' | 'defaultState'> {
  onSubmit?: AppSubmitHandler<IVariationFormData>;
  offer?: OfferEntity;
  offerId?: UUID;
  update?: UUID;

  create?: boolean;

  defaultState?: VariationEntity;
}
const validation = yup.object().shape({
  label: yup.string().required().min(5).max(64),
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
  defaultState,
  onSubmit,
  update,
  create,
  offerId,
  offer,
  ...props
}) => {
  const service = useAppServiceProvider()[ServiceName.products];
  const templates = usePropertiesSelector();
  const loaders = useLoaders<'create'>();
  const currentOffer = useCurrentOffer({ id: update || offerId || offer?._id });
  const submitOptions = useAfterSubmitOptions();

  const [currentTemplate, _setCurrentTemplate] = useState<IProperiesGroup>(templates?.[0]);
  const [selectedPropsMap, setSelectedPropsMap] = useState<Record<string, IPropertyValue>>({});

  const { propertiesList, propValuesDataMap } = useMemo(() => {
    const list = currentTemplate?.childrenList?.filter(el => el?.isSelectable);
    const _propValuesMap: Record<string, IPropertyValue> = {};

    const map: Record<string, IProperty> = Object.assign(
      {},
      ...(list ?? []).map(pr => {
        if (pr?.childrenList?.length) {
          pr?.childrenList.forEach(val => {
            _propValuesMap[val._id] = val;
          });
        }

        return { [pr._id]: pr };
      })
    );

    return { propertiesList: list, propertiesDataMap: map, propValuesDataMap: _propValuesMap };
  }, [currentTemplate?.childrenList]);

  const formMethods = useAppForm<IVariationFormData>({
    defaultValues: toVariationFormData(
      defaultState ? { ...defaultState, offer: currentOffer } : { offer: currentOffer }
    ),
    resolver: yupResolver(validation as never),
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

  useEffect(() => {
    console.log({ formValues });
  }, [formValues]);

  const selectedIds = useMemo(() => {
    return formValues?.propertiesMap ? Object.values(formValues?.propertiesMap) : [];
    // eslint-disable-next-line
  }, [formValues?.propertiesMap, formValues]);

  const canSubmit = useMemo(() => {
    return selectedIds.length > 0;
  }, [selectedIds.length]);

  const { label } = useMemo(() => {
    // const _sortedIds = Object.keys(selectedPropsMap ?? {}).sort((prev, next) => prev.localeCompare(next));

    const _sorted = Object.entries(selectedPropsMap).sort((prev, next) => {
      return prev[0].localeCompare(next[0]);
    });
    const _labels: string[] = currentOffer?.label ? [currentOffer?.label] : [];

    for (const [_, value] of _sorted) {
      value?.label && _labels.push(value?.label);
    }
    const _base = !_sorted?.length ? `${currentOffer?.label}. {{VARIATION_LABEL}}` : _labels.join('. ');

    return { label: _base };
  }, [currentOffer?.label, selectedPropsMap]);

  useEffect(() => {
    setValue('label', label);
  }, [label, setValue]);

  const onValid = useCallback(
    (data: IVariationFormData) => {
      if (update) {
        service
          .updateVariationById({
            data: toVariationReqData(data, update),
            onSuccess: data => {
              console.log('updateVariationById onSuccess', data);

              onClose && onClose();
            },
            onError: ToastService.toastAxiosError,
            onLoading: loaders.onLoading('create'),
          })
          .then();
      } else {
        service
          .createVariation({
            data: toVariationReqData(data),
            onSuccess: data => {
              submitOptions.state.close && onClose && onClose();
              submitOptions.state.clear && reset();
            },
            onError: ToastService.toastAxiosError,
            onLoading: loaders.onLoading('create'),
          })
          .then();
      }

      // onSubmit && onSubmit(data);
    },
    [loaders, onClose, reset, service, submitOptions.state.clear, submitOptions.state.close, update]
  );

  const handleSelect = useCallback(
    (parentId: string, id: string, label?: MaybeNull<string>) => {
      setValue(`propertiesMap.${parentId}`, id);

      setSelectedPropsMap(p => ({ ...p, [parentId]: propValuesDataMap?.[id] }));
    },
    [propValuesDataMap, setValue]
  );

  const handleClearMap = useCallback(() => {
    setValue('propertiesMap', {});
    setSelectedPropsMap({});
  }, [setValue]);

  const renderTemplate = useMemo(() => {
    return propertiesList?.map(prop => {
      return (
        <OfferVariationPropertySelector
          key={`prop_${prop._id}`}
          item={prop}
          selectedIds={selectedIds}
          onSelect={handleSelect}
        />
      );
    });
  }, [propertiesList, selectedIds, handleSelect]);

  return (
    <FormContainer
      onSubmit={handleSubmit(onValid, errors => {
        console.error('[SUBMIT ERROR]', errors);
      })}
      onReset={handleClearMap}
      {...props}
    >
      <OverlayHeader
        onBackPress={onClose}
        title={(title || currentTemplate?.label) ?? ''}
        canSubmit={canSubmit}
        okButton
      />

      <Content flex={1} fillWidth overflow={'auto'}>
        <Inputs>
          <InputLabel label={t('label')} error={errors.label}>
            <InputText {...register('label', { required: true })} placeholder={t('label')} required />
          </InputLabel>

          <FlexBox fxDirection={'row'} gap={8} fillWidth>
            <InputLabel label={t('sku')} error={errors.sku}>
              <InputText {...register('sku', { required: true })} placeholder={t('sku')} required />
            </InputLabel>

            <InputLabel label={t('barCode')} error={errors.barCode}>
              <InputText {...register('barCode')} placeholder={t('barCode')} />
            </InputLabel>
          </FlexBox>

          {/*<DimensionsInputs form={formMethods} />*/}
        </Inputs>

        <TemplateBox padding={'0 0 8px'} margin={'8px 0 0'}>
          {renderTemplate}
        </TemplateBox>

        {!currentOffer && (
          <CmsConfigs padding={'8px 0'} fillWidth>
            <CmsConfigsHeader padding={'8px'} justifyContent={'flex-end'} fxDirection={'row'} fillWidth>
              <Text $size={13} $weight={500}>
                {t('Cms configs')}
              </Text>
            </CmsConfigsHeader>

            <Inputs>
              <InputLabel label={t('Language key')} error={errors?.cmsConfigs?.key}>
                <LangButtonsGroup disabled />
              </InputLabel>

              <InputLabel label={t('Label by lang key')} error={errors?.cmsConfigs?.labels?.ua}>
                <InputText placeholder={'Label'} {...register('cmsConfigs.labels.ua')} />
              </InputLabel>
            </Inputs>
          </CmsConfigs>
        )}
      </Content>

      <OverlayFooter
        loading={loaders.isLoading?.create}
        resetButtonShown
        submitButtonText={loaders.isLoading?.create ? 'Loading...' : update ? 'Підтвердити' : 'Додати'}
        canSubmit={canSubmit}
        extraFooter={
          <ExtraFooterBox>
            <FormAfterSubmitOptions {...submitOptions} />
          </ExtraFooterBox>
        }
      />
    </FormContainer>
  );
};

const FormContainer = styled.form`
  flex: 1;

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 8px;

  overflow: hidden;

  max-width: 480px;
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

const CmsConfigs = styled(FlexBox)``;

const CmsConfigsHeader = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

export default CreateVariationOverlay;

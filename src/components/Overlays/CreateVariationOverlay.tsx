import styled from 'styled-components';
import FlexBox, { FlexForm } from '../atoms/FlexBox';
import { useProductsSelector } from '../../redux/selectors.store';
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
import { OverlayFooter } from './index';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppForm, useCurrentOffer } from '../../hooks';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { t } from '../../lang';
import LangButtonsGroup from '../atoms/LangButtonsGroup';
import { UUID } from '../../types/utils.types';
import OfferVariationPropertySelector from '../Forms/offers/variations/OfferVariationPropertySelector';
import {
  ProperiesGroupEntity,
  PropertyBaseEntity,
  PropertyEntity,
  PropertyValueEntity,
} from '../../types/offers/properties.types';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';
import { OfferEntity, OfferTypeEnum } from '../../types/offers/offers.types';
import CustomSelect, { CustomSelectHandler } from '../atoms/Inputs/CustomSelect/CustomSelect';
import DrawerBase from './OverlayBase';
import ButtonsGroup from '../atoms/ButtonsGroup';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';
import { AppModuleName } from '../../redux/reduxTypes.types';

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
export const PropTemplateSelect = ({
  selected,
  onSelect,
  filterValue = OfferTypeEnum.GOODS,
  hasFilter = false,
}: {
  selected?: ProperiesGroupEntity;
  onSelect?: (opt: ProperiesGroupEntity) => void;
  filterValue?: OfferTypeEnum;
  hasFilter?: boolean;
}) => {
  const service = useAppServiceProvider().get(AppModuleName.offers);
  useEffect(() => {
    console.log({ offers_service: service });
  }, [service]);

  const state = useProductsSelector();
  const [filter, setFilter] = useState<OfferTypeEnum>(filterValue);
  const [currentTemplate, setCurrentTemplate] = useState<ProperiesGroupEntity | undefined>();
  const loaders = useLoaders<'getList'>();

  const rootList = useMemo(() => {
    const _rootIds = state.propertiesByTypeKeysMap[filter];
    const _items: PropertyBaseEntity[] = [];

    for (const _id of _rootIds) {
      const item = state.propertiesDataMap?.[_id];
      item && _items.push(item);
    }

    return _items;
  }, [filter, state.propertiesByTypeKeysMap, state.propertiesDataMap]);

  const handleSelect: CustomSelectHandler<ProperiesGroupEntity> = option => {
    if (onSelect && option) {
      onSelect(option);
    } else {
      setCurrentTemplate(option);
    }
  };

  useEffect(() => {
    if (selected) {
      setCurrentTemplate(selected);
    }
  }, [selected]);

  // useEffect(() => {
  //   if ()
  // }, []);

  return (
    <FlexBox margin={'8px 0'} gap={8}>
      {hasFilter && (
        <InputLabel label={t('Select type')}>
          <ButtonsGroup
            options={productsFilterOptions}
            value={filter}
            onSelect={({ value }) => {
              setFilter(value);
            }}
          />
        </InputLabel>
      )}
      <CustomSelect
        label={t('Select properties group')}
        selectedOption={currentTemplate}
        onSelect={handleSelect}
        options={rootList}
        placeholder={'Select properties group'}
      />
    </FlexBox>
  );
};
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
  const state = useProductsSelector();
  const service = useAppServiceProvider()[ServiceName.offers];
  const loaders = useLoaders<'create'>();
  const currentOffer = useCurrentOffer({ id: update || offerId || offer?._id });
  const submitOptions = useAfterSubmitOptions();
  const [selectedPropsMap, setSelectedPropsMap] = useState<Record<string, PropertyValueEntity>>({});

  const [currentTemplate, setCurrentTemplate] = useState<ProperiesGroupEntity>();

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

  const propertiesList = useMemo(() => {
    const _rootId = currentTemplate?._id;
    const _propertiesList: PropertyEntity[] = [];
    const _propertiesIds = state.propertiesKeysMap?.[_rootId ?? 'def'] ?? [];

    for (const propId of _propertiesIds) {
      const prop = state.propertiesDataMap?.[propId];
      if (prop) {
        _propertiesList.push(prop);
      }
    }

    return _propertiesList;
  }, [currentTemplate?._id, state.propertiesDataMap, state.propertiesKeysMap]);

  const selectedIds = useMemo(() => {
    return formValues?.propertiesMap ? Object.values(formValues?.propertiesMap) : [];
    // eslint-disable-next-line
  }, [formValues?.propertiesMap, formValues]);

  const canSubmit = useMemo(() => {
    return selectedIds.length > 0;
  }, [selectedIds.length]);

  const { label: compiledLabel } = useMemo(() => {
    // const _sortedIds = Object.keys(selectedPropsMap ?? {}).sort((prev, next) => prev.localeCompare(next));

    const _sorted = Object.entries(selectedPropsMap).sort((prev, next) => {
      return prev[0].localeCompare(next[0]);
    });
    const _labels: string[] = currentOffer?.label ? [currentOffer?.label] : [];

    for (const entry of _sorted) {
      const value = entry[1];
      value?.label && _labels.push(value?.label);
    }
    const _base = !_sorted?.length ? `${currentOffer?.label}. {{VARIATION_LABEL}}` : _labels.join('. ');

    return { label: _base };
  }, [currentOffer?.label, selectedPropsMap]);

  useEffect(() => {
    setValue('label', compiledLabel);
  }, [compiledLabel, setValue]);

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
    (parentId: string, id: string) => {
      setValue(`propertiesMap.${parentId}`, id);
      const value = state.propertiesDataMap?.[id];
      if (value) {
        setSelectedPropsMap(p => ({ ...p, [parentId]: value }));
      }
    },
    [setValue, state.propertiesDataMap]
  );

  const handleClearMap = useCallback(() => {
    setValue('propertiesMap', {});
    setSelectedPropsMap({});
  }, [setValue]);

  const renderPropertiesList = useMemo(() => {
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
    <DrawerBase fillHeight onBackPress={onClose} okButton={false} title={title}>
      <FormContainer
        onSubmit={handleSubmit(onValid, errors => {
          console.error('[SUBMIT ERROR]', errors);
        })}
        onReset={handleClearMap}
        {...props}
      >
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

          <PropTemplateSelect onSelect={setCurrentTemplate} selected={currentTemplate} />

          <TemplateBox padding={'0 0 8px'} margin={'8px 0 0'}>
            {renderPropertiesList}
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
    </DrawerBase>
  );
};

const FormContainer = styled(FlexForm)`
  flex: 1;
  max-height: 100%;
  height: 100vh;

  width: 100%;
  padding: 0 12px;

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

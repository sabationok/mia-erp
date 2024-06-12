import { CreatedModal, useModalProvider } from '../Providers/ModalProvider/ModalProvider';
import { useCallback, useMemo, useState } from 'react';
import { TableActionsCreator } from '../components/TableList/tableTypes.types';
import { OfferEntity, OfferStatusEnum } from '../types/offers/offers.types';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { t } from '../lang';
import EditOfferModal from '../components/Modals/EditOfferModal';
import CreateOfferModal from '../components/Modals/CreateOfferModal';
import { useAppRouter } from './useRouter.hook';
import {
  useDirectorySelector,
  useOffersSelector,
  usePropertiesSelector,
  useWarehousesSelector,
} from '../redux/selectors.store';
import { UseLoadersReturn } from '../Providers/Loaders/useLoaders.hook';
import { useAppForm } from './index';
import { enumToFilterOptions, toReqData } from '../utils';
import { FlexBox, FlexForm } from '../components/atoms/FlexBox';
import ButtonSwitch from '../components/atoms/ButtonSwitch';
import ModalBase from '../components/atoms/Modal';
import InputLabel from '../components/atoms/Inputs/InputLabel';
import InputText from '../components/atoms/Inputs/InputText';
import { GetAllOffersQuery } from '../api';
import { AccordionFormArea } from '../components/atoms/FormArea/AccordionForm';
import ModalFooter from '../components/atoms/Modal/ModalFooter';
import ButtonsGroup from '../components/atoms/ButtonsGroup';
import { offerTypeFilterOptions } from '../data/modalFilterOptions.data';
import TagButtonsFilter from '../components/atoms/TagButtonsFilter';
import { ApiDirType } from '../redux/APP_CONFIGS';
import OfferCategoriesSelector from '../components/Forms/offers/categories/OfferCategoriesSelector';
import OfferPropertySelector from '../components/Forms/offers/variations/OfferPropertySelector';
import { PropertiesGroupEntity } from '../types/offers/properties.types';
import TabSelector from '../components/atoms/TabSelector';
import { omit } from 'lodash';

export type OffersActionsCreator = TableActionsCreator<OfferEntity>;

export const useOffersActionsCreator = ({
  loaders,
}: { loaders?: UseLoadersReturn<'refresh' | 'offer'> } = {}): OffersActionsCreator => {
  const service = useAppServiceProvider().get(ServiceName.offers);
  const router = useAppRouter();
  const modals = useModalProvider();
  const stateMap = useOffersSelector().dataMap;

  return useCallback(
    ctx => {
      const currentId = ctx.selectedRow?._id;
      const Offer = currentId ? stateMap?.[currentId] : undefined;

      return [
        {
          name: 'filter',
          icon: 'filterOff',
          onClick: () => {
            modals.create(OffersFilterModal, {
              onSubmit: data => {
                service.getAll({
                  params: toReqData(data),
                });
              },
            });
          },
        },
        { separator: true },
        {
          name: 'refreshData',
          title: t('Refresh data'),
          icon: 'refresh',
          type: 'onlyIcon',
          onClick: () => {
            service.getAll({
              data: { refresh: true },
              onLoading: loaders ? loaders.onLoading('refresh') : ctx.onRefresh,
            });
          },
        },
        { separator: true },

        {
          name: 'review',
          title: 'Перегляд продукту',
          icon: 'openInNew',
          disabled: !currentId,
          type: 'onlyIcon',
          navTo: `/app/${router.params.permissionId}/offers/` + currentId,
        },

        {
          name: 'edit',
          title: 'Змінити',
          icon: 'edit',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: !currentId,
          onClick: () => {
            if (Offer) {
              modals.create(EditOfferModal, {
                offer: Offer,
              });
            } else if (currentId) {
              service.getOne({
                data: { data: { params: { _id: currentId } } },
                onLoading: loaders ? loaders.onLoading('offer') : ctx.onRefresh,
                onSuccess: ({ data }) => {
                  // router.push({ query: { offerId: data._id } });

                  modals.create(EditOfferModal, {
                    offer: data,
                  });
                },
              });
            }
          },
        },
        {
          name: 'copy',
          title: 'Копіювати',
          icon: 'copy',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: !Offer,
          onClick: () => {
            Offer &&
              modals.create(EditOfferModal, {
                offer: Offer,
                copy: true,
              });
          },
        },
        {
          name: 'archiveOffer',
          title: 'Архів',
          icon: 'archive',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: true,
        },
        { separator: true },
        {
          name: 'createOffer',
          title: 'Новий',
          icon: 'plus',
          iconSize: '90%',
          type: 'onlyIconFilled',
          disabled: false,
          onClick: () => {
            modals.create(CreateOfferModal);
          },
        },
      ];
    },

    [loaders, modals, router, service, stateMap]
  );
};

export default useOffersActionsCreator;

export type OffersFilterForm = GetAllOffersQuery & {
  propsIdsMap?: Record<string, string[]>;
};

const keys = ['createdAt', 'updatedAt', 'deletedAt'] as const;
const OffersFilterModal = ({ onSubmit, onClose }: { onSubmit?: (data: GetAllOffersQuery) => void } & CreatedModal) => {
  const dirTags = useDirectorySelector(ApiDirType.TAGS);
  const dirBrands = useDirectorySelector(ApiDirType.BRANDS);
  const dirCategories = useDirectorySelector(ApiDirType.CATEGORIES_PROD);
  const dirProperties = usePropertiesSelector();
  const warehouses = useWarehousesSelector().warehouses;

  const filter = useAppForm<OffersFilterForm>();

  const offerStatusFilterOptions = enumToFilterOptions(OfferStatusEnum);
  const [template, setTemplate] = useState<PropertiesGroupEntity>();

  const mappedOptions = useMemo(() => {
    return {
      tags: dirTags.directory.map((item, index) => {
        return { ...item, label: item.label ?? `Item ${index}`, value: item._id, name: '' };
      }),
      categories: dirCategories.directory.map((item, index) => {
        return { ...item, label: item.label ?? `Item ${index}`, value: item._id, name: '' };
      }),
      brands: dirBrands.directory.map((item, index) => {
        return { ...item, label: item.label ?? `Item ${index}`, value: item._id, name: '' };
      }),
      properties: dirProperties.map((item, index) => {
        return { ...item, label: item.label ?? `Item ${index}`, value: item._id, name: '' };
      }),
      warehouses: warehouses.map((item, index) => {
        return { ...item, label: item.label ?? `Item ${index}`, value: item._id, name: '' };
      }),
    };
  }, [dirBrands.directory, dirCategories.directory, dirProperties, dirTags.directory, warehouses]);

  return (
    <ModalBase title={'Filter'} onClose={onClose}>
      <FlexForm
        padding={'8px'}
        onSubmit={filter.handleSubmit(fData => {
          console.log(fData);
          onSubmit && onSubmit(omit(fData, ['propsIdsMap']));
        })}
      >
        <InputLabel label={t('Status')}>
          <TagButtonsFilter<OfferStatusEnum>
            onSelectValue={option => {
              filter.setValue('approved', option.value as OfferStatusEnum);
            }}
            value={filter.formValues.approved ? [filter.formValues.approved] : undefined}
            options={offerStatusFilterOptions}
          />
        </InputLabel>

        <InputLabel label={t('Type')}>
          <ButtonsGroup value={filter.formValues.type} options={offerTypeFilterOptions} form={filter} />
        </InputLabel>

        <InputLabel label={t('Visibility')}>
          <ButtonSwitch
            name={'visible'}
            value={filter.formValues.visible}
            onChange={val => {
              filter.setValue('visible', val, { shouldTouch: true, shouldDirty: true });
            }}
          />
        </InputLabel>

        <AccordionFormArea hideFooter label={'Tags'}>
          <TagButtonsFilter
            multiple
            onChange={values => {
              filter.setValue('tagsIds', values);
            }}
            value={filter.formValues.tagsIds}
            options={mappedOptions.tags}
          />
        </AccordionFormArea>

        <AccordionFormArea hideFooter label={'Categories'} maxHeight={'500px'}>
          <OfferCategoriesSelector
            onChangeIds={ids => {
              filter.setValue('categoriesIds', ids);
            }}
            selectedIds={filter.formValues.categoriesIds}
          />
        </AccordionFormArea>

        <AccordionFormArea hideFooter label={'Properties'}>
          <TabSelector
            options={dirProperties}
            defaultOption={template}
            onOptSelect={option => {
              setTemplate(option);
            }}
          />

          {template?.childrenList?.map(item => {
            return (
              <OfferPropertySelector
                key={item._id}
                item={item}
                multiple
                selectedIds={filter.formValues.propsIdsMap?.[item._id]}
                onChangeIds={(propId, valueIds) => {
                  filter.setValue(`propsIdsMap.${propId}`, valueIds, { shouldDirty: true, shouldTouch: true });

                  filter.setValue(
                    `propertiesIds`,
                    Array.from(new Set([...(filter.formValues.propertiesIds ?? []), ...valueIds])),
                    { shouldDirty: true, shouldTouch: true }
                  );
                }}
              />
            );
          })}
        </AccordionFormArea>

        <AccordionFormArea hideFooter label={'Brands'}>
          <TagButtonsFilter
            multiple
            onChange={values => {
              filter.setValue('brandsIds', values);
            }}
            value={filter.formValues.brandsIds}
            options={mappedOptions.brands}
          />
        </AccordionFormArea>

        <AccordionFormArea hideFooter label={'Warehouses'}>
          <TagButtonsFilter
            multiple
            onChange={values => {
              filter.setValue('warehouse.ids', values);
            }}
            value={filter.formValues.warehouse?.ids}
            options={mappedOptions.warehouses}
          />
        </AccordionFormArea>

        <AccordionFormArea label={'Date fields'} hideFooter>
          {keys.map(key => {
            return (
              <FlexBox
                key={key}
                gap={12}
                fxDirection={'row'}
                fillWidth
                xsStyles={{ fxDirection: 'column', gap: 0, margin: '0 0 8px' }}
              >
                <InputLabel flex={1} label={`${t(key)} ${t('From').toLowerCase()}:`}>
                  <InputText type={'datetime-local'} {...filter.register(`${key}.dateFrom`)} />
                </InputLabel>

                <InputLabel flex={1} label={`${t(key)} ${t('To').toLowerCase()}:`}>
                  <InputText type={'datetime-local'} {...filter.register(`${key}.dateTo`)} />
                </InputLabel>
              </FlexBox>
            );
          })}
        </AccordionFormArea>

        <ModalFooter onSubmitPassed />
      </FlexForm>
    </ModalBase>
  );
};

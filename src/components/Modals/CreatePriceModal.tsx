import { ModalFormProps } from '../ModalForm';
import { IPriceFormData, PriceEntity } from '../../types/price-management/price-management.types';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OfferEntity } from '../../types/offers/offers.types';
import { t } from '../../lang';
import { VariationEntity } from '../../types/offers/variations.types';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { LoadersProvider, useLoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import ModalBase from '../atoms/Modal';
import { CreatePriceFormArea } from '../Forms/pricing/CreatePriceFormArea';
import TableList from '../TableList/TableList';
import { PriceDiscountEntity } from '../../types/price-management/discounts';
import FlexBox from '../atoms/FlexBox';
import { usePriceDiscountsSelector } from '../../redux/selectors.store';
import { useCurrentPrice } from '../../hooks';
import { AccordionFormArea } from '../Forms/FormArea/AccordionForm';
import { useModalService } from '../ModalProvider/ModalProvider';
import { CreateDiscountModal } from './CreateDiscountModal';
import { useAppDispatch } from '../../redux/store.store';
import { getAllDiscountsThunk } from '../../redux/priceManagement/discounts/discounts.thunks';
import { CellTittleProps } from '../TableList/TebleCells/CellTitle';
import { updatePriceThunk } from '../../redux/priceManagement/priceManagement.thunks';
import InputLabel from '../atoms/Inputs/InputLabel';

export interface ModalCreatePriceProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  onSubmit?: AppSubmitHandler<IPriceFormData>;
  offer?: OfferEntity;
  variation?: VariationEntity;
  updateId?: string;
}

type UsePriceFormLoadersKey =
  | 'create'
  | 'update'
  | 'copy'
  | 'price'
  | 'set_default'
  | 'create_discount'
  | 'update_discount'
  | 'discounts'
  | 'all_discounts';

export const usePriceModalFormLoaders = () => useLoadersProvider<UsePriceFormLoadersKey>();

const CreatePriceModal: React.FC<ModalCreatePriceProps> = ({ updateId, offer, onSubmit, ...props }) => {
  const Price = useCurrentPrice({ _id: updateId });
  const discountsState = usePriceDiscountsSelector();
  const modalSrv = useModalService();
  const loaders = useLoaders<UsePriceFormLoadersKey, { price?: PriceEntity; discounts?: PriceDiscountEntity[] }>(
    {
      create: { content: 'Creating...' },
      set_default: { content: 'Updating offer...' },
    },
    { price: Price, discounts: Price?.discounts }
  );
  const dispatch = useAppDispatch();

  return (
    <ModalBase title={t('Pricing')} onClose={props?.onClose}>
      <LoadersProvider value={loaders}>
        <FlexBox padding={'0 8px 24px'}>
          <CreatePriceFormArea offer={offer} defaultState={Price} price={Price} />

          <AccordionFormArea label={'Select discounts'}>
            <InputLabel label={'Added discounts'}>
              <FlexBox minHeight={'150px'} maxHeight={'250px'}>
                <TableList
                  tableData={Price?.discounts}
                  isSearch={false}
                  tableTitles={discountTableTitles}
                  actionsCreator={ctx => {
                    const currentId = ctx.selectedRow?._id;

                    return [
                      {
                        icon: 'refresh',
                        disabled: !Price?._id,
                        onClick: () => {
                          Price?._id &&
                            dispatch(
                              getAllDiscountsThunk({
                                data: { params: { priceId: Price?._id } },
                                onLoading: loaders.onLoading('discounts'),
                              })
                            );
                        },
                      },
                      { separator: true },
                      {
                        icon: 'delete',
                        type: 'onlyIconFilled',
                        disabled: !currentId || !Price?._id,
                        onClick: () => {
                          Price?._id &&
                            dispatch(
                              updatePriceThunk({
                                data: {
                                  data: {
                                    _id: Price?._id,
                                    data: {
                                      discounts: Price.discounts
                                        ?.filter(el => el._id !== currentId)
                                        .map(el => ({ _id: el._id })),
                                    },
                                  },
                                },
                                onLoading: loaders.onLoading('update'),
                              })
                            );
                        },
                      },
                    ];
                  }}
                />
              </FlexBox>
            </InputLabel>
            <InputLabel label={'Available discounts'}>
              <FlexBox minHeight={'150px'} maxHeight={'250px'}>
                <TableList
                  tableData={discountsState.list}
                  isSearch={false}
                  tableTitles={discountTableTitles}
                  isLoading={loaders.isLoading?.discounts}
                  actionsCreator={ctx => {
                    const currentId = ctx.selectedRow?._id;
                    return [
                      {
                        icon: 'refresh',
                        onClick: () => {
                          dispatch(
                            getAllDiscountsThunk({
                              onLoading: loaders.onLoading('all_discounts'),
                            })
                          );
                        },
                      },
                      { separator: true },
                      {
                        icon: 'done',
                        type: 'onlyIconOutlined',
                        disabled: !currentId,
                        onClick: () => {
                          if (Price?._id && currentId) {
                            dispatch(
                              updatePriceThunk({
                                onLoading: loaders.onLoading('update'),
                                data: {
                                  data: { _id: Price._id, data: { discounts: [{ _id: currentId }] } },
                                },
                              })
                            );
                          }
                        },
                      },
                      { separator: true },
                      {
                        icon: 'plus',
                        type: 'onlyIconFilled',
                        onClick: () => {
                          modalSrv.create(CreateDiscountModal, {
                            priceId: Price?._id,
                            onSuccess: d => {
                              loaders.setData('discounts', p => {
                                return [d, ...(p ?? [])];
                              });
                            },
                          });
                        },
                      },
                    ];
                  }}
                />
              </FlexBox>
            </InputLabel>
          </AccordionFormArea>
        </FlexBox>
      </LoadersProvider>
    </ModalBase>
  );
};

const discountTableTitles: CellTittleProps<PriceDiscountEntity>[] = [
  {
    top: { name: 'Type', getData: d => d.type },
    bottom: { name: 'Bonus balance', getData: d => d.balanceType },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Value', align: 'end', getData: d => d.value },
    bottom: { name: 'Value type', getData: d => d.valueType },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Threshold', align: 'end', getData: d => d.threshold },
    bottom: { name: 'Threshold type', getData: d => d.thresholdType },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Limit', align: 'end', getData: d => d.limit },
    bottom: { name: 'Limit type', getData: d => d.limitType },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Label', getData: d => d.label },
    bottom: { name: 'Cms key', getData: d => d.cmsConfigs?.key },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Cms key', getData: d => d.cmsConfigs?.key },
    bottom: { name: 'Cms external key', getData: d => d.cmsConfigs?.extRef },
    width: '125px',
    action: 'valueByPath',
  },
];

export default CreatePriceModal;

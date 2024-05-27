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
import { usePriceManagementSelector } from '../../redux/selectors.store';
import { useCurrentPrice } from '../../hooks';
import { AccordionFormArea } from '../Forms/FormArea/AccordionForm';
import { useModalService } from '../ModalProvider/ModalProvider';
import { CreateDiscountModal } from './CreateDiscountModal';
import { useAppDispatch } from '../../redux/store.store';
import { getAllDiscountsThunk } from '../../redux/priceManagement/discounts/discounts.thunks';
import { CellTittleProps } from '../TableList/TebleCells/CellTitle';

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
  | 'discounts';

export const usePriceModalFormLoaders = () => useLoadersProvider<UsePriceFormLoadersKey>();

const CreatePriceModal: React.FC<ModalCreatePriceProps> = ({ updateId, offer, onSubmit, ...props }) => {
  const Price = useCurrentPrice({ _id: updateId });
  const state = usePriceManagementSelector();
  const modalSrv = useModalService();
  const loaders = useLoaders<UsePriceFormLoadersKey, { price?: PriceEntity; discounts?: PriceDiscountEntity[] }>(
    {
      create: { content: 'Creating...' },
      set_default: { content: 'Updating offer...' },
    },
    { price: Price.current, discounts: Price.current?.discounts }
  );
  const dispatch = useAppDispatch();

  return (
    <ModalBase
      title={t('Pricing')}
      onClose={props?.onClose}
      // extraHeader={
      //   // <TabSelector
      //   //   defaultValue={formData?.type ?? OfferTypeEnum.GOODS}
      //   //   filterOptions={productsFilterOptions}
      //   //   onOptSelect={o => setData('formData', prev => ({ ...prev, type: o.value }))}
      //   // />
      // }
    >
      <LoadersProvider value={loaders}>
        <FlexBox padding={'0 8px 24px'}>
          <CreatePriceFormArea offer={offer} defaultState={Price.current} />

          <AccordionFormArea label={'Select discounts'}>
            <TableList tableData={loaders.state?.discounts} isSearch={false} tableTitles={discountTableTitles} />

            <FlexBox minHeight={'250px'}>
              <TableList
                tableData={state.discounts.list}
                isSearch={false}
                tableTitles={discountTableTitles}
                actionsCreator={ctx => {
                  return [
                    {
                      icon: 'refresh',
                      onClick: () => {
                        dispatch(getAllDiscountsThunk({}));
                      },
                    },

                    {
                      icon: 'plus',
                      type: 'onlyIconFilled',
                      onClick: () => {
                        modalSrv.create(CreateDiscountModal, {
                          priceId: Price.current?._id,
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
          </AccordionFormArea>
        </FlexBox>
      </LoadersProvider>
    </ModalBase>
  );
};

const discountTableTitles: CellTittleProps<PriceDiscountEntity>[] = [
  {
    top: { name: 'Type', getData: d => d.type },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Value type', getData: d => d.valueType },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Value', getData: d => d.value },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Threshold', getData: d => d.threshold },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Threshold type', getData: d => d.thresholdType },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Bonus balance', getData: d => d.balanceType },
    width: '125px',
    action: 'valueByPath',
  },
];

export default CreatePriceModal;

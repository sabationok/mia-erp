import { ModalFormProps } from '../ModalForm';
import { IPriceFormData, PriceEntity } from '../../types/price-management/price-management.types';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OfferEntity } from '../../types/offers/offers.types';
import { t } from '../../lang';
import { VariationEntity } from '../../types/offers/variations.types';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { LoadersProvider, useLoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import ModalBase from '../atoms/Modal';
import { OfferPriceFormArea } from '../Forms/pricing/OfferPriceFormArea';
import { PriceDiscountEntity } from '../../types/price-management/discounts';
import FlexBox from '../atoms/FlexBox';
import { useCurrentPrice } from '../../hooks';
import { CellTittleProps } from '../TableList/TebleCells/CellTitle';
import PriceDiscountsFormArea from 'components/Forms/pricing/PriceDiscountsFormArea';

export interface ModalCreatePriceProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  onSubmit?: AppSubmitHandler<IPriceFormData>;
  offer?: OfferEntity;
  variation?: VariationEntity;
  updateId?: string;
}

type UsePriceFormLoadersKey =
  | 'price'
  | 'update'
  | 'copy'
  | 'set_default_price'
  | 'create_discount'
  | 'update_discount'
  | 'discounts'
  | 'all_discounts'
  | `deleting_id.${string}`;

export const usePriceModalFormLoaders = () => useLoadersProvider<UsePriceFormLoadersKey>();

const CreatePriceModal: React.FC<ModalCreatePriceProps> = ({ updateId, offer, onSubmit, ...props }) => {
  const Price = useCurrentPrice({ _id: updateId });
  const loaders = useLoaders<UsePriceFormLoadersKey, { price?: PriceEntity; discounts?: PriceDiscountEntity[] }>(
    {
      price: { content: 'Creating...' },
      update: { content: 'Updating...' },
      set_default_price: { content: 'Updating offer...' },
      discounts: { content: 'Refreshing...' },
    },
    { price: Price, discounts: Price?.discounts }
  );

  return (
    <ModalBase title={t('Pricing')} onClose={props?.onClose}>
      <LoadersProvider value={loaders}>
        <FlexBox padding={'0 0 24px'}>
          <OfferPriceFormArea offer={offer} defaultState={Price} price={Price} />

          <PriceDiscountsFormArea price={Price} />
        </FlexBox>
      </LoadersProvider>
    </ModalBase>
  );
};

export default CreatePriceModal;

export const discountTableTitles: CellTittleProps<PriceDiscountEntity>[] = [
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
//
//
// {/*<InputLabel label={'Added discounts'}>*/}
// {/*  <FlexBox minHeight={'150px'} maxHeight={'250px'}>*/}
// {/*    <TableList*/}
// {/*      tableData={Price?.discounts}*/}
// {/*      hasSearch={false}*/}
// {/*      tableTitles={discountTableTitles}*/}
// {/*      actionsCreator={ctx => {*/}
// {/*        const currentId = ctx.selectedRow?._id;*/}
//
// {/*        return [*/}
// {/*          {*/}
// {/*            icon: 'refresh',*/}
// {/*            disabled: !Price?._id,*/}
// {/*            onClick: () => {*/}
// {/*              Price?._id &&*/}
// {/*              dispatch(*/}
// {/*                getAllDiscountsThunk({*/}
// {/*                  data: { params: { priceId: Price?._id } },*/}
// {/*                  onLoading: loaders.onLoading('discounts'),*/}
// {/*                })*/}
// {/*              );*/}
// {/*            },*/}
// {/*          },*/}
// {/*          { separator: true },*/}
// {/*          {*/}
// {/*            icon: 'delete',*/}
// {/*            type: 'onlyIconFilled',*/}
// {/*            disabled: !currentId || !Price?._id,*/}
// {/*            onClick: () => {*/}
// {/*              Price?._id &&*/}
// {/*              currentId &&*/}
// {/*              dispatch(*/}
// {/*                removeDiscountThunk({*/}
// {/*                  data: {*/}
// {/*                    data: {*/}
// {/*                      discountId: currentId,*/}
// {/*                      priceId: Price?._id,*/}
// {/*                    },*/}
// {/*                  },*/}
// {/*                  onLoading: loaders.onLoading('update'),*/}
// {/*                })*/}
// {/*              );*/}
// {/*            },*/}
// {/*          },*/}
// {/*        ];*/}
// {/*      }}*/}
// {/*    />*/}
// {/*  </FlexBox>*/}
// {/*</InputLabel>*/}

// <FlexBox fxDirection={'row'} gap={8}>
//   <InputLabel label={'Available discounts'}>
//     <FlexBox minHeight={'150px'} maxHeight={'250px'}>
//       <TableList
//         tableData={availableDiscounts}
//         hasSearch={false}
//         tableTitles={discountTableTitles}
//         isLoading={loaders.isLoading?.discounts}
//         actionsCreator={ctx => {
//           const currentId = ctx.selectedRow?._id;
//           return [
//             {
//               icon: 'refresh',
//               onClick: () => {
//                 dispatch(
//                   getAllDiscountsThunk({
//                     onLoading: loaders.onLoading('all_discounts'),
//                   })
//                 );
//               },
//             },
//             { separator: true },
//             {
//               icon: 'done',
//               type: 'onlyIconOutlined',
//               disabled: !currentId,
//               onClick: () => {
//                 if (Price?._id && currentId) {
//                   dispatch(
//                     updatePriceThunk({
//                       onLoading: loaders.onLoading('update'),
//                       data: {
//                         data: { _id: Price._id, data: { discounts: [{ _id: currentId }] } },
//                       },
//                     })
//                   );
//                 }
//               },
//             },
//             { separator: true },
//             {
//               icon: 'plus',
//               type: 'onlyIconFilled',
//               onClick: () => {
//                 modalSrv.create(CreateDiscountModal, {
//                   priceId: Price?._id,
//                   onSuccess: d => {
//                     loaders.setData('discounts', p => {
//                       return [d, ...(p ?? [])];
//                     });
//                   },
//                 });
//               },
//             },
//           ];
//         }}
//       />
//     </FlexBox>
//   </InputLabel>
// </FlexBox>

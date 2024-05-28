import { usePriceDiscountsSelector, usePriceManagementSelector } from '../redux/selectors.store';
import { useAppParams, useAppQuery } from './index';
import { OnlyUUID } from '../types/utils.types';
import { PriceDiscountEntity } from '../types/price-management/discounts';
import { PriceEntity } from '../types/price-management/price-management.types';

export const useCurrentPrice = ({ _id }: { _id?: string } = {}): PriceEntity | undefined => {
  const state = usePriceManagementSelector();
  const _paramId = useAppParams().priceId;
  const _queryId = useAppQuery().query.priceId;
  const priceId = _id || _paramId || _queryId;
  return priceId ? state?.dataMap[priceId] : undefined;
};

export const useCurrentDiscount = ({ _id }: Partial<OnlyUUID> = {}): PriceDiscountEntity | undefined => {
  const state = usePriceDiscountsSelector();
  const _paramId = useAppParams().discountId;
  const _queryId = useAppQuery().query.discountId;

  const priceId = _id || _paramId || _queryId;

  return priceId ? state?.dataMap[priceId] : undefined;
};

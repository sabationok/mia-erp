import { usePriceDiscountsSelector, usePriceManagementSelector } from '../redux/selectors.store';
import { useAppParams, useAppQuery } from './index';
import { PriceDiscountEntity } from '../types/price-management/discounts';
import { PriceEntity } from '../types/price-management/price-management.types';
import { OnlyUUID } from '../types/utils.types';

export const useCurrentPrice = (input?: Partial<OnlyUUID>): PriceEntity | undefined => {
  const state = usePriceManagementSelector();
  const _paramId = useAppParams().priceId;
  const _queryId = useAppQuery().query.priceId;
  const priceId = input?._id || _paramId || _queryId;
  return priceId ? state?.dataMap[priceId] : undefined;
};

export const useCurrentDiscount = <Info extends Partial<PriceDiscountEntity>>(
  input?: Info
): PriceDiscountEntity | Info | undefined => {
  const state = usePriceDiscountsSelector();
  const _paramId = useAppParams().discountId;
  const _queryId = useAppQuery().query.discountId;

  const priceId = input?._id || _paramId || _queryId;

  return priceId ? state?.dataMap[priceId] || input : input;
};

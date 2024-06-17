import { usePriceDiscountsSelector, usePriceManagementSelector } from '../redux/selectors.store';
import { useAppParams, useAppQuery } from './index';
import { PriceDiscountEntity } from '../types/price-management/discounts';
import { PriceEntity } from '../types/price-management/price-management.types';

export const useCurrentPrice = <Info extends Partial<PriceEntity> = any>(
  input?: Info
): PriceEntity | Info | undefined => {
  const state = usePriceManagementSelector();
  const _paramId = useAppParams().priceId;
  const _queryId = useAppQuery().query.priceId;
  const priceId = input?._id || _paramId || _queryId;
  return priceId ? state?.dataMap[priceId] || input : input;
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

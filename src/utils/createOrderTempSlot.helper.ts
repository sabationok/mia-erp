import { VariationEntity } from 'types/offers/variations.types';
import { WarehouseInventoryEntity } from 'types/warehousing/warehouse-inventory.types';
import { OfferEntity } from 'types/offers/offers.types';
import { PriceEntity } from '../types/price-management/price-management.types';
import { IOrderTempSlot } from '../types/orders/order-slot.types';
import { WarehouseEntity } from '../types/warehousing/warehouses.types';
import Decimal from 'decimal.js';
import { omit } from 'lodash';
import {
  DiscountValueTypeEnum,
  PriceBonusProviderEnum,
  PriceDiscountEntity,
  PriceDiscountType,
  PriceDiscountVolumeType,
} from '../types/price-management/discounts';
import { CurrencyCode, MaybeNull, PartialRecord } from '../types/utils.types';
import { ObjectValues } from './forArray.helpers';

const getTempSlotKey = (slot: Partial<IOrderTempSlot>) => {
  const keys: string[] = [];
  const paths: (keyof IOrderTempSlot)[] = ['offer', 'variation', 'origin', 'warehouse', 'inventory'];
  for (const path of paths) {
    const val = slot?.[path];
    if (val && typeof val === 'object' && '_id' in val && val._id) {
      keys.push(val._id);
    }
  }

  return keys.join('_');
};

export interface CreateOrderTempSlotArgs {
  quantity?: MaybeNull<number>;
  offer?: OfferEntity;
  variation?: VariationEntity;
  price?: PriceEntity;
  inventory?: WarehouseInventoryEntity;
  warehouse?: WarehouseEntity;
  fromRef?: MaybeNull<string>;
  tempId?: string;
}

interface CountedSlotData {
  Brutto: Decimal;
}
export function createOrderTempSlot({
  offer,
  variation,
  quantity = 1,
  price,
  inventory,
  warehouse,
  fromRef,
  tempId,
  ...rest
}: CreateOrderTempSlotArgs): IOrderTempSlot {
  const priceInfo = price || variation?.price || offer?.price;

  const slot: IOrderTempSlot = {
    imgPreview: variation?.imgPreview || offer?.images?.length ? offer?.images?.[0]?.img_preview : undefined,
    ...rest,

    ...omit(priceInfo, [
      'type',
      '_id',
      'createdAt',
      'deletedAt',
      'updatedAt',
      'markup',
      'commission',
      'in',
      'discounts',
    ]),
    currency: CurrencyCode.UAH,
    quantity: quantity ?? 1,
    offer: offer,
    variation: origin,
    fromRef,
    origin: priceInfo,
    inventory: inventory ?? offer?.inventory,
    warehouse: warehouse ?? offer?.warehouse,
    hasVariations: !!offer?.variations?.length,
    isSelected: !!offer?.variations?.length && !!variation,
    cmsConfigs: offer?.cmsConfigs,
    label: variation?.label ?? offer?.label,
    sku: variation?.sku ?? offer?.sku,
  };
  if (!tempId) {
    slot.tempId = getTempSlotKey(slot);
  }

  try {
    countOrderSlotValues(slot);
  } catch (e) {
    console.log(e);
  }

  console.log('[Create Temp Order Slot]', slot);

  return slot;
}
// ! це можна винести щоб був -1 цикл
// const typesInArray = enumToArray(PriceDiscountType);
// type Threshold = number;

type MapKey = `${PriceDiscountType | 'TYPE'}/${DiscountValueTypeEnum | 'VALUE_TYPE'}`;
const getRuleKey = (rule: PriceDiscountEntity): MapKey => `${rule?.type || 'TYPE'}/${rule?.valueType || 'VALUE_TYPE'}`;

export const getDiscountsByCategoriesAndThresholdMap = (slot: IOrderTempSlot, temp: CountedSlotData) => {
  const filteredDiscounts = slot?.origin?.discounts
    ?.filter(item => {
      if (item.volumeType !== PriceDiscountVolumeType.slot) {
        return false;
      }
      // ! прибираємо ті до яких Ми ще НЕ доросли, якщо праивло має поріг звісно ж
      if (item.threshold && temp.Brutto.lessThan(item.threshold)) {
        return false;
      }
      if (item.balanceType !== PriceBonusProviderEnum.refme) {
        return false;
      }

      return true;
    })
    .map(el => ({ ...el, tempId: getRuleKey(el) }));

  // ---------- typesMap --------------
  // const typesMap: Partial<
  //   Record<PriceDiscountType, Map<string, PriceDiscountEntity[]>>
  // > = {};
  //
  // typesInArray.forEach(type => {
  //   const categoriesMap = new Map<string, PriceDiscountEntity[]>();
  //
  //   filteredDiscounts
  //     ?.filter(item => item.type === type)
  //     .forEach(discount => {
  //       const key = discount?.cmsConfigs?.key;
  //       if (!key) return;
  //
  //       const arr = categoriesMap.get(key) || [];
  //       arr.push(discount);
  //       categoriesMap.set(key, arr);
  //     });
  //
  //   typesMap[type] = categoriesMap;
  // });
  // ! перебираємо один разок віфільтровані нами раніше Дисконти
  const activeIdsList: string[] = [];

  // * тут лише ті які бзе порогу оптраплять
  const rulesMap: Record<MapKey | string, PriceDiscountEntity> = {};
  // тут перезаписуємо під кожне правило із найбільшим допустимим попрогом

  const largestValues: PartialRecord<MapKey, PriceDiscountEntity['value']> = {};
  const largestThreshold: PartialRecord<MapKey, PriceDiscountEntity['threshold']> = {};

  const isValueGreater = <Value extends { value?: string | number | Decimal; tempId: MapKey }>(a: Value): boolean =>
    new Decimal(a?.value || 0).greaterThan(largestValues[a.tempId] || 0);
  const isThresholdGreater = <Value extends { threshold?: number; tempId: MapKey }>(a: Value): boolean =>
    (a?.threshold ?? 0) > (largestThreshold[a.tempId] ?? 0);

  filteredDiscounts?.forEach(discount => {
    const tempId = discount.tempId;
    if (!tempId) return;
    if (!discount.type) return;

    if (discount.threshold) {
      if (!isThresholdGreater(discount)) {
        return;
      } else {
        largestThreshold[tempId] = discount.threshold;
      }
    }
    if (!isValueGreater(discount)) {
      return;
    } else {
      largestValues[tempId] = discount.value;
    }

    // * Додаємо праивло
    activeIdsList.push(discount._id);
    rulesMap[tempId] = discount;
  });

  // ---------- suitable threshold --------------

  // Object.entries(typesMap).forEach(([_, categoryMap]) => {
  //   categoryMap.forEach((discountsArr, key) => {
  //     const sortedArr = discountsArr.sort(
  //       (a, b) => (a?.threshold ?? 0) - (b?.threshold ?? 0)
  //     );
  //
  //     let suitableThresholdDisc = null;
  //
  //     for (let i = 0; i < sortedArr.length; i++) {
  //       const { threshold } = sortedArr[i];
  //
  //       if (new Decimal(threshold ?? 0).lte(slot?.brutto ?? 0)) {
  //         suitableThresholdDisc = sortedArr[i];
  //       } else {
  //         break;
  //       }
  //     }
  //
  //     suitableThresholdDisc
  //       ? categoryMap.set(key, [suitableThresholdDisc])
  //       : categoryMap.set(key, []);
  //   });
  // });

  return { rulesMap, activeIdsList };
};

export const countOrderSlotValues = (slot: Partial<IOrderTempSlot>, onGetDiscountsIds?: (list: string[]) => void) => {
  const Brutto = new Decimal(slot?.out ?? 0).times(slot.quantity ?? 1);
  slot.brutto = Brutto.toFixed();
  slot.netto = slot.brutto?.slice();

  if (slot?.origin?.discounts?.length) {
    const extras = {
      discount: new Decimal(0),
      bonus: new Decimal(0),
      cashback: new Decimal(0),
    };

    const { activeIdsList, rulesMap } = getDiscountsByCategoriesAndThresholdMap(slot, {
      Brutto,
    });
    const discounts = ObjectValues(rulesMap);
    if (discounts.length) {
      slot.discounts = discounts;
    } else {
      slot.discounts = [];
      return slot;
    }

    // const byThresholdArray = Object.values(byThresholdsMap);
    // for (const discount of byThresholdArray) {
    //   if (discount?.valueType === DiscountValueTypeEnum.percentage) {
    //   } else if (discount?.valueType === DiscountValueTypeEnum.amount) {
    //   }
    // }

    onGetDiscountsIds && onGetDiscountsIds(activeIdsList);

    // Object.entries(filteredDiscountsObj).forEach(([type, mapByCategories]) => {
    //   const percents = new Decimal(0);
    //   const amount = new Decimal(0);
    //
    //   mapByCategories.forEach((discountsArr, _) => {
    //     const discount = discountsArr[0];
    //     const v = new Decimal(discount?.value ?? 0);
    //
    //     if (discount?.valueType === DiscountValueTypeEnum.percentage) {
    //       percents.plus(v);
    //     } else if (discount?.valueType === DiscountValueTypeEnum.amount) {
    //       amount.plus(v);
    //     }
    //   });
    //
    //   const amountByPercents = new Decimal(slot?.brutto ?? 0)
    //     .times(percents)
    //     .dividedBy(100);
    //
    //   extras[type as keyof typeof PriceDiscountType] =
    //     amountByPercents.plus(amount);
    // });

    slot.cashback = {
      amount: extras.cashback.toString(),
    };
    slot.bonus = {
      amount: extras.bonus.toString(),
    };
    slot.discount = {
      amount: extras.discount.toString(),
    };
  } else {
    // console.warn('slot?.origin?.discounts list is empty');
    slot.discounts = [];
  }

  return slot;
};

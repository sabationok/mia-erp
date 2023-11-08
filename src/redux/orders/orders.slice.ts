import { createSlice } from '@reduxjs/toolkit';
import { ICreateOrdersGroupFormState, IOrder } from './orders.types';

import {
  AddSlotToGroupAction,
  ClearCurrentGroupFormDataAction,
  RemoveSlotFromGroupAction,
  UpdateCurrentGroupFormInfoDataAction,
  UpdateSlotInGroupAction,
} from './orders.actions';

export interface IOrdersState {
  orders: any[];
  currentOrder?: IOrder;
  ordersGroupFormData: ICreateOrdersGroupFormState;
  filteredOrders?: [];
  isLoading: boolean;
  error: any;
}

export interface IOrdersGroupBase {
  orders: IOrder[];
}

const initialOrdersGroupFormData: ICreateOrdersGroupFormState = {
  slots: [],
  info: {},
  orders: [],
};
const initialOrdersState: IOrdersState = {
  orders: [],
  currentOrder: { _id: '' },
  ordersGroupFormData: initialOrdersGroupFormData,
  isLoading: false,
  error: null,
};

// const compareIdsByKey = <Key extends string = any>(
//   obj1?: Record<Key | string, OnlyUUID | any>,
//   obj2?: Record<Key | string, OnlyUUID | any>,
//   key?: Key
// ) => {
//   if (obj1 && obj2 && key) {
//     return obj1[key]?._id === obj2[key]?._id;
//   }
//   return false;
// };

// function findSlotByIdKeys(
//   slots: IOrderTempSlot[],
//   slot: IOrderTempSlot,
//   keys = ['product', 'inventory', 'warehouse', 'price', 'variation']
// ) {
//   return slots?.find(sl => {
//     return keys.some(k => {
//       return compareIdsByKey(sl, slot, k);
//     });
//   });
// }

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {},
  extraReducers: builder =>
    builder
      // .addCase('getAllOrdersThunk.fulfilled', (s, a) => {
      //   // s.isLoading = false;
      //   // if (Array.isArray(a.payload.data)) {
      //   //   if (a.payload.refresh) {
      //   //     s.orders = a.payload.data;
      //   //     return;
      //   //   }
      //   //   s.orders = [...a.payload.data, ...s.orders];
      //   // }
      // })
      .addCase(AddSlotToGroupAction, (s, a) => {
        s.ordersGroupFormData.slots?.push(a.payload);
      })
      .addCase(RemoveSlotFromGroupAction, (s, a) => {
        s.ordersGroupFormData.slots = s.ordersGroupFormData.slots?.filter(sl => sl.tempId !== a.payload);
      })
      .addCase(UpdateSlotInGroupAction, (s, a) => {
        s.ordersGroupFormData.slots = s.ordersGroupFormData.slots?.map(sl => {
          if (sl?.tempId === a.payload?.tempId) {
            return a.payload;
          } else {
            return sl;
          }
        });
      })
      .addCase(UpdateCurrentGroupFormInfoDataAction, (s, a) => {
        s.ordersGroupFormData.info = { ...s.ordersGroupFormData.info, ...a.payload };
      })
      .addCase(ClearCurrentGroupFormDataAction, (s, a) => {
        s.ordersGroupFormData = { ...initialOrdersGroupFormData };
      }),
});

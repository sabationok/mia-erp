import { createSlice } from '@reduxjs/toolkit';
import { IOrder, IOrderSlot } from './orders.types';
import { FormCreateOrdersGroupFormData } from '../../components/Forms/FormCreateOrder/FormCreateOrdersGroup';
import { AddSlotToGroupAction, RemoveSlotFromGroupAction, UpdateSlotInGroupAction } from './orders.sctions';
import { OnlyUUID } from '../global.types';
import { ExtractId } from '../../utils/dataTransform';

export interface IOrdersState {
  orders: any[];
  currentOrder?: IOrder;
  currentGroup: {
    slots: (Partial<IOrderSlot> & { tempId: string })[];
    orders?: IOrder[];
  };
  currentOrdersGroupFormData?: FormCreateOrdersGroupFormData;
  filteredOrders?: [];
  isLoading: boolean;
  error: any;
}

export interface IOrdersGroupBase {
  orders: IOrder[];
}

const initialOrdersState: IOrdersState = {
  orders: [],
  currentOrder: { _id: '' },
  currentGroup: {
    slots: [],
  },

  isLoading: false,
  error: null,
};

const compareIdsByKey = <Key extends string = any>(
  obj1?: Record<Key | string, OnlyUUID | any>,
  obj2?: Record<Key | string, OnlyUUID | any>,
  key?: Key
) => {
  if (obj1 && obj2 && key) {
    return ExtractId(obj1[key])._id === ExtractId(obj2[key])._id;
  }
  return false;
};

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
        const exist = s.currentGroup.slots.find(sl => {
          return ['inventory', 'warehouse', 'price', 'variation', 'product'].some(k => {
            const r = compareIdsByKey(sl, a.payload, k);
            console.log('AddSlotToGroupAction compareIdsByKey', k, r);

            return r;
          });
        });
        exist && console.log('AddSlotToGroupAction', exist);

        s.currentGroup.slots.push(a.payload);
      })
      .addCase(RemoveSlotFromGroupAction, (s, a) => {
        s.currentGroup.slots = s.currentGroup.slots.filter(sl => sl.tempId !== a.payload);
      })
      .addCase(UpdateSlotInGroupAction, (s, a) => {
        s.currentGroup.slots.map(sl => (sl.tempId === a.payload.tempId ? a.payload : sl));
      }),
});

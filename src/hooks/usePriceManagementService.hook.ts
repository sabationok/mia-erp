import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { __ServiceDispatcherAsync } from 'redux/app-redux.types';
import { useMemo } from 'react';
import * as thunks from '../redux/priceManagement/prices.thunks';
import {
  createPriceThunk,
  deletePriceFromListThunk,
  getAllPricesThunk,
  updatePriceThunk,
} from '../redux/priceManagement/prices.thunks';
import {
  createPriceListThunk,
  getAllPriceListsThunk,
  getPriceListThunk,
  updatePriceListThunk,
} from '../redux/priceManagement/prices-lists.thunks';

export interface PriceManagementService {
  lists: {
    update: __ServiceDispatcherAsync<typeof updatePriceListThunk>;
    create: __ServiceDispatcherAsync<typeof createPriceListThunk>;
    // delete: __ServiceDispatcherAsync<typeof deletePriceFromListThunk>;
    getAll: __ServiceDispatcherAsync<typeof getAllPriceListsThunk>;
    getOne: __ServiceDispatcherAsync<typeof getPriceListThunk>;
  };
  prices: {
    update: __ServiceDispatcherAsync<typeof updatePriceThunk>;
    create: __ServiceDispatcherAsync<typeof createPriceThunk>;
    delete: __ServiceDispatcherAsync<typeof deletePriceFromListThunk>;
    getAll: __ServiceDispatcherAsync<typeof getAllPricesThunk>;
  };
}

export const usePriceManagementService = (): PriceManagementService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): PriceManagementService => {
    return {
      lists: {
        create: args => dispatch(createPriceListThunk(args)),
        getAll: args => dispatch(getAllPriceListsThunk(args)),
        getOne: args => dispatch(getPriceListThunk(args)),
        update: args => dispatch(updatePriceListThunk(args)),
      },

      prices: {
        getAll: args => dispatch(thunks.getAllPricesThunk(args)),
        update: args => dispatch(thunks.updatePriceThunk(args)),
        create: args => dispatch(thunks.createPriceThunk(args)),
        delete: args => dispatch(thunks.deletePriceFromListThunk(args)),
      },
    };
  }, [dispatch]);
};

export default usePriceManagementService;

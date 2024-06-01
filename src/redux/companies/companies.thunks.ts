import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { ThunkArgs } from '../store.store';
import { CompanyEntity, ICompanyReqData } from '../../types/companies.types';
import { CompaniesApi } from '../../api';

export enum CompanyThunkType {
  setConfigs = 'companies/setConfigsThunk',
  getConfigs = 'companies/getConfigsThunk',
  updateById = 'companies/updateCompanyByIdThunk',
  getById = 'companies/getCompanyByIdThunk',
}

// export const createSetCompanyConfigsThunk = (type: string) =>
//   createAsyncThunk<
//     {
//       refreshCurrent?: boolean;
//       data: ICompanyConfigs;
//     },
//     ThunkPayload<
//       {
//         refreshCurrent?: boolean;
//         data: ICompanyConfigsDto;
//       },
//       ICompanyConfigs
//     >
//   >(type, async (args, thunkAPI) => {
//     args?.onLoading && args?.onLoading(true);
//
//     try {
//       const res = await CompaniesApi.setConfigs(args?.data?.data);
//       if (res) {
//         args?.onSuccess && args?.onSuccess(res?.data?.data, res?.data?.meta);
//       }
//       args?.onLoading && args?.onLoading(false);
//
//       return { refreshCurrent: args?.data?.refreshCurrent, data: res?.data?.data };
//     } catch (e) {
//       args?.onError && args?.onError(e);
//       args?.onLoading && args?.onLoading(false);
//       return thunkAPI.rejectWithValue(axiosErrorCheck(e));
//     }
//   });

// export const createGetCompanyConfigsThunk = (type: string) =>
//   createAsyncThunk<
//     {
//       refreshCurrent?: boolean;
//       data: ICompanyConfigs;
//     },
//     ThunkPayload<{ refreshCurrent?: boolean }, ICompanyConfigs>
//   >(type, async (args, thunkAPI) => {
//     args?.onLoading && args?.onLoading(true);
//     try {
//       const res = await CompaniesApi.getConfigs();
//       if (res) {
//         args?.onSuccess && args?.onSuccess(res?.data?.data, res?.data?.meta);
//       }
//       args?.onLoading && args?.onLoading(false);
//       return { refreshCurrent: args?.data?.refreshCurrent, data: res?.data?.data };
//     } catch (e) {
//       args?.onError && args?.onError(e);
//       args?.onLoading && args?.onLoading(false);
//       return thunkAPI.rejectWithValue(axiosErrorCheck(e));
//     }
//   });
export function buildGetCompanyByIdThunk(type: string) {
  return createAsyncThunk<
    CompanyEntity,
    ThunkArgs<
      {
        _id?: string;
        params?: { fullInfo?: boolean; configs?: boolean };
      },
      CompanyEntity
    >
  >(type, async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response = await CompaniesApi.getById(data);

      if (response) {
        onSuccess && onSuccess(response.data.data);
      }
      return response.data.data;
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  });
}

export const getCompanyByIdThunk = buildGetCompanyByIdThunk(CompanyThunkType.getById);
export function buildUpdateCompanyThunk(type: string) {
  return createAsyncThunk<CompanyEntity, ThunkArgs<ICompanyReqData, CompanyEntity>>(
    type,
    async ({ data, onSuccess, onError }, thunkAPI) => {
      try {
        const response = await CompaniesApi.updateById(data);

        if (response) {
          onSuccess && onSuccess(response.data.data);
        }
        return response.data.data;
      } catch (error) {
        onError && onError(error);
        return thunkAPI.rejectWithValue(axiosErrorCheck(error));
      }
    }
  );
}
export const updateCompanyByIdThunk = buildUpdateCompanyThunk(CompanyThunkType.updateById);

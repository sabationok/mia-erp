import { ICompaniesState, ICompany } from './companies.types';
import { initialUser } from '../auth/auth.slice';
import { createSlice } from '@reduxjs/toolkit';

export const initialCompany: ICompany = {
  _id: 'svdf3vsd5f3sdf1',
  name: 'Initial Comp',
  fullName: 'Initial Comp LTD',
  email: 'company@mail.com',
  owner: initialUser,
  companyToken: 'companyToken',
};

const initialCompState: ICompaniesState = {
  companies: [initialCompany],
  isLoading: false,
  error: null,
};
export const companiesSlice = createSlice({
  name: 'companies',
  initialState: initialCompState,
  reducers: {},
  extraReducers: builder => builder,
});
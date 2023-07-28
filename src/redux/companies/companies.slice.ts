import { ICompaniesState, ICompany } from './companies.types';
import { createSlice } from '@reduxjs/toolkit';
import { testUserKarina } from '../../data/usersDir.data';

export const initialCompany: ICompany = {
  _id: 'companyId',
  name: 'Initial Comp',
  fullName: 'Initial Comp LTD',
  email: 'company@mail.com',
  taxCode: '51651348435',
  owner: testUserKarina,
  company_token: 'company_token',
  customerTags: ['Новий', 'Дивний', 'Нервовий', 'VIP', 'Premium', 'Econom', 'Default'],
};

const initialCompState: ICompaniesState = {
  // companies: [initialCompany, { ...initialCompany, _id: 'dfbsdfgbd13f5g13bdg1', name: 'Roga & Copyta' }],
  companies: [],
  isLoading: false,
  error: null,
};
export const companiesSlice = createSlice({
  name: 'companies',
  initialState: initialCompState,
  reducers: {},
  extraReducers: builder => builder,
});

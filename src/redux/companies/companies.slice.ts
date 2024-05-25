import { CompanyEntity, ICompaniesState } from '../../types/companies.types';
import { createSlice } from '@reduxjs/toolkit';
import { testUserKarina } from '../../data/usersDir.data';
import { getCompanyByIdThunk, updateCompanyByIdThunk } from './companies.thunks';

export const initialCompany: CompanyEntity = {
  _id: 'companyId',
  name: { first: 'Initial Comp' },
  label: { print: 'Initial Comp LTD' },
  email: 'company@mail.com',
  taxCode: { corp: '51651348435' },
  owner: testUserKarina,
};

const initialCompState: ICompaniesState = {
  currentRoot: undefined,
  // companies: [initialCompany, { ...initialCompany, _id: 'dfbsdfgbd13f5g13bdg1', name: 'Roga & Copyta' }],
  companies: [],
  isLoading: false,
  error: null,
};
export const companiesSlice = createSlice({
  name: 'companies',
  initialState: initialCompState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getCompanyByIdThunk.fulfilled, (s, a) => {
        s.current = a.payload;
      })
      .addCase(updateCompanyByIdThunk.fulfilled, (s, a) => {
        s.current = a.payload;
      }),
});

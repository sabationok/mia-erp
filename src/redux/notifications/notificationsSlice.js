import { createSlice } from '@reduxjs/toolkit';

import { actionAddNotify, actionClearAllNotify, actionDeleteNotify } from './notificationsActions';

const initialState = {
  notifications: [],
};

export const appNotifySlice = createSlice({
  name: 'appNotify',
  initialState,
  extraReducers: {
    [actionAddNotify]: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
    },
    [actionClearAllNotify]: (state, action) => {
      state.notifications = [];
    },
    [actionDeleteNotify]: (state, action) => {
      state.notifications = state.notifications.filter(item => item.id !== action.payload);
    },
  },
});

export const appNotifyReducer = appNotifySlice.reducer;

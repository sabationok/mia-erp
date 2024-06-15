import { createSlice } from '@reduxjs/toolkit';
import { AccentColorName, appThemes, getAccentColor, getTheme, globals, IAppTheme } from 'theme';
import { actionResetAppSettings, actionSelectAccentColor, actionToggleDarkMode } from './appSettings.actions';
import { getAppActionsThunk } from './appSettings.thunks';
import { RoleActionType } from '../app-redux.types';
import { onUserLogout } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';

export interface IAppSettings {
  isDarkMode?: boolean;
  accentColor?: AccentColorName;
  appTheme: IAppTheme;
  appActions: Record<string, RoleActionType[]>;
}

const initialState: IAppSettings = {
  isDarkMode: false,
  accentColor: 'orange',
  appActions: {},
  appTheme: { ...appThemes.light, accentColor: getAccentColor('orange'), globals: globals },
};

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actionToggleDarkMode, state => {
        state.isDarkMode = !state.isDarkMode;
        state.appTheme = { ...state.appTheme, ...getTheme(state.isDarkMode ? 'dark' : 'light') };
      })
      .addCase(actionSelectAccentColor, (state, action) => {
        // state.accentColor = action.payload;

        state.appTheme = { ...state.appTheme, accentColor: getAccentColor(action.payload) };

        console.debug(state);
      })
      .addCase(getAppActionsThunk.fulfilled, (s, a) => {
        s.appActions = a.payload;
      })
      .addCase(actionResetAppSettings, (state, _action) => {
        state.isDarkMode = initialState.isDarkMode;
        state.accentColor = initialState.accentColor;
        state.appTheme = initialState.appTheme;

        console.log('app reset', state);
      })
      .addMatcher(onUserLogout, sliceCleaner(initialState)),
});

export const appSettingsReducer = appSettingsSlice.reducer;

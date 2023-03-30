import { createSlice } from '@reduxjs/toolkit';
import { accentColors, AccentColorNamesType, appThemes, getAccentColor, getTheme, IAppTheme, globals } from 'theme';
import { actionToggleDarkMode, actionResetAppSettings, actionSelectAccentColor } from './appSettings.actions';

export interface IAppSettings {
  isDarkMode?: boolean;
  accentColor?: AccentColorNamesType;
  appTheme: IAppTheme;
}

const initialState: IAppSettings = {
  isDarkMode: false,
  accentColor: 'orange',
  appTheme: { ...appThemes.light, accentColor: accentColors.orange, globals: globals },
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
        state.accentColor = action.payload;
        state.appTheme.accentColor = getAccentColor(action.payload);
      })
      .addCase(actionResetAppSettings, (state, _action) => {
        state.isDarkMode = initialState.isDarkMode;
        state.accentColor = initialState.accentColor;
        state.appTheme = initialState.appTheme;

        console.log('app reset', state);
      }),
});

export const appSettingsReducer = appSettingsSlice.reducer;

import { createAction } from '@reduxjs/toolkit';
import { AccentColorName } from 'theme';

export const actionToggleDarkMode = createAction('appSettings/actionToggleDarkMode');
export const actionSelectAccentColor = createAction<AccentColorName>('appSettings/actionSelectAccentColor');
export const actionResetAppSettings = createAction('appSettings/actionResetAppSettings');

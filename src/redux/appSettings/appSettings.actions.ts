import { createAction } from '@reduxjs/toolkit';

import { AccentColorNamesType } from 'theme';

export const actionToggleDarkMode = createAction('appSettings/actionToggleDarkMode');
export const actionSelectAccentColor = createAction<AccentColorNamesType>('appSettings/actionSelectAccentColor');
export const actionResetAppSettings = createAction('appSettings/actionResetAppSettings');

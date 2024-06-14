import { AccentColorName, getGeneratedColor, IAccentColor, IAccentColors } from './accentColors';
import { Keys } from '../types/utils.types';
import { ObjectEntries, ObjectFromEntries } from '../utils';

export type { AccentColorName, IAccentColors, IAccentColor };

export enum ActionColorName {
  light = 'light',
  dark = 'dark',
  default = 'default',
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  primary = 'primary',
}
export const globals = {
  colorLight: '#EFEFEF',
  trBorderClr: '#464646',
  inputBorder: '#7B7B7B',
  inputPlaceholderColor: '#7B7B7B',
  shadowMain: '0px 4px 4px rgba(0, 0, 0, 0.15)',
  shadowSecondary: '0 10px 12px 5px rgba(21, 21, 21, 0.25), 0 10px 12px 4px rgba(211, 211, 211, 0.15)',
  timingFunctionMain: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  timingFunctionLong: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  timingFnMui: '200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  timingFnMuiLong: '400ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  timingFnNull: '0ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  timingFnMain: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  timingFnLong: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  defaultBtnBckgrndColor: {
    def: 'transparent',
    hover: 'rgba(219, 219, 219, 0.1)',
    pressed: 'rgba(219, 219, 219, 0.05)',
  },
  colors: {
    light: '#fff',
    dark: '#121212',
    default: 'rgb(154, 154, 154)',
    info: '#3498db',
    success: '#07bc0c',
    warning: '#f1c40f',
    error: '#e74c3c',
    primary: '#cdcdcd',
  },
};
export type IThemeGlobals = typeof globals;

type ActionColorsSet = Record<Keys<typeof ActionColorName>, IAccentColor>;

const actionColorsDarkTheme: ActionColorsSet = ObjectFromEntries(
  ObjectEntries(globals.colors).map(([key, value]) => {
    return [key, getGeneratedColor(value, { theme: 'dark' })];
  })
);
const actionColorsDefaultTheme: ActionColorsSet = ObjectFromEntries(
  ObjectEntries(globals.colors).map(([key, value]) => {
    return [key, getGeneratedColor(value, { theme: 'default' })];
  })
);

const darkTheme = {
  backgroundColorMain: 'rgb(28, 28, 28)',
  backgroundColorSecondary: 'rgb(39, 39, 39)',
  backgroundColorLight: '#323234',
  backdropColorDark: 'rgba(21, 21, 21, 0.5)',
  backdropColorDarkLight: 'rgba(21, 21, 21, 0.25)',
  backdropColorDarkExtraLight: 'rgba(21, 21, 21, 0.1)',
  borderColor: '#59595a',

  trBorderClr: 'rgba(70, 70, 73, 1)', // 'rgba(122, 122, 122, 1)',
  trBorderClrLight: '#2C2C2E',
  trBorderClrDark: '#464649',

  tableBackgroundColor: 'rgb(50, 50, 52)',
  tableFooterBackground: 'rgb(39, 39, 39)',
  tableHeaderBackground: '#47474b',
  tableHeaderStroke: 'rgba(122, 122, 122)',
  tableRowStroke: '#E9E9E9',
  tableRowShadow: `0px 5px 12px ${'rgba(157,157,157,0.8)'}`,
  tableRowBackgroundHover: '#3A3A3C',
  tableRowBackgroundActive: '#323234',
  tableRowBackgroundSelected: '#323234',

  sideBarBackgroundColor: 'rgba(39, 39, 41, 1)',
  sideBarOptionsBackgroundColor: 'rgb(50, 50, 52)',
  sideBarBorderColor: 'rgba(70, 70, 73, 1)',
  sideBarButtonBackgroundColorActive: 'rgba(50, 50, 52, 1)',
  sideBarTogglerBackgroundColor: 'rgba(70, 70, 73, 1)',

  headerBackgroundColor: 'rgba(39, 39, 41, 1)',
  headerBorderColor: 'rgba(70, 70, 73, 1)',
  headerButtonBackgroundColorActive: 'rgba(50, 50, 52, 1)',
  headerTogglerBackgroundColor: 'rgba(70, 70, 73, 1)',

  modalBackgroundColor: '#272727',
  modalBorderColor: 'rgba(83, 83, 87, 1)',
  modalButtonBackgroundColorActive: 'rgba(50, 50, 52, 1)',
  modalTogglerBackgroundColor: 'rgba(70, 70, 73, 1)',

  colorLight: '#EFEFEF',
  fontColor: '#EFEFEF',
  fillColor: '#EFEFEF',
  fontColorHeader: '#EFEFEF',
  fillColorHeader: '#EFEFEF',

  fieldColor: '#323234',
  fieldBackgroundColor: '#323234',
  fieldInnerBackgroundColor: '#464649',

  input: {
    backgroundColor: '#EFEFEF',
    borderColor: '#d9d9d9',
  },

  field: {
    color: '#EFEFEF',
    backgroundColor: '#323234',
    backgroundColorHover: 'rgba(219, 219, 219, 0.15)',
    backgroundColorPressed: 'rgba(219, 219, 219, 0.25)',
    innerBackgroundColor: '#464649',
  },
  // 252527
  table: {
    qActionsBackground: '#3A3A3C',
    qActionsButtonBackground: '#252527',
    qActionsButtonBackgroundActive: '#464649',
    headerBackground: '#3A3A3C',
  },

  fontColorSidebar: '#EFEFEF',
  fillColorSidebar: '#EFEFEF',

  defaultBtnBckgrndColor: {
    def: 'transparent',
    hover: 'rgba(219, 219, 219, 0.1)',
    pressed: 'rgba(219, 219, 219, 0.05)',
    disabled: '',
    focus: '',
    light: '',
  },

  actions: actionColorsDarkTheme,
};
type ITheme = typeof darkTheme;

const lightTheme: Partial<ITheme & Record<string, any>> = {
  ...darkTheme,

  backgroundColorMain: '#5C5C5D',
  backgroundColorSecondary: '#DADADA',
  backgroundColorLight: '#FAFAFA',
  // backdropColor: 'rgba(21, 21, 21, 0.3)',
  backdropColorDark: 'rgba(21, 21, 21, 0.5)',
  backdropColorDarkLight: 'rgba(21, 21, 21, 0.25)',
  backdropColorDarkExtraLight: 'rgba(21, 21, 21, 0.1)',

  colorLight: '#EFEFEF',
  fontColor: '#272727',
  fillColor: '#272727',
  fontColorHeader: '#272727',
  fillColorHeader: '#272727',

  borderColor: '#E9E9E9',
  trBorderClr: 'rgba(218, 218, 218, 1)', // '#E9E9E9',
  trBorderClrLight: '#E9E9E9',
  tableFooterBackground: '#FAFAFA',
  tableHeaderBackground: '#E4E4E4',
  tableHeaderStroke: '#FFF',
  tableBackgroundColor: '#fafafa',
  tableRowStroke: '#E9E9E9',
  // tableRowShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
  tableRowBackgroundHover: '#EDEDED',
  tableRowBackgroundActive: '#F2F2F2',

  sideBarBackgroundColor: 'rgba(250, 250, 250, 1)',
  sideBarOptionsBackgroundColor: 'rgba(250, 250, 250, 1)',
  sideBarBorderColor: 'rgba(218, 218, 218, 1)',
  sideBarButtonBackgroundColorActive: 'rgba(233, 233, 233, 1)',
  sideBarTogglerBackgroundColor: 'rgba(235, 235, 235, 1)',

  headerBackgroundColor: 'rgba(235, 235, 235, 1)',
  headerBorderColor: 'rgba(218, 218, 218, 1)',
  headerButtonBackgroundColorActive: 'rgba(233, 233, 233, 1)',
  headerTogglerBackgroundColor: 'rgba(218, 218, 218, 1)',

  modalBackgroundColor: '#FAFAFA',
  modalBorderColor: 'rgba(218, 218, 218, 1)',
  modalButtonBackgroundColorActive: 'rgba(233, 233, 233, 1)',
  modalTogglerBackgroundColor: 'rgba(218, 218, 218, 1)',

  fontColorSidebar: '#272727',
  fillColorSidebar: '#272727',

  fieldColor: '#E4E4E4',
  fieldBackgroundColor: '#E4E4E4',
  fieldInnerBackgroundColor: '#fafafa',

  input: {
    backgroundColor: '',
    borderColor: '',
  },

  field: {
    color: '#393939',
    backgroundColor: '#E4E4E4',
    backgroundColorHover: 'rgba(39, 39, 39, 0.15)',
    backgroundColorPressed: 'rgba(39, 39, 39, 0.25)',
    innerBackgroundColor: '#EFEFEF',
  },

  table: {
    qActionsBackground: '#F0F0F0',
    qActionsButtonBackground: '#E2E2E2',
    qActionsButtonBackgroundActive: '',
    headerBackground: '#E9E9E9',
  },

  sideBar: {
    background: '#F0F0F0',
  },

  defaultBtnBckgrndColor: {
    def: 'transparent',
    hover: 'rgba(219, 219, 219, 0.1)',
    pressed: 'rgba(122, 122, 122, 0.3)',
    disabled: '',
    focus: '',
    light: '',
  },
  actions: actionColorsDefaultTheme,
};

export interface IAppTheme extends ITheme {
  globals: IThemeGlobals;
  accentColor: IAccentColor;
}

export interface IAppThemes {
  [theme: string]: ITheme;
}

export const appThemes: IAppThemes = {
  dark: darkTheme,
  light: lightTheme as ITheme,
};
export type ThemeType = keyof IAppThemes;

declare module 'styled-components' {
  export interface DefaultTheme extends IAppTheme {}
}

export function getTheme(themeName?: ThemeType) {
  return themeName && appThemes[themeName] ? appThemes[themeName] : appThemes.light;
}
export { getAccentColor, getGeneratedColor } from './accentColors';
// export function getAccentColor(colorName?: AccentColorNamesType) {
//   return colorName && accentColors[colorName] ? accentColors[colorName] : accentColors.orange;
// }

import { AccentColorNamesType, accentColors, IAccentColor, IAccentColors } from './accentColors';

export { accentColors };
export type { AccentColorNamesType, IAccentColors, IAccentColor };

export const globals = {
  colorLight: '#EFEFEF',
  trBorderClr: '#464646',
  inputBorder: '#5c5c5c',
  inputPlaceholderColor: '#7B7B7B',
  shadowMain: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  timingFunctionMain: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  timingFunctionLong: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  timingFnMui: '200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  timingFnNull: '0ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  timingFnMain: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  timingFnLong: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  defaultBtnBckgrndColor: {
    def: 'transparent',
    hover: 'rgba(219, 219, 219, 0.1)',
    pressed: 'rgba(219, 219, 219, 0.05)',
  },
};
export type IThemeGlobals = typeof globals;

export interface ITheme {
  backgroundColorMain: string;
  backgroundColorSecondary: string;
  backgroundColorLight?: string;
  backdropColor?: string;
  borderColor: string;
  trBorderClr: string;
  colorLight: string;
  fontColor: string;
  fillColor: string;
  fontColorHeader?: string;
  fillColorHeader?: string;
  fontColorSidebar?: string;
  fillColorSidebar?: string;
  tableBackgroundColor: string;
  defaultBtnBckgrndColor: {
    def: string;
    pressed: string;
    hover: string;
    disabled: string;
    focus: string;
    light: string;
  };
}
const darkTheme: ITheme = {
  backgroundColorMain: 'rgb(28, 28, 28)',
  backgroundColorSecondary: 'rgb(39, 39, 39)',
  // backgroundColorLight: 'rgb(46, 46, 46)',
  backgroundColorLight: '#323234',
  backdropColor: 'rgba(21, 21, 21, 0.3)',
  borderColor: '#313131',
  tableBackgroundColor: '#3A3A3C',
  trBorderClr: '#464646',
  colorLight: '#EFEFEF',
  fontColor: '#EFEFEF',
  fillColor: '#EFEFEF',
  fontColorHeader: '',
  fillColorHeader: '',
  fontColorSidebar: '',
  fillColorSidebar: '',
  defaultBtnBckgrndColor: {
    def: 'transparent',
    hover: 'rgba(219, 219, 219, 0.1)',
    pressed: 'rgba(219, 219, 219, 0.05)',
    disabled: '',
    focus: '',
    light: '',
  },
};
const lightTheme: ITheme = {
  backgroundColorMain: 'rgb(86, 87, 117)',
  backgroundColorSecondary: 'rgb(118, 119, 152)',
  backgroundColorLight: 'rgba(231, 231, 255,1)',
  backdropColor: 'rgba(21, 21, 21, 0.3)',
  borderColor: 'rgba(122, 122, 122)',
  trBorderClr: 'rgba(86, 87, 117, 0.9)',
  tableBackgroundColor: 'rgba(86, 87, 117,0.2)',
  colorLight: '#EFEFEF',
  fontColor: '#272727',
  fillColor: '#272727',
  fontColorHeader: '#EFEFEF',
  fillColorHeader: '#EFEFEF',
  fontColorSidebar: '#EFEFEF',
  fillColorSidebar: '#EFEFEF',
  defaultBtnBckgrndColor: {
    def: 'transparent',
    hover: 'rgba(219, 219, 219, 0.1)',
    pressed: 'rgba(122, 122, 122, 0.3)',
    disabled: '',
    focus: '',
    light: '',
  },
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
  light: lightTheme,
};
export type ThemeType = keyof IAppThemes;

declare module 'styled-components' {
  export interface DefaultTheme extends IAppTheme {}
}

export function getTheme(themeName?: ThemeType) {
  return themeName && appThemes[themeName] ? appThemes[themeName] : appThemes.light;
}
export function getAccentColor(colorName?: AccentColorNamesType) {
  return colorName && accentColors[colorName] ? accentColors[colorName] : accentColors.orange;
}

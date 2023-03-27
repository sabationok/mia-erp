export interface IThemeGlobals {
  colorLight: string;
  trBorderClr: string;
  inputBorder: string;
  defaultBtnBckgrndColor: { def: string; hover: string; pressed: string };
  inputPlaceholderColor: string;
  timingFunctionMain: string;
  timingFunctionLong: string;
  timingFnMui: string;
  timingFnNull: string;
}
export const globals: IThemeGlobals = {
  colorLight: '#EFEFEF',
  trBorderClr: '#464646',
  inputBorder: '#5c5c5c',
  inputPlaceholderColor: '#7B7B7B',
  timingFunctionMain: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  timingFunctionLong: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  timingFnMui: '200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  timingFnNull: '0ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  defaultBtnBckgrndColor: {
    def: 'transparent',
    hover: 'rgba(219, 219, 219, 0.1)',
    pressed: 'rgba(219, 219, 219, 0.05)',
  },
};

export interface IAccentColor {
  base: string;
  hover: string;
  pressed: string;
  disabled: string;
  focus: string;
  light: string;
}
export interface IAccentColors {
  [color: string]: IAccentColor;
}
export const accentColors: IAccentColors = {
  orange: {
    base: 'rgb(220, 133, 31)',
    pressed: 'rgb(227, 156, 65)',
    hover: 'rgb(205, 133, 50)',
    disabled: '',
    focus: '',
    light: 'rgba(220, 133, 31, 0.05)',
  },
};
export type AccentColorNamesType = keyof IAccentColors;

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
  backgroundColorLight: 'rgb(46, 46, 46)',
  backdropColor: 'rgba(21, 21, 21, 0.3)',
  borderColor: '#313131',
  trBorderClr: '#464646',
  colorLight: '#EFEFEF',
  fontColor: '#EFEFEF',
  fillColor: '#EFEFEF',
  fontColorHeader: '',
  fillColorHeader: '',
  fontColorSidebar: '',
  fillColorSidebar: '',
  tableBackgroundColor: 'rgb(46, 46, 46)',
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
  backgroundColorMain: '#EFEFEF',
  backgroundColorSecondary: 'rgb(86, 87, 117)',
  backgroundColorLight: 'rgb(118, 119, 152)',
  backdropColor: 'rgba(21, 21, 21, 0.3)',
  borderColor: 'rgba(122, 122, 122)',
  trBorderClr: 'rgb(118, 119, 152)',
  colorLight: '#EFEFEF',
  fontColor: '#272727',
  fillColor: '#272727',
  fontColorHeader: '#EFEFEF',
  fillColorHeader: '#EFEFEF',
  fontColorSidebar: '#EFEFEF',
  fillColorSidebar: '#EFEFEF',
  tableBackgroundColor: 'rgb(214 214 214)',
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

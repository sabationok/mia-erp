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

// export interface ITheme extends Record<string, any> {
//   backgroundColorMain: string;
//   backgroundColorSecondary: string;
//   backgroundColorLight?: string;
//   backdropColor?: string;
//   borderColor: string;
//   trBorderClr: string;
//   trBorderClrLight?: string;
//   trBorderClrDark?: string;
//   colorLight: string;
//   fontColor: string;
//   fillColor: string;
//   fontColorHeader?: string;
//   fillColorHeader?: string;
//   fontColorSidebar?: string;
//   fillColorSidebar?: string;
//   tableBackgroundColor: string;
//   defaultBtnBckgrndColor: {
//     def: string;
//     pressed: string;
//     hover: string;
//     disabled: string;
//     focus: string;
//     light: string;
//   };
// }

const darkTheme = {
  backgroundColorMain: 'rgb(28, 28, 28)',
  backgroundColorSecondary: 'rgb(39, 39, 39)',
  backgroundColorLight: '#323234',
  backdropColor: 'rgba(21, 21, 21, 0.3)',
  borderColor: '#59595a',
  trBorderClr: 'rgba(122, 122, 122)',
  trBorderClrLight: '#2C2C2E',
  trBorderClrDark: '#464649',
  tableFooterBackground: 'rgb(39, 39, 39)',
  tableHeaderBackground: '#3A3A3C',
  tableBackgroundColor: 'rgb(28, 28, 28)',
  tableHeaderStroke: 'rgba(122, 122, 122)',

  colorLight: '#EFEFEF',
  fontColor: '#EFEFEF',
  fillColor: '#EFEFEF',
  fontColorHeader: '#EFEFEF',
  fillColorHeader: '#EFEFEF',

  fieldColor: '#323234',

  fontColorSidebar: '#EFEFEF',
  fillColorSidebar: '#EFEFEF',

  modalBackground: '#272727',
  defaultBtnBckgrndColor: {
    def: 'transparent',
    hover: 'rgba(219, 219, 219, 0.1)',
    pressed: 'rgba(219, 219, 219, 0.05)',
    disabled: '',
    focus: '',
    light: '',
  },
};
type ITheme = typeof darkTheme

const lightTheme: Partial<ITheme> = {
  backgroundColorMain: '#5C5C5D',
  backgroundColorSecondary: '#DADADA',
  backgroundColorLight: '#FAFAFA',
  backdropColor: 'rgba(21, 21, 21, 0.3)',
  borderColor: '#5C5C5D',
  trBorderClr: '#5C5C5D',
  tableFooterBackground: '#FAFAFA',
  tableHeaderBackground: '#E4E4E4',
  tableHeaderStroke: '#FFF',
  tableBackgroundColor: '#EFEFEF',
  colorLight: '#EFEFEF',
  fontColor: '#272727',
  fillColor: '#272727',
  fontColorHeader: '#272727',
  fillColorHeader: '#272727',

  fontColorSidebar: '#272727',
  fillColorSidebar: '#272727',

  fieldColor: '#E4E4E4',
  modalBackground: '#FAFAFA',
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
  light: lightTheme as ITheme,
};
export type ThemeType = keyof IAppThemes;

declare module 'styled-components' {
  export interface DefaultTheme extends IAppTheme {
  }
}

export function getTheme(themeName?: ThemeType) {
  return themeName && appThemes[themeName] ? appThemes[themeName] : appThemes.light;
}

export function getAccentColor(colorName?: AccentColorNamesType) {
  return colorName && accentColors[colorName] ? accentColors[colorName] : accentColors.orange;
}

const ORANGE: IAccentColor = {
  // base: 'rgb(220, 133, 31)',
  // pressed: 'rgb(227, 156, 65)',
  // hover: 'rgb(205, 133, 50)',
  // hover: '#FFA033',
  // pressed: '#CC6D00',

  // base: 'rgba(255, 136, 0, 1)',
  // pressed: 'rgb(220, 133, 31)',
  // hover: '#CC6D00',
  // disabled: '',
  // focus: '',
  // light: 'rgb(250,213,172)',
  base: 'rgb(47,232,125)',
  pressed: 'rgb(41,211,112)',
  hover: 'rgb(37,190,103)',
  disabled: '',
  focus: '',
  light: 'rgb(191,239,207)',
};
const LIGHT_BLUE: IAccentColor = {
  base: 'rgb(31,176,220)',
  pressed: 'rgb(65,165,227)',
  hover: 'rgb(50,146,205)',
  disabled: '',
  focus: '',
  light: 'rgba(31,176,220,0.2)',
};
const LIGHT_GREEN: IAccentColor = {
  base: 'rgb(47,232,125)',
  pressed: 'rgb(41,211,112)',
  hover: 'rgb(37,190,103)',
  disabled: '',
  focus: '',
  light: 'rgb(191,239,207)',
};
export const accentColors = {
  orange: ORANGE,
  lightBlue: LIGHT_BLUE,
  green: LIGHT_GREEN,
};

export interface IAccentColor {
  base: string;
  hover: string;
  pressed: string;
  disabled: string;
  focus: string;
  light: string;
}

export type AccentColorNamesType = keyof typeof accentColors;

export type IAccentColors = {
  [color in AccentColorNamesType]: IAccentColor;
};

const ORANGE: IAccentColor = {
  // base: 'rgb(220, 133, 31)',
  // pressed: 'rgb(227, 156, 65)',
  // hover: 'rgb(205, 133, 50)',
  // hover: '#FFA033',
  // pressed: '#CC6D00',

  base: '#FF8800',
  pressed: 'rgb(220, 133, 31)',
  hover: '#CC6D00',
  disabled: '',
  focus: '',
  light: 'rgba(220, 133, 31, 0.05)',
};
const LIGHT_BLUE: IAccentColor = {
  base: 'rgb(220, 133, 31)',
  pressed: 'rgb(227, 156, 65)',
  hover: 'rgb(205, 133, 50)',
  disabled: '',
  focus: '',
  light: 'rgba(220, 133, 31, 0.05)',
};
export const accentColors = {
  orange: ORANGE,
  lightBlue: LIGHT_BLUE,
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

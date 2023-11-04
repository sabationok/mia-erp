import * as antdColors from '@ant-design/colors';

const LIGHT_BLUE: IAccentColor = {
  base: 'rgb(31,176,220)',
  pressed: 'rgb(65,165,227)',
  hover: 'rgb(50,146,205)',
  disabled: 'rgba(125,221,255,0.2)',
  focus: 'rgb(65,165,227)',
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

const LIME: IAccentColor = {
  base: '#a0d911',
  pressed: '#5b8c00',
  hover: '#7cb305',
  disabled: '#fcffe6',
  focus: '#7cb305',
  light: '#f4ffb8',
};

export interface IAccentColor {
  base: string;
  hover: string;
  pressed: string;
  disabled: string;
  focus: string;
  light: string;
}

export function getAccentColor(name: AccentColorName): IAccentColor {
  const colors = antdColors[name] ?? antdColors['orange'];

  return {
    base: colors[5],
    pressed: colors[2],
    hover: colors[7],
    disabled: colors[0],
    focus: colors[6],
    light: colors[2],
  };
}

const ORANGE: IAccentColor = {
  // base: 'rgb(220, 133, 31)',
  // pressed: 'rgb(227, 156, 65)',
  // hover: 'rgb(205, 133, 50)',
  // hover: '#FFA033',
  // pressed: '#CC6D00',
  //
  // base: 'rgba(255, 136, 0, 1)',
  // pressed: 'rgb(220, 133, 31)',
  // hover: '#CC6D00',
  // disabled: '',
  // focus: '',
  // light: 'rgb(250,213,172)',

  ...LIGHT_BLUE,
};
const accentColors = {
  orange: ORANGE,
  lightBlue: LIGHT_BLUE,
  green: LIGHT_GREEN,
  lime: LIME,
};

export enum AccentColorEnum {
  red = 'red',
  volcano = 'volcano',
  gold = 'gold',
  yellow = 'yellow',
  lime = 'lime',
  green = 'green',
  cyan = 'cyan',
  blue = 'blue',
  geekblue = 'geekblue',
  purple = 'purple',
  magenta = 'magenta',
  orange = 'orange',
}

export type AccentColorName = keyof typeof AccentColorEnum;

export type IAccentColors = {
  [color in AccentColorName]: IAccentColor;
};

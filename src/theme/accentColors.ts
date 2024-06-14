import * as antdColors from '@ant-design/colors';
import * as colors from '@ant-design/colors';

// const LIGHT_BLUE: IAccentColor = {
//   base: 'rgb(31,176,220)',
//   pressed: 'rgb(65,165,227)',
//   hover: 'rgb(50,146,205)',
//   disabled: 'rgba(125,221,255,0.2)',
//   focus: 'rgb(65,165,227)',
//   light: 'rgba(31,176,220,0.2)',
// };
// const LIGHT_GREEN: IAccentColor = {
//   base: 'rgb(47,232,125)',
//   pressed: 'rgb(41,211,112)',
//   hover: 'rgb(37,190,103)',
//   disabled: '',
//   focus: '',
//   light: 'rgb(191,239,207)',
// };
//
// const LIME: IAccentColor = {
//   base: '#a0d911',
//   pressed: '#5b8c00',
//   hover: '#7cb305',
//   disabled: '#fcffe6',
//   focus: '#7cb305',
//   light: '#f4ffb8',
// };

export interface IAccentColor {
  base: string;
  hover: string;
  pressed: string;
  disabled: string;
  focus: string;
  light: string;
  extraLight: string;
}

export function getAccentColor(name: AccentColorName): IAccentColor {
  const colors = antdColors[name] ?? antdColors['orange'];

  return {
    base: colors[5],
    pressed: colors[2],
    hover: colors[7],
    disabled: colors[1],
    focus: colors[6],
    light: colors[2],
    extraLight: colors[0],
  };
}
export function getGeneratedColor(...args: Parameters<typeof colors.generate>): IAccentColor {
  const color = colors.generate(...args);

  return {
    base: color[5],
    pressed: color[2],
    hover: color[7],
    disabled: color[1],
    focus: color[6],
    light: color[2],
    extraLight: color[0],
  };
}

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

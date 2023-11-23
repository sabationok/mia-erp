import { createContext, useContext } from 'react';
import { IProperty, IPropertyValue, IVariationTemplate } from '../../../redux/products/properties/properties.types';

export interface DirPropertiesCTXValue {}
export const DirPropertiesCTX = createContext<DirPropertiesCTXValue>({});
export const useDirPropertiesCTX = () => useContext(DirPropertiesCTX);

export enum DirPropertiesActionsEnum {
  onUpdate = 'onUpdate',
  onCreateValue = 'onCreateValue',
  onCreateChild = 'onCreateChild',
  onChangeSelectableStatus = 'onChangeSelectableStatus',
}
enum DirPropertyType {
  group = 'group',
  prop = 'prop',
  value = 'value',
}
type DirPropertyItemByType = {
  [DirPropertyType.group]: IVariationTemplate;
  [DirPropertyType.prop]: IProperty;
  [DirPropertyType.value]: IPropertyValue;
};

type DirPropertiesActionType = {
  name: string;
  label: string;
  for: DirPropertyType[];
  onPress: <Type extends DirPropertyType = any>(info: {
    item: DirPropertyItemByType[Type];
    type: Type;
    index: number;
  }) => void;
};

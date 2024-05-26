import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';

const HeaderButton = styled.button`
  display: flex;
  align-items: center;

  border: 0;
  background-color: transparent;

  font-family: inherit;
  font-weight: 600;
  font-size: 13px;
  padding: 6px 10px;
  color: ${p => p.theme.accentColor.base};

  cursor: pointer;

  &[disabled] {
    pointer-events: none;
    color: ${p => p.theme.modalBorderColor};
  }
`;

const Cell = styled(FlexBox)`
  //min-height: 70px;
  height: max-content;
  min-height: max-content;

  padding: 0 8px 8px;
  gap: 4px;

  //overflow: hidden;

  &:not(:first-child) {
    border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  }
`;

const Tag = styled(FlexBox)`
  justify-content: center;
  align-items: center;

  padding: 4px 8px;
  min-height: 28px;
  color: #fcfcfc;

  background-color: ${p => p.theme.fieldBackgroundColor};

  //background-color: #f1f1f1;

  border-radius: 4px;
  border: 1px solid ${p => p.theme.modalBorderColor};
`;

const CellText = styled(Text)<{ $isTitle?: boolean }>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;

  color: ${p =>
    p.$isTitle
      ? p.theme.globals.inputPlaceholderColor
      : p.$disabled
      ? p.theme.globals.inputPlaceholderColor
      : undefined};
`;
const ImagesSetBox = styled(FlexBox)`
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const DefaultTag = styled(FlexBox)`
  justify-content: center;

  border-radius: 2px;
  padding: 4px 12px;
  height: 28px;

  background-color: ${p => p.theme.fieldBackgroundColor};
`;
const CategoryItem = styled(FlexBox)`
  align-items: center;
  justify-content: center;

  flex-direction: row;

  padding: 4px 8px;

  font-weight: 500;
  font-size: 13px;
  color: ${p => p.theme.fontColorSidebar};

  min-height: 28px;

  border-radius: 2px;
  //background-color: ${p => p.theme.field.backgroundColor};
  border: 1px solid ${p => p.theme.accentColor.base};
`;

export const CellStyledComp = {
  CategoryItem,
  ImagesSetBox,
  CellText,
  Tag,
  HeaderButton,
  Cell,
  DefaultTag,
};

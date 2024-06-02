import { IBase, MaybeNull } from '../../types/utils.types';
import React, { useEffect } from 'react';
import { FlexLi, FlexUl } from './FlexBox';
import { Text } from './Text';
import SvgIcon from './SvgIcon/SvgIcon';
import styled from 'styled-components';
import { useScrollTo } from '../../hooks';
import ButtonIcon from './ButtonIcon';

export const RenderStackHistory = <Item extends IBase & { label?: MaybeNull<string> }>({
  stack,
  onItemSelect,
}: {
  stack: Item[];
  onItemSelect?: (item: Item, index: number) => void;
  getKey?: (item: Item) => string;
  getLabel?: (item: Item) => React.ReactNode;
  methodsRef?: React.MutableRefObject<{ scrollToLast: () => void }>;
}) => {
  const scroller = useScrollTo('last', { horizontal: true, preventDefault: true });

  useEffect(() => {
    if (stack.length > 2) {
      scroller.scrollTo('last');
    }
  }, [scroller, stack.length]);

  return (
    <List fxDirection={'row'} fillWidth overflow={'auto'} ref={scroller.listRef}>
      {stack.map((item, index) => {
        const isLast = stack.length - 1 === index;
        return (
          <FlexLi
            key={item?._id}
            id={isLast ? '_last' : item?._id}
            width={'max-content'}
            fxDirection={'row'}
            alignItems={'center'}
          >
            <ItemButton
              variant={'defNoEffects'}
              padding={'8px 6px'}
              onClick={() => {
                onItemSelect && onItemSelect(item, index);
              }}
            >
              <Text $weight={isLast ? 700 : 500} $size={13} $whiteSpase={'nowrap'}>
                {item?.label}
              </Text>

              <SvgIcon icon={'arrowRight'} size={'14px'} />
            </ItemButton>
          </FlexLi>
        );
      })}
    </List>
  );
};
const List = styled(FlexUl)`
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
const ItemButton = styled(ButtonIcon)`
  gap: 8px;

  &:hover {
    color: ${p => p.theme.accentColor.base};
    & .endIcon {
      fill: ${p => p.theme.accentColor.base};
    }
  }
`;

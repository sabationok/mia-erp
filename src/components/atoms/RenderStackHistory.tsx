import { IBase, MaybeNull } from '../../types/utils.types';
import React, { useEffect } from 'react';
import { FlexLi, FlexUl } from './FlexBox';
import { Text } from './Text';
import SvgIcon from './SvgIcon/SvgIcon';
import styled from 'styled-components';
import { useScrollTo } from '../../hooks';

export const RenderStackHistory = <Item extends IBase & { label?: MaybeNull<string> }>({
  stack,
}: {
  stack: Item[];
  getKey?: (item: Item) => string;
  getLabel?: (item: Item) => React.ReactNode;
  methodsRef?: React.MutableRefObject<{ scrollToLast: () => void }>;
}) => {
  const scroller = useScrollTo('last', { horizontal: true, preventDefault: true });

  useEffect(() => {
    if (stack.length > 3) {
      scroller.scrollTo('last');
    }
  }, [scroller, stack.length]);

  return (
    <List fxDirection={'row'} fillWidth overflow={'auto'} ref={scroller.listRef}>
      {stack.map((item, index) => {
        return (
          <FlexLi
            key={item?._id}
            id={stack.length - 1 === index ? '_last' : item?._id}
            width={'max-content'}
            gap={8}
            padding={'8px 6px'}
            fxDirection={'row'}
            alignItems={'center'}
          >
            <Text $weight={500} $size={13}>
              {item?.label}
            </Text>

            <SvgIcon icon={'arrowRight'} size={'14px'} />
          </FlexLi>
        );
      })}
    </List>
  );
};
const List = styled(FlexUl)`
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

import React, { memo, useCallback, useMemo } from 'react';

import { isUndefined } from 'lodash';
import { useDrawerService } from './DrawerProvider';
import FlexBox from '../../components/atoms/FlexBox';
import styled from 'styled-components';

export interface DrawerStackProps {}

const DrawerStack = () => {
  const drawerS = useDrawerService();

  const handleCloseOnBackdrop = useCallback(
    (id: string) => (ev: React.MouseEvent<HTMLDivElement>) => {
      if (ev.target === ev.currentTarget) {
        ev.target.addEventListener('mouseup', () => drawerS.closeById(id), {
          once: true,
        });
        return;
      }
    },
    [drawerS]
  );

  const renderDrawerStack = useMemo(() => {
    return drawerS.stack.map(({ Component, drawerId, props, configs }, index) => (
      <Backdrop
        key={drawerId}
        fxDirection={'row'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        onMouseDown={
          !isUndefined(configs?.close?.pressOnBackdrop) || !configs?.close?.pressOnBackdrop
            ? handleCloseOnBackdrop(drawerId)
            : undefined
        }
        className={`Backdrop_${drawerId}`}
      >
        <DrawerContainer className={`DrawerContainer_${drawerId}`} $isLast={index + 1 === drawerS.stack.length}>
          <Component {...props} drawerId={drawerId} onClose={() => drawerS.closeById(drawerId)} index={index} />
        </DrawerContainer>
      </Backdrop>
    ));
  }, [drawerS, handleCloseOnBackdrop]);

  return (
    <Stack isActive={!!drawerS.stack.length} className={'Drawer_Stack'}>
      {renderDrawerStack}
    </Stack>
  );
};

const Stack = styled(FlexBox)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1300;

  width: 100%;
  height: 100%;

  max-width: ${p => (p.isActive ? '100%' : '0')};
  pointer-events: ${p => (p.isActive ? 'all' : 'none')};
  visibility: ${p => (p.isActive ? 'visible' : 'hidden')};

  overflow: hidden;
`;

const Backdrop = styled(FlexBox)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1300;

  //align-items: flex-end;

  max-height: 100%;
  background-color: ${p => p.theme.backdropColor};

  transition: none;
`;

const DrawerContainer = styled(FlexBox)<{ $isLast?: boolean }>`
  max-width: 480px;

  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  //width: 100%;
  width: fit-content;
  overflow: hidden;
  z-index: 1300;

  animation-name: ModalAnimationFromRight;
  animation-duration: 500ms;
`;

export default memo(DrawerStack);

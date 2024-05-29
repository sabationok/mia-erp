import { CreatedOverlay, useOverlayService } from './OverlayStackProvider';
import React, { createContext, MouseEventHandler, useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';
import FlexBox from '../../components/atoms/FlexBox';

export interface OverlayLocalValue extends CreatedOverlay {}
export const OverlayLocalCTX = createContext<OverlayLocalValue>({});
export const useOverlay = () => useContext(OverlayLocalCTX);

export const OverlayStack = (_: { name?: string }) => {
  const overlaySrv = useOverlayService();

  const onOverlayBackdropClick = useCallback(
    (id: string): MouseEventHandler<HTMLDivElement> =>
      ev => {
        if (ev.target === ev.currentTarget) {
          overlaySrv.remove(id);
        }
      },
    [overlaySrv]
  );
  const renderOverlayStack = useMemo(() => {
    const stack = overlaySrv.getStack();

    return stack.map(({ RenderComponent, props, id }, index) => {
      return (
        <OverlayBox
          key={`overlay-${id}`}
          className={`overlay-${id}`}
          style={{ zIndex: 20 + index }}
          fillHeight
          fillWidth
          alignItems={'flex-end'}
          onClick={onOverlayBackdropClick(id)}
        >
          <OverlayLocalCTX.Provider
            value={{
              onClose: () => {
                overlaySrv.remove(id);
              },
              compId: id,
              index: index,
            }}
          >
            <RenderComponent
              key={`overlay-${id}`}
              {...props}
              onClose={() => {
                overlaySrv.remove(id);
              }}
              compId={id}
              index={index}
            />
          </OverlayLocalCTX.Provider>
        </OverlayBox>
      );
    });
  }, [onOverlayBackdropClick, overlaySrv]);

  return (
    <Backdrop fillWidth fillHeight isActive={renderOverlayStack.length > 0} overflow={'hidden'}>
      {renderOverlayStack}
    </Backdrop>
  );
};

const Backdrop = styled(FlexBox)`
  position: absolute;

  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 200;

  left: ${p => (p.isActive ? 0 : '100%')};

  opacity: ${p => (p.isActive ? 1 : 0)};
  visibility: ${p => (p.isActive ? 'visible' : 'hidden')};
  pointer-events: ${p => (p.isActive ? 'all' : 'none')};

  background-color: ${p => p.theme.backdropColor};

  transition: all ${p => p.theme.globals.timingFunctionMain};
`;

const OverlayBox = styled(FlexBox)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 20;

  max-width: 360px;

  height: 100%;

  animation: TransformFromRight;

  @media screen and (max-width: 768px) {
    max-width: 400px;
  }
`;

import React, { createContext, useCallback, useContext, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

export interface DrawerProviderProps {
  children?: React.ReactNode;
  name: string;
}

export interface CreatedDrawer {
  compId?: string;
  onClose?: () => void;
  index?: number;
}

export interface DrawerConfigs {
  closePrev?: boolean;
  close?: {
    pressOnBackdrop?: boolean;
    pressOnEscape?: boolean;
  };
}

export type OpenDrawerHandler = <P = any>(
  Component: React.FC<P>,
  props?: Omit<P, keyof CreatedDrawer>,
  configs?: DrawerConfigs
) => CreatedDrawer;

export interface DrawerStackItemInfo<P extends Partial<CreatedDrawer> = any> {
  drawerId: string;
  Component: React.FC<P>;
  props?: P;
  configs?: DrawerConfigs;
}

export interface DrawerService extends Omit<DrawerProviderProps, 'children'> {
  open: OpenDrawerHandler;
  stack: DrawerStackItemInfo[];
  closeById: (id: string) => void;
  closePrev: () => void;
  clearStack: () => void;
}

const DrawerProviderCTX = createContext({} as DrawerService);

export const useDrawerService = (): DrawerService => useContext(DrawerProviderCTX);

const DrawerProvider: React.FC<DrawerProviderProps> = ({ children, name }) => {
  const [drawerStack, setDrawerStack] = useState<DrawerStackItemInfo[]>([]);

  const handleCloseDrawerById = (id: string) => {
    setDrawerStack(prev => prev.filter(m => m.drawerId !== id));
  };

  const handleClosePrevDrawer = useCallback(() => {
    setDrawerStack(prev => {
      const newArr = [...prev];
      newArr.pop();
      return newArr;
    });
  }, []);

  const handleOpenDrawer: OpenDrawerHandler = useCallback(
    (Component, props, configs) => {
      const drawerId = `${Component.name}_${nanoid(8)}`;

      const isDrawerAlreadyOpen = drawerStack.find(modal => {
        return modal.drawerId.includes(Component?.name);
      });

      if (configs?.closePrev) {
        setDrawerStack(prev => {
          const newArr = [...prev];
          newArr.pop();
          return newArr;
        });
      }

      if (!isDrawerAlreadyOpen && typeof Component === 'function') {
        setDrawerStack(prev => [...prev, { Component, drawerId, props, configs }]);
      }

      return {
        onClose: () => handleCloseDrawerById(drawerId),
        compId: drawerId,
        index: drawerStack.length,
      };
    },
    [drawerStack]
  );

  const CTX: DrawerService = {
    clearStack: () => setDrawerStack([]),
    open: handleOpenDrawer,
    stack: drawerStack,
    closeById: handleCloseDrawerById,
    closePrev: handleClosePrevDrawer,
    name,
  };

  return <DrawerProviderCTX.Provider value={CTX}>{children}</DrawerProviderCTX.Provider>;
};

export default DrawerProvider;

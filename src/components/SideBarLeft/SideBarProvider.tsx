import { sideBarLeftData } from 'data';
import { createContext, useContext, useState } from 'react';

export interface ISidebarOptionsItem {
  iconId: string;
  options: any;
  RenderComponent: React.FC<any>;
  title: string;
  maxWidth: string;
  corp: boolean;
  disabled?: boolean;
}

export interface ISideBarCTX {
  isOpen?: boolean;
  RightSideContent?: ISidebarOptionsItem | null;
  onTogglerClick?: () => void;
  onClose?: () => void;
  handleOptionsState?: (mewContent?: any) => void;
  sideBarButtons?: ISidebarOptionsItem[];
  sideBarButtonsBottom?: ISidebarOptionsItem[];
}

export const SideBarCTX = createContext({});
export const useSideBar = () => useContext(SideBarCTX) as ISideBarCTX;

const SideBarProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [RightSideContent, setRightSideContent] = useState<ISidebarOptionsItem | null | undefined>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function handleOptionsState(mewContent?: ISidebarOptionsItem) {
    setRightSideContent(prev => {
      return prev === mewContent ? null : mewContent;
    });
  }

  function onTogglerClick() {
    setIsOpen(!isOpen);
    handleOptionsState();
  }

  const CTX = {
    isOpen,
    RightSideContent,
    onClose: () => handleOptionsState(),
    onTogglerClick,
    handleOptionsState,
    sideBarButtons: sideBarLeftData.sideBarButtons,
    sideBarButtonsBottom: sideBarLeftData.sideBarButtonsBottom,
  };

  return <SideBarCTX.Provider value={CTX}>{children}</SideBarCTX.Provider>;
};

export default SideBarProvider;

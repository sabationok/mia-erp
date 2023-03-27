import { sideBarLeftData } from 'data';
import { createContext, useContext, useState } from 'react';

export interface ISidebarOptionsItem {
  iconId: string;
  options: any[];
  RenderComponent: React.FC | null;
  title: string;
  maxWidth: string;
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

export const SideBarCTX = createContext<ISideBarCTX>({});
export const useSideBar = () => useContext(SideBarCTX);

const SideBarProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [RightSideContent, setRightSideContent] = useState<ISidebarOptionsItem | null | undefined>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function handleOptionsState(mewContent?: ISidebarOptionsItem) {
    setRightSideContent(prev => {
      console.log('prevContetnt', prev);
      console.log('mewContent', mewContent);
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

  return (
    <SideBarCTX.Provider value={CTX}>
      <>{children}</>
    </SideBarCTX.Provider>
  );
};

export default SideBarProvider;

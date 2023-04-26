import { ISidebarOptionsItem } from 'components/SideBarLeft/SideBarProvider';
import { appSettings, directories, reports } from 'data';
import { iconId } from '../img/sprite/iconId.data';
// import Notifications from '../components/SideBarContent/Notifications';
import Directories from 'components/SideBarContent/Directories';
import Reports from 'components/SideBarContent/Reports';
import CompanySettings from '../components/SideBarContent/CompanySettings';
import { comapnySettings } from './companySettings.data';
import Notifications from '../components/SideBarContent/Notifications';

export const sideBarButtons: ISidebarOptionsItem[] = [
  { iconId: iconId.folder, maxWidth: '', options: directories, title: 'Довідники', RenderComponent: Directories },
  { iconId: iconId.assignmentOutlined, maxWidth: '', options: reports, title: 'Звіти', RenderComponent: Reports },
  { iconId: iconId.bank, maxWidth: '', options: comapnySettings, title: 'Компанія', RenderComponent: CompanySettings },
];
export const sideBarButtonsBottom: ISidebarOptionsItem[] = [
  { iconId: iconId.notifications, maxWidth: '480px', options: [], title: 'Сповіщення', RenderComponent: Notifications },
  { iconId: iconId.settings, maxWidth: '', options: appSettings, title: 'Налаштування', RenderComponent: () => null },
];

const sideBarLeftData = {
  sideBarButtons,
  sideBarButtonsBottom,
};

export default sideBarLeftData;

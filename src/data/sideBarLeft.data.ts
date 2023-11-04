import { ISidebarOptionsItem } from 'components/SideBarLeft/SideBarProvider';
import { iconId } from '../img/sprite';

import { companySettings } from './companySettings.data';
import Directories from '../components/SideBarContent/Directories';
import Reports from '../components/SideBarContent/Reports';
import CompanySettings from '../components/SideBarContent/CompanySettings';
import Notifications from '../components/SideBarContent/Notifications';
import directories from './directories.data';
import { reports } from './reports.data';
import { appSettings } from './appSettings.data';
import AppSettings from '../components/SideBarContent/AppSettings';

export const sideBarButtons: ISidebarOptionsItem[] = [
  {
    iconId: iconId.folder,
    maxWidth: '320px',
    options: directories,
    title: 'Довідники',
    corp: true,
    RenderComponent: Directories,
  },
  {
    iconId: iconId.assignmentOutlined,
    maxWidth: '',
    options: reports,
    title: 'Звіти',
    corp: true,
    RenderComponent: Reports,
  },
  {
    iconId: iconId.bankOutlined,
    maxWidth: '',
    options: companySettings,
    title: 'Компанія',
    corp: true,
    RenderComponent: CompanySettings,
  },
];
export const sideBarButtonsBottom: ISidebarOptionsItem[] = [
  {
    iconId: iconId.notificationsO,
    maxWidth: '480px',
    options: [],
    title: 'Сповіщення',
    corp: true,
    RenderComponent: Notifications,
  },
  {
    iconId: iconId.settingsO,
    maxWidth: '',
    options: appSettings,
    title: 'Налаштування',
    corp: true,
    RenderComponent: AppSettings,
  },
];

const sideBarLeftData = {
  sideBarButtons,
  sideBarButtonsBottom,
};

export default sideBarLeftData;

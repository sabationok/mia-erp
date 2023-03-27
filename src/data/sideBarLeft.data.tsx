import { ISidebarOptionsItem } from 'components/Layout/SideBarLeft/SideBarProvider';
import { appSettings } from './appSettings.data';
import createActions from './createActions.data';
import directories from './directories.data';
import { iconId } from './iconId.data';
import Notifications from '../components/Notifications/Notifications';
import { raports } from './raports.data';

export const sideBarButtons: ISidebarOptionsItem[] = [
  { iconId: iconId.folder, maxWidth: '', options: directories, title: 'Довідники', RenderComponent: () => <></> },
  { iconId: iconId.assignmentOutlined, maxWidth: '', options: raports, title: 'Звіти', RenderComponent: () => <></> },
  { iconId: iconId.statistics, maxWidth: '', options: [], title: 'Статистика', RenderComponent: () => <></> },
  { iconId: iconId.plus, maxWidth: '', options: createActions, title: 'Створення', RenderComponent: () => <></> },
];
export const sideBarButtonsBottom: ISidebarOptionsItem[] = [
  { iconId: iconId.notifications, maxWidth: '480px', options: [], title: 'Сповіщення', RenderComponent: Notifications },
  { iconId: iconId.settings, maxWidth: '', options: appSettings, title: 'Налаштування', RenderComponent: () => <></> },
];

const sideBarLeftData = {
  sideBarButtons,
  sideBarButtonsBottom,
};

export default sideBarLeftData;

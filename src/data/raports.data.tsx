import { IAccordeonOptionProps } from 'components/SideBarContent/AccordeonList';
import OptionsList from 'components/SideBarContent/OptionsList';
import { iconId } from './iconId.data';

export const raports: IAccordeonOptionProps[] = [
  {
    title: 'Фінансові звіти',
    ChildrenComponent: OptionsList,
    options: [
      {
        title: 'Рух коштів',
        iconId: iconId.info,
        ModalChildren: () => null,
        modalChildrenProps: null,
        disabled: true,
      },
      {
        title: 'Проекти',
        iconId: iconId.info,
        ModalChildren: () => null,
        modalChildrenProps: null,
        disabled: true,
      },
      {
        title: 'Контрагенти',
        iconId: iconId.info,
        ModalChildren: () => null,
        modalChildrenProps: null,
        disabled: true,
      },
      { title: 'Мітки', iconId: iconId.info, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
      { title: 'Теги', iconId: iconId.info, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
    ],
  },
];

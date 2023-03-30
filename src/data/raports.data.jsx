import { iconId } from './iconId.data';

export const raports = [
  {
    title: 'Фінансові звіти',
    options: [
      { title: 'Рух коштів', iconId: iconId.info, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
      // { title: 'Доходи/Витрати', iconId: iconId.info, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
      // { title: 'По працівниках', iconId: iconId.info, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
      { title: 'Проекти', iconId: iconId.info, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
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

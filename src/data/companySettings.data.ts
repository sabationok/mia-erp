import DirUsers, { DirUsersProps } from '../components/CompanySettings/DirUsers';
import { usersDirColumns } from './usersDir.data';

import DirCustomRoles, { DirCustomRolesProps } from '../components/CompanySettings/DirCustomRoles';
import { getDirInTreeActionsCreator } from './directories.data';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { iconId } from '../img/sprite';
import FormCreateCustomRole from '../components/Forms/FormCreateCustomRole';
import DirMethods from '../components/CompanySettings/DirMethods';
import { Modals } from '../components/ModalProvider/Modals';
import { IDirectoryListItem } from '../components/SideBarContent/Directories';
import CompanyIntegrationsModal from '../components/CompanySettings/CompanyIntegrationsModal';
import { t } from '../lang';
import Forms from '../components/Forms';

const UsersProps: DirUsersProps = {
  title: 'Користувачі',
  getTableSettings: ({ modalService, service }) => ({
    tableTitles: usersDirColumns,
    actionsCreator: ctx => {
      return [
        { name: 'rejectUser', icon: 'clear' },
        {
          name: 'editUser',
          icon: 'edit',
          disabled: !ctx?.selectedRow?._id,
          onClick: () => {
            modalService.open({
              Modal: Modals.FormInviteUser,
              props: {
                title: 'Змінити дані користувача',
                onSubmit: formData => {
                  console.log('edit user formData', formData);
                },
              },
            });
          },
        },
        {
          name: 'inviteUser',
          icon: 'plus',
          type: 'onlyIconFilled',
          onClick: () => {
            modalService.open({
              Modal: Modals.FormInviteUser,
              props: {
                title: 'Запросити користувача',
                onSubmit: (formData, o) => {
                  service.createInvitation({ data: { email: formData.email }, onSuccess: d => {} });
                  console.log('invite user formData', formData);
                },
              },
            });
          },
        },
      ];
    },
  }),
};
const CustomRolesProps: DirCustomRolesProps = {
  title: 'Ролі',
  dirType: ApiDirType.DEFAULT,
  createParentTitle: 'Створити роль',
  fillHeight: true,
  actionsCreator: ({ service, modalService, findById }) => ({
    onCreateParent: _o => {
      const modal = modalService.open({
        ModalChildren: FormCreateCustomRole,
        modalChildrenProps: {
          title: 'Створити роль',
          onSubmit: data => {
            service
              .create({
                data,
                onSuccess: () => {
                  modal?.onClose();
                },
              })
              .then();
          },
        },
      });
    },
    onUpdate: (_id, dataForUpdate, _o) => {
      const modal = modalService.open({
        ModalChildren: FormCreateCustomRole,
        modalChildrenProps: {
          title: 'Редагувати роль',
          defaultState: dataForUpdate,
          customRole: dataForUpdate,
          onSubmit: data => {
            service?.edit &&
              service
                ?.edit({
                  data,
                  onSuccess: (data, meta) => {
                    console.log('onUpdate role', data, meta);

                    modal?.onClose();
                  },
                })
                .then();
          },
        },
      });
    },
    onChangeArchiveStatus: () => {},
    onChangeDisableStatus: () => {},
  }),
};
const integrations = {
  title: 'Інтеграції',
  disabled: false,
  ModalChildren: CompanyIntegrationsModal,
  iconId: iconId.bank,
  modalChildrenProps: {
    title: 'Інтеграції',
    fillHeight: true,
    fillWidth: true,
  },
};
const warehousingSettings = {
  title: t('Warehousing settings'),
  disabled: false,
  ModalChildren: Forms.WarehousingSettings,
  iconId: iconId.bank,
};

export const companySettings: IDirectoryListItem[] = [
  {
    title: UsersProps.title,
    iconId: iconId.persons,
    ModalChildren: DirUsers,
    modalChildrenProps: UsersProps,
    disabled: true,
  },

  {
    title: CustomRolesProps.title,
    iconId: iconId.lockPerson,
    ModalChildren: DirCustomRoles,
    modalChildrenProps: CustomRolesProps,
    disabled: true,
  },
  {
    title: 'Способи оплати',
    iconId: iconId.persons,
    ModalChildren: DirMethods,
    modalChildrenProps: {
      title: 'Способи оплати',
      dirType: ApiDirType.METHODS_PAYMENT,
      createParentTitle: 'Додати спосіб оплати',
      changeDisableStatus: true,
      availableLevels: 1,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod, {}),
    },
    disabled: true,
  },
  {
    title: 'Способи відвантаження',
    iconId: iconId.persons,
    ModalChildren: DirMethods,
    modalChildrenProps: {
      title: 'Способи відвантаження',
      dirType: ApiDirType.METHODS_SHIPMENT,
      createParentTitle: 'Додати спосіб відвантаження',
      changeDisableStatus: true,
      creatingParent: false,
      availableLevels: 1,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod, {
        createParentTitle: 'Створити спосіб відвантаження',
        updateItemTitle: 'Редагувати спосіб відвантаження',
      }),
    },
    disabled: true,
  },
  {
    title: "Способи зв'язку",
    iconId: iconId.persons,
    ModalChildren: DirMethods,
    modalChildrenProps: {
      title: "Способи зв'язку",
      dirType: ApiDirType.METHODS_COMMUNICATION,
      createParentTitle: 'Додати спосіб комунікації',
      availableLevels: 1,
      changeDisableStatus: true,
      creatingParent: false,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod, {
        createParentTitle: 'Додати спосіб комунікації',
        updateItemTitle: 'Редагувати спосіб комунікації',
      }),
    },
    disabled: true,
  },

  integrations,
  warehousingSettings,
];

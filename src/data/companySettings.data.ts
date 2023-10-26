import DirUsers, { DirUsersProps } from '../components/CompanySettings/DirUsers';
import { usersDirColumns } from './usersDir.data';

import DirCustomRoles, { DirCustomRolesProps } from '../components/CompanySettings/DirCustomRoles';
import { getDirInTreeActionsCreator } from './directories.data';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { iconId } from '../img/sprite';
import FormCreateCustomRole from '../components/Forms/FormCreateCustomRole';
import DirMethods from '../components/CompanySettings/DirMethods';
import { Modals } from '../components/Modals';
import { IDirectoryListItem } from '../components/SideBarContent/Directories';
import CompanyIntegrationsModal from '../components/CompanySettings/CompanyIntegrationsModal';
import { t } from '../lang';
import Forms from '../components/Forms';
import DirPaymentMethods from '../components/CompanySettings/DirPaymentMethods';
import DirShipmentsMethods from '../components/CompanySettings/DirShipmentsMethods';
import DirInvocingMethods from '../components/CompanySettings/DirInvocingMethods';

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
    title: t('Invoicing methods'),
    iconId: iconId.assignment,
    ModalChildren: DirInvocingMethods,
    modalChildrenProps: {
      title: t('Invoicing methods'),
      dirType: ApiDirType.METHODS_INVOICING,
      createParentTitle: t('Add invoicing method'),
      changeDisableStatus: true,
      availableLevels: 1,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod, {
        createParentTitle: t('Add invoicing method'),
        updateItemTitle: t('Update invoicing method'),
      }),
    },
    disabled: true,
  },
  {
    title: t('Payment methods'),
    iconId: iconId.persons,
    ModalChildren: DirPaymentMethods,
    modalChildrenProps: {
      title: t('Payment methods'),
      dirType: ApiDirType.METHODS_PAYMENT,
      createParentTitle: t('Add payment method'),
      changeDisableStatus: true,
      availableLevels: 1,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod, {
        createParentTitle: t('Add payment method'),
        updateItemTitle: t('Update payment method'),
      }),
    },
    disabled: true,
  },
  {
    title: t('Shipment methods'),
    iconId: iconId.persons,
    ModalChildren: DirShipmentsMethods,
    modalChildrenProps: {
      title: t('Shipment methods'),
      dirType: ApiDirType.METHODS_SHIPMENT,
      createParentTitle: t('Add shipment method'),
      changeDisableStatus: true,
      creatingParent: false,
      availableLevels: 1,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod, {
        createParentTitle: t('Add shipment method'),
        updateItemTitle: t('Update shipment method'),
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

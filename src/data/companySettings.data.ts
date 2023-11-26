import DirUsers, { DirUsersProps } from '../components/CompanySettings/DirUsers';
import { usersDirColumns } from './usersDir.data';
import DirCustomRoles, { DirCustomRolesProps } from '../components/CompanySettings/DirCustomRoles';
import { getDirInTreeActionsCreator } from './directories.data';
import { ApiDirType } from '../redux/APP_CONFIGS';
import FormCreateCustomRole from '../components/Forms/FormCreateCustomRole';
import { Modals } from '../components/Modals';
import { IDirectoryListItem } from '../components/SideBarContent/Directories';
import CompanyIntegrationsModal from '../components/CompanySettings/CompanyIntegrationsModal';
import { t } from '../lang';
import Forms from '../components/Forms';
import DirPaymentMethods from '../components/CompanySettings/DirPaymentMethods';
import DirDeliveryMethods from '../components/CompanySettings/DirDeliveryMethods';
import DirInvoicingMethods from '../components/CompanySettings/DirInvocingMethods';
import DirCommunicationMethods from '../components/CompanySettings/DirCommunicationMethods';

const UsersProps: DirUsersProps = {
  title: 'Користувачі',
  fillWidth: true,
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
  title: t('Integrations'),
  disabled: false,
  ModalChildren: CompanyIntegrationsModal,
  modalChildrenProps: {
    title: t('Integrations'),
    fillHeight: true,
    fillWidth: true,
  },
};
const warehousingSettings = {
  title: t('Warehousing settings'),
  disabled: false,
  ModalChildren: Forms.WarehousingSettings,
};

export const companySettings: IDirectoryListItem[] = [
  {
    title: UsersProps.title,
    ModalChildren: DirUsers,
    modalChildrenProps: UsersProps,
    disabled: true,
  },

  {
    title: CustomRolesProps.title,
    ModalChildren: DirCustomRoles,
    modalChildrenProps: CustomRolesProps,
    disabled: true,
  },

  integrations,

  {
    title: t('Invoicing methods'),
    ModalChildren: DirInvoicingMethods,
    modalChildrenProps: {
      title: t('Invoicing methods'),
      dirType: ApiDirType.METHODS_INVOICING,
      createParentTitle: t('Add invoicing method'),
      changeDisableStatus: true,
      creatingParent: true,
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
    title: t('Delivery methods'),
    ModalChildren: DirDeliveryMethods,
    modalChildrenProps: {
      title: t('Delivery methods'),
      dirType: ApiDirType.METHODS_SHIPMENT,
      createParentTitle: t('Add delivery method'),
      changeDisableStatus: true,
      creatingParent: true,
      editing: true,
      availableLevels: 1,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod, {
        createParentTitle: t('Add delivery method'),
        updateItemTitle: t('Update delivery method'),
      }),
    },
    disabled: true,
  },
  {
    title: t('Communication methods'),
    ModalChildren: DirCommunicationMethods,
    modalChildrenProps: {
      title: t('Communication methods'),
      dirType: ApiDirType.METHODS_COMMUNICATION,
      createParentTitle: t('Add communication method'),
      availableLevels: 1,
      changeDisableStatus: true,
      creatingParent: false,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod, {
        createParentTitle: t('Add communication method'),
        updateItemTitle: t('Update communication method'),
      }),
    },
    disabled: true,
  },

  warehousingSettings,
];

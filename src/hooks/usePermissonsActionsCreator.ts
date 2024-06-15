import { ITableAction, ITableListContext, TableActionsCreator } from '../components/TableList/tableTypes.types';
import { PermissionEntity } from '../types/permissions.types';
import { PermissionService } from './usePermissionsService.hook';
import { IModalProviderContext, useModalService } from '../Providers/ModalProvider/ModalProvider';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import { Modals } from '../components/Modals/Modals';
import { useAppServiceProvider } from './useAppServices.hook';
import { AppModuleName } from '../redux/reduxTypes.types';
import { TableActionsBuilder } from '../utils/tables';
import { t } from '../lang';
import { useAuthSelector } from '../redux/selectors.store';
import { CompanyQueryType, CompanyQueryTypeEnum } from '../types/companies.types';
import { ToastService } from '../services';

export type PermissionsActionsCreator = TableActionsCreator<PermissionEntity>;

export type PermissionsActionsType =
  | 'enterCompany'
  | 'editCompany'
  | 'deleteCompany'
  | 'leaveCompany'
  | 'rejectPermission'
  | 'acceptPermission'
  | 'createCompany'
  | 'createPermission'
  | 'deletePermission'
  | 'editPermission';
export const isMyCompany = ({ owner, user }: PermissionEntity) => {
  return user?._id === owner?._id;
};

export interface PermissionsTablesActionProps {
  ctx: ITableListContext<PermissionEntity>;
  navigate: NavigateFunction;
  service: PermissionService;
  companyType: CompanyQueryTypeEnum;
  modalService: IModalProviderContext;
}

export type IPermissionsTableAction = ITableAction<PermissionsActionsType>;
export type PermissionsActionCreator = (options: PermissionsTablesActionProps) => IPermissionsTableAction;
const createEnterCompanyAction = ({
  ctx,
  navigate,
  service,
}: PermissionsTablesActionProps): IPermissionsTableAction => ({
  name: 'enterCompany',
  title: 'Перейти',
  icon: 'logIn',
  disabled: !ctx.selectedRow?._id,
  iconSize: '100%',
  type: 'onlyIcon',
  onClick: () => {
    console.log(ctx.selectedRow);

    if (ctx.selectedRow?._id) {
      service.logIn({
        data: { _id: ctx.selectedRow?._id },
        onSuccess: data => {
          if (!data._id) return console.log('data', data);
          ToastService.success(`Welcome: "${data.company?.name?.first || data.company?.label?.base}"`);
          navigate(`/app/${data._id}`);
        },
        onError: error => {
          console.log(error);
        },
      });
    }
  },
});
const createEditCompanyAction = ({
  ctx,
  navigate,
  service,
  companyType,
  modalService,
}: PermissionsTablesActionProps): IPermissionsTableAction => ({
  name: 'editCompany',
  title: 'Редагувати',
  icon: 'edit',
  disabled: ctx.selectedRow?._id && companyType ? !['own'].includes(companyType) : true,
  iconSize: '100%',
  type: 'onlyIcon',
  onClick: () => {
    modalService.openModal({
      Modal: Modals.FormCreateCompany,
      modalChildrenProps: {
        fillHeight: true,
        title: 'Редагувати компанію',
      },
    });
  },
});
const createDeleteCompanyAction = ({ companyType, ctx }: PermissionsTablesActionProps): IPermissionsTableAction => ({
  name: 'deleteCompany',
  title: 'Видалити',
  icon: 'delete',
  iconSize: '100%',
  disabled: ctx.selectedRow?._id && companyType ? ['own'].includes(companyType) : false,
  type: 'onlyIcon',
  onClick: () => {
    console.log('selPermission', ctx.selectedRow?._id);
  },
});

const createLogOutCompanyAction = ({ companyType, ctx }: PermissionsTablesActionProps): IPermissionsTableAction => ({
  name: 'leaveCompany',
  title: 'Покинути',
  icon: 'logOut',
  iconSize: '100%',
  disabled: ctx.selectedRow?._id && companyType ? !['invited'].includes(companyType) : true,
  type: 'onlyIcon',
  onClick: () => {
    console.log('leaveCompany', ctx.selectedRow?._id);
  },
});
const createRejectPermission = ({ ctx, companyType }: PermissionsTablesActionProps): IPermissionsTableAction => ({
  name: 'rejectPermission',
  title: 'Відхилити',
  icon: 'clear',
  iconSize: '100%',
  type: 'onlyIconFilled',
  disabled: ctx.selectedRow?._id && companyType ? !['invites'].includes(companyType) : true,
  onClick: () => {
    console.log('rejectPermission', ctx.selectedRow);
  },
});
const createAcceptPermissionAction = ({ ctx, companyType }: PermissionsTablesActionProps): IPermissionsTableAction => ({
  name: 'acceptPermission',
  title: 'Прийняти',
  icon: 'done',
  iconSize: '100%',
  type: 'onlyIconFilled',
  disabled: ctx.selectedRow?._id && companyType ? !['invites'].includes(companyType) : true,
  onClick: () => {
    console.log('acceptPermission', ctx.selectedRow);
  },
});
const createAddNewCompanyAction = ({ modalService }: PermissionsTablesActionProps): IPermissionsTableAction => ({
  name: 'createCompany',
  title: 'Створити компанію',
  icon: 'plus',
  iconSize: '100%',
  type: 'onlyIconFilled',
  onClick: () => {
    modalService.openModal({
      Modal: Modals.FormCreateCompany,
      props: {
        fillHeight: true,
        title: 'Створити компанію',
      },
    });
  },
});
const builder = new TableActionsBuilder<
  PermissionService,
  PermissionEntity,
  { query: { type: CompanyQueryType }; userId?: string }
>();
builder.add('refresh', ({ ctx, service, extra }) => {
  return {
    name: 'refresh',
    title: t('Refresh'),
    icon: 'refresh',
    iconSize: '100%',
    type: 'onlyIcon',
    disabled: !extra?.userId,
    onClick: () => {
      if (extra?.userId) {
        service.getAllByUserId({
          onLoading: ctx.onRefresh,
          data: { userId: extra?.userId, query: extra?.query },
        });
      }
    },
  };
});

const usePermissionsActionsCreator = (companyType: CompanyQueryTypeEnum): PermissionsActionsCreator => {
  const service = useAppServiceProvider()[AppModuleName.permissions];
  const modalService = useModalService();
  const userId = useAuthSelector()?.user?._id;

  const navigate = useNavigate();

  return (ctx): ITableAction<PermissionsActionsType>[] => {
    // const builder = new TableActionsBuilder({
    //   service,
    //   modalService,
    // })
    //   .add('d', () => {
    //     return { separator: true };
    //   })
    //   .add('a', () => {
    //     return { separator: true };
    //   })
    //   .add('g', () => {
    //     return { separator: true };
    //   })
    //   .add('f', () => {
    //     return { separator: true };
    //   });
    // console.log({ builder });

    const controls = {
      ctx,
      navigate,
      service,
      modalService,
      companyType,
    };
    const build = builder.activate({
      navigate,
      service,
      modalService,
      extra: {
        userId,
        query: { type: companyType },
      },
    });
    return [
      createEnterCompanyAction(controls),
      createLogOutCompanyAction(controls),
      { separator: true },
      ...build(ctx),
      { separator: true },
      createEditCompanyAction(controls),
      createDeleteCompanyAction(controls),
      { separator: true },
      createRejectPermission(controls),
      createAcceptPermissionAction(controls),
      createAddNewCompanyAction(controls),
    ];
  };
};

export default usePermissionsActionsCreator;

import { ITableAction, ITableListContext } from '../components/TableList/tableTypes.types';
import { IModalProviderContext, useModalProvider } from '../components/ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { WarehousesService } from './useWarehousesService.hook';
import { IWarehouse, IWarehouseDto, IWarehouseReqData } from '../redux/warehouses/warehouses.types';
import { Modals } from '../components/Modals';
import { IWarehouseFormData } from '../components/Forms/warehousing/FormCreateWarehouse';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import { ToastService } from '../services';
import { checks } from '../utils';
import { getIdRef } from '../utils/dataTransform';

export type WarehouseActionCreatorOptions = {
  ctx: ITableListContext<IWarehouse>;
  service: WarehousesService;
  modalService: IModalProviderContext;
  navigate: NavigateFunction;
};
const createWarehouseReqData = (
  input: IWarehouseFormData,
  _id?: string,
  omit?: (keyof IWarehouseFormData)[]
): IWarehouseReqData => {
  const dto = {} as IWarehouseDto;

  const keys = Object.keys(input).filter(
    k => !omit?.includes(k as keyof IWarehouseFormData)
  ) as (keyof IWarehouseFormData)[];

  keys.map(k => {
    const v = input[k] as IWarehouseFormData[typeof k];

    if (!v) {
      return '';
    }
    if (checks.isStr(v)) {
      dto[k] = v as never;

      return k;
    }
    if (!checks.isEmptyObj(v)) {
      if (checks.hasUUID(v)) {
        dto[k] = getIdRef(v) as never;
        return '';
      }
      console.log('!checks.isEmptyObj(v)', k, !checks.isEmptyObj(v));
      dto[k] = v as never;
      return k;
    }
    if (v) {
      dto[k] = v as never;
      return '';
    }

    return k;
  });

  if (_id) {
    return {
      data: dto,
      _id,
    };
  }
  return { data: dto };
};

export type WarehouseActionGenerator = (options: WarehouseActionCreatorOptions) => ITableAction;
export type WarehouseTableActionsCreator = (ctx: ITableListContext) => ITableAction[];

const createNewWarehouseAction: WarehouseActionGenerator = ({ service, modalService, ctx }) => {
  return {
    icon: 'plus',
    type: 'onlyIconFilled',
    onClick: () => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateWarehouse,
        props: {
          title: 'Створити склад',
          onSubmit: (data, o) => {
            service.create({
              data: createWarehouseReqData(data, ctx?.selectedRow?._id, ['manager']),
              onLoading: ctx.onRefresh,
              onSuccess: () => {
                if (o?.isDefault) {
                  ToastService.info('Warehouse wil be set as default');
                }

                if (o?.closeAfterSave && modal?.onClose) {
                  modal?.onClose();
                }
              },
            });
          },
        },
      });
    },
  };
};
const editWarehouseAction: WarehouseActionGenerator = ({ service, modalService, ctx }) => {
  return {
    icon: 'edit',
    onClick: () => {
      const m = modalService.handleOpenModal({
        Modal: Modals.FormCreateWarehouse,
        props: {
          update: ctx.selectedRow?._id,
          title: 'Оновити дані складу',
          onSubmit: (data, o) => {
            service.create({
              data: createWarehouseReqData(data, ctx?.selectedRow?._id, ['manager']),
              onLoading: ctx.onRefresh,
              onSuccess: () => {
                if (o?.closeAfterSave && m?.onClose) {
                  m?.onClose();
                }
              },
            });
          },
        },
      });
    },
  };
};
const refreshWarehousesDataAction: WarehouseActionGenerator = ({ service, modalService, ctx }) => {
  return {
    icon: 'refresh',
    onClick: () => {
      service.getAll({ data: { refresh: true } }).then();
    },
  };
};

const actionCreators: WarehouseActionGenerator[] = [
  refreshWarehousesDataAction,
  () => ({ separator: true }),
  ({ ctx, navigate }) => ({
    icon: 'openInNew',
    disabled: !ctx.selectedRow?._id,
    onClick: () => {
      ctx.selectedRow?._id && navigate(ctx.selectedRow?._id);
    },
  }),
  editWarehouseAction,
  () => ({ icon: 'delete' }),
  () => ({ separator: true }),
  createNewWarehouseAction,
];

export type UseWarehousesActionsCreatorOptions = { service: WarehousesService };
const useWarehousesActionsCreator = (): WarehouseTableActionsCreator => {
  const modalService = useModalProvider();
  const service = useAppServiceProvider()[ServiceName.warehouses];
  const navigate = useNavigate();

  return (ctx: ITableListContext<IWarehouse>) => actionCreators.map(a => a({ modalService, service, ctx, navigate }));
};

export default useWarehousesActionsCreator;

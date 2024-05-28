import { ITableAction, ITableListContext } from '../components/TableList/tableTypes.types';
import { IModalProviderContext, useModalProvider } from '../components/ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { WarehousesService } from './useWarehousesService.hook';
import { WarehouseEntity, IWarehouseDto, IWarehouseReqData } from '../types/warehousing/warehouses.types';
import { Modals } from '../components/Modals/Modals';
import { IWarehouseFormData } from '../components/Forms/warehousing/FormCreateWarehouse';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import { ToastService } from '../services';
import { checks } from '../utils';
import { getIdRef } from '../utils/data-transform';
import _ from 'lodash';

export type WarehouseActionCreatorOptions = {
  ctx: ITableListContext<WarehouseEntity>;
  service: WarehousesService;
  modalService: IModalProviderContext;
  navigate: NavigateFunction;
};
const createWarehouseReqData = (input: IWarehouseFormData, _id?: string): IWarehouseReqData => {
  let dto = {} as IWarehouseDto;

  (Object.keys(input) as (keyof IWarehouseFormData)[]).forEach(k => {
    const v = input[k] as IWarehouseFormData[typeof k];

    if (!v) {
      return;
    }
    if (checks.isStr(v)) {
      dto = { ...dto, [k]: v };
      return;
    }
    if (!checks.isEmptyObj(v)) {
      if (checks.hasUUID(v)) {
        dto = { ...dto, [k]: getIdRef(v) };
        return;
      }
      console.log('!checks.isEmptyObj(v)', k, !checks.isEmptyObj(v));
      dto = { ...dto, [k]: v };
      return k;
    }
    if (v) {
      dto = { ...dto, [k]: v };
      return;
    }

    return k;
  });

  if (_id) {
    return {
      _id,
      data: dto,
      params: {
        setAsDefault: input?.asDefault,
      },
    };
  }
  return {
    data: dto,
    params: {
      setAsDefault: input?.asDefault,
    },
  };
};

export type WarehouseActionGenerator = (options: WarehouseActionCreatorOptions) => ITableAction;
export type WarehouseTableActionsCreator = (ctx: ITableListContext) => ITableAction[];

const createNewWarehouseAction: WarehouseActionGenerator = ({ service, modalService, ctx }) => {
  return {
    icon: 'plus',
    type: 'onlyIconFilled',
    onClick: () => {
      const modal = modalService.openModal({
        Modal: Modals.FormCreateWarehouse,
        props: {
          title: 'Створити склад',
          onSubmit: (data, o) => {
            service.create({
              data: createWarehouseReqData(_.omit(data, ['manager']), ctx?.selectedRow?._id),
              onLoading: ctx.onRefresh,
              onSuccess: () => {
                if (data?.asDefault) {
                  ToastService.info('Warehouse wil be set as default');
                }

                if (o?.close && modal?.onClose) {
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
      const m = modalService.openModal({
        Modal: Modals.FormCreateWarehouse,
        props: {
          update: ctx.selectedRow?._id,
          title: 'Оновити дані складу',
          onSubmit: (data, o) => {
            service.create({
              data: createWarehouseReqData(_.omit(data, ['manager']), ctx?.selectedRow?._id),
              onLoading: ctx.onRefresh,
              onSuccess: () => {
                if (o?.close && m?.onClose) {
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
const refreshWarehousesDataAction: WarehouseActionGenerator = arg => {
  return {
    icon: 'refresh',
    onClick: () => {
      arg.service.getAll({ data: { refresh: true } }).then();
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

  return (ctx: ITableListContext<WarehouseEntity>) =>
    actionCreators.map(a => a({ modalService, service, ctx, navigate }));
};

export default useWarehousesActionsCreator;

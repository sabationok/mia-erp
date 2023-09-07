import { ITableAction, ITableListContext } from '../components/TableList/tableTypes.types';
import { IModalProviderContext, useModalProvider } from '../components/ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { WarehousesService } from './useWarehousesService.hook';
import { IWarehouse } from '../redux/warehouses/warehouses.types';
import { Modals } from '../components/ModalProvider/Modals';
import { ApiDirType } from '../redux/APP_CONFIGS';

export type WarehouseActionCreatorOptions = {
  ctx: ITableListContext<IWarehouse>;
  service: WarehousesService;
  modalService: IModalProviderContext;
};

export type WarehouseActionGenerator = (options: WarehouseActionCreatorOptions) => ITableAction;
export type WarehouseTableActionsCreator = (ctx: ITableListContext) => ITableAction[];

const createNewWarehouseAction: WarehouseActionGenerator = ({ service, modalService, ctx }) => {
  return {
    icon: 'plus',
    onClick: () => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateWarehouse,
        props: {
          title: 'Створити склад',
          dirType: ApiDirType.WAREHOUSES,
          onSubmit: (data, o) => {
            service.create({
              data: { data },
              onLoading: ctx.onRefresh,
              onSuccess: () => {
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
      modalService.handleOpenModal({
        Modal: Modals.FormCreateWarehouse,
        props: {
          edit: true,
          title: 'Оновити дані складу',
          dirType: ApiDirType.WAREHOUSES,
          onSubmit: (d, o) => {},
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

const actionGenerators = [createNewWarehouseAction, editWarehouseAction, refreshWarehousesDataAction];

export type UseWarehousesActionsCreatorOptions = { service: WarehousesService };
const useWarehousesActionsCreator = (): WarehouseTableActionsCreator => {
  const modalService = useModalProvider();
  const service: WarehousesService = useAppServiceProvider()[ServiceName.warehouses];

  return (ctx: ITableListContext<IWarehouse>) => actionGenerators.map(a => a({ modalService, service, ctx }));
};

export default useWarehousesActionsCreator;

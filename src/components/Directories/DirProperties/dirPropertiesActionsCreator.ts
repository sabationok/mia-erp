import { DirInTreeActionsCreatorType } from '../dir.types';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { IProperty, IPropertyDto } from '../../../redux/products/properties/properties.types';
import { ProductsService } from '../../../hooks/useProductsService.hook';
import { Modals } from '../../Modals';
import { t } from '../../../lang';
import { toast } from 'react-toastify';
import { productsFilterOptions } from '../../../data/modalFilterOptions.data';
import { PropertiesLevelType } from './DirProperties';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import { IModalProviderContext } from '../../ModalProvider/ModalProvider';
import { ITableListContext } from '../../TableList/tableTypes.types';

export const dirPropertiesActionsCreator: DirInTreeActionsCreatorType<
  ApiDirType.PROPERTIES_PRODUCTS,
  IProperty,
  ProductsService,
  IPropertyDto,
  PropertiesLevelType & { onSuccess?: (data: IProperty[]) => void }
> = ({ modalService, service, type }) => {
  return {
    onCreateParent: options => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createPropertiesGroup'),
          type,
          create: true,
          isGroup: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data, params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);
                  o?.close && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onCreateChild: (_, parent, options) => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createProperty'),
          type,
          defaultState: { parent },
          create: true,
          isProperty: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data: { ...data, parent }, params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);
                  o?.close && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onCreateValue: (_, parent, options) => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createPropertyValue'),
          type,
          defaultState: { parent },
          create: true,
          isValue: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data: { ...data, parent }, params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);

                  o?.close && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onUpdate: (_id, defaultState, options) => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('update'),
          type,
          edit: true,
          ...options,
          defaultState,
          filterOptions: options?.isGroup ? productsFilterOptions : undefined,
          onSubmit: (data, o) => {
            service
              ?.updatePropertyById({
                data: { _id, data, params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);

                  o?.close && modal?.onClose();
                  toast.success(`Updated: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onChangeDisableStatus: (_id, status, o) => {
      console.log(_id, status);
      service
        .changeDisabledStatus({
          data: { _id, data: { isSelectable: status }, params: { createTreeData: true } },
        })
        .then();
    },
    // onChangeArchiveStatus: (_id, status) => {
    //   service
    //     .changeArchiveStatus({
    //       data: { _id, data: { isArchived: status } },
    //       onSuccess: (rd, meta) => {
    //         console.log(rd);
    //         // toast.success(`${dataForUpdate.label} => ${status ? 'archived' : 'unarchived'}`);
    //       },
    //     })
    //     .then();
    // },
  };
};

export interface DirInTreeActionsBuilderControls<Service = any, Extra = any> {
  // ctx: ITableListContext<TData>;
  navigate?: NavigateFunction;
  service: Service;
  modalService: IModalProviderContext;
  extra?: Extra;
}
export type DirInTreeBaseActionType = {
  name: string;
};
export type DirInTreeActionCreator<Service = any, TData = any, Extra = any, Action = any> = (
  params: DirInTreeActionsBuilderControls<Service, Extra> & { ctx: ITableListContext<TData> }
) => Action;
export class DirInTreeActionsBuilder<Service = any, TData = any, Extra = any, Name extends string = any> {
  private map: Map<Name, DirInTreeActionCreator<Service, TData, Extra, Name>> = new Map([]);

  // constructor(private readonly controls: TableActionsBuilderControls<Service, TData, Extra>) {}
  add(name: Name, creator: DirInTreeActionCreator<Service, TData, Extra, Name>) {
    this.map.set(name, creator);
    return this;
  }
  activate(controls: DirInTreeActionsBuilderControls<Service, Extra>) {
    return (ctx: ITableListContext<TData>) => this.build(ctx, controls);
  }
  private build(ctx: ITableListContext<TData>, controls: DirInTreeActionsBuilderControls<Service, Extra>) {
    return Array.from(this.map.values()).map(creator => creator({ ctx, ...controls }));
  }
}

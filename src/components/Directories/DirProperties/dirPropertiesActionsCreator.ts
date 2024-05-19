import { DirInTreeActionsCreatorType } from '../../../types/dir.types';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { IProperty, IPropertyDto, IPropertyValue, IVariationTemplate } from '../../../types/offers/properties.types';
import { ProductsService } from '../../../hooks/useProductsService.hook';
import { Modals } from '../../Modals/Modals';
import { t } from '../../../lang';
import { productsFilterOptions } from '../../../data/modalFilterOptions.data';
import { PropertiesLevelType } from './DirProperties';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import { IModalProviderContext } from '../../ModalProvider/ModalProvider';
import { OfferTypeEnum } from '../../../types/offers/offers.types';
import { toReqData } from '../../../utils';
import { ToastService } from '../../../services';

export const dirPropertiesActionsCreator: DirInTreeActionsCreatorType<
  ApiDirType.PROPERTIES_PRODUCTS,
  IProperty,
  ProductsService,
  IPropertyDto,
  PropertiesLevelType & { onSuccess?: (data: IProperty[]) => void }
> = ({ modalService, service, type }) => {
  return {
    onCreateParent: options => {
      const modal = modalService.openModal({
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
                  ToastService.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onCreateChild: (_, parent, options) => {
      const modal = modalService.openModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createProperty'),
          type,
          defaultState: { parent } as never,
          create: true,
          isProperty: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data: toReqData({ ...data, parent }), params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);
                  o?.close && modal?.onClose();
                  ToastService.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onCreateValue: (_, parent, options) => {
      const modal = modalService.open({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createPropertyValue'),
          type,
          defaultState: { parent } as never,
          create: true,
          isValue: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data: toReqData({ ...data, parent }), params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);

                  o?.close && modal?.onClose();
                  ToastService.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onUpdate: (_id, defaultState, options) => {
      const modal = modalService.openModal({
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
                  ToastService.success(`Updated: ${data.label}`);
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
    //         // ToastService.success(`${dataForUpdate.label} => ${status ? 'archived' : 'unarchived'}`);
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

export enum DirPropertiesActionsEnum {
  onUpdate = 'onUpdate',
  onCreateValue = 'onCreateValue',
  onCreateChild = 'onCreateChild',
  onChangeSelectableStatus = 'onChangeSelectableStatus',
}

export type DirPropertiesActionName = keyof typeof DirPropertiesActionsEnum;

enum DirPropertyType {
  group = 'group',
  prop = 'prop',
  value = 'value',
}

type DirPropertyItemByType = {
  [DirPropertyType.group]: IVariationTemplate;
  [DirPropertyType.prop]: IProperty;
  [DirPropertyType.value]: IPropertyValue;
};
type DirPropertyParentItemByType = {
  [DirPropertyType.group]: null;
  [DirPropertyType.prop]: IVariationTemplate;
  [DirPropertyType.value]: IProperty;
};

type DirPropertiesActionType<Name extends string = any> = {
  name: Name;
  label: string;
  for: DirPropertyType[];
  onPress: <PropType extends DirPropertyType = any>(info: {
    item: DirPropertyItemByType[PropType];
    type: OfferTypeEnum;
    propType?: PropType;
    parent?: DirPropertyParentItemByType[PropType];
    index: number;
  }) => void;
};
export type DirInTreeBaseActionType<Name extends DirInTreeActionCreatorNameType = any> = {
  name: Name;
  onPress: (...args: any[]) => void;
};
export type DirInTreeActionCreatorNameType = string | number | symbol;

export type DirInTreeActionsMap<Name extends DirInTreeActionCreatorNameType = any, ActionPattern = any> = Pick<
  Map<Name, ActionPattern>,
  'get'
>;

export type DirInTreeActionCreator<
  Name extends DirInTreeActionCreatorNameType = any,
  Service = any,
  ActionPattern extends DirInTreeBaseActionType<Name> = any,
  Extra = any
> = (params: DirInTreeActionsBuilderControls<Service, Extra> & { name: Name }) => ActionPattern;

// <Name extends DirInTreeActionCreatorNameType = any>
export class DirInTreeActionsBuilder<
  Name extends string = any,
  ActionPattern extends DirInTreeBaseActionType<Name> = any,
  Service = any,
  Extra = any
> {
  private map: Map<Name, DirInTreeActionCreator<Name, Service, ActionPattern, Extra>> = new Map([]);

  // constructor(private readonly controls: TableActionsBuilderControls<Service, Extra>) {}
  add(name: Name, creator: DirInTreeActionCreator<Name, Service, ActionPattern, Extra>) {
    this.map.set(name, creator);
    return this;
  }
  private get arrFromMapEntries() {
    return Array.from(this.map.entries());
  }

  buildMap(
    controls: DirInTreeActionsBuilderControls<Service, Extra>
  ): DirInTreeActionsMap<Name, ActionPattern & { name: Name }> {
    return new Map(
      this.arrFromMapEntries.map(([name, creator]) => [name, { ...creator({ ...controls, name }), name }])
    );
  }

  buildArray(controls: DirInTreeActionsBuilderControls<Service, Extra>) {
    return this.arrFromMapEntries.map(([name, creator]) => [name, { ...creator({ ...controls, name }), name }]);
  }

  buildNamedMap(
    controls: DirInTreeActionsBuilderControls<Service, Extra>
  ): Record<Name, ActionPattern & { name: Name }> {
    return Object.assign(
      {},
      ...this.arrFromMapEntries.map(([name, creator]) => ({
        [name as Name]: { ...creator({ ...controls, name }), name },
      }))
    );
  }

  buildNamedCallbacksMap(
    controls: DirInTreeActionsBuilderControls<Service, Extra>
  ): Record<Name, ActionPattern['onPress']> {
    return Object.assign(
      {},
      ...this.arrFromMapEntries.map(([name, creator]) => ({
        [name as Name]: creator({ ...controls, name }).onPress,
      }))
    );
  }
}

export const DirPropertiesActionsBuilder = new DirInTreeActionsBuilder<
  DirPropertiesActionName,
  DirPropertiesActionType,
  ProductsService,
  { offerType: OfferTypeEnum }
>()
  .add('onCreateValue', ({ name, navigate, service }) => {
    return {
      name,
      for: [DirPropertyType.prop, DirPropertyType.group],
      label: t(name),
      onPress: ({ item, parent }) => {
        if ('parent' in item) {
        }
      },
    };
  })
  .add('onUpdate', ({ name }) => {
    return {
      name,
      for: [DirPropertyType.prop, DirPropertyType.group],
      label: t(name),
      onPress: info => {},
    };
  });

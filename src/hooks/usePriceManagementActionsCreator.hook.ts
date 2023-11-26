import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { TableActionCreator } from '../components/TableList/tableTypes.types';
import { IPriceList, IPriceListItem, IPriceListItemReqData, PriceListTypeEnum } from '../types/priceManagement.types';
import FormCreatePriceList from '../components/Forms/pricing/FormCreatePriceList';
import { omit } from 'lodash';
import { getIdRef } from '../utils/data-transform';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { useNavigate } from 'react-router-dom';
import { enumToFilterOptions } from '../utils/fabrics';
import { ToastService } from '../services';

export type PriceManagementActionsCreator = TableActionCreator<IPriceList>;

export const PriceManagementItemTypeFilterOptions = enumToFilterOptions(PriceListTypeEnum);

export const createPriceDataForReq = (input: Required<IPriceListItem>): IPriceListItemReqData => {
  return {
    ...getIdRef(input),
    data: {
      ...omit(input, ['createdAt', 'updatedAt', 'deletedAt', '_id']),
      product: getIdRef(input?.product),
    },
  };
};
const usePriceManagementActionsCreator = (): PriceManagementActionsCreator => {
  const modals = useModalProvider();
  const service = useAppServiceProvider()[ServiceName.priceManagement];

  const navigate = useNavigate();

  return useCallback(
    ctx => {
      const selected = ctx.selectedRow;
      return [
        {
          name: 'openPriceList',
          title: 'Відкрити',
          icon: 'openInNew',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: !selected?._id,
          onClick: () => {
            selected?._id && navigate(`${selected?._id}`);
          },
        },

        {
          name: 'editPriceList',
          title: 'Редагувати',
          icon: 'edit',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: true,
        },
        {
          name: 'copyPriceList',
          title: 'Копіювати',
          icon: 'copy',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: true,
        },
        {
          name: 'archivePriceList',
          title: 'Архів',
          icon: 'archive',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: true,
        },
        { separator: true },
        {
          name: 'createPriceList',
          title: 'Новий',
          icon: 'plus',
          iconSize: '90%',
          type: 'onlyIconFilled',
          disabled: false,
          onClick: () => {
            const modal = modals.handleOpenModal({
              ModalChildren: FormCreatePriceList,
              modalChildrenProps: {
                filterOptions: PriceManagementItemTypeFilterOptions,
                defaultData: { type: 'purchases' },
                onSubmit: (data, o) => {
                  service.createList({
                    data,
                    onSuccess: data => {
                      o?.onSuccess && o?.onSuccess(data);
                      o?.close && modal?.onClose();
                      ToastService.success(`Created price list: ${data.label}`);
                    },
                  });
                },
              },
            });
          },
        },
      ];
    },
    [modals, navigate, service]
  );
};

export default usePriceManagementActionsCreator;

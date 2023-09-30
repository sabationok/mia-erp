import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { TableActionCreator } from '../components/TableList/tableTypes.types';
import {
  IPriceList,
  IPriceListItem,
  IPriceListItemReqData,
  PriceListTypeEnum,
} from '../redux/priceManagement/priceManagement.types';
import FormCreatePriceList from '../components/Forms/FormCreatePriceList';
import { toast } from 'react-toastify';
import { omit } from 'lodash';
import { ExtractId } from '../utils/dataTransform';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { useNavigate } from 'react-router-dom';
import { enumToFilterOptions } from '../utils/fabrics';

export type PriceManagementActionsCreator = TableActionCreator<IPriceList>;

export const PriceManagementItemTypeFilterOptions = enumToFilterOptions(PriceListTypeEnum);

export const createPriceDataForReq = (input: Required<IPriceListItem>): IPriceListItemReqData => {
  return {
    ...ExtractId(input),
    data: {
      ...omit(input, ['createdAt', 'updatedAt', 'deletedAt', '_id']),
      product: ExtractId(input?.product),
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
          onClick: async () => {
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
                      o?.closeAfterSave && modal?.onClose();
                      toast.success(`Created price list: ${data.label}`);
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

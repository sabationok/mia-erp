import { ICustomer } from '../../../../types/customers.types';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import FormCreateCustomer from '../../crm/FormCreateCustomer';
import { t } from '../../../../lang';
import { toReqData } from '../../../../utils/data-transform';
import * as React from 'react';

const CreateCustomerButtonIcon = ({
  onSuccess,
  isReceiver,
}: {
  onSuccess?: (customer: ICustomer) => void;
  isReceiver?: boolean;
}) => {
  const customerS = useAppServiceProvider()[ServiceName.customers];
  const modalS = useModalService();

  return (
    <ButtonIcon
      variant={'onlyIcon'}
      icon={'plus'}
      iconSize={'100%'}
      size={'30px'}
      onClick={() => {
        const m = modalS.open({
          ModalChildren: FormCreateCustomer,
          modalChildrenProps: {
            title: isReceiver ? t('Create receiver') : undefined,
            onSubmit: d => {
              customerS.create({
                data: toReqData(d) as never,
                onSuccess: d => {
                  onSuccess && onSuccess(d);

                  m?.onClose();
                },
              });
            },
          },
        });
      }}
    ></ButtonIcon>
  );
};
export default CreateCustomerButtonIcon;

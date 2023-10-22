import { ICustomer } from '../../../../redux/customers/customers.types';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import FormCreateCustomer from '../../FormCreateCustomer';
import { t } from '../../../../lang';
import { createDataForReq } from '../../../../utils/dataTransform';
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
        modalS.open({
          ModalChildren: FormCreateCustomer,
          modalChildrenProps: {
            title: isReceiver ? t('Create receiver') : undefined,
            onSubmit: d => {
              customerS.create({
                data: createDataForReq(d),
                onSuccess: onSuccess,
              });
            },
          },
        });
      }}
    ></ButtonIcon>
  );
};
export default CreateCustomerButtonIcon;

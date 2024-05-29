import { useModalProvider } from '../../Providers/ModalProvider/ModalProvider';
import useDirServiceHook from '../useDirService.hook';
import { FormCreateContractorProps } from '../../components/Forms/Directories/FormCreateCounterparty';
import { Modals } from '../../components/Modals/Modals';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export const useModalFormCreateCounterparty = () => {
  const modalS = useModalProvider();
  const service = useDirServiceHook();
  const open = (props?: FormCreateContractorProps) => {
    const modal = modalS.openModal({
      Modal: Modals.FormCreateContractor,
      props: {
        title: 'Create:',
        ...props,
        isFilterByTypeOn: true,
        onSubmit: (data, o) => {
          service.create({
            data: { data, dirType: ApiDirType.CONTRACTORS },
            onSuccess: () => {
              modal?.onClose && modal?.onClose();
            },
          });
        },
      },
    });
  };

  return open;
};
export default useModalFormCreateCounterparty;

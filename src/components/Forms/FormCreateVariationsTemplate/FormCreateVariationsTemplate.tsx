import ModalForm from '../../ModalForm';
import FlexBox from '../../atoms/FlexBox';
import { DirectoriesFormProps } from '../../Directories/dir.types';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import translate from '../../../lang';
import { useForm } from 'react-hook-form';
import FormVariationsTemplateConfigs from './FormVariationsTemplateConfigs';

export interface FormCreateVariationsTemplateProps extends DirectoriesFormProps<any, any, any, ApiDirType.VARIATIONS> {}

const FormCreateVariationsTemplate: React.FC<FormCreateVariationsTemplateProps> = ({
  onSubmit,
  data,
  defaultState,
  create,
  edit,
}) => {
  const { register, handleSubmit } = useForm();

  const onValid = (data: any) => {
    onSubmit && onSubmit(data);
  };

  return (
    <ModalForm fillHeight title={'Create variations template'} onSubmit={handleSubmit(onValid)}>
      {create ? (
        <FlexBox fillWidth padding={'4px 8px'}>
          <InputLabel label={translate('label')} required>
            <InputText placeholder={translate('insertLabel')} {...register('label', { required: true })} required />
          </InputLabel>
        </FlexBox>
      ) : (
        <FormVariationsTemplateConfigs />
      )}
      <FormVariationsTemplateConfigs />
    </ModalForm>
  );
};
export default FormCreateVariationsTemplate;

import TitleBase from 'components/atoms/TitleBase';
import ModalForm, { ModalFormProps } from 'components/ModalForm';
import { ICustomRole } from 'redux/customRoles/customRoles.types';
import { useState } from 'react';
import styled from 'styled-components';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import FlexBox from '../../atoms/FlexBox';

export interface FormCreateCustomRoleProps extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  edit?: boolean;
  customRole?: ICustomRole;
  getCustomeRoleByName?: (name: string) => string | undefined;
  onSubmit: (_id: string, data: Partial<ICustomRole>) => void;
}

const FormCreateCustomRole: React.FC<FormCreateCustomRoleProps> = ({
  onSubmit,
  getCustomeRoleByName,
  customRole,
  edit,
  _id,
  ...props
}) => {
  const [formData, setFormData] = useState<Partial<ICustomRole>>(customRole ? customRole : {});

  function onSubmitWrapper() {
    onSubmit && _id && onSubmit(_id, formData);
  }

  function onChange(ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value, name } = ev.target;
    getCustomeRoleByName && getCustomeRoleByName(value);

    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <StModalForm {...props} onSubmit={onSubmitWrapper}>
      <FlexBox alignItems={'unset'}>
        <FlexBox padding={'12px'}>
          <InputLabel label="Назва" direction={'vertical'}>
            <InputText
              value={formData.label ? formData.label : ''}
              name="label"
              placeholder="Введіть назву ролі"
              onChange={onChange}
            />
          </InputLabel>

          <InputLabel label={'Коментар'} direction={'vertical'}>
            <TextareaPrimary
              value={formData.descr ? formData.descr : ''}
              name="descr"
              placeholder="Введіть короткий коментар до ролі"
              onChange={onChange}
            />
          </InputLabel>
        </FlexBox>

        <FlexBox padding={'12px'} gap={8} fillHeight justifyContent={'center'}>
          <TitleBase>Доступні дії</TitleBase>

          <List>
            {formData.actions?.map((act, idx) => (
              <ListItem key={idx}>{act}</ListItem>
            ))}
          </List>
        </FlexBox>
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  min-height: 250px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 26px 1fr;
`;

export default FormCreateCustomRole;

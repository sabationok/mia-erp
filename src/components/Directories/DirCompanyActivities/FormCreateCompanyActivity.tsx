import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import React, { useState } from 'react';
import styled from 'styled-components';
import InputTextPrimary from '../../atoms/Inputs/InputTextPrimary';
import { ICompanyActivity, ICompanyActivityFormData } from '../../../redux/companyActivities/companyActivities.types';

export interface FormCreateCompanyActivityProps extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  companyActivity?: ICompanyActivity;
  owner?: Partial<ICompanyActivity>;
  edit?: boolean;
  onSubmit?: (data: ICompanyActivityFormData) => void;
}


const FormCreateCompanyActivity: React.FC<FormCreateCompanyActivityProps> = ({
                                                                               owner,
                                                                               _id,
                                                                               edit,
                                                                               companyActivity,
                                                                               onSubmit,
                                                                               ...props
                                                                             }) => {
  const [formData, setFormData] = useState<ICompanyActivityFormData | undefined>({ ...companyActivity });

  function onFormDataChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target;

    setFormData(prev => {
      // console.log({ ...prev, [name]: value });
      return { ...prev, [name]: value };
    });
  }

  function formEventWrapper(evHandler?: (args: any) => void, args?: any) {
    if (evHandler) {
      return () => evHandler(args);
    }
  }


  return (
    <ModalForm onSubmit={formEventWrapper(onSubmit, formData)} {...props}>
      <Inputs>
        <InputTextPrimary
          label='Назва'
          name='label'
          placeholder='Введіть назву'
          onChange={onFormDataChange}
          value={formData?.label ? formData?.label : formData?.name ? formData?.name : ''}
        />

        <InputTextPrimary
          label='Коментар'
          name='descr'
          placeholder='Введіть коментар'
          onChange={onFormDataChange}
          value={formData?.descr ? formData?.descr : ''}
        />


      </Inputs>
    </ModalForm>
  );
};

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px;

  background-color: inherit;
`;

export default FormCreateCompanyActivity;

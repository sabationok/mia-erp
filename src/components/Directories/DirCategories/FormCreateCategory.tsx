import ModalForm from 'components/ModalForm/ModalForm';
import React from 'react';
import styled from 'styled-components';

// function createSubmitData(data) {
//   const { owner } = data;
//   const submitData = {
//     owner,
//   };
//   return submitData;
// }
export interface FormCreateCategoryProps {
  _id?: string;
  type: 'EXPENSE' | 'INCOME' | 'TRANSFER';
  owner?: string;
  edit?: boolean;
}
const FormCreateCategory: React.FC<FormCreateCategoryProps> = ({ type, owner, _id }) => {
  // const dispatch = useAppDispatch();
  // function handleSubmit({ formData, onSuccess, onError }) {
  //   console.log('FormCreateCategory', { formData, onSuccess, onError });

  //   const payload = { submitData: formData, onSuccess, onError };
  // }
  return (
    <ModalForm title={`${_id ? 'Редагувати' : 'Створити'} ${owner ? 'під-категорію' : 'категорію'}`}>
      <Inputs>
        {owner}-{type}
      </Inputs>
    </ModalForm>
  );
};

const Inputs = styled.div`
  display: flex;
  flex-direction: column;

  background-color: inherit;
`;

export default FormCreateCategory;

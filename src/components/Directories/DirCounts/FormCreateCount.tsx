import ModalForm from 'components/ModalForm/ModalForm';
import React from 'react';
import styled from 'styled-components';
import { CountType } from 'data/counts.types';

// function createSubmitData(data) {
//   const { owner } = data;
//   const submitData = {
//     owner,
//   };
//   return submitData;
// }
export interface FormCreateCountProps {
  _id?: string;
  type: CountType;
  owner?: string;
  edit?: boolean;
}
const FormCreateCount: React.FC<FormCreateCountProps> = ({ type, owner, _id }) => {
  // const dispatch = useAppDispatch();
  // function handleSubmit({ formData, onSuccess, onError }) {
  //   console.log('FormCreateCount', { formData, onSuccess, onError });

  //   const payload = { submitData: formData, onSuccess, onError };
  // }
  return (
    <ModalForm title={`${_id ? 'Редагувати' : 'Створити'} ${owner ? 'субрахунок' : 'рахунок'}`}>
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

export default FormCreateCount;

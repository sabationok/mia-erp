import React from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import LogoSvg from 'components/Layout/LogoSvg';
import AuthInputLabel from '../atoms/Inputs/AuthInputLabel';
import LinkIcon from 'components/atoms/LinkIcon/LinkIcon';

import { FieldErrors, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuthService from '../../redux/auth/useAppAuth.hook';
import InputText from '../atoms/Inputs/InputText';
import { createThunkPayload } from '../../utils/fabrics';

export interface RecoveryPasswordFormProps {
  helloTitle?: string;
  title: string;
  recovery?: boolean;
}

export interface IRecoveryPasswordFormData {
  email: string;
  password: string;
  approvePassword: string;
}

const validationEmail = yup.object().shape({
  email: yup.string().email().required(),
});
const validationNewPasswords = yup.object().shape({
  password: yup.string().required(),
  approvePassword: yup.string().required(),
});
const recoveryPasswordInitialFormData: Pick<IRecoveryPasswordFormData, 'password' | 'approvePassword'> = {
  password: '',
  approvePassword: '',
};
const sendRecoveryPasswordEmailFromData: Pick<IRecoveryPasswordFormData, 'email'> = {
  email: '',
};

const RecoveryPasswordForm: React.FC<RecoveryPasswordFormProps & React.HTMLAttributes<HTMLFormElement>> = ({
  title,
  recovery,
  ...props
}) => {
  const authService = useAuthService();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IRecoveryPasswordFormData>>({
    defaultValues: recovery ? recoveryPasswordInitialFormData : sendRecoveryPasswordEmailFromData,
    resolver: yupResolver(recovery ? validationNewPasswords : validationEmail),
    reValidateMode: 'onSubmit',
  });

  function onSubmitValid(data: Partial<IRecoveryPasswordFormData>) {
    authService.sendRecoveryEmail(createThunkPayload(data));
  }

  function onSubmitErrors(err: FieldErrors, e: any) {
    console.log('invalid data', err);
    return e;
  }

  return (
    <StForm onSubmit={handleSubmit(onSubmitValid, onSubmitErrors)}>
      <StLogo />

      <Title>{title}</Title>

      <Inputs>
        {recovery ? (
          <>
            <AuthInputLabel icon="lock_O" error={errors.password}>
              <InputText placeholder="Новий пароль" type="password" {...register('password')} />
            </AuthInputLabel>
            <AuthInputLabel icon="lock_O" error={errors.approvePassword}>
              <InputText placeholder="Повторіть пароль" type="password" {...register('approvePassword')} />
            </AuthInputLabel>
          </>
        ) : (
          <>
            <AuthInputLabel icon="email" error={errors.email}>
              <InputText placeholder="Електронна пошта" {...register('email')} />
            </AuthInputLabel>
          </>
        )}
      </Inputs>

      <Buttons>
        <StButtonIcon type={'submit'} variant={'filledSmall'}>
          {recovery ? 'Прийняти' : 'Відновити'}
        </StButtonIcon>

        <StLinkIcon texttransform="uppercase" variant="outlinedSmall" to={'/auth/login'}>
          {'Увійти'}
        </StLinkIcon>
      </Buttons>
    </StForm>
  );
};

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 250px;
  width: 100%;
  height: max-content;
  max-width: 480px;
  max-height: 98vh;

  overflow: auto;

  padding: 20px 16px;

  border-radius: 2px;

  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  border: 1px solid ${({ theme }) => theme.trBorderClr};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  @media screen and (max-width: 480px) {
    max-width: 95vw;
  }
`;
const StLogo = styled(LogoSvg)`
  min-width: 150px;
  height: 64px;

  & .logoName {
    font-size: 18px;
    @media screen and (max-width: 480px) {
      display: block;
    }
  }
`;

const Title = styled.p`
  font-size: 16px;
  line-height: 1.4;
  text-align: center;

  margin-bottom: 20px;

  max-width: 280px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  margin-bottom: 12px;
  width: 100%;
  max-width: 280px;

  fill: ${({ theme }) => theme.accentColor.base};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
const StButtonIcon = styled(ButtonIcon)`
  min-width: 165px;
  font-weight: 600;

  text-transform: uppercase;
`;
const StLinkIcon = styled(LinkIcon)`
  min-width: 165px;
  font-weight: 600;
`;

export default RecoveryPasswordForm;

import React from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon';
import styled from 'styled-components';
import LogoSvg from 'components/Layout/LogoSvg';
import AuthInputLabel from '../../atoms/Inputs/AuthInputLabel';
import NavLinkIcon from 'components/atoms/LinkIcon/NavLinkIcon';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputText from '../../atoms/Inputs/InputText';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SecurityInputControlHOC from '../../atoms/Inputs/SecurityInputControlHOC';
import { ToastService } from '../../../services';
import { HasRegisterCompanyDtoFields, HasRegisterUserDtoFields } from '../../../types/auth/auth.types';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { omit } from 'lodash';
import { useAppRouter } from '../../../hooks';
import { BusinessSubjectTypeEnum } from '../../../types/companies/companies.types';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { isEnum, isLabelSchema, isNameSchema, passwordFields } from '../../../schemas';

export interface Props {
  helloTitle?: string;
  title: string;
  registration?: boolean;
  login?: boolean;
}

export interface IRegistrationFormData extends HasRegisterUserDtoFields, HasRegisterCompanyDtoFields {
  email: string;
  password: string;
  passwordCheck: string;
  businessType?: BusinessSubjectTypeEnum;
}

const registerSchema: yup.ObjectSchema<IRegistrationFormData> = yup.object().shape({
  label: isLabelSchema(),
  name: isNameSchema(),
  email: yup.string().required(),
  businessType: isEnum(BusinessSubjectTypeEnum),
  ...passwordFields,
});
const logInSchema = registerSchema.pick(['email', 'password']);

export type AuthFormProps = Props & React.HTMLAttributes<HTMLFormElement>;

const AuthForm: React.FC<AuthFormProps> = ({ title, registration, login, ...props }) => {
  const authService = useAppServiceProvider().get(ServiceName.auth);
  const router = useAppRouter();
  const loaders = useLoaders<'logIn' | 'register'>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IRegistrationFormData>({
    defaultValues: {},
    reValidateMode: 'onSubmit',
    resolver: yupResolver(login ? logInSchema : registerSchema, { stripUnknown: true }),
    shouldUnregister: true,
  });
  const formValues = watch();

  // const disableSubmit = useMemo(
  //   () => !isValid || (registration && formValues.password !== formValues.approvePassword),
  //   [formValues.approvePassword, formValues.password, isValid, registration]
  // );

  function onFormSubmit({ passwordCheck, ...fData }: IRegistrationFormData) {
    login &&
      authService.loginUser({
        data: { data: { password: fData.password, email: fData.email } },
        onSuccess() {
          ToastService.success('Login success');
        },
        onError() {
          ToastService.error('Login error');
        },
        onLoading: loaders.onLoading('logIn'),
      });
    registration &&
      authService.register({
        data: omit({ ...fData, password: fData.password }, ['approvePassword', 'current_password']),
        onLoading: loaders.onLoading('register'),
        onSuccess() {
          router.push({ pathname: '/auth/logIn' });

          ToastService.success('Registration success');
        },
        onError() {
          ToastService.error('Registration error');
        },
      });
  }

  return (
    <Form {...props} onSubmit={handleSubmit(onFormSubmit)}>
      <StLogo />

      <Title>{title}</Title>

      <FlexBox fillWidth margin={'8px 0'}>
        <Links>
          <StNavLink textTransform="uppercase" variant="def" to={'/auth/login'}>
            {'Вхід'}
          </StNavLink>

          <StNavLink textTransform="uppercase" variant="def" to={`/auth/register`}>
            {'Реєстрація'}
          </StNavLink>
        </Links>
      </FlexBox>

      <Inputs>
        {registration && (
          <>
            <AuthInputLabel icon="personOutlined" error={errors.name?.first}>
              <InputText placeholder="І'мя" {...register('name.first')} />
            </AuthInputLabel>

            <AuthInputLabel icon="personOutlined" error={errors.name?.second}>
              <InputText placeholder="Прізвище" {...register('name.second')} />
            </AuthInputLabel>

            <AuthInputLabel icon="email" error={errors.email}>
              <InputText placeholder={'Електронна адреса'} {...register('email')} />
            </AuthInputLabel>

            <AuthInputLabel icon="lock_O" error={errors.password}>
              <SecurityInputControlHOC
                renderInput={props => (
                  <InputText {...props} key={'regster_password'} placeholder="Пароль" {...register('password')} />
                )}
              />
            </AuthInputLabel>

            <AuthInputLabel
              icon="lock_O"
              error={errors.passwordCheck}
              success={
                !!formValues.password && formValues.password === formValues.passwordCheck
                  ? { message: 'Passwords are equals' }
                  : undefined
              }
            >
              <SecurityInputControlHOC
                renderInput={props => (
                  <InputText {...props} placeholder={'Повторіть пароль'} {...register('passwordCheck')} />
                )}
              />
            </AuthInputLabel>
          </>
        )}

        {!registration && (
          <>
            <AuthInputLabel icon="email" error={errors.email}>
              <InputText placeholder="Електронна адреса" {...register('email')} />
            </AuthInputLabel>

            <AuthInputLabel icon="lock_O" error={errors.password}>
              <SecurityInputControlHOC
                renderInput={props => (
                  <InputText {...props} key={'login_password'} placeholder="Пароль" {...register('password')} />
                )}
              />
            </AuthInputLabel>
          </>
        )}
      </Inputs>

      <Buttons>
        <StButtonIcon
          type={'submit'}
          textTransform={'uppercase'}
          variant={'filledMiddle'}
          // disabled={disableSubmit}
          isLoading={loaders.hasLoading}
        >
          {registration ? 'Зареєструватись' : 'Увійти'}
        </StButtonIcon>

        {!registration && <StLink to={'/auth/sendRecoveryPasswordMail'}>{'Забули пароль?'}</StLink>}
      </Buttons>
    </Form>
  );
};

const Form = styled(FlexForm)`
  justify-content: flex-start;
  align-items: center;

  min-width: 250px;
  width: 100%;
  height: max-content;
  /* min-height: max-content; */
  max-width: 400px;
  max-height: 98vh;

  overflow: auto;

  padding: 20px 16px;

  border-radius: 4px;

  box-shadow: ${({ theme }) => theme.globals.shadowMain};

  border: 1px solid ${({ theme }) => theme.trBorderClr};
  /* background-color: #1c1c1e; */
  background-color: ${({ theme }) => theme.modalBackgroundColor};

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
`;

const Links = styled(FlexBox)`
  flex-direction: row;
  justify-content: stretch;

  width: 100%;
  height: 36px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;

  margin-bottom: 12px;
  width: 100%;

  fill: ${({ theme }) => theme.accentColor.base};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  width: 100%;
  max-width: 230px;
`;
const StButtonIcon = styled(ButtonIcon)`
  font-weight: 600;

  min-width: 165px;
  width: 100%;
`;
const StLink = styled(Link)`
  font-size: 11px;
  line-height: 1.45;

  text-decoration: underline;

  color: ${({ theme }) => theme.accentColor.base};

  &:hover {
    color: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    color: ${({ theme }) => theme.accentColor.pressed};
  }
`;

const StNavLink = styled(NavLinkIcon)`
  position: relative;
  flex: 1;

  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  border-radius: 0;
  border: 0;

  &::before {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    //height: 1px;
    //width: 100%;
    height: 3px;
    width: 0;
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    transform: translate(-50%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &.active {
    &::after {
      width: 100%;
    }
  }

  &:hover,
  &:focus {
    outline-style: none;

    &::after {
      width: 100%;
    }
  }
`;

export default AuthForm;

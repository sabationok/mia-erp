import React, { useEffect } from 'react';
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
import { HasRegisterCompanyDtoFields, HasRegisterUserDtoFields } from '../../../types/auth.types';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { omit } from 'lodash';
import { useAppParams, useAppRouter } from '../../../hooks';
import { BusinessSubjectTypeEnum } from '../../../types/companies.types';
import FlexBox from '../../atoms/FlexBox';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';

export interface Props {
  helloTitle?: string;
  title: string;
  registration?: boolean;
  login?: boolean;
}

export interface IRegistrationFormData extends HasRegisterUserDtoFields, HasRegisterCompanyDtoFields {
  email: string;
  password: string;
  approvePassword: string;
}

const registerSchema = yup.object().shape({
  name: yup.object().shape({
    first: yup.string().optional(),
    second: yup.string().optional(),
  }),
  label: yup.object().shape({
    base: yup.string().optional(),
    print: yup.string().optional(),
  }),
  email: yup.string().required(),
  password: yup.string().required(),
  approvePassword: yup.string().required(),
});
const logInSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

const registerParam = {
  [BusinessSubjectTypeEnum.person]: 'name',
  [BusinessSubjectTypeEnum.company]: 'label',
  [BusinessSubjectTypeEnum.entrepreneur]: null,
} as const;

export type AuthFormProps = Props & React.HTMLAttributes<HTMLFormElement>;

const AuthForm: React.FC<AuthFormProps> = ({ title, registration, login, ...props }) => {
  const authService = useAppServiceProvider().get(ServiceName.auth);
  const router = useAppRouter();
  const loaders = useLoaders<'logIn' | 'register'>();

  const businessType = useAppParams().businessType as BusinessSubjectTypeEnum;

  const omitParam = registerParam?.[businessType];

  useEffect(() => {
    console.log({ businessType });
  }, [businessType]);

  useEffect(() => {
    if (registration && (!businessType || !(businessType in registerParam))) {
      router.replace({ pathname: BusinessSubjectTypeEnum.person });
    }
  }, [businessType, registration, router]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<IRegistrationFormData>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(login ? logInSchema : omitParam ? registerSchema.omit([omitParam]) : registerSchema),
    shouldUnregister: true,
  });
  // const formValues = watch();

  // const disableSubmit = useMemo(
  //   () => !isValid || (registration && formValues.password !== formValues.approvePassword),
  //   [formValues.approvePassword, formValues.password, isValid, registration]
  // );

  function onFormSubmit({ approvePassword, ...fData }: IRegistrationFormData) {
    if (approvePassword) {
      if (approvePassword !== fData.password) {
        setError('approvePassword', { message: 'паролі не співпадають' });
        return;
      } else {
        clearErrors();
      }
    }

    login &&
      authService.loginUser({
        data: {
          password: fData.password,
          email: fData.email,
        },
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
        data: omit(fData, omitParam ? [omitParam, 'approvePassword'] : ['approvePassword']),
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

          <StNavLink
            textTransform="uppercase"
            variant="def"
            to={`/auth/register/${businessType ?? BusinessSubjectTypeEnum.person}`}
          >
            {'Реєстрація'}
          </StNavLink>
        </Links>

        {registration && (
          <Links>
            <StNavLink textTransform="uppercase" variant="def" to={`/auth/register/${BusinessSubjectTypeEnum.person}`}>
              {'Фіз. особа'}
            </StNavLink>

            <StNavLink textTransform="uppercase" variant="def" to={`/auth/register/${BusinessSubjectTypeEnum.company}`}>
              {'Компанія'}
            </StNavLink>

            <StNavLink
              textTransform="uppercase"
              variant="def"
              to={`/auth/register/${BusinessSubjectTypeEnum.entrepreneur}`}
            >
              {'ФОП'}
            </StNavLink>
          </Links>
        )}
      </FlexBox>

      <Inputs>
        {registration && (
          <>
            {businessType !== 'company' && (
              <>
                <AuthInputLabel icon="personOutlined" error={errors.name?.first}>
                  <InputText placeholder="І'мя" {...register('name.first')} />
                </AuthInputLabel>

                <AuthInputLabel icon="personOutlined" error={errors.name?.second}>
                  <InputText placeholder="Прізвище" {...register('name.second')} />
                </AuthInputLabel>
              </>
            )}
            {businessType !== 'person' && (
              <>
                <AuthInputLabel icon="personOutlined" error={errors.label?.base}>
                  <InputText placeholder="Назва" {...register('label.base')} />
                </AuthInputLabel>

                <AuthInputLabel icon="personOutlined" error={errors.label?.print}>
                  <InputText placeholder="Назва для друку" {...register('label.print')} />
                </AuthInputLabel>
              </>
            )}

            <AuthInputLabel icon="email" error={errors.email}>
              <InputText placeholder={'Електронна адреса'} {...register('email')} />
            </AuthInputLabel>

            <AuthInputLabel icon="lock_O" error={errors.password}>
              <SecurityInputControlHOC
                renderInput={props => <InputText {...props} placeholder="Пароль" {...register('password')} />}
              />
            </AuthInputLabel>

            <AuthInputLabel icon="lock_O" error={errors.approvePassword}>
              <SecurityInputControlHOC
                renderInput={props => (
                  <InputText {...props} placeholder={'Повторіть пароль'} {...register('approvePassword')} />
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
                renderInput={props => <InputText {...props} placeholder="Пароль" {...register('password')} />}
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
          sizeType={'large'}
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

  border-radius: 2px;

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

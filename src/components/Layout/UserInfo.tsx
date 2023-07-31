import styled, { css } from 'styled-components';
import ProfileCard from 'components/atoms/ProfileCard/ProfileCard';
import usePermissionsServiceHook, { usePermissionsSelector } from '../../hooks/usePermissionsService.hook';
import FlexBox from '../atoms/FlexBox';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import Text from '../atoms/Text';
import useAppAuthHook from '../../hooks/useAppAuth.hook';
import { useMemo } from 'react';
import { useAuthSelector } from '../../redux/selectors.store';
import translate from '../../lang';

export interface IUserInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserInfo: React.FC<IUserInfoProps> = ({ isOpen, onClose }) => {
  const { logOutUser } = useAppAuthHook();
  const { user } = useAuthSelector();
  const { permissionLogOut, clearCurrent } = usePermissionsServiceHook();
  const { permission, permission_token } = usePermissionsSelector();

  function onBackdropClick(ev: React.MouseEvent) {
    const { target, currentTarget } = ev;
    target === currentTarget && onClose();
  }

  const isPermission = useMemo(() => !!permission || !!permission_token, [permission, permission_token]);

  return (
    <Backdrop isOpen={isOpen} transitionDelay={isOpen ? '' : '250ms'} onClick={onBackdropClick}>
      <MainList>
        <MainListItem isOpen={isOpen} transitionDelay={isOpen ? '' : '150ms'}>
          <ProfileCard {...user} nameFontSize="16px" emailFontSize="16px" />

          <FlexBox fxDirection={'row'} gap={12} fillWidth justifyContent={'flex-end'} alignItems={'center'}>
            <ButtonIcon
              variant={'textSmall'}
              endIcon={'logOut'}
              onClick={() => {
                logOutUser({
                  onSuccess: () => {
                    clearCurrent();
                  },
                  onError() {
                    clearCurrent();
                  },
                });
              }}
            >
              <Text style={{ fontSize: '14px' }}>{translate('logOutUser')}</Text>
            </ButtonIcon>
          </FlexBox>
        </MainListItem>

        {isPermission && (
          <MainListItem isOpen={isOpen} transitionDelay={isOpen ? '150ms' : ''}>
            <ProfileCard {...permission?.company} nameFontSize="16px" emailFontSize="16px" />

            <FlexBox fxDirection={'row'} gap={12} fillWidth justifyContent={'flex-end'} alignItems={'center'}>
              <ButtonIcon
                variant={'textSmall'}
                endIcon={'logOut'}
                onClick={() =>
                  permissionLogOut({
                    onSuccess: () => {
                      clearCurrent();
                    },
                    onError() {
                      clearCurrent();
                    },
                  })
                }
              >
                <Text style={{ fontSize: '14px' }}>{translate('logOutPermission')}</Text>
              </ButtonIcon>
            </FlexBox>
          </MainListItem>
        )}
      </MainList>
    </Backdrop>
  );
};
const Backdrop = styled.div<{ isOpen: boolean; transitionDelay?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 1051;
  transform-origin: right;

  overflow: hidden;
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  transition-delay: ${({ transitionDelay }) => (transitionDelay ? transitionDelay : '')};

  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backdropColor};

  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        `}
`;

const MainList = styled.ul<{ isOpen?: boolean; transitionDelay?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  min-width: 250px;
  width: 100vw;
  max-width: 100vw;

  padding: 6px;

  overflow: hidden;

  transition: all ${({ theme }) => theme.globals?.timingFunctionMain};
  /* transition-delay: ${({ transitionDelay }) => (transitionDelay ? transitionDelay : '')}; */

  @media screen and (min-width: 480px) {
    max-width: 480px;
  }

  /* ${({ isOpen }) =>
    isOpen
      ? css`
          overflow: auto;
          transform: translateX(0);
          pointer-events: all;
        `
      : css`
          transform: translateX(100%);
          pointer-events: none;
        `} */
`;
const MainListItem = styled.li<{ isOpen: boolean; transitionDelay?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow: hidden;
  padding: 16px;
  max-width: 480px;
  width: 100%;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  box-shadow: var(--header-shadow);
  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  transition: all ${({ theme }) => theme.globals?.timingFunctionMain};
  transition-delay: ${({ transitionDelay }) => (transitionDelay ? transitionDelay : '')};

  ${({ isOpen }) =>
    isOpen
      ? css`
          overflow: auto;
          transform: translateX(0);
          pointer-events: all;
        `
      : css`
          transform: translateX(100%);
          pointer-events: none;
        `}
`;
// const UserAvatarBox = styled.div`
//   border-radius: 50%;
//   height: 50px;
//   min-width: 50px;
//   width: 50px;
//   overflow: hidden;
// `;
// const UserInfoList = styled.ul`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 8px;

//   padding: 12px;
// `;
// const UserInfoListItem = styled.li<{ flexDierction?: 'row' | 'column' }>`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   gap: 6px;
//   width: 100%;

//   @media screen and (min-width: 480px) {
//     flex-direction: ${({ flexDierction }) => flexDierction || 'column'};
//   }
// `;
// const Wrapper = styled.div`
//   align-self: flex-start;

//   display: flex;
//   flex-direction: column;

//   justify-content: space-between;
//   height: 100%;
// `;
// const Name = styled.span`
//   font-size: 12px;
//   font-weight: 700;
//   padding: 4px 8px;
// `;
// const Email = styled.span`
//   padding: 4px 8px;
//   font-size: 10px;

//   & a {
//     transition: ${({ theme }) => theme.globals?.timingFnMui};
//     text-decoration: underline;
//     &:hover {
//       color: ${({ theme }) => theme.accentColor.base};
//     }
//   }
// `;

export default UserInfo;

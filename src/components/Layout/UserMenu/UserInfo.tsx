import { useAuthSelector } from 'redux/selectors.store';
import styled, { css } from 'styled-components';
import { reactLogo } from 'img';

const UserInfo: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { email, name, avatarURL } = useAuthSelector().user;

  function onBackdropClick(ev: React.MouseEvent) {
    const { target, currentTarget } = ev;
    target === currentTarget && onClose();
  }

  return (
    <Backdrop isOpen={isOpen} transitionDelay={isOpen ? '' : '250ms'} onClick={onBackdropClick}>
      <MainList isOpen={isOpen} transitionDelay={isOpen ? '' : '150ms'}>
        <MainListItem>
          <UserInfoList>
            <UserInfoListItem flexDierction="row">
              <UserAvatarBox>
                <img src={avatarURL} alt="" width={50} />
              </UserAvatarBox>
              <Wrapper>
                <Name>{name}</Name>
                <Email>
                  <a href={`mailto:${email}`}>{email}</a>
                </Email>
              </Wrapper>
            </UserInfoListItem>
          </UserInfoList>
        </MainListItem>
      </MainList>

      <MainList isOpen={isOpen} transitionDelay={isOpen ? '150ms' : ''}>
        <MainListItem>
          <UserInfoList>
            <UserInfoListItem flexDierction="row">
              <UserAvatarBox>
                <img src={reactLogo} alt="" width={50} />
              </UserAvatarBox>

              <Wrapper>
                <Name>{`ТОВ "Рога і копита"`}</Name>
                <Email>
                  <a href={`mailto:${'rogaAndKopytaCorp@mail.com'}`}>rogaAndKopytaCorp@mail.com</a>
                </Email>
              </Wrapper>
            </UserInfoListItem>
          </UserInfoList>
        </MainListItem>
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
  z-index: 1001;
  transform-origin: right;

  overflow: hidden;
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  transition-delay: ${({ transitionDelay }) => (transitionDelay ? transitionDelay : '')};

  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => {
    console.log(theme.backdropColor);
    return theme.backdropColor;
  }};

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

const MainList = styled.ul<{ isOpen: boolean; transitionDelay?: string }>`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  gap: 8px;

  min-width: 250px;
  width: 100vw;
  max-width: 100vw;

  padding: 6px;

  overflow: hidden;

  /* border: 1px solid ${({ theme }) => theme.borderColor}; */
  transition: all ${({ theme }) => theme.globals?.timingFunctionMain};
  transition-delay: ${({ transitionDelay }) => (transitionDelay ? transitionDelay : '')};
  /* background-color: ${({ theme }) => theme.backgroundColorSecondary}; */
  @media screen and (min-width: 480px) {
    max-width: 480px;
  }

  ${({ isOpen }) =>
    isOpen
      ? css`
          overflow: auto;
          /* opacity: 1; */
          /* transform: scaleX(1); */
          transform: translateX(0);
          /* visibility: visible; */
          pointer-events: all;
        `
      : css`
          /* transform: scaleX(0); */
          transform: translateX(100%);
          /* opacity: 0; */
          /* visibility: hidden; */
          pointer-events: none;
        `}
`;
const MainListItem = styled.li`
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  box-shadow: var(--header-shadow);
  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  /* border-bottom: 1px solid ${({ theme }) => theme.borderColor}; */
`;
const UserAvatarBox = styled.div`
  border-radius: 50%;
  height: 50px;
  min-width: 50px;
  width: 50px;
  overflow: hidden;
`;
const UserInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  padding: 12px;
`;
const UserInfoListItem = styled.li<{ flexDierction?: 'row' | 'column' }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  @media screen and (min-width: 480px) {
    flex-direction: ${({ flexDierction }) => flexDierction || 'column'};
  }
`;
const Wrapper = styled.div`
  align-self: flex-start;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  height: 100%;
`;
const Name = styled.span`
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
`;
const Email = styled.span`
  padding: 4px 8px;
  font-size: 10px;

  & a {
    transition: ${({ theme }) => theme.globals?.timingFnMui};
    text-decoration: underline;
    &:hover {
      color: ${({ theme }) => theme.accentColor.base};
    }
  }
`;

export default UserInfo;

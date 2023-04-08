import styled from 'styled-components';
import { IUser } from '../../../redux/auth/auth.slice';

export interface ProfileCardProps extends Omit<IUser, '_id'> {
  // avatarURL?: string;
  // name?: string;
  // email?: string;
  nameFontSize?: string;
  emailFontSize?: string;
  avatarPrpps?: React.HTMLAttributes<HTMLDivElement>;
  nameProps?: React.HTMLAttributes<HTMLDivElement>;
  emailProps?: React.HTMLAttributes<HTMLDivElement>;
}

const ProfileCard: React.FC<ProfileCardProps & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                          avatarURL = '',
                                                                                          name = 'name',
                                                                                          email = 'email',
                                                                                          emailFontSize,
                                                                                          nameFontSize,
                                                                                          nameProps,
                                                                                          emailProps,
                                                                                          children,
                                                                                          ...props
                                                                                        }) => {
  return (
    <Card {...props}>
      <Avatar>
        <img src={avatarURL} alt='userImage' width={100} height={100} />
      </Avatar>

      <Wrapper>
        <ProfileName fontSize={nameFontSize} {...nameProps}>
          {name}
        </ProfileName>

        <ProfileEmail fontSize={emailFontSize} {...emailProps}>
          {email}
        </ProfileEmail>

        {children}
      </Wrapper>
    </Card>
  );
};
const Card = styled.div`
  display: flex;
`;
const Avatar = styled.div`
  min-width: 64px;
  max-width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 8px;

  height: 100%;
`;
const ProfileName = styled.div<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '12px')};
  font-weight: 600;
`;
const ProfileEmail = styled.div<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '10px')};
  line-height: 16px;
`;
export default ProfileCard;

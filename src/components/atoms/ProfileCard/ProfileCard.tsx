import styled from 'styled-components';
import { UserEntity } from 'types/auth/auth.types';
import { CompanyEntity } from '../../../types/companies/companies.types';

export interface ProfileCardProps {
  profile?: Partial<UserEntity & CompanyEntity>;
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
  profile,
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
        <img src={profile?.avatarURL} alt="profileImage" width={100} height={100} />
      </Avatar>

      <Wrapper>
        <ProfileName fontSize={nameFontSize} {...nameProps}>
          {typeof profile?.name === 'string' ? profile?.name : profile?.name?.first}
        </ProfileName>

        <ProfileEmail fontSize={emailFontSize} {...emailProps}>
          {profile?.email}
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

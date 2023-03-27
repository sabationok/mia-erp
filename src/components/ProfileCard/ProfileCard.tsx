import { useAuthSelector } from 'redux/selectors.store';
import styled from 'styled-components';

const ProfileCard = () => {
  const { name, email, avatarURL } = useAuthSelector().user;

  return (
    <Card>
      <Avatar>
        <img src={avatarURL} alt="karina" width={100} height={100} />
      </Avatar>
      <ProfileWrapper>
        <ProfileName>{name}</ProfileName>
        <ProfileEmail>{email}</ProfileEmail>
      </ProfileWrapper>
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
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 8px;

  height: 100%;
`;
const ProfileName = styled.div`
  font-weight: 600;
  font-size: 12px;
`;
const ProfileEmail = styled.div`
  font-size: 10px;
  line-height: 16px;
`;
export default ProfileCard;

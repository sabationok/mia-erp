import { CSSProperties, HTMLInputTypeAttribute, useState } from 'react';
import FlexBox from '../FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

const InputSecurityControlHOC = ({
  children,
  visible,
  onSetVisible,
  renderInput,
  htmlType = 'text',
}: {
  htmlType?: HTMLInputTypeAttribute;
  renderInput?: (props: { type: HTMLInputTypeAttribute; style?: CSSProperties }) => React.ReactNode;
  children?: React.ReactNode;
  visible?: boolean;
  onSetVisible?: (value: boolean) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible(p => !p);
  };

  return (
    <FlexBox style={{ position: 'relative' }} fillWidth>
      {renderInput ? renderInput({ type: isVisible ? 'password' : htmlType, style: { paddingRight: 36 } }) : children}

      <SecurityButton
        variant={'onlyIcon'}
        icon={isVisible ? 'visibilityOn' : 'visibilityOff'}
        onClick={handleVisibility}
      />
    </FlexBox>
  );
};
const SecurityButton = styled(ButtonIcon)`
  position: absolute;

  margin: 0 4px;

  right: 0;
  top: 50%;

  transform: translateY(-50%);
`;

export default InputSecurityControlHOC;

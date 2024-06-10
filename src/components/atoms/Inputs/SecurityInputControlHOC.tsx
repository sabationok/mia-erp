import { CSSProperties, HTMLInputTypeAttribute, useMemo, useState } from 'react';
import FlexBox from '../FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../ButtonIcon';

const InputSecurityControlHOC = ({
  // children,
  renderInput,
  htmlType = 'text',
}: {
  htmlType?: HTMLInputTypeAttribute;
  renderInput?: (props: {
    type: HTMLInputTypeAttribute;
    style?: CSSProperties;
    id: string;
    key: string;
  }) => React.ReactNode;
  // children?: React.ReactNode;
  visible?: boolean;
  onSetVisible?: (value: boolean) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible(p => !p);
  };

  const _renderInput = useMemo(() => {
    return renderInput
      ? !isVisible
        ? renderInput({
            type: 'password',
            id: 'secure_hidden',
            key: 'secure_hidden',
            style: { paddingRight: 36 },
          })
        : renderInput({
            type: htmlType,
            id: 'text_visible',
            key: 'text_visible',
            style: { paddingRight: 36 },
          })
      : null;
  }, [htmlType, isVisible, renderInput]);

  return (
    <FlexBox style={{ position: 'relative' }} fillWidth>
      {_renderInput}

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

  top: 50%;
  right: 0;
  z-index: 2;

  transform: translateY(-50%);
`;

export default InputSecurityControlHOC;

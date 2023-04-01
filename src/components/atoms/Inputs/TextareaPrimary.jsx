import styled from 'styled-components';
import theme from 'theme/theme';

const TextareaPrimary = ({ label, disabled, ...props }) => {
  return (
    <InputPrimary disabled={disabled}>
      <Label>{label}</Label>
      <TextArea type="text" {...props} disabled={disabled} />
    </InputPrimary>
  );
};

const InputPrimary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  opacity: ${({ disabled }) => (disabled ? 0.5 : '')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

  position: relative;
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 12px;
  line-height: 1.3;
  /* text-transform: uppercase; */
`;
const TextArea = styled.textarea`
  padding: 5px 0px 5px 8px;

  width: 100%;
  height: 96px;

  font-family: inherit;
  color: inherit;

  background-color: transparent;
  border-radius: 2px;
  border: 1px solid ${theme.inputBorder};

  resize: none;
`;
export default TextareaPrimary;

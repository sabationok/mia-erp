import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import FormAreaFooter from './FormAreaFooter';

export interface FormAreaProps {
  label?: string;
  children?: React.ReactNode;
  onSubmit?: AppSubmitHandler;
  onReset?: () => void;
  renderFooter?: React.ReactNode;
  renderTitle?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export const FormArea = ({
  children,
  renderFooter,
  renderTitle,
  disabled,
  label = 'Form area',
  onSubmit,
  isLoading,
  onReset,
}: FormAreaProps) => {
  return (
    <FlexForm fillWidth onSubmit={onSubmit} onReset={onReset}>
      <FlexBox padding={'8px 6px'} overflow={'hidden'}>
        {renderTitle || (
          <Text $size={14} $weight={600}>
            {label}
          </Text>
        )}
      </FlexBox>
      {children}

      {renderFooter || (
        <FormAreaFooter hasOnSubmit={!!onSubmit} hasOnReset={!!onReset} isLoading={isLoading} disabled={disabled} />
      )}
    </FlexForm>
  );
};

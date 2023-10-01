import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';

export interface CompanySettingsProps extends Omit<ModalFormProps, 'onSubmit'> {}
enum CompanySettingsTabs {
  Defaults = 'Defaults',
  Info = 'Info',
}

const tabs = enumToFilterOptions(CompanySettingsTabs);

const TestTabComp: React.FC<{ onClose?: () => void; compId: CompanySettingsTabs }> = (props, context) => {
  return (
    <FlexBox flex={1} fillWidth alignItems={'center'} justifyContent={'center'}>
      <ButtonIcon variant={'filledLarge'} onClick={props.onClose}>{`Закрити ${props.compId}`}</ButtonIcon>
    </FlexBox>
  );
};

const RenderTabComponent: Record<
  CompanySettingsTabs,
  React.FC<{ onClose?: () => void; compId: CompanySettingsTabs }>
> = {
  [CompanySettingsTabs.Defaults]: TestTabComp,
  [CompanySettingsTabs.Info]: TestTabComp,
};

const CompanySettingsModal: React.FC<CompanySettingsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState<CompanySettingsTabs>(tabs[0]?.value);

  const RenderTab = useMemo(() => {
    return RenderTabComponent[current] || RenderTabComponent.Defaults;
  }, [current]);

  return (
    <ModalForm
      fillWidth
      fillHeight
      title={'Company settings'}
      onClose={onClose}
      {...props}
      filterOptions={tabs}
      defaultFilterValue={current}
      onOptSelect={(_, v) => {
        setCurrent(v);
      }}
    >
      <RenderTab onClose={onClose} compId={current} />
    </ModalForm>
  );
};

export default CompanySettingsModal;

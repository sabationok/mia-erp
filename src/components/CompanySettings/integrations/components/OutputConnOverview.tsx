import { Integration } from '../../../../types/integrations.types';
import ModalBase from '../../../atoms/Modal';
import FlexBox from '../../../atoms/FlexBox';
import TabSelector from '../../../atoms/TabSelector';
import { enumToTabs } from '../../../../utils';
import { useState } from 'react';
import { OutputConnOAuth } from '../OAuth/ModalOAuthConfigs';

enum OutputConnOverviewTabs {
  Info = 'Info',
  OAuth = 'OAuth',
}
const options = enumToTabs(OutputConnOverviewTabs);
export const OutputConnOverview = ({ conn }: { conn: Integration.Output.Entity }) => {
  const [current, setCurrent] = useState<OutputConnOverviewTabs>();

  const tabs = {
    [OutputConnOverviewTabs.OAuth]: <OutputConnOAuth conn={conn} />,
    [OutputConnOverviewTabs.Info]: null,
  };

  return (
    <ModalBase title={`Connection: ${conn.label}`} fillHeight>
      <FlexBox>
        <TabSelector
          options={options}
          onSelect={option => {
            setCurrent(option.value);
          }}
        />

        {current ? tabs[current] : null}
      </FlexBox>
    </ModalBase>
  );
};

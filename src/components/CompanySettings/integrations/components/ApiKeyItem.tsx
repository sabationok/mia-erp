import { useState } from 'react';
import FlexBox from '../../../atoms/FlexBox';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { Button } from '../../../atoms/Button';

export const ApiKeyItem = ({
  apiKey,
  keyMask,
  onLoadApiKey,
}: {
  apiKey?: string;
  keyMask?: string;
  onLoadApiKey?: () => Promise<void>;
  isLoading?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVis, setIsVis] = useState(true);

  return (
    <FlexBox fillWidth fxDirection={'row'} alignItems={'center'} gap={10}>
      <ButtonIcon
        variant={'onlyIcon'}
        icon={isVis ? 'visibilityOn' : 'visibilityOff'}
        iconSize={'100%'}
        size={'18px'}
        isLoading={isLoading}
        onClick={async () => {
          if (!apiKey && onLoadApiKey) {
            setIsLoading(true);
            onLoadApiKey()
              .then(apiKey => {
                setIsVis(true);
              })
              .finally(() => setIsLoading(false));
          } else {
            setIsVis(true);
          }
        }}
      ></ButtonIcon>

      <Button.CopyIcon text={apiKey} />
      <Button.Copy text={apiKey} label={isVis && apiKey ? apiKey : keyMask} />
    </FlexBox>
  );
};

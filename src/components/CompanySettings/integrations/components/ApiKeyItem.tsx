import { useState } from 'react';
import FlexBox from '../../../atoms/FlexBox';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { Button } from '../../../atoms/Button';

export const ApiKeyItem = ({
  apiKey,
  keyMask,
  onLoad,
}: {
  apiKey?: string;
  keyMask?: string;
  onLoad?: () => Promise<void>;
  isLoading?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVis, setIsVis] = useState(false);

  const masked =
    keyMask ||
    (apiKey
      ? apiKey?.slice(0, 4).padEnd((apiKey?.length ?? 0) - 4, '*') + apiKey?.slice(apiKey.length - 4, apiKey.length)
      : '****');

  return (
    <FlexBox fillWidth fxDirection={'row'} alignItems={'center'} gap={10}>
      <ButtonIcon
        variant={'onlyIcon'}
        icon={!isVis ? 'visibilityOn' : 'visibilityOff'}
        iconSize={'100%'}
        size={'18px'}
        isLoading={isLoading}
        onClick={async () => {
          if (!apiKey && onLoad) {
            setIsLoading(true);
            onLoad()
              .then(apiKey => {
                setIsVis(true);
              })
              .finally(() => setIsLoading(false));
          } else {
            setIsVis(p => !p);
          }
        }}
      />

      <Button.CopyIcon text={apiKey} />
      <Button.Copy text={apiKey} label={isVis && apiKey ? apiKey : masked} />
    </FlexBox>
  );
};

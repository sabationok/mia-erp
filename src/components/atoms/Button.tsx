import { useState } from 'react';
import { WebService } from '../../services';
import ButtonIcon from './ButtonIcon';

const CopyButtonIcon = ({ text }: { text?: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [timeout, setTimeOut] = useState<NodeJS.Timeout>();

  const handleCopy = () => {
    if (text) {
      WebService.copyText(text).then(() => {
        setIsCopied(true);
        if (timeout) {
          clearTimeout(timeout);
        }

        setTimeOut(
          setTimeout(() => {
            setIsCopied(false);
          }, 750)
        );
      });
    }
  };
  return (
    <ButtonIcon
      variant={'onlyIcon'}
      icon={isCopied ? 'done' : 'copy'}
      iconSize={'100%'}
      size={'18px'}
      disabled={!text}
      onClick={handleCopy}
    ></ButtonIcon>
  );
};
const CopyButton = ({ text, label }: { text?: string; label?: string }) => {
  const handleCopy = () => {
    if (text) {
      WebService.copyText(text).then();
    }
  };
  return (
    <ButtonIcon variant={'def'} disabled={!text} onClick={handleCopy}>
      {label ?? text}
    </ButtonIcon>
  );
};

export const Button = {
  CopyIcon: CopyButtonIcon,
  Copy: CopyButton,
};

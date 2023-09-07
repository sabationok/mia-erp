import React, { useMemo } from 'react';
import { usePermissionsSelector } from '../../hooks/usePermissionsService.hook';

const CorpComponent = ({
  children,
  Component,
}: {
  children?: React.ReactNode;
  Component?: React.FC<{ disabled?: boolean; onClick?: () => void }>;
}) => {
  const { permission } = usePermissionsSelector();

  const hasPermission = useMemo(() => !!permission._id, [permission._id]);

  const handleOnClickAlert = () => {};

  const p = useMemo(
    (): { disabled?: boolean; onClick?: () => void } | undefined =>
      hasPermission
        ? {
            disabled: true,
            onClick: handleOnClickAlert,
          }
        : undefined,
    [hasPermission]
  );
  return Component ? <Component {...p} /> : hasPermission ? children : null;
};

export default CorpComponent;

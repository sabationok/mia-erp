import { useState } from 'react';
import { ExternalServiceTypeEnum, ExtServiceBase } from '../../../redux/integrations/integrations.types';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppQueryParams } from '../../../api';

export function useExtServicesQuery() {
  const [extServProviders, setExtServProviders] = useState<ExtServiceBase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    integrations: { getAllExtServices },
  } = useAppServiceProvider();

  const loadExtServices = ({ params }: { params?: AppQueryParams<ExternalServiceTypeEnum> } = {}) => {
    return getAllExtServices({
      data: { params },
      onSuccess: setExtServProviders,
      onLoading: setIsLoading,
    });
  };

  return {
    loadExtServices,
    extServProviders,
    isLoading,
  };
}
export function useInputIntegrationsQuery() {
  const [extServProviders, setExtServProviders] = useState<ExtServiceBase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    integrations: { getAllExtServices },
  } = useAppServiceProvider();

  const loadExtServices = ({ params }: { params?: AppQueryParams } = {}) => {
    return getAllExtServices({
      data: { params },
      onSuccess: setExtServProviders,
      onLoading: setIsLoading,
    });
  };

  return {
    loadExtServices,
    extServProviders,
    isLoading,
  };
}

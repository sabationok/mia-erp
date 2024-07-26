import { useState } from 'react';
import { ExternalServiceTypeEnum, ExtServiceBase } from '../../../types/integrations.types';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { ApiQueryParams } from '../../../api';
import { useIntegrationsSelector } from '../../../redux/selectors.store';

export function useExtServicesQuery() {
  const state = useIntegrationsSelector();

  const [isLoading, setIsLoading] = useState(false);
  const {
    integrations: { getAllExtServices },
  } = useAppServiceProvider();

  const loadExtServices = ({ params }: { params?: ApiQueryParams<ExternalServiceTypeEnum> } = {}) => {
    return getAllExtServices({
      params: params,
      onSuccess: () => {},
      onLoading: setIsLoading,
    });
  };

  return {
    loadExtServices,
    extServProviders: state.extList,
    isLoading,
  };
}
export function useInputIntegrationsQuery() {
  const [extServProviders, setExtServProviders] = useState<ExtServiceBase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    integrations: { getAllExtServices },
  } = useAppServiceProvider();

  const loadExtServices = ({ params }: { params?: ApiQueryParams } = {}) => {
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

import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import { useDirectorySelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { getIdRef, sortIds } from '../../utils';
import OfferCategoriesSelector from '../Forms/offers/categories/OfferCategoriesSelector';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { DrawerHeader, OverlayFooter, OverlayForm } from './index';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { useCurrentOffer } from '../../hooks';

export interface FormSelectCategoriesOverlayProps extends CreatedOverlay {}

const OfferCategoriesOverlay = ({ onClose }: FormSelectCategoriesOverlayProps) => {
  const service = useAppServiceProvider()[ServiceName.offers];
  const currentOffer = useCurrentOffer();
  const { directory } = useDirectorySelector(ApiDirType.CATEGORIES_PROD);
  const loaders = useLoaders<'update'>({ update: { content: 'Loadings...' } });
  const initIds = sortIds(currentOffer?.categories?.map(p => p._id));

  const [categoriesIds, setCategoriesIds] = useState<string[]>(initIds);

  const canSubmit = useMemo(() => {
    return initIds?.join(',') !== sortIds(categoriesIds).join(',');
  }, [initIds, categoriesIds]);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    currentOffer &&
      service.updateById({
        onLoading: loaders.onLoading('update'),
        data: { ...getIdRef(currentOffer), data: { categories: categoriesIds }, refreshCurrent: true },
        onSuccess: (data, meta) => {
          onClose && onClose();
        },
      });
  };

  useEffect(() => {
    if (currentOffer?.categories) {
      setCategoriesIds(currentOffer?.categories.map(c => c._id));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <OverlayForm onSubmit={handleFormSubmit}>
      <DrawerHeader
        title={'Категорії'}
        onBackPress={onClose}
        canSubmit={canSubmit}
        okButton
        isLoading={loaders.isLoading?.update}
      />

      <Content padding={'0 0 8px 0'} flex={1} overflow={'auto'}>
        <OfferCategoriesSelector
          onChangeIds={setCategoriesIds}
          options={directory}
          defaultData={categoriesIds}
          offer={currentOffer}
        />
      </Content>

      <OverlayFooter canSubmit={canSubmit} loading={loaders.isLoading?.update} />
    </OverlayForm>
  );
};

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
export default OfferCategoriesOverlay;

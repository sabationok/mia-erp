import { RenderOverviewAreaComponent } from '../../components/overview-types';
import { OfferEntity, OfferStatusEnum } from '../../../../types/offers/offers.types';
import React, { useEffect, useMemo, useState } from 'react';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { getStatusData } from '../../../../data/statuses.data';
import { offerStatusesData } from '../../../../data/offers.data';
import { ToastService } from '../../../../services';
import FlexBox from '../../../atoms/FlexBox';
import Changer from '../../../atoms/Changer';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { t } from '../../../../i18e';
import { OverviewAreaHeader } from '../../components/OverviewAreaHeader';
import { AreaStyledComp } from '../../components/CellStyles';
import { useOfferOverviewLoaders } from '../../../AppPages/offers/PageOfferOverview';

export const OfferOverviewStatusChangerCell: RenderOverviewAreaComponent<OfferEntity> = ({ cell, data }) => {
  const loaders = useOfferOverviewLoaders();

  const [canEdit, setCanEdit] = useState(false);
  const [current, setCurrent] = useState<OfferStatusEnum | undefined>(data?.approved);

  const service = useAppServiceProvider()[ServiceName.offers];

  const currentStatusData = useMemo(() => getStatusData(current), [current]);

  const canAccept = useMemo(() => {
    return current !== data?.approved;
  }, [current, data?.approved]);
  const handleCancelPress = () => {
    setCurrent(data?.approved ?? (offerStatusesData[0].value as never));
    setCanEdit(false);
  };

  const handleAcceptPress = () => {
    service.updateById({
      data: { _id: data?._id, data: { approved: current }, refreshCurrent: true },
      onSuccess: () => {
        setCanEdit(false);
        ToastService.success('Product updated');
      },
      onLoading: loaders?.onLoading('offer'),
    });
  };

  useEffect(() => {
    if (data?.approved) {
      setCurrent(data.approved);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AreaStyledComp.Cell>
      <OverviewAreaHeader
        title={cell?.title}
        onCancelPress={handleCancelPress}
        onEditPress={() => setCanEdit(true)}
        editMode={canEdit}
      />

      <FlexBox
        fillWidth
        flex={1}
        justifyContent={'flex-end'}
        alignItems={'stretch'}
        overflow={'hidden'}
        style={{ minHeight: 24 }}
        gap={8}
      >
        {canEdit ? (
          <>
            <Changer
              disabled={!canEdit}
              options={offerStatusesData}
              currentOption={{ value: current }}
              onChange={e => setCurrent(e?.value as never)}
            />

            <FlexBox fxDirection={'row'} gap={8} fillWidth>
              <ButtonIcon variant={'outlinedSmall'} disabled={!canAccept} onClick={handleCancelPress}>
                {t('Cancel')}
              </ButtonIcon>

              <ButtonIcon variant={'filledSmall'} disabled={!canAccept} onClick={handleAcceptPress}>
                {t('Ok')}
              </ButtonIcon>
            </FlexBox>
          </>
        ) : (
          <AreaStyledComp.Tag
            style={{
              alignSelf: 'flex-end',
              borderColor: currentStatusData?.colorSecondary,
              backgroundColor: currentStatusData?.colorSecondary,
            }}
          >
            <AreaStyledComp.CellText $isTitle={!current} $weight={600} $align={'right'}>
              {t(current || 'undefined')}
            </AreaStyledComp.CellText>
          </AreaStyledComp.Tag>
        )}
      </FlexBox>
    </AreaStyledComp.Cell>
  );
};

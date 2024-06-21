import { useLinksSelector } from '../../../../redux/selectors.store';
import TableList from '../../../TableList/TableList';
import { createAuthorColumn, createDateColumn, createEditorColumn } from '../../../../utils';
import { OfferOverviewAddsTabProps } from './types';
import { useAppDispatch } from '../../../../redux/store.store';
import { useEffect } from 'react';
import { getAllLinksThunk } from '../../../../redux/tracking/links/links.thunks';
import { t } from '../../../../lang';

export const LinksTab = ({ selected }: OfferOverviewAddsTabProps) => {
  const dispatch = useAppDispatch();
  const state = useLinksSelector();
  const _offerId = selected?._id;

  useEffect(() => {
    dispatch(
      getAllLinksThunk({
        params: { offerId: _offerId },
      })
    );
  }, [_offerId, dispatch]);

  return (
    <TableList
      actionsCreator={() => {
        return [
          {
            title: 'refresh',
            icon: 'refresh',
            type: 'onlyIcon',
            onClick: () => {
              dispatch(
                getAllLinksThunk({
                  params: { offerId: _offerId },
                })
              );
            },
          },
        ];
      }}
      tableData={state.list}
      tableTitles={[
        {
          top: { name: 'Offer label', getData: rd => rd.offer?.label },
          bottom: { name: 'SKU', getData: rd => rd.offer?.sku },
          action: 'valueByPath',
          width: '250px',
        },

        {
          top: { name: 'Slash tag', getData: rd => rd.slashTag },
          bottom: { name: 'Unic code', getData: rd => rd.code },
          action: 'valueByPath',
          width: '150px',
        },

        {
          top: { name: 'Sales', getData: rd => rd.stats?.sales, align: 'end' },
          bottom: { name: 'Refunds', getData: rd => rd.stats?.refunds, align: 'end' },
          action: 'valueByPath',
          width: '100px',
        },

        {
          top: { name: 'Clicks', getData: rd => rd.stats?.clicks, align: 'end' },
          bottom: { name: 'Errors', getData: rd => rd.stats?.errors, align: 'end' },
          action: 'valueByPath',
          width: '100px',
        },

        {
          top: { name: 'Status', getData: rd => (rd.isActive ? 'Active' : 'Not active') },
          bottom: { name: 'Is deleted', getData: rd => (rd.deletedAt ? t('Yes') : t('No')) },
          action: 'valueByPath',
          width: '125px',
        },

        {
          top: { name: 'Device ID', getData: rd => rd.deviceId },
          bottom: { name: 'Cookies ID', getData: rd => rd.cookiesId },
          action: 'valueByPath',
          width: '250px',
        },

        {
          top: { name: 'Domain', getData: rd => rd.referer },
          bottom: { name: 'Url referer', getData: rd => rd.domain },
          action: 'valueByPath',
          width: '210px',
        },
        {
          top: { name: 'Ip address', getData: rd => rd.ip },
          bottom: { name: 'User agent', getData: rd => rd.userAgent },
          action: 'valueByPath',
          width: '450px',
        },

        {
          top: { name: 'Url', getData: rd => rd.url },
          bottom: { name: 'Destination Url', getData: rd => rd.destinationUrl },
          action: 'valueByPath',
          width: '450px',
        },

        createAuthorColumn(),
        createEditorColumn(),
        createDateColumn(),
      ]}
    ></TableList>
  );
};

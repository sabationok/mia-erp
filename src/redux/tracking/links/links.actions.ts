import { Action } from '@reduxjs/toolkit';
import { getAllLinksThunk } from './links.thunks';

export function onGetAllLinksMather(a: Action) {
  return a.type === getAllLinksThunk.fulfilled;
}

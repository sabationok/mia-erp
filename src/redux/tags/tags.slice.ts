import { createSlice } from '@reduxjs/toolkit';
import * as thunks from './tags.thunks';
import { TagEntity } from '../../types/tags.types';
import { TagTypeEnum } from '../../types/directories.types';
import { ObjectValues, sliceCleaner } from '../../utils';
import { onUserLogout } from '../auth/auth.actions';

export interface TagsState {
  list: TagEntity[];
  listsMap: Record<TagTypeEnum, TagEntity[]>;
}

const initState: TagsState = {
  list: [],

  listsMap: Object.assign(
    {},
    ...ObjectValues(TagTypeEnum).map(key => {
      return { [key]: [] };
    })
  ),
};
export const tagsSlice = createSlice({
  name: 'tags',
  reducers: {},
  initialState: initState,
  extraReducers: builder =>
    builder
      .addCase(thunks.getAllTagsThunk.fulfilled, (st, a) => {
        const type = a.payload.params?.type;
        if (type) {
          let list = st.listsMap[type];

          list = a.payload.upend
            ? list.concat(a.payload.data)
            : a.payload.prepend
              ? a.payload.data.concat(list)
              : a.payload.data;

          st.listsMap[type] = list;
        } else {
          st.list = a.payload.upend
            ? st.list.concat(a.payload.data)
            : a.payload.prepend
              ? a.payload.data.concat(st.list)
              : a.payload.data;
        }
      })
      .addCase(thunks.createTagThunk.fulfilled, (st, a) => {
        const type = a.payload.data?.type;

        if (type) {
          let list = st.listsMap[type];
          console.log('createTagThunk', { type });
          list = a.payload.upend ? list.concat([a.payload.data]) : [a.payload.data].concat(st.list);
          st.list = list;
        } else {
          st.list = a.payload.upend ? st.list.concat([a.payload.data]) : [a.payload.data].concat(st.list);
        }
        return st;
      })
      .addCase(thunks.updateTagThunk.fulfilled, (st, a) => {
        const type = a.payload.data?.type;

        if (type) {
          let list = st.listsMap[type];
          const index = list.findIndex(item => item._id === a.payload.data._id);

          if (index >= 0) {
            list[index] = a.payload.data;
          }
          st.list = list;
        } else {
          const index = st.list.findIndex(item => item._id === a.payload.data._id);
          if (index >= 0) {
            st.list[index] = a.payload.data;
          }
        }
        return st;
      })
      .addMatcher(onUserLogout, sliceCleaner(initState)),
});

/* eslint-disable no-unused-vars */
import server from 'axios';
import { mergeDeepRight } from 'ramda';

//Reducer
export function zitatReducer(state = {}, action) {
  switch (action.type) {
    case ZITAT_CHANGED:
      return { ...state, zitat: action.payload };
    case SEVER_ZITATE_REQUEST:
      return mergeDeepRight(state, { zitate: action.payload });

    default:
      return state;
  }
}

// selectors API
export const getZitat = state => state.zitat.zitat;
export const getZitate = state => state.zitat.zitate;

// action types
export const ZITAT_CHANGED = 'zitat/zitatChanged';
export const SEVER_ZITATE_REQUEST = 'zitat/serverZitateRequest';

// action creators
export const changeZitat = zitat => ({
  type: ZITAT_CHANGED,
  payload: zitat,
});

export const getSeverZitate = (AuthorID, BookID) => {
  return async function (dispatch) {
    const response = await server.get('/show', {
      params: {
        AuthorID: AuthorID,
        BookID: BookID,
      },
    });

    dispatch({
      type: SEVER_ZITATE_REQUEST,
      payload: response.data,
    });
  };
};

/* eslint-disable no-unused-vars */
import server from 'axios';

//import { prepend, mergeDeepRight } from 'ramda';

const initalState = {
  zitat: 'Bier her!',
  zitate: {
    zitat1: 'Mehr Bier her!',
    zitat2: 'Viel mehr Bier her!',
  },
};
//Reducer
export function zitatReducer(state = initalState, action) {
  switch (action.type) {
    case ZITAT_CHANGED:
      return { ...state, zitat: action.payload };
    case SEVER_ZITATE_REQUEST:
      return { ...state, zitate: action.payload };

    default:
      return state;
  }
}

// selectors API
export const getZitat = state => state.zitat.zitat;
export const getZitateList = state => state.zitat.zitate;

// action types
export const ZITAT_CHANGED = 'zitat/zitatChanged';
export const SEVER_ZITATE_REQUEST = 'zitat/serverZitateRequest';

// action creators
export const changeZitat = zitat => ({
  type: ZITAT_CHANGED,
  payload: zitat,
});

export const getSeverZitate = () => {
  console.log(getZitat);
  return async function (dispatch) {
    const response = await server.get('/select');

    dispatch({
      type: SEVER_ZITATE_REQUEST,
      payload: [response.data],
    });
  };
};

import axios from 'axios';
import { mergeDeepRight } from 'ramda';

// REDUCER
// The formreducer mainly takes care of writing the data of the form into the database.

export function formReducer(state = {}, action) {
  switch (action.type) {
    case ZITAT_INPUT:
      return mergeDeepRight(state, { zitate: action.payload });

    default:
      return state;
  }
}

// action types

const ZITAT_INPUT = 'zitat/input';

// action creator

export const inputZitat = zitate => {
  return async function (dispatch) {
    await axios
      .post('/insert/zitat2', zitate)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    dispatch({ type: ZITAT_INPUT, payload: zitate });
  };
};

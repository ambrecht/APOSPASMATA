import axios from 'axios';
import { mergeDeepRight } from 'ramda';

// REDUCER
// The formreducer mainly takes care of writing the data of the form into the database.

export function addAuthorBookReducer(state = {}, action) {
  switch (action.type) {
    case AUTHOR_INPUT:
      return mergeDeepRight(state, { author: action.payload });
    case BOOK_INPUT:
      return mergeDeepRight(state, { book: action.payload });

    default:
      return state;
  }
}

//selectors
export const getAuthor = state => state.formInput;

// action types

const AUTHOR_INPUT = 'formInput/author';
const BOOK_INPUT = 'formInput/book';

// action creator

export const formInputAuthor = data => {
  return async function (dispatch) {
    const res = await axios.post(`/insert/author`, data);

    const author = mergeDeepRight(
      { value: res.data },
      { label: data.author.vorname + ' ' + data.author.nachname }
    );
    dispatch({ type: AUTHOR_INPUT, payload: author });
  };
};

export const formInputBook = data => {
  return async function (dispatch) {
    const res = await axios.post(`/insert/book`, data);

    const book = mergeDeepRight({ value: res.data }, { label: data.buchtitel });
    dispatch({ type: BOOK_INPUT, payload: book });
  };
};

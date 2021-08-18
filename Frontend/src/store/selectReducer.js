import axios from 'axios';
import { prepend, mergeDeepRight } from 'ramda';

// REDUCER
//The SELECT-Reducer retrieves the existing options from the database
// and formats them for the react-select component
export function selectReducer(state = {}, action) {
  switch (action.type) {
    case GET_AUTHOR_OPTIONS:
      return mergeDeepRight(state, { autorOpts: action.payload });
    case SET_SELECT_OPTIONS:
      return { autorOpts: prepend(action.payload, state.autorOpts) };
    case SET_SELECTION_VALUE:
      return mergeDeepRight(state, { selectedAuthor: action.payload });
    case GET_BOOK_OPTIONS:
      return mergeDeepRight(state, { bookOpts: action.payload });
    case SET__BOOK_SELECTION_VALUE:
      return mergeDeepRight(state, { selectedBook: action.payload });
    default:
      return state;
  }
}

// action types
const GET_AUTHOR_OPTIONS = 'select/getAuthoroptions';
const GET_BOOK_OPTIONS = 'select/getBookoptions';
const SET_SELECT_OPTIONS = 'select/setAuthoroptions';
const SET_SELECTION_VALUE = 'select/setselection';
const SET__BOOK_SELECTION_VALUE = 'select/setBookselection';

//selectors
export const getOptions = state => state.selectOptions;

// action creators

export const getSelectOptions = () => {
  return async function (dispatch) {
    const response = await axios.get('/getoptions/author');
    const toSelectedOptions = x => ({
      value: x.id,
      label: x.vorname + ' ' + x.nachname,
    });

    const options = response.data.map(toSelectedOptions);
    dispatch({ type: GET_AUTHOR_OPTIONS, payload: options });
  };
};

export const setSelectOptions = autor => {
  return async function (dispatch) {
    const current = {
      value: autor.autorId,
      label: autor.vorname + ' ' + autor.nachname,
    };
    dispatch({ type: SET_SELECT_OPTIONS, payload: current });
    console.log(current);
  };
};

export const setSelectionValue = value => {
  return async function (dispatch) {
    dispatch({ type: SET_SELECTION_VALUE, payload: [value] });
  };
};

export const setBookSelectionValue = value => {
  return async function (dispatch) {
    dispatch({ type: SET__BOOK_SELECTION_VALUE, payload: [value] });
  };
};

export const getBookOptions = id => {
  return async function (dispatch) {
    const response = await axios.get('/getoptions/book', {
      params: {
        ID: id,
      },
    });

    const toSelectedOptions = x => ({
      value: x.id,
      label: x.titel,
    });
    const bookOptions = response.data.map(toSelectedOptions);

    dispatch({ type: GET_BOOK_OPTIONS, payload: bookOptions });
  };
};

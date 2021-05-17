import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setBookSelectionValue, getBookOptions } from '../../store/selectReducer';

export default function selectForm() {
  const AuthorID = useSelector(store => store.selectOptions.selectedAuthor);

  const dispatch = useDispatch();

  const currBook = useSelector(store => store.authorBook.book);

  const [bookOpt, setbookOpt] = useState();

  useEffect(() => {
    AuthorID ? dispatch(getBookOptions(AuthorID[0].value)) : false;
    setbookOpt(false);
  }, [AuthorID]);

  useEffect(() => {
    currBook ? setbookOpt(currBook) : false;
    currBook && dispatch(setBookSelectionValue(currBook));
  }, [currBook]);

  const bookOptions = useSelector(store => store.selectOptions.bookOpts);

  const onChangeAut = selected => {
    dispatch(setBookSelectionValue(selected));
    setbookOpt(selected);
  };

  return (
    <div>
      <Select onChange={onChangeAut} value={bookOpt} options={bookOptions} />
    </div>
  );
}

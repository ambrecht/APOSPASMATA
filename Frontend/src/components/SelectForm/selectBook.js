import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setBookSelectionValue, getBookOptions } from '../../store/selectReducer';

export default function SelectForm() {
  const AuthorID = useSelector(store => store.selectOptions.selectedAuthor);

  const dispatch = useDispatch();

  const currBook = useSelector(store => store.authorBook.book);

  const [bookOpt, setbookOpt] = useState();

  useEffect(() => {
    AuthorID && dispatch(getBookOptions(AuthorID[0].value));
    setbookOpt(false);
  }, [AuthorID, dispatch]);

  useEffect(() => {
    currBook && setbookOpt(currBook);
    currBook && dispatch(setBookSelectionValue(currBook));
  }, [currBook, dispatch]);

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

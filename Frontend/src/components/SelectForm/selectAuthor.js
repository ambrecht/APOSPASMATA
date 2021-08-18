import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectOptions, getOptions, setSelectionValue } from '../../store/selectReducer';

export default function SelectForm() {
  const dispatch = useDispatch();

  const [option, setOption] = useState();

  const currAut = useSelector(store => store.authorBook.author);

  useEffect(() => {
    dispatch(getSelectOptions());
  }, [dispatch]);

  useEffect(() => {
    currAut && setOption(currAut);
    currAut && dispatch(setSelectionValue(currAut));
  }, [currAut, dispatch]);

  const autoren = useSelector(getOptions).autorOpts;

  const onChangeAut = selected => {
    dispatch(setSelectionValue(selected));
    setOption(selected);
  };

  return (
    <div>
      <Select onChange={onChangeAut} value={option} options={autoren} />
    </div>
  );
}

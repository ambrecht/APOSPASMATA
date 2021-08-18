import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSeverZitate } from '../../store/zitatReducer';
import DragZitat from './DragZitat';
import './ZitatList.scss';

export default function ZitatForm() {
  const dispatch = useDispatch();

  const AuthorID = useSelector(store => store.selectOptions.selectedAuthor);
  const BookID = useSelector(store => store.selectOptions.selectedBook);
  const AuthorBook = AuthorID && BookID;

  useEffect(() => {
    AuthorID && BookID && dispatch(getSeverZitate(AuthorID[0].value, BookID[0].value));
  }, [AuthorBook, AuthorID, BookID, dispatch]);

  const Zitate = useSelector(store => store.zitatOutput.zitate);

  const listZitate = Zitate && Zitate.map(number => <DragZitat key={number.id} number={number} />);

  return <div className="zitateContainer">{listZitate}</div>;
}

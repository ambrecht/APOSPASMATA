/* eslint-disable complexity */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { formInputBook } from '../../store/addAuthorBookReducer';

export default function AddBookForm() {
  const select = useSelector(state => state);

  const selectedAuthor = select.selectOptions.selectedAuthor;
  const dispatch = useDispatch();
  const [displayBook, setdisplayBook] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmitBook = async data => {
    const param = { ...data.book, ...selectedAuthor[0] };
    data.book ? dispatch(formInputBook(param)) : console.log('No Book');
    setdisplayBook(false);
  };

  const BookForm = () => (
    <>
      {' '}
      <input type="text" placeholder="Buchtitel" name="book.buchtitel" ref={register} />
      <input type="text" placeholder="Verlag" name="book.publisher" ref={register} />
      <input type="text" placeholder="Erschinungsjahr" name="book.year" ref={register} />
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmitBook)}>
      {selectedAuthor
        ? displayBook && <BookForm />
        : displayBook && <p>Wähle zu erst einen Autor...</p>}
      <button
        type="button"
        onClick={() => {
          setdisplayBook(!displayBook);
        }}
      >
        {!displayBook ? 'Buch hinzufügen' : 'Buch löschen'}
      </button>
      {displayBook && <button type="submit">Buch speichern...</button>}
    </form>
  );
}

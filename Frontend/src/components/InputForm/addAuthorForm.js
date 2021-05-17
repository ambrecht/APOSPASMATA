import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './inputForm.scss';

import { formInputAuthor } from '../../store/addAuthorBookReducer';

export default function addAuthorForm() {
  const dispatch = useDispatch();
  const [displayAut, setdisplayAut] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmitAuthor = async data => {
    data.author ? dispatch(formInputAuthor(data)) : console.log('No Author');
    setdisplayAut(false);
  };

  const AuthorForm = () => (
    <div className="">
      <input type="text" placeholder="Vorname" name="author.vorname" ref={register} />
      <input type="text" placeholder="Nachname" name="author.nachname" ref={register} />
      <input type="date" placeholder="Geburt" name="author.geburt" ref={register} />
      <input type="date" placeholder="Tot" name="author.tot" ref={register} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmitAuthor)}>
      {displayAut && <AuthorForm />}
      <button
        type="button"
        onClick={() => {
          setdisplayAut(!displayAut);
        }}
      >
        {!displayAut ? 'Autor hinzufügen' : 'Autor löschen'}
      </button>
      {displayAut && <button type="submit">Autor speichern...</button>}
    </form>
  );
}

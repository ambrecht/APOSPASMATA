import React, { useState } from 'react';
import { inputZitat } from '../../store/formReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import './zitatForm.scss';

export default function zitatForm() {
  const dispatch = useDispatch();
  const select = useSelector(store => store.selectOptions);

  const [zitatFields, setZitatFields] = useState([]);
  const [counter, setCounter] = useState(1);
  const { register, handleSubmit, setValue } = useForm();

  const add = () => {
    setZitatFields(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const remove = index => () => {
    setZitatFields(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter);
  };

  const onSubmit = data => {
    const authorID = select.selectedAuthor.reduce(obje => obje).value;
    const bookID = select.selectedBook.reduce(obje => obje).value;
    const final = { authorID, bookID, zitate: data.zitate };
    dispatch(inputZitat(final));
    clearZitate();
  };

  const clearZitate = () => {
    setZitatFields([]);
    setCounter(1);
  };

  const spaceRemove = e => {
    const string = e.target.value.replace(/(\s+)/gm, ' ');
    setValue(`${e.target.name}`, string);
  };

  return (
    <div>
      <form className="zitate__container " onSubmit={handleSubmit(onSubmit)}>
        <ul name="zitate">
          {zitatFields.map(index => (
            <li key={index.toString()}>
              <label>
                Zitat{index}:
                <textarea
                  className="zitatform--textarea"
                  name={`zitate[${index}].text`}
                  placeholder={'Schreib was rein hier'}
                  ref={register}
                  onChange={spaceRemove}
                />
              </label>

              <input
                name={`zitate[${index}].seite`}
                ref={register}
                type="number"
                placeholder="Seitenzahl"
              />
              <input
                name={`zitate[${index}].hashtag`}
                ref={register}
                type="text"
                placeholder="#Hashtag"
              />

              <button onClick={remove(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <section>
          <button
            type="button"
            onClick={() => {
              add();
            }}
          >
            Add
          </button>
          <button type="button" onClick={clearZitate}>
            Clear All
          </button>
        </section>
        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}

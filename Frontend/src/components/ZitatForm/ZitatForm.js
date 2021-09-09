import React from 'react';
import { inputZitat } from '../../store/formReducer';
import { getSeverZitate } from '../../store/zitatReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import './ZitatForm.scss';

export default function ZitatForm() {
  const { control, register, handleSubmit, setValue, getValues } = useForm();
  const { fields, remove, insert } = useFieldArray({
    control,
    name: 'zitate',
  });

  const dispatch = useDispatch();
  const select = useSelector(store => store.selectOptions);

  const copy1 = index => {
    console.log(index, getValues(), getValues(index));
    navigator.clipboard.writeText(getValues(index));
  };

  const sendDeepl = value => {
    const text = getValues(value);
    const prepare = text.replace(/ /g, '%20');
    const url = `https://www.deepl.com/translator#en/de/${prepare}`;
    window.open(url);
  };

  const onSubmit = data => {
    console.log(data);
    const authorID = select.selectedAuthor.reduce(obje => obje).value;
    const bookID = select.selectedBook.reduce(obje => obje).value;
    const final = { authorID, bookID, zitate: data.zitate };
    dispatch(inputZitat(final));
    updateList(authorID, bookID);
    remove();
  };
  const updateList = (authorID, bookID) => {
    dispatch(getSeverZitate(authorID, bookID));
  };

  const spaceRemove = e => {
    const string = e.target.value.replace(/(\s+)/gm, ' ');
    setValue(`${e.target.name}`, string);
  };

  return (
    <div>
      <form className="zitate__container " onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <textarea
                className="zitatform--textarea"
                name={`zitate[${index}].value`}
                ref={register()}
                defaultValue={`Schreibe dein Zitat...`}
                onChange={spaceRemove}
              />

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
              <button type="button" onClick={() => copy1(`zitate[${index}].value`)}>
                Copy
              </button>
              <button type="button" onClick={() => sendDeepl(`zitate[${index}].value`)}>
                Deepl
              </button>
            </li>
          );
        })}
        <button type="button" onClick={() => insert(parseInt(2, 10))}>
          Weiteres Zitat
        </button>
        <button type="button" onClick={handleSubmit(onSubmit)}>
          Speichern
        </button>
      </form>
    </div>
  );
}

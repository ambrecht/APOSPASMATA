import React from 'react';
import LogoHeader from './LogoHeader/LogoHeader';
import Zitatform from './ZitatForm/ZitatForm';
import AddAuthorForm from './InputForm/AddAuthorForm';
import AddBookForm from './InputForm/AddBookForm';
import SelectBook from './SelectForm/SelectBook';
import SelectAuthor from './SelectForm/SelectAuthor';
import ZitatOutput from './ZitatOutput/ZitatOutput';

const App = () => {
  return (
    <div className="container">
      <LogoHeader />

      <SelectAuthor />
      <AddAuthorForm />
      <SelectBook />
      <AddBookForm />
      <Zitatform />
      <ZitatOutput />
    </div>
  );
};

export default App;

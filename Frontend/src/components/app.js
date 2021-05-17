import React from 'react';
import LogoHeader from './logoHeader/logoHeader';
import Zitatform from './zitatForm/zitatForm';
import AddAuthorForm from './InputForm/addAuthorForm';
import AddBookForm from './InputForm/addBookForm';
import SelectBook from './SelectForm/selectBook';
import SelectAuthor from './SelectForm/selectAuthor';

const App = () => {
  return (
    <div className="container">
      <LogoHeader />

      <SelectAuthor />
      <AddAuthorForm />
      <SelectBook />
      <AddBookForm />
      <Zitatform />
    </div>
  );
};

export default App;

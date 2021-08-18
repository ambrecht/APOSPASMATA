'use strict';

module.exports = async function (fastify, opts, next) {
  fastify.post('/search', searchZitate);

  const db = fastify.db;

  function searchZitate(req, rep) {
    const { authorID, bookID } = req.body;

    db.any('SELECT * FROM users WHERE name = ${name} AND active = ${active}', {
      name: 'John',
      active: true,
    })
      .then((data) => {
        console.log('DATA:', data); // print data;
      })
      .catch((error) => {
        console.log('ERROR:', error); // print the error;
      });
  }
  next();
};

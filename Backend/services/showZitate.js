'use strict';

module.exports = async function (fastify, opts, next) {
  fastify.get('/show', showZitate);

  const db = fastify.db;

  async function showZitate(req, rep) {
    const input = JSON.parse(JSON.stringify(req.query));
    const { AuthorID, BookID } = input;

    return await db
      .manyOrNone('SELECT * FROM zitate WHERE autor_id = $1 AND buch_id =$2', [
        AuthorID,
        BookID,
      ])
      .then((data) => {
        return data; // print data;
      })
      .catch((error) => {
        console.log('ERROR:', error); // print the error;
      });
  }
  next();
};

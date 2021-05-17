'use strict';

module.exports = async function (fastify, opts, next) {
  fastify.post('/insert/book', getInsertBookId);

  const db = fastify.db;

  async function getInsertBookId(values) {
    const BookId = db.task('getInsertBookId', async (t) => {
      const { buchtitel, publisher, year, value } = values.body;
      const ID = await t.oneOrNone(
        'SELECT id FROM buecher WHERE titel = $1',
        buchtitel,
        (book) => book && book.id,
      );
      return (
        ID ||
        (await t.one(
          'INSERT INTO buecher (titel, verlag, jahr, autor_id) VALUES($1, $2, $3, $4) RETURNING id',
          [buchtitel, publisher, year, value],
          (book) => book.id,
        ))
      );
    });
    return BookId;
  }

  next();
};

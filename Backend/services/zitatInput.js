'use strict';

module.exports = async function (fastify, opts, next) {
  fastify.post('/insert/zitat2', InsertZitate);

  const db = fastify.db;

  function InsertZitate(req, rep) {
    const { authorID, bookID } = req.body;

    db.tx(async (t) => {
      const queries = [];
      req.body.zitate.map((zitat) => {
        queries.push(
          t.none(
            'INSERT INTO zitate (zitat, seitenzahl, buch_id, autor_id) VALUES($1, $2, $3, $4)',
            [zitat.value, zitat.seite, bookID, authorID],
          ),
        );
      });
      await t.batch(queries);
      rep.send('zitate wurden eingepflecht');
    });
  }
  next();
};

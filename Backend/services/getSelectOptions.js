'use strict';

module.exports = async function (fastify, opts, next) {
  fastify.get('/getoptions/author', getSelectOptions);

  const db = fastify.db;

  async function getSelectOptions() {
    let query = 'SELECT id, vorname, nachname, geburt, tod FROM autoren';

    return await db.manyOrNone(query);
  }
  fastify.get('/getoptions/book', getSelectBookOptions);

  async function getSelectBookOptions(req) {
    return await db.manyOrNone(
      'SELECT id, titel FROM buecher WHERE autor_id = $1',
      [req.query.ID],
    );
  }
};

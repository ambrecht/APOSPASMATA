'use strict';

module.exports = async function (fastify, opts, next) {
  fastify.post('/insert/author', getInsertAuthorId);

  const db = fastify.db;

  async function getInsertAuthorId(values) {
    const AuthorId = db.task('getInsertAuthorId', async (t) => {
      const { vorname, nachname, geburt, tot } = values.body.author;
      const authorId = await t.oneOrNone(
        'SELECT id FROM autoren WHERE vorname = $1 AND nachname = $2',
        [vorname, nachname],
        (author) => author && author.id,
      );
      return (
        authorId ||
        (await t.one(
          'INSERT INTO autoren(vorname, nachname, geburt, tod) VALUES($1, $2, $3, $4) RETURNING id',
          [vorname, nachname, geburt, tot],
          (author) => author.id,
        ))
      );
    });
    return AuthorId;
  }

  next();
};

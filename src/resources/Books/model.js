const db = require("../../../utills/database");
const { buildBooksDatabase } = require("../../../utills/mochData");

function Book() {
  function createATable() {
    const sql = `
        DROP TABLE IF EXISTS books;
      
        CREATE TABLE IF NOT EXISTS books (
            id              SERIAL        PRIMARY KEY,
            title           VARCHAR(255)   NOT NULL,
            type            VARCHAR(255)   NOT NULL,
            author          VARCHAR(255)   NOT NULL,
            topic           VARCHAR(255)   NOT NULL,
            publicationDate DATE           NOT NULL
        );
        `;
    db.query(sql)
      .then((result) => console.log("[DB] Book table is ready.."))
      .catch(console.error);
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const books = buildBooksDatabase();

    books.forEach((book) => {
      db.query(createBook, Object.values(book)).catch(console.error);
    });
  }

  async function getSpecificType(type) {
    const sql = `
        SELECT *
        FROM "books"
        WHERE type = $1
        `;

    const result = await db.query(sql, [type]);
    return result.rows;
  }

  async function getSpecifTypeTopic(type, topic) {
    const sql = `
        SELECT type, topic
        FROM "books"
        WHERE type = $1 AND topic = $2;
        `;

    const result = await db.query(sql, [type, topic]);
    return result.rows;
  }

  async function getByAuthor(author) {
    const sql = `
        SELECT *
        FROM "books"
        WHERE author = $1
        `;

    const result = await db.query(sql, [author]);
    return result.rows;
  }

  createATable();
  mockData();

  return {
    getSpecificType,
    getSpecifTypeTopic,
    getByAuthor,
  };
}

module.exports = Book;

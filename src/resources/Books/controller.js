const e = require("express");
const db = require("../../../utills/database");
const Book = require("./model");

const { getSpecificType, getSpecifTypeTopic, getByAuthor } = Book();

function getSpecificBookType(req, res) {
  const type = req.params.type;
  const topic = req.query.topic;

  if (topic) {
    getSpecifTypeTopic(type, topic)
      .then((books) => res.json({ data: books }))
      .catch((error) => res.json({ error: error.message }));
  } else {
    getSpecificType(type)
      .then((books) => res.json({ data: books }))
      .catch((error) => res.json({ error: error.message }));
  }
}

function sortByAuthor(req, res) {
  const author = req.params.author;

  getByAuthor(author)
    .then((authors) => res.json({ authors: author }))
    .catch((error) => res.json({ error: error.message }));
}

// function getAllBooks(req, res) {
//   const type = req.query.type;
//   if (type) {
//     getSpecificType(type)
//       .then((books) => res.json({ data: books }))
//       .catch((error) => res.json({ error: error.message }));
//   } else {
//     getAll()
//       .then((books) => res.json({ data: books }))
//       .catch((error) => res.json({ error: error.message }));
//   }
// }

module.exports = { getSpecificBookType, sortByAuthor };

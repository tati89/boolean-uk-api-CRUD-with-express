const express = require("express");
const morgan = require("morgan");

const db = require("../utills/database");
const booksRouter = require("../src/resources/Books/router");

const app = express();

//middlwear
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.json({ msg: true });
});

//start server
const port = 3030;
app.listen(port, () => {
  db.connect((error) => {
    if (error) {
      console.error("[ERROR] connection error: ", error.stack);
    } else {
      console.log("[DB] Connected...");
    }
  });
  console.log(`Server is runnong on http://localhost:${port}`);
});

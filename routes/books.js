const router = require("express").Router();
const Book = require("../models/Book");

router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(200).json({ data: book });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({ data: books });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({ data: book });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

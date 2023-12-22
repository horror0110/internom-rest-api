const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: Array,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: Number,
    material: String,
    balance: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);

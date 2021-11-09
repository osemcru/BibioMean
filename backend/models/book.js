//name, author, yearPublication, registerDate, pages, gender, price

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  yearPublication: String,
  registerDate: { type: Date, default: Date.now },
  pages: Number,
  gender: String,
  price: Number,
});

const book = mongoose.model("books", bookSchema);

export default book;

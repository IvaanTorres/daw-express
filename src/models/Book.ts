import mongoose from 'mongoose'

//! INTERFACES
//* Exporting the interface, we can use it everywhere
interface Book extends mongoose.Document {
  title: String
  editorial: String
  price: Number
}

//! SCHEMA
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  editorial: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
  },
})

//* Using the Schema, we create a MongoDB Collection called 'books' which will follow the requirements
let BookModel = mongoose.model<Book>('books', BookSchema)
export { Book, BookSchema, BookModel }

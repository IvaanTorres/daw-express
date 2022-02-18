import mongoose from 'mongoose'
import { Author, AuthorSchema } from './Author'
import { CommentSchema, Comment } from './Comment'

//! INTERFACES
//* When we create a new Book Obj, we'll have autocomplete
interface Book extends mongoose.Document {
  title: String
  editorial: String
  price: Number
  author: Author
  comments: Comment[]
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
  author: AuthorSchema, //! Para subdocumentos hay que usar el Schema apropiado
  comments: [CommentSchema],
})

//* Using the Schema, we create a MongoDB Collection called 'books' which will follow the requirements
let BookModel = mongoose.model<Book>('books', BookSchema)
export { Book, BookSchema, BookModel }

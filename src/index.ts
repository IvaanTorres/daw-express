import app from './app'
//! MODELS
import { BookModel, Book } from './models/Book'

/* -------------------------------- DATABASE -------------------------------- */
import('./database')

/* ----------------------------------- APP ---------------------------------- */
const PORT = 3001
app.listen(PORT)
console.log('Server is running on port', PORT)

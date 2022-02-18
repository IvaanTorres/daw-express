import app from './app'
//! MODELS
import { BookModel, Book } from './models/Book'

/* -------------------------------- DATABASE -------------------------------- */
import('./database')

/* ----------------------------------- APP ---------------------------------- */
app.listen(app.get('port'), () => {
  console.log('Server is running on port', app.get('port'))
})

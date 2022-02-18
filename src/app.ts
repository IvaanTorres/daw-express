import express from 'express'
import morgan from 'morgan'
import bookRoutes from './routes/book'
import authorRoutes from './routes/author'
const app = express()

//! MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json()) //Transform data to JSON before dealing with it
/* app.use((req, res, next) => {
  console.log('Not working currently...')
}) */

//! ROUTER
app.use('/api/books', bookRoutes)
app.use('/api/authors', authorRoutes)

export default app

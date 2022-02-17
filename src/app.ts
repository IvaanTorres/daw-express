import express from 'express'
import morgan from 'morgan'
import bookRoutes from './routes/book'
const app = express()

//! MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json()) //Transform data to JSON before dealing with it

//! ROUTER
app.use('/api/books', bookRoutes)

export default app

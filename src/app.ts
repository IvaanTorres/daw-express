import express from 'express'
import morgan from 'morgan'
import { engine } from 'express-handlebars'
import path from 'path'
import bookRoutes from './routes/book'
import authorRoutes from './routes/author'
import indexRoutes from './routes/index'
const app = express()

//! SETTINGS
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname + '/views')) //Set where is the views folder
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir: path.join(app.get('views'), '/partials'),
    helpers: require('./lib/helpers'), //? Es require() y no import() porque este último es una promesa
    defaultLayout: 'main',
  })
) //We set the handlebars template config
app.set('view engine', '.hbs') //We use the template view called .hbs
app.enable('view cache') //Enable cache when using views

//! MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json()) //Transform data to JSON before dealing with it
app.use(express.urlencoded({ extended: false })) //Makes readable form data sent from client
/* app.use((req, res, next) => {
  console.log('Not working currently...')
}) */

//! ROUTER
app.use('/', indexRoutes)
app.use('/books', bookRoutes)
app.use('/authors', authorRoutes)

//! STATIC FILES
app.use(express.static(path.join(__dirname + '/public/'))) //CSS & JS will be there so any file can access

export default app

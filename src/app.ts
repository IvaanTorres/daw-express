import express from 'express'
import morgan from 'morgan'
import { engine } from 'express-handlebars'
import path from 'path'
import methodOverride from 'method-override'
import session from 'express-session'

//! ROUTES
import bookRoutes from './routes/book'
import authorRoutes from './routes/author'
import indexRoutes from './routes/index'
import authRoutes from './routes/auth'

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
app.use(express.urlencoded({ extended: false })) //Makes readable form data sent from client
app.use(express.json()) //Transform data to JSON before dealing with it
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  })
)
//Redeclare SESSION Variables in order to make them usable inside the code
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any }
    role: { [key: string]: any }
  }
}
app.use(
  session({
    secret: '1234',
    resave: true,
    saveUninitialized: false,
  })
)
//Make SESSIONS local to use them in views
app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})
/* app.use((req, res, next) => {
  console.log('Not working currently...')
}) */

//! ROUTER
app.use('/', indexRoutes)
app.use('/auth', authRoutes)
app.use('/books', bookRoutes)
app.use('/authors', authorRoutes)

//! STATIC FILES
app.use(express.static(path.join(__dirname + '/public/'))) //CSS & JS will be there so any file can access

export default app

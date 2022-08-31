//Load config
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const methodOverride = require('method-override');

const Job = require('./models/job.js')
const User = require('./models/users.js')



const PORT = process.env.PORT;

const SESSION_SECRET = process.env.SESSION_SECRET


app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use((req, res, next) => {
	res.locals.currentUser = req.session.currentUser


	next()
})

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection

db.on('error', (error)=> {
  console.error(error)
})
db.once('open', ()=> {
  console.log(`Connected to Database ${db.host}:${db.port}`)
})
//Middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const jobsController = require('./controllers/jobsController.js')
app.use('/jobs', jobsController)


const userController = require('./controllers/userController.js')
app.use('/users', userController)


//Default
app.get('/', (req, res) => {
	res.render('homepage.ejs');
});


app.listen(PORT, ()=> console.log('Server Started'))
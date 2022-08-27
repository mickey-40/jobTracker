require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Job = require('./models/job.js')
const jobsController = require('./controllers/jobs.js')
app.use('/jobs', jobsController)
const userController = require('./controllers/userController.js')
app.use('/users', userController)


const methodOverride = require('method-override');

const PORT = process.env.PORT || 5000;

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



//Default
app.get('/', (req, res) => {
	res.render('homepage.ejs');
});


app.listen(PORT, ()=> console.log('Server Started'))
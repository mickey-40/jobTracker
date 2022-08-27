require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Job = require('./models/job.js')
const jobsController = require('./controllers/jobs.js')

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
app.use(express.urlencoded())
app.use(methodOverride('_method'))

app.use('/jobs', jobsController)

//Default
app.get('/', (req, res) => {
	const today = new Date();
	res.send(`
    <h1>Hello! This is the Job Tracker app</h1>
    <p>Thanks for using our site</p>
    <p>${today}</p>
  `);
});


app.listen(PORT, ()=> console.log('Server Started'))
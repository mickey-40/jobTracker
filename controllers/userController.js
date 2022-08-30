const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/users.js')

router.get('/register', (req, res) => {
  res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
  const salt = bcrypt.genSaltSync(10)
  console.log(req.body)
  req.body.password = bcrypt.hashSync(req.body.password, salt)

  User.findOne({username: req.body.username}, (err, userExists) => {
    if(userExists) {
      
        res.send('that username is taken')
      
    } else {
      User.create(req.body, (err, createdUser) => {
        // console.log(createdUser)
        // res.send('user created')
        req.session.currentUser = createdUser
        res.redirect('/jobs')
      })
    }
  })
  
})

router.get('/signin', (req, res) => {
  res.render('users/signin.ejs')
})

router.post('/signin', (req, res) => {
  // we need to get the user with that username
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (foundUser) {
      // if they do exist, we need compare their passwords
      // we can compare passwords using bcrypt's compareSync function
      const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
      // compareSync returns true if they match
      // and false if they don't match
      // if the passwords match, log then in
      if (validLogin) {
        req.session.currentUser = foundUser
        // we are letting session know
        // that we have logged in
        res.redirect('/')
      } else {
        // if they don't match, send a message
        res.send('Invalid username or password')
      }
    } else {
      // if they don't exist, we need to send a message
      res.send('Invalid username or password')
    }
  })
})

// DESTROY session route
router.get('/signout', (req, res) => {
  // this destroy's the session
  req.session.destroy()
  res.redirect('/')
})

module.exports = router

const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true,
    default: Date.now
  },
  interview: {
    type: Boolean,
    required: true,
    default: false
  }
})

const Job = mongoose.model('Job', jobSchema)
module.exports = Job
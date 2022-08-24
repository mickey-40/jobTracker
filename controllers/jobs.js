const express = require('express')
const router = express.Router()
const Job = require('../models/job.js')

//get all
router.get('/', async (req,res)=>{
  
    let jobs = await Job.find({})
    console.log('jobs', jobs)
		res.render('index.ejs', { jobs})
 
    
})


//get one
router.get('/:id',getJob,(req,res)=>{
  res.send(res.job.title)
})
//create one
router.post('/', async (req, res) => {
	if (req.body.interview === 'on') {
		req.body.interview = true;
	} else {
		req.body.interview = false;
	}

	Job.create(req.body, (error, createdJob) => {
		if (error) {
			console.log('error', error);
			res.send(error);
		} else {
			res.redirect('/jobs');
		}
	});
});
//update one
router.patch('/:id',(req,res)=>{
  
})
//deleting one
router.delete('/:id',(req,res)=>{
  
})

async function getJob(req, res, next){
  job = await Job.findById(req.params.id)
  if (job == null){
    let job
    return res.status(404).json({message: 'Cannot find job'})
  }

  res.job = job
  next()
}

module.exports = router
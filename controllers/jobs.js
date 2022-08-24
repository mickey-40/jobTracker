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
// NEW
router.get('/new', (req, res) => {
	res.render('new.ejs');
});

// SHOW
router.get('/:id', async (req, res) => {
	// we must wait for this to finish before running any further lines of code in this function
	const job = await Job.findById(req.params.id);
	res.render('show.ejs', {
		job: job,
	});

	// Fruit.findById(req.params.id, (error, fruit) => {
	// 	res.render('show.ejs', {
	// 		fruit: fruit,
	// 	});
	// })
});


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
// EDIT
router.get('/:id/edit', (req, res) => {
	Job.findById(req.params.id, (err, foundJob) => {
		res.render('edit.ejs', {job: foundJob})
	})
})
//deleting one
router.delete('/:id', (req, res) => {
	Job.findByIdAndRemove(req.params.id, (err, data)=> {
		if(err) console.log(err)
		res.redirect('/jobs')
	})
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
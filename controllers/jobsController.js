const express = require('express')
const router = express.Router()
const Job = require('../models/job.js')

const authRequired = (req, res, next) => {
	if(req.session.currentUser){
		// a user is signed in
		next()
		// next is part of express
		// it does what it says
		// i.e, go on to the next thing
	} else {
		// if there is no user
		res.send('You must be logged in to do that!')
		// res.redirect('/user/signin')
	}
}

//Index
router.get('/', authRequired, async (req,res)=>{
  
    let jobs = await Job.find({})
    console.log('jobs', jobs)
		res.render('index.ejs', { jobs})
 
    
})
// NEW
router.get('/new',authRequired, (req, res) => {
	res.render('new.ejs');
});
// SHOW
router.get('/:id', authRequired, async (req, res) => {
	
	const job = await Job.findById(req.params.id);
	res.render('show.ejs', {
		job: job,
	});

});
//Create
router.post('/', authRequired, async (req, res) => {
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
//destroy
router.delete('/:id', authRequired, (req, res) => {
	Job.findByIdAndRemove(req.params.id, (err, data)=> {
		if(err) console.log(err)
		res.redirect('/jobs')
	})
})
// EDIT
router.get('/:id/edit',authRequired, (req, res) => {
	Job.findById(req.params.id, (err, foundJob) => {
		res.render('edit.ejs', {job: foundJob})
	})
})
//update 
router.put('/:id', (req, res) => {
	if(req.body.interview === 'on') {
		req.body.interview = true
	} else {
		req.body.interview = false
	}
	Job.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
		res.redirect('/jobs')
	})
})



module.exports = router
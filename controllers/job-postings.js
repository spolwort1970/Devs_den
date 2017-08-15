var Jobs = require('../models/model_jobs');

exports.getJobs = function(req, res, next) {
  Jobs.find(function(err, jobs) {
    if(err) {
      res.send(err);
    }

    res.json(jobs);
  });
}

exports.createJobs = function(req, res, next) {
  Jobs.create({
    title: req.body.title,
    type: req.body.type,
    salary: req.body.salary,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    details: req.body.details
  }, function(err, job) {
    if(err){
      res.send(err);
    }
    Jobs.find(function(err, jobs) {
      if(err) {
        res.send(err);
      }
      res.json(jobs);
    });
  });
}

exports.deleteJobs = function(req, res, next) {
  Todo.remove({
    _id : req.params.job_id
  }, function(err, job) {
    res.json(job);
  });
}

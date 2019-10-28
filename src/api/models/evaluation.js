/**
Shengtian Tang
This is the backend api to returnning the user evaluation,
the results will return in JSON format.
*/
var express = require('express');
var router = express.Router();
var dbConn = require('../connection/connection');

// handler accepts the post request and look for user account by user email.
router.post('/', function(req, res) {
  //console.log(req.body);
  var postData = req.body;
  var action = postData.action;
  var pid = postData.PID;

  if (action == 1) {
    var uid = postData.UID;
    var comments = postData.comments;
    var ratings = postData.ratings;
    var userQueryTemplate = `INSERT INTO 5709Project.evaluation (PID, comments, ratings, UID) VALUES ("${pid}", "${comments}", "${ratings}", "${uid}");`;
    dbConn.query(userQueryTemplate, function(errors, results, fields) {
      if (errors) {
        console.error(errors);
        res.send(JSON.stringify({
          status: 'Failure',
          message: 'Something is wrong with database server!'
        }))
      }
    })
  } else {
    var userQueryTemplate = `SELECT evaluation.comments,evaluation.ratings,User.username FROM 5709Project.evaluation INNER JOIN 5709Project.User ON User.UID=evaluation.UID WHERE PID = "${pid}"`;
    dbConn.query(userQueryTemplate, function(errors, results, fields) {
      if (errors) {
        console.error(errors);
        res.send(JSON.stringify({
          status: 'Failure',
          message: 'Something is wrong with database server!'
        }))
      }

      if (results.length > 0) {
        res.send(JSON.stringify({
          status: 'Success',
          data: results
        }));

      } else {
        res.send(JSON.stringify({
          status: 'Failure',
          message: 'Product record does not exist!'
        }));
      }

    })
  }

  //var need_detial = postData.need_detial
  //var name = postData.name
  console.log(userQueryTemplate);
  //console.log(userQueryTemplate);

});

module.exports = router;

var express = require('express');
var router = express.Router();
var dbConn = require('../connection/connection');

router.post('/', function(req, res) {
  var postData = req.body;
  var name = postData.r_name;

  var userQueryTemplate =`SELECT * FROM 5709Project.restaurant WHERE name = "${name}"`;
  console.log(userQueryTemplate);
  dbConn.query(userQueryTemplate, function(errors, results, fields) {
    if (errors) {
      console.error(errors);
      res.send(JSON.stringify({
        status: 'Failure',
        message: 'Something is wrong with database server!'
      }))
    } else {
      res.send(JSON.stringify({
        status: 'Success',
        data: results
      }));
    }
  })
});

module.exports = router;

/**
Shengtian Tang
This is the backend api for getting the product detial,
the results will return in JSON format.
*/
var express = require('express');
var router = express.Router();
var dbConn = require('../connection/connection');

// handler accepts the post request and look for user account by user email.
router.post('/', function(req, res) {
  //console.log(req.body);
  var postData = req.body;
  var category = postData.category;
  var need_detail = postData.need_detail;
  var name = postData.name;

  if (need_detail == 1) {
    if (name == "default_name") {
      var userQueryTemplate = `SELECT * FROM product WHERE product.category = "${category}"`;
    } else {
      var userQueryTemplate = `SELECT * FROM product WHERE product.name = "${name}"`;
    }
  } else if (need_detail == 2) {
    var userQueryTemplate = `SELECT * FROM 5709Project.product WHERE
                              name LIKE '%${name}%'
                              OR description LIKE '%${name}%'
                              OR category LIKE '%${name}%';`;
  } else if (need_detail == 3) {
    console.log(name);
    var userQueryTemplate = `SELECT * FROM product WHERE product.RID = "${name}"`;
  } else {
    var userQueryTemplate = `SELECT name,pictureRef FROM product WHERE product.category = "${category}"`;
  }

  console.log("need_detail: " + need_detail + "\n" + userQueryTemplate);
  //console.log(userQueryTemplate);
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
});

module.exports = router;

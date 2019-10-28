var express = require('express');
var router = express.Router();
var dbConn = require('../connection/connection');

router.post('/', function(req, res) {
  var postData = req.body;
  var n = postData.n;
  console.log(req.body);

  var userQueryTemplate =
    `SELECT name,address,description,restImg,latittude,longitude
    FROM 5709Project.restaurant
    INNER JOIN 5709Project.geo
    WHERE geo.geoID = restaurant.geoID;`;

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

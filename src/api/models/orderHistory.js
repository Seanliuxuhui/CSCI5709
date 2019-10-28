var express = require('express');
var router = express.Router();
var dbConn = require('../connection/connection');

router.post('/', function(req, res) {
  console.log(req.body);
  var postData = req.body;
  var uid = postData.UID;
  var userQueryTemplate =
    `SELECT UID, 5709Project.order.PID, name, description, pictureRef
    FROM 5709Project.order
    INNER JOIN 5709Project.product
    WHERE product.PID = 5709Project.order.PID
    AND 5709Project.order.UID = "${uid}";`;

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

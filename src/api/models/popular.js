var express = require('express');
var router = express.Router();
var dbConn = require('../connection/connection');

router.post('/', function(req, res) {
  var postData = req.body;
  var category = postData.category;
  var need_detial = postData.need_detial
  var name = postData.name
  console.log(req.body);
  var userQueryTemplate =
    `SELECT product.PID,product.name,price,pictureRef,SUM(quantity),AVG(ratings)
    FROM 5709project.order INNER JOIN
    5709project.product ON 5709project.order.PID = product.PID
    INNER JOIN 5709project.evaluation ON product.PID = evaluation.PID
    GROUP BY product.PID
    ORDER BY SUM(quantity) DESC;`;

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

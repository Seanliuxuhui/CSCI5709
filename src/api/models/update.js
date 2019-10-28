var express = require('express');
var router = express.Router();
var dbConn = require('../connection/connection');

router.post('/', function (req, res) {
    var postData = req.body;
    var email = postData.email;
    var password = postData.password;
    var userQuery = `update user set password = "${password}" where email="${email}" `;
    dbConn.query(userQuery, function (errors) {
        if (errors) {
            console.error(errors);
            res.send(JSON.stringify({
                status: 'Failure',
                message: 'Something is wrong with database server!'
            }))
        } else {
            res.send(JSON.stringify(
                {
                    status: 'Success',
                    data: 'Update Successfully!'
                }))
        }
    })
});

module.exports = router;
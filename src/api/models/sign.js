var express = require('express');
var router = express.Router();
var dbConn = require('../connection/connection');

router.post('/', function (req, res) {
    console.log(req.body);
    var postData = req.body;
    var username = postData.username;
    var email = postData.email;
    var password = postData.password;

    var userQueryTemplate = `SELECT * FROM USER WHERE USER.email = "${email}"`;
    dbConn.query(userQueryTemplate, function (errors, results, fields) {
        if (errors) {
            console.error(errors);
            res.send(JSON.stringify({
                status: 'Failure',
                message: 'Something is wrong with database server!'
            }))
        }

        if (results.length > 0) {
            res.send(JSON.stringify(
                {
                    status: 'Failure',
                    message: 'User record  exist!'
                }
            ));

        } else {
            var userQuery = `INSERT INTO user (username,email,password) VALUES ("${username}","${email}","${password}") `;
            dbConn.query(userQuery, function (errors) {
                if (errors) {
                    console.error(errors);
                    res.send(JSON.stringify({
                        status: 'Failure',
                        message: 'Something is wrong with database server!'
                    }))
                }
                else {
                    res.send(JSON.stringify(
                        {
                            status: 'Success'
                        }
                    ));
                }

            })
        }

    })


});

module.exports = router;
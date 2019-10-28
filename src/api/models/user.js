// author: liu xuhui
var express = require('express');
var router = express.Router();
var dbConn = require('../connection/connection');

// handler accepts the post request and look for user account by user email.
router.post('/', function (req, res) {
    var postData = req.body;
    var email = postData.email;
    var hashedPassword = postData.password;
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
            var record = results[0];
            if (record['password'] === hashedPassword) {
                // as sensitive data will be sent to the frontend, password should be removed in case of data security
                delete record['password'];
                res.send(JSON.stringify(
                    {
                        status: 'Success',
                        data: record
                    }
                ));
            } else {
                res.send(JSON.stringify({
                    status: 'Failure',
                    message: 'There is something wrong with password!',
                }))
            }
        } else {
            res.send(JSON.stringify(
                {
                    status: 'Failure',
                    message: 'There is something wrong with username!'
                }
            ));
        }

    })
});

router.post('/update', function (req, res) {
    var postData = req.body;
    var userQuery = `update user set 
    email = "${postData.email}",
    birthdate = "${postData.birthdate}",
    addressLine1 = "${postData.addressLine1}",
    addressLine2 = "${postData.addressLine2}",
    postalcode = "${postData.postalcode}",
    city = "${postData.city}",
    state = "${postData.state}",
    phone = "${postData.phone}"
    where email="${postData.email}" `;
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
})
module.exports = router;
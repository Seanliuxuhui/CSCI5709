// This file handles
//     1) http request for getting balance of specific user
//     2) http request for updating balance of specific user
var express = require('express');
var router = express.Router();
var queryHelper = require('../helper').queryHelper;

// returns specific user's balance
router.get('/balance/:email', function (req, res) {
    var email = req.params.email;
    var userQueryTemplate = `SELECT * FROM USER WHERE USER.email = "${email}"`;
    queryHelper(userQueryTemplate)
        .then(function (queryResult) {
            var userData = queryResult[0];
            var userId = userData.UID;
            var balanceQueryTemplate = `SELECT * FROM WALLET WHERE WALLET.UID = "${userId}"`;
            queryHelper(balanceQueryTemplate)
                .then(function (queryResponse) {
                    if (queryResponse.length > 0) {
                        var balanceData = queryResponse[0];
                        var response = {
                            balance: balanceData.balance,
                        };
                        res.send(
                            JSON.stringify({
                                status: 'Success',
                                data: response,
                            })
                        );
                    } else {
                        res.send(JSON.stringify({
                            status: 'Success',
                            data: {
                                balance: 0
                            }
                        }))
                    }
                })
                .catch(function (error) {
                    res.send(
                        JSON.stringify({
                            status: 'Failure',
                            message: error,
                        })
                    )
                })
        })
        .catch(function (error) {
            console.log(error); // TODO: send an error message to frontend
            res.send(
                JSON.stringify({
                    status: 'Failure',
                    message: error,
                })
            )
        })

});

// update user balance
router.post('/balance/update', function (req, res) {
    var postData = req.body;
    var newBalance = postData.newBalance;
    var email = postData.email;
    var userQueryTemplate = `SELECT * FROM USER WHERE USER.email = "${email}"`;
    queryHelper(userQueryTemplate)
        .then(function (queryResult) {
            var user = queryResult[0];
            var balanceUpdateQuery = `UPDATE WALLET SET balance = ${newBalance} WHERE UID = ${user.UID}`;
            queryHelper(balanceUpdateQuery)
                .then(function (response) {
                    if (response) {
                        res.send(JSON.stringify({
                            status: 'Success',
                            data: {
                                balance: newBalance
                            }
                        }));
                    }
                })
                .catch(function (error) {
                    res.send(JSON.stringify({
                        status: 'Failure',
                        message: error,
                    }));
                });
        })
        .catch(function (error) {
            res.send(JSON.stringify({
                status: 'Failure',
                message: error,
            }))
        })
});




module.exports = router;

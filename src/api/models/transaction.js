// This file handles
//     1) request to add a new transaction
//     2) request to retrieve all transactions for given user
var express = require('express');
var router = express.Router();
var queryHelper = require('../helper').queryHelper;

// request to add a new transaction
router.post('/newTransaction', function (req, res) {
    var tObj = req.body;
    var items = JSON.parse(tObj.items);
    var PIDs = items.map(function (item) {
        return item.PID;
    });
    var promises = [];
    var newTransactionQuery = `INSERT INTO transaction VALUES (0, ${tObj.UID}, ${tObj.timestamp}, ${tObj.totalCost}, ${tObj.subtotal}, "${PIDs}")`
    //console.log("INSERT INTO transaction: "+newTransactionQuery);
    queryHelper(newTransactionQuery)
        .then(function (response) {
            res.send(JSON.stringify({
                status: 'Success',
                data: response,
            }));
            var listTransactionsQuery = `SELECT TID FROM transaction where UID = ${tObj.UID} order by timestamp desc`;
            queryHelper(listTransactionsQuery)
                .then(function (responses) {
                  //console.log("responses.length: "+responses.length);
                    if (responses.length > 0) {
                        var tid = responses[0].TID;
                        items.forEach(function (item) {
                            var newOrderTemplate = `INSERT INTO 5709Project.order values (0, ${tObj.UID}, ${item.PID}, ${tid}, "${new Date().toISOString().slice(0, 19).replace('T', ' ')}", ${item.quantity})`;
                            //console.log("INSERT INTO 5709Project.order: "+newOrderTemplate);
                            promises.push(queryHelper(newOrderTemplate));
                        });
                        Promise.all(promises)
                            .then(function (succRes) {
                                console.log(succRes);
                            })
                            .catch(function (errorMes) {
                                console.log(errorMes)
                            });
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
            res.send(
                JSON.stringify({
                    status: 'Failure',
                    message: error,
                })
            )
        });

});

// request to list all transactions for given user
router.get('/lists/:UID', function (req, res) {
    var UID = req.params.UID;
    var selectQuery = `SELECT * FROM transaction WHERE UID = ${UID}`;
    queryHelper(selectQuery)
        .then(function (response) {
            res.send(JSON.stringify({
                status: 'Success',
                data: response,
            }));
        })
        .catch(function (error) {
            res.send(JSON.stringify({
                status: 'Failure',
                data: error
            }));
        });
} );

module.exports = router;

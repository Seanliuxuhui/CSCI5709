// this file handles http request for calculating total cost. During its calculation,
// different types of discount will be computed as sent along the total cost
var express = require('express');
var router = express.Router();
var queryHelper = require('../helper').queryHelper;
var dayBetween = require('../helper').daysBetween;
var getSum = require('../helper').getSum;
var atNoon = require('../helper').atNoon;

// calculating the HST (15% for Nova Scotia)
function calculateHST (subtotal) {
    return subtotal * 0.15;
}
// Retrieve coupon data for given products
function getCoupon(pids) {
    var couponTemplate = `SELECT * FROM COUPON WHERE COUPON.PID in ("${pids}")`;
    return queryHelper(couponTemplate);
}

// identify if it is a group purchase
function groupPurchaseCheck(prods) {
    var flag = true;
    prods.forEach(function (p) {
        if (p.quantity < 5) {
            flag = false;
        }
    });
    return flag;
}
// function to calculate the groupDiscount
function calGroupDiscount(prods) {

    var resultingDiscounts = [];
    prods.forEach(function (prod) {
        if (prod.quantity >= 10) {
            resultingDiscounts.push(prod.quantity * prod.price * 0.20)
        } else if (prod.quantity >= 7) {
            resultingDiscounts.push(prod.quantity * prod.price * 0.15);
        } else if (prod.quantity >= 5) {
            resultingDiscounts.push(prod.quantity * prod.price * 0.10);
        } else if (prod.quantity >= 3) {
            resultingDiscounts.push(prod.quantity * prod.price * 0.05)
        } else {
            resultingDiscounts.push(0);
        }
    });

    return resultingDiscounts;
}
// retrieve user information based on given email data
function userQuery(email) {
    var queryTemplate = `SELECT * FROM USER WHERE USER.email = "${email}"`;
    return queryHelper(queryTemplate);
}
// identify if user actively uses our services or not
function activeUserRate (user) {
    // check if user has purchases within a week.
    if (dayBetween(new Date(user.timestamp), new Date()) <=7 && user.lastTimePurchased === 1) {
        return 0.95;
    } else return 1;
}
// check whether deliver fee is applicable
function needDeliverFee (items) {
    var flag = true;
    items.forEach(function (it) {
        if (it.quantity > 5) {
            flag = false;
        }
    });
    return flag;
}
// handler accepts post request containing items information, expected response should contain subtotal, driver fee, total cost and discount
router.post('/calCost', function (req, res) {
    var postData = req.body;
    var email = postData.email;
    var pids = postData.pids;
    var items = JSON.parse(postData.items);
    var promises = [];
    // first step to get coupon for each product, if coupon is applicable, it will be applied to the price of product
    promises.push(getCoupon(pids));
    // second step to get user profile
    promises.push(userQuery(email));

    Promise.all(promises).then(function (queryResults) {
        var discountRate = 1;
        var coupons = queryResults[0];
        var userProfile = queryResults[1][0];
        items.forEach(function(item) {
            coupons.forEach(function (c) {
                if (c.PID === item.PID) {
                    item.discount = item.quantity * item.price * (1 - c.rate);
                    c.productName = item.name;
                }
            })
        });

        discountRate *= activeUserRate(userProfile);
        var groupDiscounts = [];
        groupDiscounts = calGroupDiscount(items);

        // calculate subtotal
        var subtotal = items.map(function (item) { return item.quantity * item.price;}).reduce(getSum);

        // calculate discount
        var dis = 0;
        if (groupDiscounts.length > 0) {
            dis = groupDiscounts.reduce(getSum)
        }
        var discount = items.map(function (item) { return item.discount? item.discount : 0;}).reduce(getSum) + dis + (1-discountRate) * subtotal;

        // calculate hst
        var hst = calculateHST(subtotal - discount);

        // calculate Delivery fee
        var deliveryFee = !needDeliverFee(items) || atNoon(new Date())? 0 : 15.00;

        // form response object
        var response = {
            subtotal: subtotal,
            coupons: coupons,
            discount: discount,
            hst: hst,
            deliverFee: deliveryFee,
            total: (subtotal - discount)  + hst + deliveryFee,
        };

        res.send(JSON.stringify({
            status: 'Success',
            data: response,
        }));

    }).catch(function (error) {
        console.log(error)
    })


});

module.exports = router;
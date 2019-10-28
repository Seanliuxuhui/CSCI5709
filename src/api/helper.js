// author: liu xuhui
var dbConn = require('./connection/connection');
// helper module provides global accessible functions that would be used in different modules
module.exports = {
    queryHelper: function (template) {
        return new Promise(function (resolve, reject) {
            dbConn.query(template, function (errors, results, fields) {
                if (errors) {
                    reject(errors)
                }
                resolve(results);
            })
        })
    },
    // function from https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
    daysBetween: function (date1, date2) {
        // transfer one day
        var ONE_DAY = 1000 * 60 * 60 * 24;

        // convert days to millionseconds
        var ms1 = date1.getTime();
        var ms2 = date2.getTime();

        // difference
        var diff = ms2 - ms1;

        // return difference by day
        return Math.round(diff/ONE_DAY);
    },
    // function to calculate the sum of two inputs
    getSum: function (total, num) {
        return total + num;
    },

    // check if the given times is around 12pm to 13pm
    atNoon: function (time) {

        return time.getHours() <= 13 && time.getHours() > 12
    },
};
var express = require('express');
var router = express.Router();
// for routing purpose
router.use('/user', require('./models/user'));
router.use('/product', require('./models/product'));
router.use('/evaluation', require('./models/evaluation'));
router.use('/sign', require('./models/sign'));
router.use('/update', require('./models/update'));
router.use('/checkout', require('./models/checkout'));
router.use('/wallet', require('./models/wallet'));
router.use('/transaction', require('./models/transaction'));
router.use('/popular', require('./models/popular'));
router.use('/orderHistory', require('./models/orderHistory'));
router.use('/location', require('./models/location'));
router.use('/restaurant_info', require('./models/restaurant_info'));




module.exports = router;

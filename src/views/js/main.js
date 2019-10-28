// configurations for dependencies
require.config({
  baseUrL: '../js',
  paths: {
    'formValidation': 'formValidation',
    'crypto-js': 'crypto-js/crypto-js',
    'helper': 'helper',
    'request': 'request',
    'login': 'login',
    'checkout': 'checkout',
    'cardValidate': 'cardValidate',
    'router': 'router',
    'wallet': 'wallet',
    'category': 'category',
    'product_detail': 'product_detail',
    'search': 'search',
    'recommendation': 'recommendation',
    'morerecommendation': 'morerecommendation',
    'order_history': 'order_history',
    'location': 'location',
    'signup': 'signup',
    'updatePassword': 'updatePassword',
    'logout': 'logout',
    'account': 'account',
    'notification': 'notification',
    'cart': 'shopping-cart',
    'restaurant':'restaurant'
  },
});

define(['formValidation',
  'login',
  'category',
  'product_detail',
  'search',
  'signup',
  'updatePassword',
  'checkout',
  'wallet',
  'recommendation',
  'morerecommendation',
  'cart',
  'order_history',
  'location',
  'account',
  'router',
  'restaurant',
  'helper'
], function(
  formValidation,
  login,
  category,
  product_detail,
  search,
  signup,
  updatePassword,
  checkout,
  wallet,
  recommendation,
  morerecommendation,
  cart,
  order_history,
  location,
  account,
  router,
  restaurant,
  helper
) {
  // define a series of handlers for each page

  // check if user has logged in
  if ('user' in sessionStorage && document.getElementById('login')) {
    document.getElementById('login').style.display = "none";
    document.getElementById('my_account').style.display = "block";
  }else {
    if (document.getElementById('my_account')) {
      document.getElementById('my_account').style.display = "none";
    }
    document.getElementById('login').style.display = "block";
  }

  // home page
  if (window.location.pathname === '/home.html' || window.location.pathname === '/' ) {
    document.getElementById('btn_search').addEventListener('click', search.search);
    document.getElementById('deliverContainer').innerHTML = helper.deliverTemplate();
    document.getElementById('partnerContainer').innerHTML = helper.partnerTemplate();
    recommendation.recommendation();
    location.showLocation();
  }
  // signup page
  if (window.location.pathname === '/signup.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    document.getElementById('submit').addEventListener('click', signup.validate);
  }
  // updatepassword page
  if (window.location.pathname === '/passwordUpdate.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    document.getElementById('submit').addEventListener('click', updatePassword.validate);
    document.getElementById('backToAccount').addEventListener('click', function (e) {
      e.preventDefault();
      router.redirect('account.html');
    })
  }

  // login page
  if (window.location.pathname === '/login.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    document.getElementById('submit').addEventListener('click', login.validate);
  }

  // category page
  if (window.location.pathname === '/category.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    category.getCategory();
    //window.addEventListener("load", category.getCategory);
  }

  // product detail page
  if (window.location.pathname === '/product_detail.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    product_detail.getDetail();
    //window.addEventListener("load", product_detail.getdetail);
  }

  // morerecommendation page
  if (window.location.pathname === '/morerecommendation.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    morerecommendation.morerecommendation();
  }

  // order history page
  if (window.location.pathname === '/order_history.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    order_history.getOrderHistory();
  }

  // checkout page
  if (window.location.pathname === '/checkout.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    checkout.display();
  }

  // wallet page
  if (window.location.pathname === '/wallet.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    wallet.display();
  }
  // user account page
  if (window.location.pathname === '/account.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    account.display()
  }

  // shopping cart page
  if (window.location.pathname === '/shopping-cart.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    cart.display();
  }

  // shopping cart page
  if (window.location.pathname === '/restaurant.html') {
    document.getElementById('btn_search').addEventListener('click', search.search);
    restaurant.getRestaurant();
  }
})

// author: liuxuhui
define(['request', 'cardValidate', 'helper', 'notification', 'router'], function (request, cardValidate, helper, notification,  router) {
    var display = function () {
        if (typeof(Storage) !== "undefined") {
            if (!('user' in sessionStorage)) {
                window.location = 'login.html'
            } else {

            if ('items' in sessionStorage) {

                //retrieve items from shopping-cart
                var purcharsedItems = JSON.parse(sessionStorage.getItem('items'));
                purcharsedItems.forEach(function (item, idx) {
                    // create section element for each wanted product
                    var el = document.createElement('section');
                    el.innerHTML = itemTemplate(item, idx);
                    // append each node to parent element
                    document.getElementById('checkoutItems').append(el);
                });

                var userProfile = JSON.parse(sessionStorage.getItem('user'));

                // sending calculate HST request to backend
                var postObj = {
                    method: 'POST',
                    url: `${window.location.origin}/api/checkout/calCost`,
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        email: userProfile.email,
                        pids: purcharsedItems.map(function (item) {
                            return item.PID
                        }),
                        items: JSON.stringify(purcharsedItems),
                    },
                };

                // create section of receipt
                request.httpRequest(postObj)
                    .then(function (costResponse) {
                        var costNode = document.createElement('section');
                        costNode.innerHTML = costTemplate(costResponse);
                        document.getElementById('checkoutItems').append(costNode);

                        // to get balance of your wallet
                        var walletRequestObject = {
                            method: 'GET',
                            url: `${window.location.origin}/api/wallet/balance/${userProfile.email}`,
                        };

                        // adding event listener for backButton
                        document.getElementById('backButton').addEventListener('click', function (e) {
                            e.preventDefault();
                            // TODO: when back button is clicked, go back to shopping cart page
                            // window.location = 'shopping-cart.html';
                            router.redirect('shopping-cart.html');
                        });

                        // sending request for wallet balance
                        request.httpRequest(walletRequestObject)
                            .then(function (balanceObject) {
                                var paymentNode = document.createElement('div');
                                paymentNode.innerHTML = modalTemplate(balanceObject);
                                // append payment methods template to the container
                                document.getElementById('checkoutItems').append(paymentNode);

                                // add eventlistener to wallet radio selection
                                document.getElementById('wallet').addEventListener('click', function (e) {
                                    var creditContainer = document.getElementById('creditcardInput');
                                    if (creditContainer.style.display !== 'none') {
                                        creditContainer.style.display = 'none';
                                    }
                                });

                                // add eventlistener to creditcard radio selection
                                document.getElementById('creditcard').addEventListener('click', function (e) {
                                    var creditContainer = document.getElementById('creditcardInput');
                                    if (creditContainer.style.display === 'none') {
                                        creditContainer.style.display = 'block';
                                    }
                                });

                                // trigger listener when paymentSubmit button is clicked
                                document.getElementById('paymentSubmit').addEventListener('click', function (e) {
                                    var paymentMethod = document.getElementById('wallet').checked ? 'wallet' : 'credit card';

                                    var walletValidated = false,
                                        creditcardValidated = false;

                                    if (paymentMethod === 'wallet') {
                                        if (balanceObject.balance < costResponse.total) {
                                            alert('No sufficient balance for this purchase!');
                                        } else {
                                            walletValidated = true;
                                            notification.display('Successful transaction! <br> We have placed your order!', 'green');
                                        }
                                    } else {
                                        if (cardValidate.validate()) {
                                            creditcardValidated = true;
                                            notification.display('Successful transaction! <br> We have placed your order!', 'green');
                                        } else {
                                            // add changeEvent Listener to these fields
                                            // once inputs are changed, the error indications are removed
                                            var selectorIds = ['cardNumber', 'expiration', 'cvv', 'cardPassword'];
                                            var classNames = ['is-valid', 'is-invalid'];
                                            selectorIds.forEach(function (sid) {
                                                classNames.forEach(function (cname) {
                                                    helper.addOrRemoveClass2SelectorForEvent(sid, 'change', cname);

                                                });
                                            })
                                        }
                                    }
                                    if (walletValidated || creditcardValidated) {
                                        // Once fields are identified with no errors
                                        var succTransObj = {
                                            method: 'POST',
                                            url: `${window.location.origin}/api/transaction/newTransaction`,
                                            headers: {
                                                'Content-type': 'application/x-www-form-urlencoded'
                                            },
                                            params: {
                                                items: JSON.stringify(purcharsedItems),
                                                UID: userProfile.UID,
                                                timestamp: new Date().getTime(),
                                                totalCost: costResponse.total,
                                                subtotal: costResponse.subtotal,
                                            },
                                        };
                                        // issue the request
                                        request.httpRequest(succTransObj)
                                            .then(function (response) {
                                                // when wallet option is used, need to update the balance
                                                if (walletValidated) {
                                                    var newBalance = balanceObject.balance - costResponse.total;
                                                    updateAccountBalance(userProfile, newBalance);
                                                }
                                                sessionStorage.removeItem('items');
                                                setTimeout(function () {
                                                    router.redirect('account.html');
                                                }, 1000);
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                    }
                                });
                            })
                            .catch(function (error) {
                                // alert(error);
                                console.log(error);
                            })
                        ;

                    })
                    .catch(function (error) {
                        // alert(error);
                        console.log(error);
                    })
                }
            }
        }
        else {
            alert('Your browser does not support SessionStorage!');
        }
    }

    // template for product item
    var itemTemplate = function (item, idx) {
        var w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        var appliedWidthStyle = "";
        if (w >= 1600) {
            appliedWidthStyle = 'width:1068px';
        } else if (w >= 1024) {
            appliedWidthStyle = 'width:888px';
        } else {
            appliedWidthStyle = '';
        }
        return `<section class="row col-12 justify-content-center container-margin-bottom ">
        <h2 style="display:none">section header</h2>
        <div class="card card-default">
            <div class="card-body">
                <div class="row align-items-start" style="${appliedWidthStyle}">
                    <!--section for product image-->
                    <div class="col-lg-3 col-md-12 form-group">
                        <img src="../images/${item.pictureRef}" id="item${idx}" alt="item${idx}" width="200" height="150">
                        <label class="form-label text-align-middle">${item.name}</label>
                    </div>
                    <!--section for product description and detail-->
                    <div class="col-lg-8 col-md-12 form-group">
                        <div class="col-12 ">
                            <p>${item.description}</p>
                        </div>
                        <div class="float-right col-4 text-align-bottom threeEm">
                            <p> ${item.quantity} UNITES $ ${item.quantity * item.price} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`
    };

    //template for bill
    var costTemplate = function (cost) {
        return `<section class="row col-12 justify-content-center">
        <h2 style="display:none">section header</h2>
        <div class="row container-fluid card card-default">
            <div class="card-body" >
                <div class="row align-items-start">
                    <p class="text-align-left col-8">Food & Beverage Subtotal</p> <p class="text-align-right col-4">$ ${cost.subtotal.toFixed(2)}</p>
                    <p class="text-align-left col-8">Delivery Fee</p> <p class="text-align-right col-4">$ ${cost.deliverFee.toFixed(2)}</p>
                    <p class="text-align-left col-8">HST</p> <p class="text-align-right col-4">$ ${cost.hst.toFixed(2)}</p>
                    <div class="col-12 separator"></div>
                    <p class="text-align-left col-8">Discount</p> <p class="text-align-right col-4"> -$ ${cost.discount.toFixed(2)}</p>
                    <p class="text-align-left col-8"><span class="strong">Total</span></p> <p class="text-align-right col-4"><span class="strong">$ ${cost.total.toFixed(2)}</span></p>
                </div>
                <div class="row justify-content-between ">
                    <button class="btn btn-outline-success float-right col-4 " id="payButton"  data-toggle="modal" data-target="#paymentModal">Pay</button>
                    <button class="invisible col-4"></button>
                    <button class="btn btn-outline-danger float-left col-4" id="backButton">Back to Shopping-cart</button>
                </div>
            </div>
        </div>
    </section>`
    };

    // template for payment methods
    var modalTemplate = function (wallet) {
        return `
                  <div class="modal" id="paymentModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                      
                        <div class="modal-header">
                          <h4 class="modal-title">Payment</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        
                        <div class="modal-body">
                            <div class="container">
                                <div>
                                    <div class="form-check">
                                      <label class="form-check-label" for="wallet">
                                         <input type="radio" class="form-check-input" value="wallet" id="wallet" name="paymentMethod" checked> Wallet (Balance: ${wallet.balance})
                                      </label>
                                    </div>
                                    <div class="form-check">
                                     <label class="form-check-label" for="creditcard">
                                         <input type="radio" class="form-check-input" value="creditcard" id="creditcard" name="paymentMethod" > Credit Card
                                      </label>
                                    </div>
                                </div>
                                <form id="creditcardInput" style="display:none;" novalidate>
                                    <div class="form-group row">
                                            <label class="col-4 align-content-center" for="cardNumber">
                                                Card Number
                                            </label>
                                            <input type="text" class="form-control col-6" id="cardNumber" name="cardNumber" required>
                                            <div class="offset-4 col-6 invalid-feedback" id="invalidCardNumber">
                                            </div> 
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-4 align-content-center" for="cardPassword">
                                                Card Password
                                            </label>
                                            <input type="password" class="form-control col-6" id="cardPassword" name="cardPassword" required>
                                            <div class=" offset-4 col-6 invalid-feedback" id="invalidCardPassword">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-4 align-content-center" for="expiration">
                                                Expiration
                                            </label>
                                            <input type="text" class="form-control col-6" id="expiration" name="expiration" required>
                                            <div class=" offset-4 col-6 invalid-feedback" id="invalidCardExpiration">
                                            </div>  
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-4 align-content-center"  for="cvv">
                                                 CVV
                                            </label>
                                            <input type="text" class="form-control col-6" id="cvv" name="cvv" required>
                                            <div class="offset-4 col-6 invalid-feedback" id="invalidCardCVV">
                                            </div> 
                                        </div>
                                </form>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                            <div class="float-left">
                                <button class="btn btn-outline-primary" id="paymentSubmit" >Submit</button>
                            </div>
                            <div class="float-right">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" id="modalClose">Close</button>
                            </div>  
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  
  `
    };

    var updateAccountBalance = function (userProfile, newBalance) {
        // update the balance if user deposit money
        var depositRequestObj = {
            method: 'POST',
            url: `${window.location.origin}/api/wallet/balance/update`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
                email: userProfile.email,
                newBalance: newBalance,
            }
        };

        request.httpRequest(depositRequestObj)
            .then(function (response) {
                notification.display('Your balance has been updated');

            })
            .catch(function (error) {
                notification.display(error.statusText, 'red');
            })
    }
    return {display};
})
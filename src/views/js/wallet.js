// author: liuxuhui
define(['request', 'router', 'cardValidate', 'helper'], function (request, router, cardValidate, helper) {
    var display = function () {
        var walletContainer = document.getElementById('walletContainer');

        // send a request for getting existing balance of current user
        var userProfile = JSON.parse(sessionStorage.getItem('user'));
        var balanceRequest = {
            method: 'GET',
            url: `${window.location.origin}/api/wallet/balance/${userProfile.email}`,
        };

        request.httpRequest(balanceRequest)
            .then(function (response) {
                walletContainer.innerHTML = walletTemplate(response);
                var depositBtn = document.getElementById('depositButton'),
                    cancelBtn =  document.getElementById('cancelButton'),
                    payBtn = document.getElementById('payButton'),
                    creditCardInputContainer = document.getElementById('creditcardInput');

                depositBtn.addEventListener('click', function (event) {
                    event.preventDefault();
                    creditCardInputContainer.style.display = 'block';
                    depositBtn.style.display = 'none';
                });

                cancelBtn.addEventListener('click', function (event) {
                    event.preventDefault();
                    creditCardInputContainer.style.display = 'none';
                    depositBtn.style.display = 'block';

                });

                payBtn.addEventListener('click', function (event) {
                    event.preventDefault();
                    var amountValidated = true;
                    // check input amount is valid
                    var amountSelector = document.getElementById('amount'),
                        invalidAmountSelector = document.getElementById('invalidAmount'),
                        amountVal = amountSelector? amountSelector.value : null;

                    if (amountVal === null || amountVal === '' || isNaN(parseInt(amountVal)) || parseInt(amountVal) <= 0) {
                        amountValidated = false;
                        invalidAmountSelector.innerText = 'Please input a correct value!';
                        amountSelector.classList.add('is-invalid');
                    } else {
                        amountSelector.classList.add('is-valid');
                    }
                    // check input credit card info is valid

                    if (amountValidated && cardValidate.validate()) {
                        // deposit
                        var depositObj = {
                            balance: response.balance,
                            moneyDeposit: parseInt(amountVal),
                        };

                        depositToAccount(userProfile, depositObj);
                    } else {
                        var selectorIds = ['amount','cardNumber', 'expiration', 'cvv'];
                        var classNames = ['is-valid', 'is-invalid'];
                        selectorIds.forEach(function (sid) {
                            classNames.forEach(function (cname) {
                                helper.addOrRemoveClass2SelectorForEvent(sid, 'change', cname);
                            });
                        })
                    }
                })

            })
            .catch(function (error) {
                alert(error.statusText);
            });


    };

    var walletTemplate = function (obj) {
        return `<a href="account.html" class="btn btn-outline-danger">Back</a>
        <section class="row col-12 justify-content-center container-margin-bottom ">
        <h2 style="display:none">section header</h2>
        <div class="card card-default" style="width: 50rem;">
            <div class="card-header">
                <h2 class="card-title">Account Balance</h2>
            </div>
            <div class="card-body">
                 <p class="card-subtitle container-margin-bottom">You have ${obj.balance} CAD available.</p>
                <div class="row container-margin-bottom ">
                    <button class="btn btn-outline-primary col-4" id="depositButton">Deposit</button>
                </div>
                <form id="creditcardInput" style="display:none;" novalidate>
                    <div class="form-group row">
                        <label class="col-4 align-content-center" for="amount">
                            Amount
                        </label>
                        <input type="" class="form-control col-8" id="amount" name="amount" required>
                        <div class="offset-4 col-8 invalid-feedback" id="invalidAmount">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 align-content-center" for="cardNumber">
                            Card Number
                        </label>
                        <input type="text" class="form-control col-8" id="cardNumber" name="cardNumber" required>
                        <div class="offset-4 col-8 invalid-feedback" id="invalidCardNumber">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 align-content-center" for="cardPassword">
                            Card Password
                        </label>
                        <input type="password" class="form-control col-8" id="cardPassword" name="cardPassword" required>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 align-content-center" for="expiration">
                            Expiration
                        </label>
                        <input type="text" class="form-control col-8" id="expiration" name="expiration" required>
                        <div class=" offset-4 col-8 invalid-feedback" id="invalidCardExpiration">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 align-content-center"  for="cvv">
                             CVV
                        </label>
                        <input type="text" class="form-control col-8" id="cvv" name="cvv" required>
                        <div class="offset-4 col-8 invalid-feedback" id="invalidCardCVV">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="float-left col-4">
                             <button class="btn btn-outline-primary" id="payButton" >Deposit</button>
                        </div>
                        <div class="float-right offset-4 col-4">
                            <button type="button" class="btn btn-danger" id="cancelButton">Cancel</button>
                        </div>
                    </div>
                 </form>
            </div>
        </div>
    </section>`
    };

    var depositToAccount = function (userProfile, obj) {
        // update the balance if user deposit money
        var depositRequestObj = {
            method: 'POST',
            url: `${window.location.origin}/api/wallet/balance/update`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
                email: userProfile.email,
                newBalance: obj.balance + obj.moneyDeposit,
            }
        };

        request.httpRequest(depositRequestObj)
            .then(function (response) {
                alert('Money has been successfully deposited into you account!');
                router.redirect('wallet.html');
            })
            .catch(function (error) {
                alert(error.statusText)
            })
    }

    return {display};
})

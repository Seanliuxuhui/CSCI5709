define(['crypto-js', 'helper', 'request', 'formValidation', 'router'], function (CryptoJS, helper, request,formValidation, router) {
    var validate = function () {
        var errors = formValidation.validate();
        if (errors.length !== 0) {
            alert(errors.join('\n'));
            return;
        }
        var email = document.getElementById("email").value;
        var password = document.getElementById("pwd").value;
        if (email == null || email === "") {
            alert("Please enter email address");
            return;
        }
        if (password == null || password === "") {
            alert("Please enter password.");
            return;
        }

        var passwordHashed = CryptoJS.HmacSHA1(password, "");

        request.httpRequest({
            method: 'POST',
            url: `${window.location.origin}/api/user`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
                'email': email,
                'password': passwordHashed
            },
        }).then(function (response) {
            if (response) {
                // check does your browser supports sessionStorage
                if (typeof(Storage) !== "undefined") {
                    sessionStorage.setItem('user', JSON.stringify(response));
                    // check if user are coming from shopping cart page
                    // direct user to checkout page after user signed in and remove the record
                    // otherwise direct user to user profile page
                    if ('fromShoppingCart' in sessionStorage) {
                        router.redirect('checkout.html')
                        sessionStorage.removeItem('fromShoppingCart');
                    } else {
                        router.redirect('home.html')
                    }
                } else {
                    console.log('Your browser does not support Storage!')
                }
            }
        }).catch(function (error) {
            console.log(error.statusText)
        });
    }
    return {validate}
})

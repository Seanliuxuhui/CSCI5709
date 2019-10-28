define(['crypto-js', 'helper', 'request', 'formValidation', 'router'], function (CryptoJS, helper, request,formValidation, router) {
    var validate = function () {
        // var errors = formValidation.validate();
        // if (errors.length !== 0) {
        //     alert(errors.join('\n'));
        //     return;
        // }
        var username = document.getElementById("name").value;
        var phone = document.getElementById("contact").value;
        var email = document.getElementById("email").value;
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        if (username == null || username === "") {
            alert("Please enter your name");
            return;
        }
        if (email == null || email === "") {
            alert("Please enter your email");
            return;
        }
        if (phone == null || phone === "") {
            alert("Please enter your contact");
            return;
        }
        if (password1 == null || password1 === "") {
            alert("Please create your password");
            return;
        }
        if (password2 == null || password2 === "") {
            alert("Please confirm your password.");
            return;
        }
        if (password1!== password2) {
            alert("Password mismatch");
            return;
        }
        var passwordHashed = CryptoJS.HmacSHA1(password1, "");

        request.httpRequest({
            method: 'POST',
            url: `${window.location.origin}/api/sign`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
                'username': username,
                'email': email,
                'password': passwordHashed
            },
        }).then(function (response) {
            getUserInfo(email, passwordHashed);
        })
            .catch(function (error) {

        });
    };

    var getUserInfo = function (email, passwordHashed) {
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
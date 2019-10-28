define(['crypto-js', 'helper', 'request', 'formValidation', 'notification', 'router'], function (CryptoJS, helper, request,formValidation, notification, router) {
    var validate = function () {
        var errors = formValidation.validate();
        if (errors.length !== 0) {
            notification.display(errors.join('\n'), 'red');
            return;
        }
        var email = document.getElementById("email").value;
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;

        if (email == null || email === "") {
            notification.display("Please enter your email", 'red');
            return;
        }

        if (password1 == null || password1 === "") {
            notification.display("Please create your password", 'red');
            return;
        }

        if (password2 == null || password2 === "") {
            notification.display("Please confirm your password", 'red');
            return;
        }
        if (password1!== password2) {
            notification.display("Password mismatch", 'red');
            return;
        }
        var passwordHashed = CryptoJS.HmacSHA1(password1, "");

        request.httpRequest({
            method: 'POST',
            url: `${window.location.origin}/api/update`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
                'email': email,
                'password': passwordHashed
            },
        }).then(function (response) {
            notification.display('Password has been updated!', 'green')
            setTimeout(function () {
                router.redirect('account.html')
            }, 2000);

        })
        .catch(function (error) {
            alert(error.statusText);
        });
    }
    return {validate}
})
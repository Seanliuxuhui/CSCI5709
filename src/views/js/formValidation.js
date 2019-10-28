// author: liuxuhui
define([], function() {
    function validate() {
        // collect all input values
        var passwordSelector = document.getElementById('password1'),
            rePasswordSelector = document.getElementById('password2'),
            emailSelector = document.getElementById('email'),
            birthdateSelector = document.getElementById('birthdate'),
            phoneNumberSelector = document.getElementById('contact'),
            usernameSelector = document.getElementById('username');

        var email = emailSelector? emailSelector.value : null,
            birthdate = birthdateSelector? birthdateSelector.value: null,
            phoneNumber = phoneNumberSelector? phoneNumberSelector.value : null,
            username = usernameSelector? usernameSelector.value : null,
            password = passwordSelector? passwordSelector.value: null,
            rePassword = rePasswordSelector? rePasswordSelector.value: null;

        // array for error messages;
        var errorMsg = [];

        var emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            birthdateRegx = /([12]\d{3,3}[-\.](0[1-9]|1[0-2])[-\.](0[1-9]|[12]\d|3[01]))/,
            phoneNumberRegx = /^[\+]?[(]?[0-9]{3,3}[)]?[-\s\.]?[0-9]{3,3}[-\s\.]?[0-9]{4,4}$/;

        // check if username is empty
        if (username && username.length === 0) {
            errorMsg.push('Oops! Username cannot be empty!');
        }

        // validate email format
        if (email && !emailRegx.test(email)) {
            errorMsg.push('Oops! Your email address format is not correct! (e.g. john.smith@gmail.com)! \n');
        }

        // validate date format
        if (birthdate) {
            if (birthdateRegx.test(birthdate)) {
                var operaHyphen = birthdate.split('-');
                var operaDot = birthdate.split('.');
                var lOperaH = operaHyphen.length;
                var yy, mm, dd;
                var validDays = [31,28,31,30,31,30,31,31,30,31,30,31];

                if (lOperaH > 1) {
                    yy = parseInt(operaHyphen[0]);
                    mm = parseInt(operaHyphen[1]);
                    dd = parseInt(operaHyphen[2]);

                } else {
                    yy = parseInt(operaDot[0]);
                    mm = parseInt(operaDot[1]);
                    dd = parseInt(operaDot[2]);
                }

                if (yy > 2100 || yy < 1900) {
                    errorMsg.push( "Oops! Please correct the year range!\n");
                }

                if (yy) {
                    if (mm > 12 || mm < 1) {
                        errorMsg.push( 'Oops! Please correct the month range!\n');
                    }
                    var daysIncorrect = false;
                    if ( dd < 1 || dd > validDays[mm - 1]) {
                        daysIncorrect = true;
                    }

                    // special case for mm == 2
                    if (mm === 2) {

                        if ( (!(yy % 4) && yy % 100) || !(yy % 400))
                        {
                            if (dd > 29) {
                                daysIncorrect = false;
                            }
                        } else {
                            if (dd >= 29) {
                                daysIncorrect = false;
                            }
                        }
                    }

                    if (daysIncorrect) {
                        errorMsg.push('Oops! Please correct the day range!\n');
                    }
                }

            } else {
                errorMsg.push('Oops! Please input a correct birth date (e.g. 1993-11-12)! \n');
            }
        }

        // validate the phone number format
        if (phoneNumber && !phoneNumberRegx.test(phoneNumber)) {
            errorMsg.push('Oops! Your phone number format is incorrect (e.g. 902-221-9090)! \n');
        }

        // validate the password format
        // if (password) {
        //     if (password.length < 12) {
        //         errorMsg.push('Oops! We expect a 12-characters password!');
        //     }
        //     if (!password.match(/\d{3,}/)) {
        //         errorMsg.push('Oops! We expect your password contains at least 3 numerical value! \n');
        //     }
        //     if (!password.match(/\w{3,}/)) {
        //         errorMsg.push('Oops! We expect your password contains at least 3 English characters value! \n');
        //     }
        //     if (!password.match(/[@#$%^&*()]/)) {
        //         errorMsg.push('Oops! We expect your password contains one special symbol value (e.g. @#$%^&*())! \n')
        //     }
        //     if (!password === rePassword) {
        //         errorMsg.push('Oops! You got two different password, can you retry? \n')
        //     }
        // }

        // return an array of errors
        return errorMsg;
    }

    return {validate};
});
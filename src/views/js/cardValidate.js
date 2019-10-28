// author: liuxuhui
define([], function () {
    // function to validate the credit card or master card information
    function validate () {
        var cardNumberSelector = document.getElementById('cardNumber'),
            cardPasswordSelector = document.getElementById('cardPassword'),
            cardExpirationSelector = document.getElementById('expiration'),
            cardCVVSelector = document.getElementById('cvv'),
            invalidCardNumberSelector = document.getElementById('invalidCardNumber'),
            invalidCardExpirationSelector = document.getElementById('invalidCardExpiration'),
            invalidCardCVVSelector = document.getElementById('invalidCardCVV'),
            invalidCardPasswordSelector = document.getElementById('invalidCardPassword');

        var cardNumber = cardNumberSelector? cardNumberSelector.value: null,
            cardPassword = cardPasswordSelector? cardPasswordSelector.value: null,
            cardExpiration = cardExpirationSelector? cardExpirationSelector.value: null,
            cardCVV = cardCVVSelector? cardCVVSelector.value : null;

        var DEFAULT_CARD_DIGITS_LENGTH = 16,
            DEFAULT_CARD_EXPIRATION_LENGTH = 4,
            DEFAULT_CARD_CVV_LENGTH = 3;

        // return false if none of them has input
        if (!cardNumber && !cardExpiration && !cardCVV && !cardPassword) {
            return false;
        }

        var numberValidated = true,
            expirationValidated = true,
            cvvValidated = true,
            passwordValidated = true;

        // validate card number
        if (cardNumber) {
            if (cardNumber.length !== DEFAULT_CARD_DIGITS_LENGTH) {
                invalidCardNumberSelector.innerText = "Please correct the card number's length!";
                numberValidated = false;
            } else if (containsChar(cardNumber)) {
                invalidCardNumberSelector.innerText = "Card number should only contain digits!";
                numberValidated = false;
            }

        } else {
            numberValidated = false;
        }

        // validate card expiration data
        if (cardExpiration) {
            if (cardExpiration.length !== DEFAULT_CARD_EXPIRATION_LENGTH) {
                invalidCardExpirationSelector.innerText = 'Please correct expiration date (e.g. 0112)!';
                expirationValidated = false;
            } else if (containsChar(cardExpiration)) {
                invalidCardExpirationSelector.innerText = 'Expiration should not contain any characters!';
                expirationValidated = false;
            }

        } else {
            expirationValidated = false;
        }

        // validate CVV input
        if (cardCVV) {
            if (cardCVV.length !== DEFAULT_CARD_CVV_LENGTH) {
                invalidCardCVVSelector.innerText = "Please correct CVV length, should be a length of 3.";
                cvvValidated = false;
            } else if (containsChar(cardCVV)) {
                invalidCardCVVSelector.innerText = 'CVV should not contain any characters!';
                cvvValidated = false;
            }

        } else {
            cvvValidated = false;
        }

        // validate password input
        if (!cardPassword || cardPassword === '') {
            invalidCardPasswordSelector.innerText = "Password cannot be empty!"
            passwordValidated = false;
        }

        // if credit card number is invalid, add is-invalid class to highlight the field
        if (!numberValidated) {
            cardNumberSelector.classList.add('is-invalid');
        } else {
            cardNumberSelector.classList.add('is-valid');
        }

        // if expiration input is invalid, add is-invalid class to highlight
        if (!expirationValidated) {
            cardExpirationSelector.classList.add('is-invalid');
        } else {
            cardExpirationSelector.classList.add('is-valid');
        }

        // if cvv number is wrong, add is-invalid class to highlight
        if (!cvvValidated) {
            cardCVVSelector.classList.add('is-invalid');
        } else {
            cardCVVSelector.classList.add('is-valid');
        }

        // if password not entered, add is-invalid to highlight
        if (!passwordValidated) {
            cardPasswordSelector.classList.add('is-invalid');
        } else {
            cardPasswordSelector.classList.add('is-valid');
        }

        // return true only if all four conditions are met
        return numberValidated && expirationValidated && cvvValidated && passwordValidated;
    }
    // function to check whether a string contains a char
    function containsChar(str) {
        var flag = false;
        var idx = str.length;
        while (idx--) {
            if (isNaN(parseInt(str.charAt(idx)))) {
                flag = true;
            }
        }
        return flag;
    }
    return {validate}
})
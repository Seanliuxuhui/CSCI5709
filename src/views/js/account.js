define(['router', 'logout', 'formValidation', 'request', 'notification'], function (router, logout, formValidation, request, notification) {
    var display = function () {
        if (!('user' in sessionStorage)) {
            router.redirect('login.html')
        }
        var profile = JSON.parse(sessionStorage.getItem('user'));
        var container = document.getElementById('accountContainer');
        var profileElem = document.createElement('div');
        profileElem.classList.add('col-10');
        profileElem.innerHTML = userProfileTemplate(profile);
        container.append(profileElem);

        // add listener to click event on logout
        document.getElementById('logout').addEventListener('click', function (e) {
            e.preventDefault();
            logout.out();
        })

        document.getElementById('edit').addEventListener('click', function (e) {
            e.preventDefault();
            removeDisabledProp();
            document.getElementById('save').disabled = false;
            this.disabled = true;
        })

        document.getElementById('save').addEventListener('click',function (e) {
            e.preventDefault();
            addDisabledProp();
            errors = formValidation.validate();
            if (errors.length === 0) {
                profile = JSON.parse(sessionStorage.getItem('user'));
                var newprofile = readUserData(profile);
                sessionStorage.setItem('user', JSON.stringify(newprofile));
                updateUserProfile(newprofile);

            } else {
                var errors = formValidation.validate();
                alert(errors.join('/n'));
            }
            document.getElementById('edit').disabled = false;
            this.disabled = true;
        })

    };

    var userProfileTemplate = function (profile) {
        return `<div class="col-sm-10">

            <p>Contact information</p>

            <form>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Email</span>
                    </div>
                    <input type="email" class="form-control" value="${profile.email}" id="email" disabled>
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Contact</span>
                    </div>
                    <input type="tel" class="form-control" value="${profile.phone? profile.phone : ""}" id="homePhone" disabled>
                </div>
                
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Birth date</span>
                    </div>
                    <input type="date" class="form-control" value="${profile.birthdate? profile.birthdate : ""}" id="birthDate" disabled>
                </div>
                <p>Delivery Address</p>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Address line 1</span>
                    </div>
                    <input type="text" class="form-control" value="${profile.addressLine1? profile.addressLine1 : ''}"
                           id="homeAddress1" disabled>
                </div>
                
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Address line 2</span>
                    </div>
                    <input type="text" class="form-control" value="${profile.addressLine2? profile.addressLine2 : ''}"
                           id="homeAddress2" disabled>
                </div>
                
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Postal Code</span>
                    </div>
                    <input type="text" class="form-control" value="${profile.postalcode? profile.postalcode : ""}"
                           id="postalCode" disabled>
                </div>
                
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">City</span>
                    </div>
                    <input type="text" class="form-control" value="${profile.city? profile.city : ""}"
                           id="city" disabled>
                </div>
                
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Province</span>
                    </div>
                    <input type="text" class="form-control" value="${profile.state? profile.state : ""}"
                           id="state" disabled>
                </div>
                
                <input class="btn btn-outline-primary col-3" type="button" value="Edit" id="edit">

                <input class="btn btn-outline-danger col-3" type="button" id="save" value="Save" disabled>
            </form>

        </div>`
    };

    var removeDisabledProp = function () {
        var inputList = ['email', 'homePhone', 'birthDate', 'homeAddress1', 'homeAddress2', 'postalCode', 'city', 'state'];
        inputList.forEach(function (inputId) {
            document.getElementById(inputId).removeAttribute('disabled');
        });
    };

    var addDisabledProp = function () {
        var inputList = ['email', 'homePhone', 'birthDate', 'homeAddress1', 'homeAddress2', 'postalCode', 'city', 'state'];
        inputList.forEach(function (inputId) {
            document.getElementById(inputId).disabled = true;
        });
    };

    var readUserData = function (userprofile) {
        var inputList = ['email', 'homePhone', 'birthDate', 'homeAddress1', 'homeAddress2', 'postalCode', 'city', 'state'];
        var formPropMapping = {
            'email': 'email',
            'homePhone': 'phone',
            'birthDate': 'birthdate',
            'state': 'state',
            'homeAddress1': 'addressLine1',
            'homeAddress2': 'addressLine2',
            'postalCode': 'postalcode',
            'city': 'city'
        };
        inputList.forEach(function (inputId) {
            userprofile[formPropMapping[inputId]] = document.getElementById(inputId).value;
        });
        return userprofile;
    }

    var updateUserProfile = function (newUserInfo) {
        request.httpRequest({
            method: 'POST',
            url: `${window.location.origin}/api/user/update`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            params: newUserInfo,

        }).then(function (response) {
            notification.display('File has been updated!', 'green')
        }).catch(function (error) {
                alert(error.statusText);
        });
    }
    return {display}
})
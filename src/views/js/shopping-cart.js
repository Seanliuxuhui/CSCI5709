define(['router', 'notification'], function (router, notification) {
    var display = function () {
        if (typeof(Storage) !== 'undefined') {
            // check if user login
            // logged in user will not see the login link
            if ('user' in sessionStorage) {
                document.getElementById('login').style.display = 'none';
            }

            // check if items has been added to the shopping cart
            // if added, list the items
            // otherwise, list the empty cart and give user option to go back to home page

            if ('items' in sessionStorage) {
                var itemsInCart = JSON.parse(sessionStorage.getItem('items'));
                if (itemsInCart.length >= 0) {
                    var subtotal = 0;
                    itemsInCart.forEach(function (item, idx) {
                        // create section element for each item in cart
                        var el = document.createElement('section');
                        el.setAttribute('id', `section${idx}`);
                        el.innerHTML = itemTemplate(item, idx);
                        // append section node to parent element
                        document.getElementById('cartItems').append(el);
                        document.getElementById(`itemUnit${idx}`).addEventListener('change', function (e) {
                            e.preventDefault();
                            item.quantity = this.value;
                            var totalCost = item.quantity * item.price;
                            sessionStorage.setItem('items', JSON.stringify(itemsInCart));
                            document.getElementById(`itemUnit${idx}Cost`).innerHTML = `Total price: $ ${totalCost.toFixed(2)}`;
                            updateSubtotal(calSubtotal(itemsInCart));
                        });
                        document.getElementById(`deleteItem${idx}`).addEventListener('click', function (e) {
                            e.preventDefault();
                            // display a notification about the item removal
                            notification.display('You removed an item from the cart!', 'red');
                            el.parentNode.removeChild(el);
                            // remove items from cart
                            itemsInCart.splice(idx,1);
                            if (itemsInCart.length === 0) {
                                removeSubtotalTemplate();
                                displayEmptyTemplate();
                            }
                            sessionStorage.setItem('items', JSON.stringify(itemsInCart));
                            updateSubtotal(calSubtotal(itemsInCart));
                            //console.log(sessionStorage.getItem('items'));
                            location.reload();
                        });
                    });

                    subtotal = calSubtotal(itemsInCart)

                    var totalCostElem = document.createElement('section');
                    totalCostElem.innerHTML = totalCostTemplate({subtotal});
                    totalCostElem.setAttribute('id', 'subtotalTemplate')
                    document.getElementById('cartItems').append(totalCostElem);
                    document.getElementById('proceedBtn').addEventListener('click', function (e) {
                        e.preventDefault();
                        // user not logged in, when user goes to checkout page, it will ask user to log in.
                        // when user log in, direct user to checkout page
                        if (!('user' in sessionStorage)) {
                            sessionStorage.setItem('fromShoppingCart', '1');
                        }
                        router.redirect('checkout.html');

                    });
                    document.getElementById('backBtn').addEventListener('click', function (e) {
                        e.preventDefault();
                        router.redirect('home.html');
                    })
                } else {
                    displayEmptyTemplate()
                }
            } else {
                displayEmptyTemplate()
            }


        } else {
            alert('Your browser does not support storage!');
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
                        <div class="float-left col-5 text-align-bottom threeEm">
                            <label for="itemUnit${idx}">Units:</label>
                            <input type="number" value="${item.quantity}" id="itemUnit${idx}" min="0">
                            <p id="itemUnit${idx}Cost"> Total price: $ ${item.quantity * item.price} </p>
                        </div>
                        <div class="float-right col-5 text-align-bottom threeEm">
                            <input type="button" value="Remove" id="deleteItem${idx}" class="btn btn-danger">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`
    }

    var emptyCartTemplate = function () {

        // template for empty cart
        var template = `<section class="row col-12 justify-content-center container-margin-bottom ">
        <h2 style="display:none">section header</h2>
        <div class="card card-default">
            <div class="card-body">
                <div class="row align-items-start">
                    <div class="col-md-12 form-group">
                        <div class="col-12 ">
                            <h3>Empty cart. Add some items now!</h3>

                        </div>
                        <div class="offset-2 col-8">
                            <button type="button" class="btn btn-danger" id="explore">Explore our home page!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
        var sec = document.createElement('section');
        sec.innerHTML = template;
        return sec;
    };

    var totalCostTemplate = function (cost) {
        return `<section class="row col-12 justify-content-center">
        <h2 style="display:none">section header</h2>
        <div class="row container-fluid card card-default">
            <div class="card-body" >
                <div class="row align-items-start">
                    <p class="text-align-left col-8">Food & Beverage Subtotal</p> <p class="text-align-right col-4" id="cartSubtotal">$ ${cost.subtotal.toFixed(2)}</p>
                </div>
                <div class="row justify-content-between ">
                    <button class="btn btn-outline-success float-right col-4 " id="proceedBtn">Proceed To Checkout</button>
                    <button class="invisible col-4"></button>
                    <button class="btn btn-outline-danger float-left col-4" id="backBtn">Back to home page</button>
                </div>
            </div>
        </div>
    </section>`
    };

    var displayEmptyTemplate = function () {
        document.getElementById('cartItems').append(emptyCartTemplate());
        // add eventlistener when user click explore button
        document.getElementById('explore').addEventListener('click', function (e) {
            router.redirect('home.html');
        });
    };

    var updateSubtotal = function (subtotal) {
        document.getElementById('cartSubtotal').innerHTML =  `$ ${subtotal.toFixed(2)}`
    };

    var calSubtotal = function (itemsInCart) {
        var subtotal = 0;
        itemsInCart.forEach(function (item) {
            subtotal += item.quantity * item.price;
        });
        return subtotal;
    };

    var removeSubtotalTemplate = function () {
        var subtotalElem = document.getElementById('subtotalTemplate');
        subtotalElem.parentNode.removeChild(subtotalElem);
    };
    return {display}
})

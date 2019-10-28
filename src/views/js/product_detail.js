/**
Shengtian Tang
control the behaviour of the elements in product_detial.html
*/
define(['request','router', 'notification'], function(request,router, notification) {
  var getDetail = function() {
    //console.log("getDetial");
    var url_string = window.location.href;
    var url = new URL(url_string);
    var name = url.searchParams.get("name");
    var product_id = 0;
    var pictureRef, price, description;
    var food_info = document.getElementById("food_info");
    var main_img = document.getElementById("main_img");
    var evaluation_container = document.getElementById("evaluation_container");
    var btn_order = document.getElementById("btn_order");
    var quantity = document.getElementById("quantity");
    var innerHTML = "";
    var badge = document.getElementById("badge");
    if (sessionStorage.getItem('items') != null) {
      badge.textContent = JSON.parse(sessionStorage.getItem('items')).length;
    }


    //first http Request - get product detial
    request.httpRequest({
      method: 'POST',
      url: `${window.location.origin}/api/product`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      params: {
        'category': 'category',
        'name': name,
        'need_detail': 1
      },
    }).then(function(response) {
      product_id = response[0]['PID'];
      pictureRef = response[0]['pictureRef'];
      price = response[0]['price'];
      description = response[0]['description'];

      //main_img.style.backgroundImage = "url(../images/example.webp)";
      main_img.style.backgroundImage = "url(../images/" + pictureRef + ")";
      innerHTML += "<p class=\"food_name\">" + name + "</p>";
      innerHTML += "<p class=\"food_price\">$" + price + "</p>";
      innerHTML += "<p class=\"food_des\">" + description + "</p>";
      food_info.innerHTML = innerHTML;
      //console.log(JSON.stringify(response))

      btn_order.onclick = function() {

        if ('user' in sessionStorage) {
            document.getElementById('login').style.display = 'none';
        }

        if (Number(quantity.value) <= 0) {
          notification.display("Please specify the right quantity!", 'red');
          return ;
        }
        var object = {
          PID: product_id,
          name: name,
          description: description,
          quantity: Number(quantity.value),
          price: price,
          pictureRef: pictureRef
        };

        var objects;
        if (sessionStorage.getItem('items') == null) {
          objects = [];
          objects.push(object);
          sessionStorage.setItem('items', JSON.stringify(objects));
        } else {
          objects = JSON.parse(sessionStorage.getItem('items'));
          var existed = false;
          objects.forEach(function (obj) {
            if (obj.PID === object.PID) {
              obj.quantity += object.quantity;
              existed = true;
            }
          });
          // check if item already in the shopping cart
          if (!existed) {
            objects.push(object);
          }
          sessionStorage.setItem('items', JSON.stringify(objects));
        }
        notification.display('Item added!', 'green');
        badge.textContent = JSON.parse(sessionStorage.getItem('items')).length;
        console.log(sessionStorage.getItem('items'));
      }


      //clear innerHTML for next use
      innerHTML = "<h1>Comment</h1><hr>";

      //second http Request - get product comments
      request.httpRequest({
        method: 'POST',
        url: `${window.location.origin}/api/evaluation`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        params: {
          'action': 0,
          'PID': product_id
        },
      }).then(function(response) {
        //console.log(JSON.stringify(response))
        for (var i = 0; i < response.length; i++) {
          innerHTML += "<div class=\"evaluation\">"
          innerHTML += "<h3 class=\"user_name\">" + response[i]['username'] + "</h3>"
          innerHTML += "<p class=\"eva\">"

          for (var j = 0; j < response[i]['ratings']; j++) {
            innerHTML += "&#9733;"
          }
          for (var k = 0; k < (5 - response[i]['ratings']); k++) {
            innerHTML += "&#9734;"
          }

          innerHTML += "</p>"
          innerHTML += "<p class=\"comment\">" + response[i]['comments'] + "</p>"
          innerHTML += "<hr>"
          innerHTML += "</div>"
        }

        evaluation_container.innerHTML = innerHTML;

      }).catch(function(error) {
        console.log(error)
      });

    }).catch(function(error) {
      console.log(error)
    });


  }

  return {
    getDetail
  }
})

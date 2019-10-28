define(['request'], function(request) {
  var getRestaurant = function() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var name = url.searchParams.get("r_name");
    var rid = 0;

    var restaurant_name = document.getElementById("restaurant_name");
    var restaurant_info = document.getElementById("restaurant_info");
    var menu = document.getElementById("menu");

    request.httpRequest({
      method: 'POST',
      url: `${window.location.origin}/api/restaurant_info`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      params: {
        'r_name': name
      },
    }).then(function(response) {
      rid = response[0]["RID"];
      var innerHTML = "";
      innerHTML = generateRest_name(response[0]["name"],response[0]["restImg"]);
      restaurant_name.innerHTML = innerHTML;

      innerHTML = generateRest_info(response[0]["address"],response[0]["description"]);
      restaurant_info.innerHTML = innerHTML;

      request.httpRequest({
        method: 'POST',
        url: `${window.location.origin}/api/product`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        params: {
          'name': rid,
          'need_detail' : 3
        },
      }).then(function(response) {

          innerHTML = "";
          for (var i = 0; i < response.length; i++) {
            innerHTML+=generateItem(response[i]["PID"],response[i]["name"],response[i]["pictureRef"]);
          }
          menu.innerHTML = innerHTML;
      }).catch(function(error) {
        console.log(error)
      });

    }).catch(function(error) {
      console.log(error)
    });



    function generateRest_name(name,restImg){
      return `<div class="logo col-md-1" style="background-image:url('../images/${restImg}')"></div>
                <div class="col-md-11 rest_name_container">
                  <p class="rest_name">${name}</p>
                </div>`;
    };

    function generateRest_info(address,description){
      return `<p class="rest_description">${description}</p>
              <p class="rest_address">${address}</p>`;
    };

    function generateItem(pid, name, image) {
      var item = ""
      item += "<div class=\"row oh_item\">"
      item += " <div onclick=\"location.href='" + window.location.origin + "/product_detail.html?name=" + name + "';\" class=\"col-md-4 oh_image\" data-value = \"" + name + "\" style=\"cursor: pointer; background-image: url(../images/" + image + ");\"></div>";
      item += " <div class=\"col-md-8 oh_item_detail_container\">"
      item += "   <p class=\"food_name\">" + name + "</p>";
      item += "   <button onclick=\"location.href='" + window.location.origin + "/product_detail.html?name=" + name + "';\" class=\"order_again btn btn-danger\" type=\"button\" name=\"button\">ORDER</button>"
      item += " </div>";
      item += "</div>"
      return item;
    }


  }
  return {
    getRestaurant
  }
})

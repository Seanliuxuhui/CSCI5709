/**
Shengtian Tang
control the behaviour of the elements in category.html
*/
define(['request'], function(request) {
  var getCategory = function() {

    var asia = document.getElementById("Asia");
    var na = document.getElementById("NA");
    var chinese = document.getElementById("Chinese");
    var japanese = document.getElementById("Japanese");
    var india = document.getElementById("India");
    var go_back = document.getElementById("go_back")
    var category_detail_container = document.getElementById("category_detail_container");
    var category_detail = document.getElementById("category_detail");
    var cat_item = document.getElementsByClassName('cat_item');

    var layer = 0;
    if (layer == 0) {
      go_back.disabled = true;
    } else {
      go_back.disabled = false;
    }

    asia.onclick = function() {
      hideItem();
      asia.style.display = "none";
      na.style.display = "none";

      chinese.style.display = "block";
      india.style.display = "block";
      japanese.style.display = "block";
      category_detail_container.style.display = "block";

      layer++;
      if (layer == 0) {
        go_back.disabled = true;
      } else {
        go_back.disabled = false;
      }
    }

    na.onclick = function() {
      hideItem();
      asia.style.display = "none";
      category_detail_container.style.display = "block";
      getProducts("American");
      if (layer == 0) {
        go_back.disabled = true;
      } else {
        go_back.disabled = false;
      }
    }

    go_back.onclick = function() {
      hideItem();
      asia.style.display = "block";
      na.style.display = "block";
      chinese.style.display = "none";
      india.style.display = "none";
      japanese.style.display = "none";
      category_detail_container.style.display = "none";
      layer--;
      if (layer == 0) {
        go_back.disabled = true;
      } else {
        go_back.disabled = false;
      }
    }

    chinese.onclick = function() {
      getProducts("Chinese");
    }

    japanese.onclick = function() {
      getProducts("Japanese");
    }

    india.onclick = function() {
      getProducts("Indian");
    }

    function generateItem(name, image) {
      var item = ""
      item += "<div onclick=\"location.href='" + window.location.origin + "/product_detail.html?name=" + name + "';\" class=\"col-md-3 cat_item\" data-value = \"" + name + "\" style=\"cursor: pointer; background-image: url(../images/" + image + ");\">";
      item += " <p class=\"food_name\">" + name + "</p>";
      item += "</div>";
      return item;
    }

    function hideItem(){
      for (var i = 0; i < cat_item.length; i++) {
        cat_item[i].remove();
      }
    }

    function getProducts(category) {
      if (layer == 0) {
        layer++;
      }
      if (layer == 0) {
        go_back.disabled = true;
      } else {
        go_back.disabled = false;
      }
      request.httpRequest({
        method: 'POST',
        url: `${window.location.origin}/api/product`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        params: {
          'category': category,
          'name': "default_name",
          'need_detail': 0
        },
      }).then(function(response) {
        var innerHTML = "";
        for (var i = 0; i < response.length; i++) {
          innerHTML += generateItem(response[i]['name'], response[i]['pictureRef']);
        }
        category_detail.innerHTML = innerHTML;
        //console.log(JSON.stringify(response))

      }).catch(function(error) {
        console.log(error)
      });
    }
  }
  return {
    getCategory
  }
})

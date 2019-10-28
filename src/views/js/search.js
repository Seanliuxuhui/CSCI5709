define(['request'], function(request) {
  var search = function() {

    //window.location.href = `${window.location.origin}/search.html`
    var back = document.getElementById("back");
    var search_input = document.getElementById("input_search");
    var search_results = document.getElementById("search_results");
    var position = search_input.getBoundingClientRect();

    search_results.style.top = (position.top + 40) + "px";
    if (position.left <= 768) {
      search_results.style.left = (position.left - 16) + "px";
    } else {
      search_results.style.left = (position.left - 150) + "px";
    }

    //show the search_results
    back.style.display = "block"

    //close search_results by click the dark area;
    window.onclick = function(event) {
      if (event.target == back) {
        back.style.display = "none";
      }
    }

    request.httpRequest({
      method: 'POST',
      url: `${window.location.origin}/api/product`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      params: {
        'category': "category",
        'name': search_input.value,
        'need_detail': 2
      },
    }).then(function(response) {
      var innerHTML = "";
      for (var i = 0; i < response.length; i++) {
        //"url(../images/" + response[0]['pictureRef'] + ")";
        innerHTML += generateItem(response[i]['name'], response[i]['category'], response[i]['pictureRef'], response[i]['price']);
      }
      search_results.innerHTML = innerHTML;
      //console.log(JSON.stringify(response))

    }).catch(function(error) {
      console.log(error)
    });
  }

  function generateItem(name, category, img, price) {
    var temp = "";
    temp += "<div onclick=\"location.href='" + window.location.origin + "/product_detail.html?name=" + name + "';\" class=\"row search_item\" >"
    temp += " <div class=\"col-4 search_results_img\" style=\"background-image:url(../images/" + img + ")\"></div>"
    temp += " <div class=\"col-8\">"
    temp += "   <p>" + name + "</p><p>$" + price + "</p>"
    temp += " </div>"
    temp += "</div><hr>"

    return temp;
  }

  return {
    search
  }
});

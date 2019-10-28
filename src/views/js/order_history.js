/**
Shengtian Tang
control the behaviour of the elements in order_history.html
*/
define(['request'], function(request) {
  var getOrderHistory = function() {

    // TODO: Check session data and determined if the user is logged in.
    // if the user already logged in, change the user id, otherwise redirecte
    // user to the login page.
    var uid;
    if ('user' in sessionStorage) {
      uid = JSON.parse(sessionStorage.getItem('user'))['UID'];
      console.log(uid);
    }

    var rate;
    var order_history_container = document.getElementById("order_history_container");
    var stars = document.getElementsByClassName("stars");
    var review_name = document.getElementById("review_name");
    var review_img = document.getElementById("review_img");
    var review_back = document.getElementById("review_back");

    //button for submitting the comment
    var btn_sb_ev = document.getElementById("btn_sb_ev");

    function generateItem(pid, name, image) {
      var item = ""
      item += "<div class=\"row oh_item\">"
      item += " <div onclick=\"location.href='" + window.location.origin + "/product_detail.html?name=" + name + "';\" class=\"col-md-4 oh_image\" data-value = \"" + name + "\" style=\"cursor: pointer; background-image: url(../images/" + image + ");\"></div>";
      item += " <div class=\"col-md-8 oh_item_detail_container\">"
      item += "   <p class=\"food_name\">" + name + "</p>";
      item += "   <button onclick=\"location.href='" + window.location.origin + "/product_detail.html?name=" + name + "';\" class=\"order_again btn btn-danger\" type=\"button\" name=\"button\">ORDER AGAIN</button>"
      item += "   <button id = \"" + pid + "\" class=\"review mybtn btn btn-danger\" type=\"button\" data-value=\""+image+"\" name=\"" + name + "\">REVIEW</button>"
      item += " </div>";
      item += "</div>"
      return item;
    }

    function createEv(pid, comments, ratings, uid) {
      request.httpRequest({
        method: 'POST',
        url: `${window.location.origin}/api/evaluation`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        params: {
          'action': 1,
          'PID': pid,
          'UID': uid,
          'comments': comments,
          'ratings': ratings
        },
      }).then(function(response) {
        console.log(response);
      })
    }

    window.onclick = function(event) {
      if (event.target == review_back) {
        review_back.style.display = "none";
      }
    }

    request.httpRequest({
      method: 'POST',
      url: `${window.location.origin}/api/orderHistory`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      params: {
        'UID': uid
      },
    }).then(function(response) {
      var innerHTML = "";
      for (var i = 0; i < response.length; i++) {
        innerHTML += generateItem(response[i]['PID'], response[i]['name'], response[i]['pictureRef']);
      }
      order_history_container.innerHTML = innerHTML;
      var mybtn = document.getElementsByClassName("mybtn");
      for (var i = 0; i < mybtn.length; i++) {
        mybtn[i].onclick = function() {
          rate = 4;
          review_name.innerHTML = this.getAttribute('name');
          review_img.style.backgroundImage = "url('../images/"+this.getAttribute('data-value')+"')";
          review_back.style.display = "block"

          for (var i = 0; i < stars.length; i++) {
            stars[i].onclick = function(){
              for (var k = 0; k < stars.length; k++){
                stars[k].textContent = "☆";
              }
              for (var j = 0; j < this.id; j++){
                var a = 4-j
                stars[a].textContent = "★";
              }
              rate = this.id;
              console.log(rate);
            }
          }
          var pid = this.id;
          btn_sb_ev.onclick = function(){
            var input = document.getElementById("textarea").value;
            console.log(input);
            createEv(pid, input, rate, uid);
            review_back.style.display = "none";
          }
        }
      }

    }).catch(function(error) {
      console.log(error);
    });



  }
  return {
    getOrderHistory
  }
})

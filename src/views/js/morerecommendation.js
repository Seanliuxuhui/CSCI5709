define(['request'], function (request) {
    var morerecommendation = function () {
        console.log("request");
        request.httpRequest({
            method: 'POST',
            url: `${window.location.origin}/api/popular`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
        }).then(function (response) {
            if (response) {
                console.log(response);
            }

            var newHtml = "";
            for (var i = 0; i < response.length; i++) {

                //insert new elements inside file

                newHtml += "<div class=\"container popular-food\">"
                newHtml += "<h2 class=\"food-description\" id=\"dish-name\">" + response[i]['name'] + "</h2>"
                newHtml += "<div class=\"row\">"
                newHtml += "<div class=\"dish-pic col-md-4\" style=\"background-image: url(../images/" + response[i]['pictureRef'] + ")\"></div>"
                newHtml += "<div class=\"detail-food col-md-7\">"
                newHtml += "<p id=\"dish-price\">$ " + response[i]['price'] + "</p>"
                newHtml += "<p id=\"dish-orders\">" + response[i]['SUM(quantity)'] + " orders</p>"
                newHtml += "<p id=\"avg-ratings\">"
                
                //for rating starts
                for (var j = 0; j < response[i]['AVG(ratings)'].toFixed(0); j++) {
                    newHtml += "&#9733;"
                }
                for (var k = 0; k < (5 - response[i]['AVG(ratings)'].toFixed(0)); k++) {
                    newHtml += "&#9734;"
                }
                newHtml += "</p></div></div></div>"
            }
            document.getElementById("popular-container").innerHTML = newHtml;
            var img = document.getElementsByClassName("dish-pic");
            for (var k = 0; k < img.length; k++) {
                img[k].style.height = 0.62 * (img[k].offsetWidth) + "px";
            }

            $(".popular-food").click(function () {
                console.log("enter click");
                var dishName = $(this).children("#dish-name").html();
                console.log(dishName);
                window.location = 'product_detail.html?name=' + dishName;
            });

        }).catch(function (error) {
            console.log(error)
        });

    }

    return {
        morerecommendation
    }
})

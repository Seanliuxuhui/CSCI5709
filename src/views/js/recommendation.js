define(['request', 'router'], function (request, router) {
    var recommendation = function () {
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
            var popularClass = document.getElementsByClassName("popular");

            // change image and text for recommendation front-end
            for (var i = 0; i < popularClass.length; i++) {
                popularClass[i].children[0].style.backgroundImage = "url('../images/" + response[i]['pictureRef']+"')";
                popularClass[i].children[1].innerHTML = response[i]['name'];
                popularClass[i].children[2].innerHTML = "$ " + response[i]['price'];
            }

        }).catch(function (error) {
            console.log(error)
        });

        // hover event for more text

        var moreRecomm = document.getElementById('recommendation-more');
        moreRecomm.addEventListener('mouseover', function (e) {
            e.preventDefault();
            this.classList.add('selected');
        });

        moreRecomm.addEventListener('mouseout', function (e) {
            e.preventDefault();
            this.classList.remove('selected');
        });
        // click more, go to morerecommendation.html
        moreRecomm.addEventListener('click', function (e) {
            e.preventDefault();
            router.redirect('morerecommendation.html');
        });

        //var popularEl = document.getElementsByClassName('popular');

        $("#recommendation-more").hover(
            function () {
                $(this).addClass("selected");
            },
            function () {
                $(this).removeClass("selected");
            }
        );

        //click more, go to morerecommendation.html
        $("#recommendation-more").click(function () {
            console.log("click more");
            window.location = 'morerecommendation.html';
        });

        //click popular dish, go to dish.html
        $(".popular").click(function () {
            var dishName = $(this).children(".dish-name").html();
            console.log(dishName);
            window.location = 'product_detail.html?name=' + dishName;
         });
    }

    return {
        recommendation
    }
})

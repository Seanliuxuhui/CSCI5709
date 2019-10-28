define(['request'], function(request) {
  var showLocation = function() {

    var map, infoWindow;
    var btn_reLocate = document.getElementById("btn_reLocate");

    reLocate();
    btn_reLocate.onclick = function() {
      reLocate();
    }

    //init the map
    function myMap() {
      var mapProp = {
        center: new google.maps.LatLng(44.645330, -63.572390),
        zoom: 12,
      };
      map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      infoWindow = new google.maps.InfoWindow;

    }
    //call when user click find restaurants button. locate the customer position.
    function reLocate() {
      myMap();
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {
          //setMapOnAll(null);
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var marker = new google.maps.Marker({
            title: "You are here!",
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/micons/pink-dot.png'
            //icon: 'http://maps.google.com/mapfiles/kml/pal3/icon39.png'
          });
          marker.setPosition(pos);
          // To add the marker to the map, call setMap();
          marker.setMap(map);
          //darw circle which around the user.
          var range = document.getElementById("distance");
          var UserRadius = range.options[range.selectedIndex].value;

          new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: '#8D33FF',
            fillOpacity: 0.35,
            map: map,
            center: pos,
            radius: UserRadius * 1000
          });

          //infoWindow.setPosition(pos);
          //infoWindow.setContent('You are here!');
          //infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(12);
          //show the restaurant nearby the customer.
          showRestaurant(pos, UserRadius);

          //setMapOnAll(map);
        }, function() {
          window.alert("Please rerefresh the page and  click the allow button to activate the location feature.");
          //handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        //handleLocationError(false, infoWindow, map.getCenter());
        window.alert("Browser doesn't support Geolocation");
      }
    }
    // The method to display the restaurants which near by the customer.
    function showRestaurant(center_pos, range) {
      var pos = {};
      var name, note, addr, logo;
      request.httpRequest({
        method: 'POST',
        url: `${window.location.origin}/api/location`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        params: {
          'n': -1
        },
      }).then(function(response) {
        for (var i = 0; i < response.length; i++) {
          pos["lat"] = response[i]['latittude'];
          pos["lng"] = response[i]['longitude'];
          name = response[i]['name'];
          note = response[i]['description'];
          addr = response[i]['address'];
          logo = "../images/" + response[i]['restImg'];
          var icon = {
            url: logo,
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
          }

          if (arePointsNear(pos, center_pos, range)) {
            var marker = new google.maps.Marker({
              title: name + "\n" + note + "\n" + addr,
              map: map,
              draggable: false,
              animation: google.maps.Animation.DROP,
              icon: icon,
              url: name
            });
            // pos = {
            //   lat: store_lat,
            //   lng: store_lng
            // };
            marker.setPosition(pos);
            marker.setMap(map);
            google.maps.event.addListener(marker, 'click', function() {
               window.location.href = `${window.location.origin}`+"/restaurant.html?r_name="+this.url;
            });
            //console.log(pos.lat + " " + pos.lng);
            pos = {};
          }
        }

      }).catch(function(error) {
        console.log(error)
      });

    }
    //credits to user:69083 for this specific function
    //https://stackoverflow.com/questions/50342507/check-if-a-coordinate-is-contained-within-a-circle-in-google-maps
    function arePointsNear(checkPoint, centerPoint, km) {
      var ky = 40000 / 360;
      var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
      var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
      var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
      return Math.sqrt(dx * dx + dy * dy) <= km;
    }
  }
  return {
    showLocation
  }
})

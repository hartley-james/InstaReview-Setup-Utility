// Created by: James Hartley
// This script stores all the functions required to get ID's
// required for setting up InstaReview

var map;
var service;
var infowindow;

function initMap() {
    //Setup input field for auto-complete
    var input = document.getElementById('pid-input');
    var autocomplete = new google.maps.places.Autocomplete(input);

    //Setup service
    service = new google.maps.places.PlacesService($('#output').get(0));

    // Specify just the place data fields that you need.
    autocomplete.setFields(['place_id', 'geometry', 'name']);
};

function search() {
    var gdat = document.getElementById("pid-input").value;

    if (gdat != '') {
        var request = {
            query: gdat,
            fields: ['name', 'place_id'],
        };

        service.findPlaceFromQuery(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    processResults(results[i]);
                }
            }
        });
    }

    //Get Facebook ID
    getFB();

    //Get YELP ID
    getYelp()

    //Get Healthgrades
    getHG();
}

function getFB() {
    var facebook = document.getElementById("fbid-input").value;

    if (facebook.slice(-1) == '/') {
        console.log("LAST CHARACTER IS BACKSLASH");
        facebook = facebook.substring(0, facebook.length - 1);
    }

    if (facebook != '') {
        var fburl = facebook.replace(/\//g, "-");

        console.log("FBURL = " + fburl);

        var n = fburl.lastIndexOf("\-");
        var urlid = fburl.substring(n+1);

            $.get( "/fb/" + urlid, function(data, status, googlepid){
                var fbid = data;
                document.getElementById("fb-id").value = fbid;
            });
    }
}

function getYelp() {
    var yelp = document.getElementById("yelp-input").value;

    if (yelp.slice(-1) == '/') {
        console.log("LAST CHARACTER IS BACKSLASH");
        yelp = yelp.substring(0, yelp.length - 1);
    }

    if (yelp != '') {
        //Get YELP ID
        var n = yelp.lastIndexOf("\/");
        var yelpid = yelp.substring(n+1);
        document.getElementById("yelp-id").value = yelpid;
    }
}

function getHG() {
    var healthgrades = document.getElementById("hg-input").value;

    if (healthgrades.slice(-1) == '/') {
        console.log("LAST CHARACTER IS BACKSLASH");
        healthgrades = healthgrades.substring(0, healthgrades.length - 1);
    }

    if (healthgrades != '') {
        //Get Healthgrades ID
        var n = healthgrades.lastIndexOf("\/");
        var hgid = healthgrades.substring(n+1);
        document.getElementById("hg-id").value = hgid;
    }
}

function processResults(place) {
        document.getElementById("google-id").value = place.place_id;
}

function copyID(inputfield) {
  /* Get the text field */
  var copyText = document.getElementById(inputfield);

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}

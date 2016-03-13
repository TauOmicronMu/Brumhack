/**
 *
 * Created by matt on 12/03/2016.
 */
var http = require("http");
var request = require("request");

var URLS = {
  restaurants: "http://public.je-apis.com/restaurants?q="
};
var HEADERS = {
  restaurants: {
    "Accept-Tenant": "uk",
    "Accept-Language": "en-GB",
    "Accept-Charset": "utf-8",
    "Authorization": "Basic VGVjaFRlc3RBUEk6dXNlcjI=",
    "Host": "public.je-apis.com"
    /*
    "Authorization": "Basic a2luZ3MtaGFjazpqNHlrN3ljb3Q1MHRmMng=",
    "Accept-Version": "2",
    "User-Agent": "hackkings",
    "Host": "api-interview.just-eat.com",
    "Content-Type": "application/json"*/
  }
};

module.exports = {
  getRestaurants: function(postcode, cb){
    request({
      url: URLS.restaurants + postcode,
      headers: HEADERS.restaurants
    }, function(err, res, body){
      cb(err, res, JSON.parse(body));
    });
  },
  countCuisines: function(restaurants){
    restaurants = restaurants.reduce(function(prev, current){
      current.CuisineTypes = current.CuisineTypes.map(function(el){
        return el.Name;
      });
      for (var i = 0; i < current.CuisineTypes.length; i++) {
        if(prev[current.CuisineTypes[i]] > 0) prev[current.CuisineTypes[i]]++;
        else prev[current.CuisineTypes[i]] = 1;
      }
      return prev;
    }, {});
    var keys = Object.keys(restaurants);
    var restaurantsArray = new Array(keys.length);
    for (var i = 0; i < keys.length; i++)
      restaurantsArray[i] = {name: keys[i], numRestaurants: restaurants[keys[i]]};
    restaurantsArray.sort(function(a,b){
      return b.numRestaurants - a.numRestaurants;
    });
    return restaurantsArray;
  }
};
/*
module.exports = {
  getRestaurants: function(postcode, cb){
    request
        .get(URLS.restaurants + postcode, HEADERS.restaurants)
        .on('response', function(res){
          cb(res);
        });
  }
};
    */
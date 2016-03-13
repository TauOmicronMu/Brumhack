/**
 *
 * Created by matt on 12/03/2016.
 */
var JE = require("../data/JE.js");

JE.getRestaurants("b29", function(err, res, body){
  if(err) console.log(err);
  console.log("status: " + res.status);
  //console.log(body);
  //console.log(body.Restaurants);
  console.log(JE.countCuisines(body.Restaurants));
});


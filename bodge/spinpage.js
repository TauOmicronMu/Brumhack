var cuisines =
[ { name: 'Pizza', numRestaurants: 66 },
  { name: 'Indian', numRestaurants: 56 },
  { name: 'Chinese', numRestaurants: 24 },
  { name: 'Italian', numRestaurants: 23 },
  { name: 'Bangladeshi', numRestaurants: 20 },
  { name: 'Chicken', numRestaurants: 20 },
  { name: 'Kebab', numRestaurants: 20 },
  { name: 'Fish & Chips', numRestaurants: 13 },
  { name: 'Peri Peri', numRestaurants: 11 },
  { name: 'Desserts', numRestaurants: 10 },
  { name: 'Curry', numRestaurants: 9 },
  { name: 'American', numRestaurants: 8 },
  { name: 'Burgers', numRestaurants: 7 },
  { name: 'Oriental', numRestaurants: 7 },
  { name: 'Caribbean', numRestaurants: 6 },
  { name: 'Cakes', numRestaurants: 5 },
  { name: 'Middle Eastern', numRestaurants: 5 },
  { name: 'English', numRestaurants: 4 },
  { name: 'Mexican', numRestaurants: 3 },
  { name: 'Persian', numRestaurants: 3 },
  { name: 'Jamaican', numRestaurants: 3 },
  { name: 'Sandwiches', numRestaurants: 3 },
  { name: 'Healthy', numRestaurants: 2 },
  { name: 'Grill', numRestaurants: 2 },
  { name: 'Breakfast', numRestaurants: 2 },
  { name: 'Lebanese', numRestaurants: 2 },
  { name: 'Vegetarian', numRestaurants: 2 },
  { name: 'Thai', numRestaurants: 2 },
  { name: 'Arabic', numRestaurants: 2 },
  { name: 'Pasta', numRestaurants: 2 },
  { name: 'Retro Sweets', numRestaurants: 1 },
  { name: 'Gluten Free', numRestaurants: 1 },
  { name: 'Pakistani', numRestaurants: 1 },
  { name: 'Japanese', numRestaurants: 1 },
  { name: 'Sushi', numRestaurants: 1 },
  { name: 'Iranian', numRestaurants: 1 },
  { name: 'African', numRestaurants: 1 },
  { name: 'Mediterranean', numRestaurants: 1 } ]

/*
 * Process the data from the API.
 */
var top8 = ['Pizza', 'Indian', 'Chinese', 'Italian', 'Bangladeshi', 'Chicken', 'Kebab', 'Fish & Chips']

/*
 * Work out the colours for the segments, based on the
 * number of overall segments.
 */
var result;


var segments = 8;

var colours = randomColor({
	count : 8,
        luminosity : "dark",
});

var duration = 5;

function alertFinished() {
    alert("You should get : " + wheel.getIndicatedSegment().text);
}

/*
function endGame(){
    var data = getFinalScores();
    var sum=data.map(function(a) {return a.numVotes;}).reduce(function(a,b){return a+b;},0);
    result = getWinner();
    segments = data.length;
    var segmentData = new Array();
    for(var i=1;i<=data.length;i++){
        segmentData[i] = {
            'fillStyle' : colours[i-1],
            'text' : data[i-1].name,
            'size' : data[i-1].numVotes*360/sum
        };
    }
    var angle = 0;
    var i=0;
    while(data[i].name!=result){
        angle+=segments[i+1].size;
        i++;
    }
    angle+=segments[i+1].size*Math.random();
    wheel.animation.stopAngle = angle;
    wheel.startAnimation();
}
*/

var wheel = new Winwheel({
        'numSegments' : segments,
        'pointerAngle' : 0, 
        'textFontSize' : 36,
        'textFontFamily' : 'Quicksand',
        'textFontWeight' : 'Bold',
        'textFillStyle' : '#ffffff',
        'strokeStyle' : 'white', 
        'lineWidth' : 8, 
        'segments'    :
            [
                {'fillStyle' : colours[0], 'text' : top8[0]},
                {'fillStyle' : colours[1], 'text' : top8[1]},
                {'fillStyle' : colours[2], 'text' : top8[2]},
                {'fillStyle' : colours[3], 'text' : top8[3]},
                {'fillStyle' : colours[4], 'text' : top8[4]},
                {'fillStyle' : colours[5], 'text' : top8[5]},
                {'fillStyle' : colours[6], 'text' : top8[6]},
                {'fillStyle' : colours[7], 'text' : top8[7]}
            ],
        'animation' : 
            {
                'type' : 'spinToStop',
                'duration' : duration,
                'spins' : 8
            },
        'callbackFinished' : 'alertFinished()',
        /*
        This will draw a red line at 'pointerAngle' degrees and show you 
        where the wheel thinks that many degrees is.
        'pointerGuide' : 
            {
                'display' : true,
                'strokeStyle' : 'red',
                'lineWidth' : 3
            }
         */
});

/*
 * Spin the wheel for 'duration' seconds. 
 */
function spinWheel() {
    wheel.startAnimation();
    setTimeout(alertFinished, duration*1000);
}
/*
setTimeout(moveIntoView, 10000,3);
setTimeout(moveIntoView, 15000,4);
setTimeout(moveIntoView, 25000, 1);
*/

var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
var canvas = document.createElement("canvas");
var width = 1000;
var height = 600;
canvas.width = width;
canvas.height = height;
//canvas.addEventListener("click", mouseClickEvent, false); //Touch input


var context = canvas.getContext('2d');

var delta = 0;
var now = Date.now();
/*var button1 = new Button(0, 0, canvas.width/2, canvas.height/2);
var button2 = new Button(0, canvas.height/2, canvas.width/2, canvas.height/2);
var button3 = new Button(canvas.width/2, 0, canvas.width/2, canvas.height/2);
var button4 = new Button(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);*/

var INITIAL_SCORE = 100;
var options = new Array();
var scores = new Array();
var buttons = new Array();


//For interacting
function addOption(name){
    options.push(name);
    scores.push(INITIAL_SCORE);
}

function prepare(){
    var c = Math.floor(options.length/2)+1;
    var colors = randomColor({
        count: options.length,
        //luminosity: 'dark',
        hue: 'blue'
    });
    for (var i = 0; i<options.length; i++ ) {
        if(i%2==0) buttons.push(new Button(width*(Math.floor(i/2))/c,0,width/c,height/2,options[i],colors[i]));
        else buttons.push(new Button(width*(Math.floor(i/2))/c,height/2,width/c,height/2,options[i],colors[i]));
    }
}



function init(){
    canvas.addEventListener("mousedown", onMouseDown, false);
    
    //Testing
    addOption("Curry");
    addOption("Pizza");
    addOption("Chineese");
    addOption("More pizza");
    addOption("Death");
    addOption("Fast food");
    addOption("Kebab");
    addOption("Even more pizza");
    prepare();
}

var render = function(){
    /*button1.render();
	button2.render();
    button3.render();
    button4.render();*/
    
    for (var i = 0; i<buttons.length; i++ ) {
           buttons[i].render();
    }
};

var update = function(){
    
};

var step = function(){
    update();
    render();
    animate(step);
};


function Button(x,y,width,height,name,color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.name = name;
    this.clicks = 0;
    this.effectSize = 0;
    console.log(name+" created at "+x+", "+y);
    
    this.render = function(){
        //Render a circle
        /*context.beginPath();
        context.arc(x,y,size/2,0,Math.PI*2,false);
        context.fillStyle = "#0000FF";
        context.fill();*/
        context.fillStyle = this.getColor();
        context.globalAlpha = 1;
        context.fillRect(x, y, width, height);
        
        //Draw effect
        if(this.effectSize>0){
            context.fillStyle = "#000000";
            context.globalAlpha = 0.5;
            context.fillRect(this.x+(this.width*(1-this.effectSize))/2, this.y+(this.height*(1-this.effectSize))/2, this.width*this.effectSize, this.height*this.effectSize);
            this.effectSize*=0.96;
            if(this.effectSize>1) this.effectSize=1;
            context.globalAlpha = 1;
        }
        
        //Draw text
        context.font= "bold 22px Arial";
        context.fillStyle = "#FFFFFF";
        context.globalAlpha = 0.8;
        var textWidth = context.measureText(name).width;
        context.fillText(name,x+(this.width-textWidth)/2,y+height/2,width);
    }
    this.getColor = function(){
        if(this.color==undefined){
            var r = Math.round(Math.random()*200+56).toString(16);
            var g = Math.round(Math.random()*200+56).toString(16);
            var b = Math.round(Math.random()*200+56).toString(16);
            
            //this.color = "#"+r+g+b;
            this.color = randomColor({
                luminosity: 'light',
                hue: 'blue'
            });
        }
        return this.color;
    }
    this.tryClick = function(mouse){
        //For circles
        //var distance = Math.sqrt(Math.pow(x-mouse.x,2) + Math.pow(y-mouse.y,2));
        //if(distance<=size/2) this.newClick();
        if(!(mouse.x<x || mouse.x>x+width || mouse.y<y || mouse.y>y+height)) this.newClick();
    }
    this.newClick = function(){
        this.clicks++;
        $("#log1").text(this.clicks);
        $("#log3").text(name+" pressed")
        this.effectSize+=0.20;
    }
    
}

//function innerButton = function()




function darken(color){
    var r = color.substring(1,2).parseInt;
    var g = color.substring(3,4).parseInt;
    var b = color.substring(5,6).parseInt;
    //var lightness = (r+g+b)/255;
}

function onMouseDown(e) {
    $("#log2").text("Registered click");
    var mouse = getMouse(e, canvas);
    for (var i = 0; i<buttons.length; i++ ) {
           buttons[i].tryClick(mouse);
    }
    //button1.tryClick(mouse);
   $("#debug2").text("Mouse click at"+mouse.x);
}



//getMouse() From http://stackoverflow.com/questions/10449890/detect-mouse-click-location-within-canvas#10450915
function getMouse(e, canvas) {
  var element = canvas, offsetX = 0, offsetY = 0, mx, my;

  // Compute the total offset. It's possible to cache this if you want
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  //Could potentially do that later
  //offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
  //offsetY += stylePaddingTop + styleBorderTop + htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;

  // We return a simple javascript object with x and y defined
  return {x: mx, y: my};
}

init();
document.body.appendChild(canvas);
animate(step);
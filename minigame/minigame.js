var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
var canvas = document.createElement("canvas");
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;
//canvas.addEventListener("click", mouseClickEvent, false); //Touch input


var context = canvas.getContext('2d');

var delta = 0;
var now = Date.now();
var button1 = new Button(0, 0, canvas.width/2, canvas.height/2);
var button2 = new Button(0, canvas.height/2, canvas.width/2, canvas.height/2);
var button3 = new Button(canvas.width/2, 0, canvas.width/2, canvas.height/2);
var button4 = new Button(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);



function init(){
    canvas.addEventListener("mousedown", onMouseDown, false);
}

var render = function(){
    button1.render();
	button2.render();
    button3.render();
    button4.render();

};

var update = function(){
    
};

var step = function(){
    update();
    render();
    animate(step);
};

var getScore = function(){
    return button.clicks;
};

function Button(x,y,width,height,color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.clicks = 0;
    this.render = function(){
        //Render a circle
        /*context.beginPath();
        context.arc(x,y,size/2,0,Math.PI*2,false);
        context.fillStyle = "#0000FF";
        context.fill();*/
        context.fillStyle = this.getColor();
        context.fillRect(x, y, width, height);
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
        if(mouse.x<x || mouse.x>x+width || mouse.y<y || mouse.y>y+height) $("#log1").text("Click outside button");
        else this.newClick();
        
    }
    this.newClick = function(){
        this.clicks++;
        $("#log1").text(this.clicks);
    }
}

//function innerButton = function()






function onMouseDown(e) {
    $("#log1").text("Registered click");
  var mouse = getMouse(e, canvas);
  button.tryClick(mouse);
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
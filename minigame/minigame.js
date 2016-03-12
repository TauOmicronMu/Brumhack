var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
var canvas = document.createElement("canvas");
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var delta = 0;
var now = Date.now();
var button = new Button(400,300,100);


function init(){
    canvas.addEventListener("mousedown", onMouseDown, false);
}

var render = function(){
    button.render();
};

var update = function(){
    
};

var step = function(){
    update();
    render();
    animate(step);
};

function Button(x,y,size){
    this.x = x;
    this.y = y;
    this.size= size;
    this.clicks = 0;
    this.render = function(){
        context.beginPath();
        context.arc(x,y,size/2,0,Math.PI*2,false);
        context.fillStyle = "#0000FF";
        context.fill();
    }
    this.tryClick = function(mouse){
        var distance = Math.sqrt(Math.pow(x-mouse.x,2) + Math.pow(y-mouse.y,2));
        if(distance<=size/2) this.newClick();
    }
    this.newClick = function(){
        this.clicks++;
        $("#log1").text(this.clicks);
    }
    
    
    
}







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
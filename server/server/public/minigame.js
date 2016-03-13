var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
var canvas = document.createElement("canvas");
var width = 1500;
var height = 800;
canvas.width = width;
canvas.height = height;
//canvas.addEventListener("click", mouseClickEvent, false); //Touch input


var context = canvas.getContext('2d');

var delta = 0;
var now = Date.now();
var startTime;

var INITIAL_SCORE = 20;
var MAX_BRIGHTNESS=0.75;
var GAME_DURATION = 15; //In seconds
var options = new Array();
var scores = new Array();
var colors = new Array();
var buttons = new Array();
var bar = new ProgressBar(0,height/2-25,width,50);

var countdown = new Array();

var started = false;
var finished = false;
var owner = false;

var results;
var winner;

//For interacting

function getWinner(){
    return winner;
}

function getFinalScores(){
    return results;
}

function addStartEmitter(emitter){
    emitter.bind(start());
}


//Gets clicks from last call of this function
function getNewClicks(){
    var res = new Array(scores.length);
    for(var i=0; i<buttons.length; i++){
        res[i] = buttons[i].clicks;
        buttons[i].clicks=0;
    }
    return res;
}

function addNewClicks(clicks){
    for(var i=0;i<clicks.length;i++){
        scores[i]+=clicks[i];
    }
}

function start(){
    setTimeout(function(){started=true;}, 3000);
    startTime = now+3000;
    countdown.push(new CountdownNumber(width/2,height/2,80,now,now+1000,"3"));
    countdown.push(new CountdownNumber(width/2,height/2,80,now+1000,now+2000,"2"));
    countdown.push(new CountdownNumber(width/2,height/2,80,now+2000,now+3000,"1"));
    countdown.push(new CountdownNumber(width/2,height/2,80,now+3000,now+4000,"START"));
}

function finish(){
    finished=true;
}


function addOption(name){
    options.push(name);
    scores.push(INITIAL_SCORE);
}

function addCuisines(options){
    for(var i=0; i<options.length && i<=8;i++){
        addOption(options[i].name);
    }
    prepare();
}

function establishConnection(){
    joinGame(function(cuisine){
        incremementScore(cuisine);
    }, function(){}, function(votes, cuisine){
        finish();
        results = votes;
        winner = cuisine;
    });
}

function setOwner(){
    owner = true;
}

function sendStartGame(){
    startGame();
    //start();
}


function prepare(){
    colors = randomColor({
        count: options.length,
        //luminosity: 'dark',
        hue: 'blue'
    });
    for(var i=0; i<colors.length; i++){
        colors[i] = ensureDark(colors[i]);
    }
    var c = Math.floor(options.length/2);
    for (var i = 0; i<options.length; i++ ) {
        if(i%2==0) buttons.push(new Button(width*(Math.floor(i/2))/c,0,width/c,height/2,options[i],colors[i]));
        else buttons.push(new Button(width*(Math.floor(i/2))/c,height/2,width/c,height/2,options[i],colors[i]));
    }
    resizeCanvas();
}

function rebuildButtons(){
    var c = Math.floor(options.length/2);
    for(var i=0;i<buttons.length;i++){
        if(i%2==0) buttons[i].reposition(width*(Math.floor(i/2))/c, 0, width/c, height/2);
        else buttons[i].reposition(width*(Math.floor(i/2))/c,height/2,width/c,height/2);
    }
}



function init(){
    canvas.addEventListener("mousedown", onMouseDown, false);
    //Testing
    /*addOption("Curry");
    addOption("Pizza");
    addOption("Chineese");
    addOption("More pizza");
    addOption("Death");
    addOption("Middle Eastern'");
    addOption("This is a really long text that might not fit into the button");
    addOption("Even more pizza");*/
    
    if(buttons.length<1) prepare();
    resizeCanvas();
}

var render = function(){
    width = canvas.width;
    height = canvas.height;
    //console.log(width+", "+height);
    rebuildButtons();
    bar.reposition(0,height/2-25,width,50);
    
    for (var i = 0; i<buttons.length; i++ ) {
           buttons[i].render();
    }
    bar.render();
    for(var i=0;i<countdown.length;i++){
        countdown[i].render();
    }
};

var update = function(){
    var newTime = Date.now();
    delta = newTime - now;
    now = newTime;
    if(started && now>startTime+GAME_DURATION*1000) finish();
    //Testing
    setOwner();
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
    //console.log(name+" created at "+x+", "+y);
    
    this.render = function(){
        context.fillStyle = this.getColor();
        context.globalAlpha = 1;
        context.fillRect(this.x, this.y, this.width, this.height);
        
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
        context.fillStyle = "#FFFFFF";
        context.globalAlpha = 0.8;
        var textSize = 22;
        context.font= "bold "+textSize+"px Arial";
        /*while(context.measureText(name).width >= this.width){
            textSize--;
            context.font= "bold "+textSize+"px Arial";
        }*/
        //console.log(name);
        var textWidth = context.measureText(name).width;
        context.fillText(name,this.x+(this.width-textWidth)/2,this.y+this.height/2,this.width);
    }
    this.reposition = function(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
        if(!(mouse.x<this.x || mouse.x>this.x+this.width || mouse.y<this.y || mouse.y>this.y+this.height)) this.newClick();
    }
    this.newClick = function(){
        this.clicks++;
        $("#log1").text(this.clicks);
        $("#log3").text(this.name+" pressed")
        this.effectSize+=0.20;
        incremementScore(this.name);
        addPoint(this.name);
    }
    
}

var incremementScore = function(name){
    for (var i = 0; i<scores.length; i++ ) {
           if(options[i]==name){
               scores[i]++;
           }
    }
}


function ProgressBar(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = randomColor({hue: 'blue'});
    
    this.reposition = function(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    this.render = function(){
        if(started && !finished){
            var total = scores.reduce(function(a,b){return a+b;},0);
            var pos = this.x;
            context.globalAlpha = 1;
            for (var i = 0; i<scores.length; i++) {
                context.fillStyle = colors[i];
                var rectWidth = scores[i]*this.width/total;
                context.fillRect(pos, this.y, rectWidth, this.height);
                context.fillStyle = "#000000";
                context.fillRect(pos+rectWidth-2, this.y, 3, this.height);
                pos+=rectWidth;    
            }
        
        }else{
            context.globalAlpha = 1;
            context.fillStyle = this.color;
            context.fillRect(this.x,this.y,this.width,this.height);
            
            context.font= "bold 22px Arial";
            context.fillStyle = "#FFFFFF";
            var text = "Waiting for other people to join...";
            if(owner && countdown.length==0) text = "Click to start game";
            else if(finished) text = "Game finished!";
            else if(countdown.length>0) text = "About to start...";
            var textWidth = context.measureText(text).width;
            context.fillText(text,this.x+(this.width-textWidth)/2,this.y+this.height/2,this.width);
        }
        
        //Draw border
        context.beginPath();
        context.lineWidth="3";
        context.strokeStyle="black";
        context.rect(this.x,this.y,this.width,this.height);
        context.stroke();
    }
    this.tryClick = function(mouse){
        if(owner && countdown.length==0 && !(mouse.x<this.x || mouse.x>this.x+this.width || mouse.y<this.y || mouse.y>this.y+this.height)) this.newClick();
    }
    this.newClick = function(){
        sendStartGame();
    }
}

function CountdownNumber(x,y,fontSize,start,end,digit){
    this.x=x;
    this.y=y;
    this.fontSize = fontSize;
    this.start = start;
    this.end = end;
    this.digit = digit;
    this.render = function(){
        if(now<start || now>end) return;
        else{
            //console.log("Countdown is happening")
            var progress = (now-start)/(end-start);
            var size = fontSize*(1+progress*2);
            var alpha = 1 - progress;
            
            context.font= "bold +"+size+"px Arial";
            var textWidth = context.measureText(this.digit).width;
            var textHeight = size;
            //console.log(digit+", "+textWidth+", "+textHeight);
            
            context.fillStyle = "#000000";
            context.globalAlpha = 1-progress;
            //context.fillText("test",400,400,200);
            context.fillText(digit+"",this.x-textWidth/2,y); //,this.y+textHeight/2
        }
    }
}





function ensureDark(color){
    //console.log("EnsureDark called");
    var r = parseInt(color.substring(1,3),16);
    var g = parseInt(color.substring(3,5),16);
    var b = parseInt(color.substring(5,7),16);
    var brightness = (r+g+b)/(255*3);
    //console.log("Brightness: "+brightness);
    if(brightness<MAX_BRIGHTNESS){
        return color;  
    } 
    else{
        var scale = MAX_BRIGHTNESS/brightness;
        r*=scale;
        g*=scale;
        b*=scale;
        //console.log(r+", "+g+", "+b);
        //console.log(rgbToHex(r,g,b));
        return rgbToHex(Math.floor(r),Math.floor(g),Math.floor(b));
    }
}

//rgToHex() from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#5624139
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function onMouseDown(e) {
    var mouse = getMouse(e, canvas);
    bar.tryClick(mouse);
  
    if(!started || finished) return;
    for (var i = 0; i<buttons.length; i++ ) {
           buttons[i].tryClick(mouse);
    }
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
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = document.width;
    canvas.height = document.height;
    update();
}

console.log("Reached appending the canvas to #minigame");
$("#minigame").append(canvas);
console.log("Should have appended canvas to #minigame.");
animate(step);


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


function init(){
    
}

var render = function(){
    
}

var update = function(){
    
}

var step = function(){
    update();
    render();
    animate(step);
}


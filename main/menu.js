var canvas;
var ctx;
var menuActive = true;
var westX = 300;
var westY = 400;


window.onload = function(){
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  var fps = 30;
  drawMenu();
  //starts game if enter is pressed
 $(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && menuActive == true)
          {
            menuActive = false;
            ctx.clearRect(0,0,canvas.width, canvas.height);
             setInterval(function() {
              moveUp();
              $(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && menuActive == false)
          {
            jump();
          }});},1000/fps)}
    });
}

//draws out the menu's text and background
function drawMenu() {
  ctx.font = "50px Consolas";
  ctx.fillStyle = "#00bfff";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "black";
  ctx.fillText("Office Hours",340,100); 
  ctx.font = "30px Consolas";
  ctx.fillText("Press Enter To Start", 340, 300);
}

function drawLevel() {
  var fps = 30;
  ctx.fillStyle = "#c3c3d5";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(westX,westY,8,0,Math.PI*2,true);
  ctx.fill();

}

function moveUp()
{
  setInterval(westY-=.09,1000/30);
}

var canvas;
var ctx;

//starts game if enter is pressed
$(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13')
          {
            alert('You pressed enter');
          }
    });

window.onload = function(){
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  drawMenu();
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

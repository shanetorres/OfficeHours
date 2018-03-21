var canvas,
    ctx,
    menuActive = true,
    westX = 300,
    westY = 400,
    velX = 0,
    velY = 0,
    maxVelY = 2,
    speed = 3,
    inertia = 0.98,
    keys = [],
    jumping = false,
    gravity = .05;
    

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
            drawLevel();    //intial level draw
          }
    });
}

//draws out the menu's text and background
function drawMenu() {
  ctx.font = "50px Consolas";
  ctx.fillStyle = "#c3c3d5";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "black";
  ctx.fillText("Office Hours",340,100); 
  ctx.font = "30px Consolas";
  ctx.fillText("Press Enter To Start", 340, 300);
}

//draws the level and character
function drawLevel() {
  move();
 ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "#c3c3d5";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(westX,westY,8,0,Math.PI*2,true);
  ctx.fill();
  requestAnimationFrame(drawLevel); //recursively updates the level
}

//moves character
function move()
{
  if (keys[65]) {     //if a is pressed
    if (velX > -speed) {
      velX--;
    }
  }
  if (keys[68]) {     //if d is pressed
    if (velX < speed) {
      velX++;
    }
  }
  if (keys[87] || keys[32]) //if w or space is pressed
    {
      velY = -maxVelY; //sets the initial velocity when jumping
      jumping = true;
    }
  if (jumping == true)    //if the character is moving upwards
    {
      velY+= gravity;
      velY*= inertia; 
      westY += velY;
      if (westY <= 408 && westY >= 392) //if the ball is on the ground, stop subtracting gravity from Y coord
        {
          jumping = false;
        }
    }
 
  velX*= inertia;
  westX += velX;
  
  //checks if character is at the edge
  if (westX >= canvas.width-8)
    {
      westX = canvas.width-8;
    } else if (westX <= 8)
      {
        westX = 8;
      }
  if (westY >= canvas.height-8)
    {
      westY = canvas.width-8;
    } else if (westY <= 8)
      {
        westY = 8;
      }
}

document.addEventListener("keydown", function(e) {
                          keys[e.keyCode] = true;
                          });
document.addEventListener("keyup", function(e) {
                          keys[e.keyCode] = false;
});

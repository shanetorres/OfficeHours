var canvas,
    ctx,
    menuActive = true,
    westX = 300,
    westY = 500,
    velX = 0,
    velY = 0,
    maxVelY = 6,
    speed = 3,
    jumpSpeed = 2,
    inertia = 0.92,
    keys = [],
    jumping = false,
    starttime,
    duration = 2000,
    onGround = true,
    onPlatform = false,
    gravity = .3,
    platformX = [100,520],
    platformY = [200,110],
    platformNumber;
    

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
  ctx.fillRect(platformX[0], platformY[0], 60, 10);
  ctx.fillRect(platformX[1], platformY[1], 60, 10);
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
      onGround = false;
    }
  
  if (jumping == true)    //if the character is moving upwards
    {
      velY+= gravity; //addi
      velY*= inertia; 
      westY += velY;
      if (westY <= 508 && westY >= 492) //if the ball is on the ground, stop subtracting gravity from Y coord
        {
          jumping = false;
          onGround = true;
        }
      for (var i = 0; i <= 1; i++)   //if the ball lands on a platform
        {
          if ((westY <= platformY[i] + 8 && westY >= platformY[i] -8) && (westX >= platformX[i] -8 && westX <= platformX[i] + 68))
            {
              platformNumber = i; //logs which platform the ball is on
              onPlatform = true;
              jumping = false;
            }
        }
    }
  if (onPlatform == true)
    {
      for(var i = 0; i <= 1; i++) //checks to see if the ball is off each platform
      {
        if(i == platformNumber && (westX > platformX[i]+68|| westX < platformX[i] -8)) //allows ball to fall if no longer on a platform
          {
            console.log(platformNumber);
            jumping = true;
            onPlatform = false;
            
          }
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
                          doneUp = false
                          keys[e.keyCode] = true;
                          });
document.addEventListener("keyup", function(e) {
                          keys[e.keyCode] = false;
                          doneUp = true;
});

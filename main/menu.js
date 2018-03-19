var canvas,
    ctx,
    menuActive = true,
    westX = 300,
    westY = 400,
    velX = 0,
    velY = 0,
    speed = 3,
    jumpSpeed = 2,
    friction = 0.92,
    keys = [],
    jumping = false,
    starttime,
    duration = 2000;

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
            console.log(keycode);
            menuActive = false;
            drawLevel();    //intial level draw
            move();         //moves the character
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
 ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "#c3c3d5";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(westX,westY,8,0,Math.PI*2,true);
  ctx.fill();

}

//moves character
function move()
{
  requestAnimationFrame(move);  //recursively updates the level
 
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
  if (keys[87] || keys[32])
    {
//       starttime = timestamp || new Date().getTime();
    stopAnimationFrame(move);
      jump();
  
    }
  // velY*= friction;
  // westY += velY;
  velX*= friction;
  westX += velX;
  
  //checks if character is at the edge
  if (westX >= canvas.width-8)
    {
      westX = canvas.width-8;
    } else if (westX <= 8)
      {
        westX = 8;
      }
  drawLevel();
}

  
function jump()
  {
      // var timestamp = timestamp || new Date().getTime();
      // var runtime = timestamp - starttime;
    requestAnimationFrame(jump);
      if (velY > -jumpSpeed) {
      velY--;
    }
    velY*= friction;
    westY += velY;
      // if (runtime < duration) {
      //   requestAnimationFrame(function(timestamp){
      //     jump(starttime);
      //   })
      // }
      
  }
document.addEventListener("keydown", function(e) {
                          keys[e.keyCode] = true;
                          });
document.addEventListener("keyup", function(e) {
                          keys[e.keyCode] = false;
                          });

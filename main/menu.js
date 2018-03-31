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
    onGround = true,
    onPlatform = false,
    gravity = .3,
    platformX = [100,520],
    platformY = [200,110],
    groundX = [],
    groundY = [],
    platformNumber,
    currentOffsetX = 0,
    min_offset = 100,
    max_offset = 900, 
    blockstart = 0,
    groundBlocks = 20;
    const BLOCK_HEIGHT = 45,
    BLOCK_WIDTH = 45
   ;
    

window.onload = function(){
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  drawMenu();
  //starts game if enter is pressed
 $(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && menuActive == true)
          {
            menuActive = false;
            drawLevel();    //initial level draw
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
  var groundBlock = "mario1";
  move();
 ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "#97CAEF";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  bigBlock(blockstart, 2, "hotpink", groundBlocks, 1); //draw the ground
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
      currentOffsetX++;
    }
  }
  if (keys[68]) {     //if d is pressed
    if (velX < speed) {
      velX++;
      currentOffsetX--;
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
      for (var i = 0; i < groundBlocks; i++)
      {
      if (westY <= 500 && westY >= 492 && westX <= groundX[i]+45) //if the ball is on the ground, stop subtracting gravity from Y coord
        {
          jumping = false;
          onGround = true;
        }
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
  if (onGround == true) //detects if the player is off the ground or not
    {
      if ((westY <= 500 && westY >= 492 && westX <= groundX[0]) || (westY <= 500 && westY >= 492 && westX > groundX[groundBlocks-1]+45))
        {
          onGround = false;
          jumping = true;
        }
    }

  velX*= inertia;
  currentOffsetX*=inertia;  //used for sidescrolling, redraws map based on movement
  
      westX += velX;
  
  if (westX >= max_offset || westX <= 100) //if the character is far enough left or right, the map will move rather than the player
  {
    scrolling = true;
    for(var i = 0; i <= 1; i++) //move the platforms(temporary)
    {
      platformX[i]+=currentOffsetX;
    }
    blockstart+=(currentOffsetX/45); //move the ground
    
    for (var i = 0; i <= groundBlocks; i++) //update ground x array
    {
      groundX[i]+=currentOffsetX;
    }
  }
  //checks if character is at the edge
  if (westX >= max_offset)
    {
      westX = max_offset;
    } else if (westX <= min_offset)
      {
        westX = min_offset;
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

function bigBlock(xIn, yIn, colorIn, sizeXin = 1, sizeYin = 1)
{
   //xin = x-axis
  //yin = y-axis
  //size = how many steps
  
   //xin = x-axis
  //yin = y-axis
  //size = how many steps
  

  sizeX = xIn + sizeXin;
  sizeY = yIn + sizeYin;
  for(var i = xIn; i < sizeX; i++){
    for(var z = yIn; z < sizeY; z++){
      groundX[i]= i*45;
      stackBlock(i, z, colorIn);
    }
  }
}

function stackBlock(xin, yin, colorIn, hide = false){
  //xin = x axis location
  //yin = y axis location
  //colorIn = block color
  //hide = show or hide, default is to show -- true = hide

 // var img = document.getElementById(imgIn);
 // console.log("Image in: " + imgIn);

  var sum = (BLOCK_HEIGHT * yin);// + yin;
  var sum2 = (BLOCK_WIDTH * xin);// + xin;
  var b_height = canvas.height - sum;
  var b_long = sum2;

  if(hide == false){
    colorRect(b_long, b_height, BLOCK_WIDTH, BLOCK_HEIGHT, colorIn);
   // ctx.drawImage(img, b_long, b_height, BLOCK_WIDTH, BLOCK_HEIGHT);
  }
}

function colorRect(leftX, topY, width, height, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.fillRect(leftX, topY, width, height);
}

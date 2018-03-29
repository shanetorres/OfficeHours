<DOCTYPE html>
<head>
<title>Office Hours</title>
</head>
<body>

  <img id="mario1" width="30" height="30" src="Mario/mario1.png" alt="ground">
  <img id="mario2" width="30" height="30" src="Mario/mario2.png" alt="empty">
  <img id="mario3" width="30" height="30" src="Mario/mario3.png" alt="full">
  <img id="mario4" width="30" height="30" src="Mario/mario4.png" alt="brick">
  <img id="mario5" width="30" height="30" src="Mario/mario5.png" alt="block">

  <div style="overflow: scroll; width: 1000px; height: 600px; border: solid red 3px; margin-left: auto; margin-right: auto;">
  <canvas id="gameCanvas" width="4000px" height="600px" style="margin-left: auto; margin-right: auto;"></canvas>
  </div>

</body>
</html>

<script>
var canvas;
var canvasContext;
const BLOCK_HEIGHT = 30;
const BLOCK_WIDTH = 30;



window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var img = document.getElementById("mario1");


    canvasContext.drawImage(img, 10, 10, 30, 30);
    drawEverything();

    //var c = document.getElementById("myCanvas");
    //var ctx = c.getContext("2d");



}

function drawEverything(){
  //canvas color/grid color
  colorRect(0, 0, canvas.width, canvas.height, '#97CAEF');

  var ground = "#9b786f";
  var sky = "#97CAEF";
  var grass = "#17a917";
  var groundBlock = "mario1";
  var emptyBlock = "mario2";
  var fullBlock = "mario3";
  var brick = "mario4";
  var block = "mario5";

  var zero = 3; //ground level to build on
  var lv1 = 6;
  var lv2 = 10;

  //draw background/sky
  //bigBlock(0, 0, sky, 133, 21);
  bigBlock(0, 0, groundBlock, 133, 3);

  //draw elements
  bigBlock(17, lv1, fullBlock);
  bigBlock(21, lv1, brick, 5);
  bigBlock(22, lv1, fullBlock);
  bigBlock(24, lv1, fullBlock);
  bigBlock(23, lv2, fullBlock);




  //bigBlock(13, lv1, brick, 5, 1);
  //bigBlock(9, lv2, brick, 6, 1);
  //bigBlock(7, lv1, fullBlock, 1, 1);
  //bigBlock(16, lv1, fullBlock, 1, 1);

  steps1(30, zero, block, 7);
  steps2(40, zero, block, 3);



  //steps1(0, 10, "green", 5);
  //steps2(6, 10, "green", 5);
  //steps3(12, 14, "green", 5);
  //steps4(18, 14, "green", 5);

  //bigBlock(20, 14, "hotpink", 5, 1);
  //bigBlock(21, 13, "hotpink", 4, 1);
  //bigBlock(22, 12, "hotpink", 3, 1);
  //bigBlock(23, 11, "hotpink", 2, 1);
  //bigBlock(24, 10, "hotpink", 1, 1);





}//end big function

function steps4(xin, yin, colorIn, size){
  //xin = x-axis
  //yin = y-axis
  //size = how many steps

  for(var i = size; i > 0; i--){
      bigBlock(xin, yin, colorIn, i, 1);
      xin++;
      yin--;
  }
}

function steps1(xin, yin, colorIn, size){
  //xin = x-axis
  //yin = y-axis
  //size = how many steps

  for(var i = 1; i <= size; i++){
      bigBlock(xin, yin, colorIn, 1, i);
      xin++;
  }
}

function steps2(xin, yin, colorIn, size){
  //xin = x-axis
  //yin = y-axis
  //size = how many steps

  for(var i = size; i > 0; i--){
      bigBlock(xin, yin, colorIn, 1, i);
      xin++;
  }
}

function steps3(xin, yin, colorIn, size){
  //xin = x-axis
  //yin = y-axis
  //size = how many steps

  for(var i = size; i > 0; i--){
      bigBlock(xin, yin, colorIn, i, 1);
      yin--;
  }
}

function steps4(xin, yin, colorIn, size){
  //xin = x-axis
  //yin = y-axis
  //size = how many steps

  for(var i = size; i > 0; i--){
      bigBlock(xin, yin, colorIn, i, 1);
      xin++;
      yin--;
  }
}

function bigBlock(xin, yin, colorIn, sizeXin = 1, sizeYin = 1){
  //xin = x-axis
  //yin = y-axis
  //size = how many steps
  sizeX = xin + sizeXin;
  sizeY = yin + sizeYin;

  for(var i = xin; i < sizeX; i++){
    for(var z = yin; z < sizeY; z++){
      stackBlock(i, z, colorIn);
    }
  }
}

function stackBlock(xin, yin, imgIn, hide = false){
  //xin = x axis location
  //yin = y axis location
  //colorIn = block color
  //hide = show or hide, default is to show -- true = hide

  var img = document.getElementById(imgIn);
  console.log("Image in: " + imgIn);

  var sum = (BLOCK_HEIGHT * yin);// + yin;
  var sum2 = (BLOCK_WIDTH * xin);// + xin;
  var b_height = canvas.height - sum;
  var b_long = sum2;

  if(hide == false){
    //colorRect(b_long, b_height, BLOCK_WIDTH, BLOCK_HEIGHT, colorIn);
    canvasContext.drawImage(img, b_long, b_height, BLOCK_WIDTH, BLOCK_HEIGHT);

  }
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

</script>

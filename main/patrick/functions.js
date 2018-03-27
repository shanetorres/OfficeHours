function main_menu(){
clear_canvas();
ctx.drawImage(image_main, 0, 0);
game_state = "main_menu";
}
function clear_canvas(){
ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}
function clicked(){
if (game_state == "main_menu"){
start_game();
}}
function start_game(){
game_state = "in_game";
resume_game();
}
function pause_game(){
clearInterval(tick_x);
clearInterval(render_x);
game_paused = 1;
ctx.globalAlpha=0.4;
ctx.fillStyle="white";
ctx.fillRect(0,0,1000,600); 
ctx.globalAlpha=1.0;
ctx.drawImage(image_paused, 0, 0);
}
function resume_game(){
game_paused = 0;
render_x = window.setInterval(render, 20);
tick_x = window.setInterval(tick, 20);
}
function render(){
clear_canvas();
render_background();
render_tiles();
render_entities();
render_score();
}
function render_score(){
}
function render_background(){
ctx.drawImage(bg_cloud_1, 0, 0, 160, 160, (1250)-current_offset_y, 180, 160, 160);
}
function render_tiles(){
for (i = 0; i < game_world.length; i++){
for (ii = 0; ii <game_world[i].length; ii++){
if (game_world[i][ii] != 0){
ctx.drawImage(tileset, (game_world[i][ii]*40)-40, 0, 40, 40, (ii*40)-current_offset_y, i*40, 40, 40);
}}}}
function render_entities(){
}
function tick(){
if(keysDown[39]){current_offset_y +=3;}
if(keysDown[37]){current_offset_y -=3;}
if (current_offset_y > max_offset){current_offset_y = max_offset;}
if (current_offset_y < min_offset){current_offset_y = min_offset;}
}
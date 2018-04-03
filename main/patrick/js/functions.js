function clear_canvas(){
ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}
function pauser(){//handle pausing/unpausing the game.
	if(game_paused == 1){
		game_paused=0;
		update_tick = window.setInterval(update,20);
	}else{
		game_paused=1;
		clearInterval(update_tick);
		menu("paused");
	}		
}
function update(){
	last_call -=.5;
	//updates the game state, and renders the next frame.
	clear_canvas();
	render_world();
	update_player();
	render_player();
	render_score();
}
function menu(men){
	if(men == "paused"){
		//code to show the paused screen.
		ctx.globalAlpha=0.4;
		ctx.fillStyle="white";
		ctx.fillRect(0,0,1000,600);
		ctx.globalAlpha=1.0;
		ctx.drawImage(image_paused, 0, 0);
	}
}
function render_world(){
	render_background();
	for (i=0;i<game_world.length;i++){
		for (ii=0;ii<game_world[0].length;ii++){
			ctx.drawImage(tileset, (game_world[i][ii].type*40)-40, 0, 40, 40, (ii*40)-current_offset_x, (i*40)-current_offset_y, 40, 40);
		}
	}
}
function render_background(){
	ctx.drawImage(door,2080-current_offset_x,440);
	ctx.drawImage(door,2240-current_offset_x,440);
	ctx.drawImage(door,2920-current_offset_x,440);
	ctx.drawImage(door,3160-current_offset_x,440);
}
function update_player(){
player.current_action="standing";
player.i_y -=.8;
player.i_x = 0;
if(keysDown[39]){player.facing="right";player.i_x = 5;};
if(keysDown[37]){player.facing="left";player.i_x = -5;};
if(keysDown[38]){if(player.jumpable==1){player.i_y +=19;player.jumpable=0;}};
if(player.x < 200){player.x += 5;current_offset_x -=5;}
if(player.x > 600){player.x -= 5;current_offset_x +=5;}
if (player.i_x >0){//trying to go right
	for(i=0;i<(player.i_x);i++){
	if((game_world[Math.floor((player.y+5)/40)][Math.floor((player.x + 31 + current_offset_x)/40)].type ==0) && (game_world[Math.floor((player.y+35)/40)][Math.floor((player.x + 31 + current_offset_x)/40)].type ==0)){
		player.x +=1;
		player.current_action="walking";
	}
	}
}else if(player.i_x <0){//going left.
	for(i=0;i< -player.i_x;i++){
		if((game_world[Math.floor((player.y+5)/40)][Math.floor(((player.x - 1) + current_offset_x)/40)].type ==0) && (game_world[Math.floor((player.y+35)/40)][Math.floor(((player.x - 1) + current_offset_x)/40)].type ==0)){
		player.x -=1;
		player.current_action="walking";
	}
	}
}
if (player.i_y >0){//going up
	for(i=0;i<(player.i_y);i++){
		if (player.y>3){
	if((game_world[Math.floor((player.y-1)/40)][Math.floor((player.x + 5 + current_offset_x)/40)].type ==0) && (game_world[Math.floor((player.y-1)/40)][Math.floor((player.x + 25 + current_offset_x)/40)].type ==0)){
		player.y -=1;
		player.current_action="jumping";
		}else{
			player.i_y = 0;
			block_hit();//test and run any actions associated with hitting the blocks.
		}
		}else{player.i_y=0;}
	}
}else if(player.i_y <0){//going down
	for(i=0;i< -player.i_y;i++){
		if((game_world[Math.floor((player.y+41)/40)][Math.floor(((player.x + 5) + current_offset_x)/40)].type ==0) && (game_world[Math.floor((player.y+41)/40)][Math.floor(((player.x + 25) + current_offset_x)/40)].type ==0)){
		player.y +=1;
		player.current_action="jumping";
		player.jumpable = 0;
	}else{
		player.jumpable = 1;
		player.i_y = -1;
	}
}
}
}
function block_hit(){//called when the player has jumped up into a block.
	block_hit_sound.play();//eventually we can change sound per block type.
	console.log(Math.floor((player.y-2)/40)+","+Math.floor((player.x + 3 + current_offset_x)/40)+" - "+Math.floor((player.y-2)/40)+","+Math.floor((player.x + 27 + current_offset_x)/40));
	game_world[Math.floor((player.y-2)/40)][Math.floor((player.x + 3 + current_offset_x)/40)].affect_hit();
	game_world[Math.floor((player.y-2)/40)][Math.floor((player.x + 27 + current_offset_x)/40)].affect_hit();
}
function render_player(){
	current+=.3;
	if (current>7){current=0;};
	if (player.facing == "left"){
	ctx.scale(-1,1);
	if (player.current_action=="walking"){
	ctx.drawImage(playerc,25*Math.floor(current),1,25,43,-player.x-30,player.y,30,40);}else{
		ctx.drawImage(playerc,25*7,1,25,43,-player.x-30,player.y,30,40);
	}
	ctx.scale(-1,1);//change the scale back
	}else{//facing right
	if (player.current_action=="walking"){
	ctx.drawImage(playerc,25*Math.floor(current),1,25,43,player.x,player.y,30,40);
	}else{ctx.drawImage(playerc,25*7,1,25,43,player.x,player.y,30,40);}
	}
}
function render_score(){
ctx.font = "30px Arial";
ctx.fillText("Score: "+score,10,50);
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){this.sound.play();}
	this.stop = function(){this.sound.pause();}
}
function switch_bg(){
	if(last_call <-2){last_call=1;
	if(bg_col==1){document.getElementById("gameCanvas").style.backgroundColor = "lightblue";bg_col=2;
	}else{document.getElementById("gameCanvas").style.backgroundColor = "#3BB9FF";bg_col=1;
	}}
}
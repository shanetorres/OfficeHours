function clear_canvas(){//clears the canvas.
ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}
function pauser(){//handle pausing/unpausing the game.
	if(game_paused == 1){
		game_paused=0;
		update_tick = window.setInterval(update,20);
		update_timer = window.setInterval(updatet,1000);
	}else{
		game_paused=1;
		clearInterval(update_tick);
		clearInterval(update_timer);
		menu("paused");
	}		
}
function update(){//updates and renders the next frame of the game. right now the game is framerate dependant, decoupling would prob be wise.
	last_call -=.5;//updates the game state, and renders the next frame.
	clear_canvas();
	render_world();
	update_player();
	render_player();
	update_enemies();//this is also new. see below.
	render_enemies(); ///THIS IS NEW. ADDED IN ENEMY PATCH. see enemies.js
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
function block_hit(){//called when the player has jumped up into a block.
	block_hit_sound.play();//eventually we can change sound per block type.
	game_world[Math.floor((player.y-2)/40)][Math.floor((player.x + 3 + current_offset_x)/40)].affect_hit();
	game_world[Math.floor((player.y-2)/40)][Math.floor((player.x + 27 + current_offset_x)/40)].affect_hit();
}
function render_score(){//display the current score.
ctx.globalAlpha = .8;
ctx.fillStyle="white";
ctx.fillRect(0,0,gameCanvas.width,40);
ctx.fillStyle="black";
ctx.globalAlpha = 1;
ctx.font = "30px Arial";
ctx.fillText("Score: "+score,45,35);
ctx.fillText("Time "+minute+":"+second,gameCanvas.width-155,30);
}
function updatet(){
	second++;
    
    if (second >= 60)
        {
            minute++;
            second = second-60; 
        }
    if (second < 10)
        second = "0"+second;
}
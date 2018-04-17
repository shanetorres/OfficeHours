player = {}
player.i_x = 0;//inertia in the x direction.
player.i_y = 0;//inertia in the y direction.
player.jumpable = 1;//1 if on the ground and can jump, 0 if not.
player.facing="right";
player.current_action="standing";//standing,walking,jumping.
player.x = 400;//starting position.
player.y = 480;
function render_player(){//render the player, using the state data in the player object. handles animations & stuff.
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
function update_player(){//update the players position.
player.current_action="standing";
player.i_y -=.8;
player.i_x = 0;

for (var i = 0; i < paperNo; i++){
	if(paperNo > 0) {
	if(papers[i].x > papers[i].initialX + paperMaxDist && papers[i].direction == "right") {
		papers.splice(i,1);
		paperNo--;
	}
	else if(papers[i].x < papers[i].initialX - paperMaxDist && papers[i].direction == "left") {
		papers.splice(i,1);
		paperNo--;
	}
	if((game_world[Math.floor((papers[i].y+5)/40)][Math.floor(((papers[i].x - 1) + current_offset_x)/40)].type != 0) && 
	(game_world[Math.floor((papers[i].y+35)/40)][Math.floor(((papers[i].x - 1) + current_offset_x)/40)].type != 0))
	{
		papers.splice(i,1);
		paperNo--;
	}
}
}

if (keysDown[32]) {console.log(paperNo);
	for (var i = 0; i < paperNo; i++) {
		ctx.drawImage(papers[i].image, papers[i].x, papers[i].y, 20, 20); 
	if(papers[i].direction === "right") { papers[i].x += 10; }
	else if (papers[i].direction === "left") { papers[i].x -= 10; 
	}
}
	
};
if(keysDown[39]){player.facing="right";player.i_x = 5;};
if(keysDown[37]){player.facing="left";player.i_x = -5;};
if(keysDown[38]){if(player.jumpable==1){player.i_y +=18;player.jumpable=0;}};
if(player.x < 200){player.x += 5;current_offset_x -=5;}
if(player.x > 600){player.x -= 5;current_offset_x +=5;}
if (player.i_x >0){//trying to go right
	for(i=0;i<(player.i_x);i++){ 
	if((game_world[Math.floor((player.y+5)/40)][Math.floor((player.x + 31 + current_offset_x)/40)].type ==0) && 
		(game_world[Math.floor((player.y+35)/40)][Math.floor((player.x + 31 + current_offset_x)/40)].type ==0)){
		player.x +=1;
		player.current_action="walking";
	}
	}
}else if(player.i_x <0){//going left.
	for(i=0;i< -player.i_x;i++){
		if((game_world[Math.floor((player.y+5)/40)][Math.floor(((player.x - 1) + current_offset_x)/40)].type ==0) && 
		(game_world[Math.floor((player.y+35)/40)][Math.floor(((player.x - 1) + current_offset_x)/40)].type ==0)){
		player.x -=1;
		player.current_action="walking";
	}
	}
}
if (player.i_y >0){//going up
	for(i=0;i<(player.i_y);i++){
		if (player.y>3){
	if((game_world[Math.floor((player.y-1)/40)][Math.floor((player.x + 5 + current_offset_x)/40)].type ==0) && 
	(game_world[Math.floor((player.y-1)/40)][Math.floor((player.x + 25 + current_offset_x)/40)].type ==0)){
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
		if((game_world[Math.floor((player.y+41)/40)][Math.floor(((player.x + 5) + current_offset_x)/40)].type ==0) && 
		(game_world[Math.floor((player.y+41)/40)][Math.floor(((player.x + 25) + current_offset_x)/40)].type ==0)){
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


//Player Level and Health Handling
//initialize health and level
playerLevel = 1;
maxHealth = 1;
currentHealth = maxHealth; //start player at full health

//call if player loses health from an enemy attack
function player_hurt(){
    currentHealth--;
    can_die();
}

//call when player loses health to see if they have died
function can_die(){
    if (currentHealth <= 0)
        has_died();
    
    console.log("Can die?");
}

//call when player dies
function has_died(){
    game_paused=1;
    clearInterval(update_tick);
    clearInterval(update_timer);
    menu("has_died");
    console.log("You died.");
}

//give player points for breaking block
function score_block(){
    score += 25;
    can_level_up();
    console.log("Current score  "+score);
}

//call when player earns points to check if they have enough to level up
function can_level_up(){
    if (score >= playerLevel * 450)
        level_up();
    
    console.log("Current level  "+playerLevel);
}

//call when player gets enough score to level up
function level_up(){
    playerLevel++;
    maxHealth++; //increase max health
    currentHealth = maxHealth; //heal player to full health
    game_paused=1;
    clearInterval(update_tick);
    clearInterval(update_timer);
    menu("level_up");
    console.log("Level Up");
}

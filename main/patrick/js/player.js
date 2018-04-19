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
for(var j = 0; j < enemy_list.length; j++) {

	for(var i = 0; i < paperNo; i++){
	if(papers[i].x >= (enemy_list[j].x - 11 - current_offset_x) && papers[i].x <= (enemy_list[j].x + 11 - current_offset_x) && papers[i].direction == "right"
		 && papers[i].y > (enemy_list[j].y -20) && papers[i].y < (enemy_list[j].y +20)){
		console.log("paper hit");
        enemy_killed();
		papers.splice(i,1);
		paperNo--;
		enemy_list.splice(j,1);
	}
	else if(papers[i].x >= (enemy_list[j].x - 11 - current_offset_x) && papers[i].x <= (enemy_list[j].x + 11 - current_offset_x) && papers[i].direction == "left"
		 && papers[i].y > (enemy_list[j].y - 10) && papers[i].y < (enemy_list[j].y +10)){
		console.log("paper hit");
        enemy_killed();
		papers.splice(i,1);
		paperNo--;
		enemy_list.splice(j,1);
	}
}
}

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
	else if((game_world[Math.floor((papers[i].y+5)/40)][Math.floor(((papers[i].x - 1) + current_offset_x)/40)].type != 0) && 
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
}//end update player


//Player Level and Health Handling
//initialize health and level
playerLevel = 1;
maxHealth = 1;
currentHealth = maxHealth; //start player at full health
scoreNeeded = 500; //points needed to level up
chestsOpened = 0;
enemiesKilled = 0;

//call if player loses health from an enemy attack
function player_hurt(){
    currentHealth--;
    can_die();
}

//call when player loses health to see if they have died
function can_die(){
    console.log("Can die?");
    
    if (currentHealth <= 0)
        has_died();
}

//call when player dies
function has_died(){
    game_paused=1;
    clearInterval(update_tick);
    clearInterval(update_timer);
    pausible = false;
    gameComplete = false;
    menu("has_died");
    ctx.globalAlpha = 1;
    ctx.fillStyle="black";
    ctx.font = "30px Mario";
    ctx.fillText("DEAD",462,175);
    ctx.fillText("Press 'G' to continue...",345,465);
    console.log("You died.");
    end_time();
}

//give player points for breaking block
function score_block(){
    score += 25;
    chestsOpened++;
    can_level_up();
    console.log("Chest opened");
}

//give player points for killing enemies
function enemy_killed(){
    score += 150;
    enemiesKilled++;
    can_level_up();
    console.log("Enemy killed");
}

//call when player earns points to check if they have enough to level up
function can_level_up(){
    if (score >= scoreNeeded)
        level_up();
}

//call when player gets enough score to level up
function level_up(){
    playerLevel++;
    maxHealth++; //increase max health
    currentHealth = maxHealth; //heal player to full health
    scoreNeeded = scoreNeeded + (playerLevel * 500); //set new level up requirement
    //3000 points is the max that can be earned
    if (scoreNeeded > 3000) 
        scoreNeeded = 3000;
    game_paused=1;
    clearInterval(update_tick);
    clearInterval(update_timer);
    menu("level_up");
    console.log("Level Up");
}

function end_game(){
	game_paused = 1;
	clearInterval(update_tick);
	clearInterval(update_timer);
    pausible = false;
    menu("end_game");
    console.log("Game Over.");
    game_results();
}

//display game stats and final score
//example: ctx.fillText("OFFICE HOURS",375,30); x-axis,y-axis
function game_results(){
    ctx.globalAlpha = 1;
    ctx.fillStyle="black";
    ctx.font = "30px Mario";
    ctx.fillText("GAME OVER",420,175);
    ctx.fillText(chestsOpened,365,270);
    ctx.fillText((chestsOpened * 25),425,270);
    ctx.fillText("LEVEL",520,265);
    ctx.fillText(playerLevel,655,265);
    ctx.fillText(enemiesKilled,365,330);
    ctx.fillText((enemiesKilled * 150),425,330);
    
    //print out health and health multiplier
    currentPlace = 520;
    for(i=0; i<currentHealth; i++){//loop to display all hearts
        ctx.drawImage(heart, currentPlace, 280);
        currentPlace = currentPlace + 32;
    }//end for
    for(i=0; i<(maxHealth - currentHealth); i++){//loop to display lost hearts
        ctx.drawImage(hurtheart, currentPlace, 280);
        currentPlace = currentPlace + 32;
    }//end for
    if (currentHealth == 0){
        healthMultiplier = 0;
    }
    else{
        healthMultiplier = currentHealth;
    }
    ctx.fillText(healthMultiplier,655,300);
    
    //print out time and time multiplier
    ctx.fillText(minute+":"+second,520,337);
    time = (minute * 60) + second;
    console.log(time);

    if (gameComplete == false){
        timeMultiplier = 1;
        console.log("not complete");
    }//end if
    else{
        if (time > 150){//more than 2.5 mins
            timeMultiplier = 0.5;
            console.log("very slow")
        }
        else if (time > 120){//more than 2 mins
            timeMultiplier = 1;
            console.log("slow")
        }
        else if (time > 90){//more than 1.5 mins
            timeMultiplier = 2;
            console.log("average")
        }
        else if (time > 60){//more than 1 min
            timeMultiplier = 3;
            console.log("fast")
        }
        else if (time > 30){//more than 0.5 min
            timeMultiplier = 4;
            console.log("very fast")
        }
        else{
            timeMultiplier = 1;
            console.log("problem");
        }
        }//end else  
    
    ctx.fillText(timeMultiplier,655,337);
    
    //display score, multipiers and final score
    ctx.fillText(score,365,382);
    finalMultiplier = playerLevel + healthMultiplier + timeMultiplier;
    ctx.fillText(finalMultiplier,490,382);
    finalScore = score * finalMultiplier;
    ctx.fillText(finalScore,570,382);
    
}//end of game results
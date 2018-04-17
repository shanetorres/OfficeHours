//manage enemies
enemy_list = [];
current_id=0;
safe_time = 0;
//move to images after merger.
enemyc = new Image();//load images.
enemyc.src = "images/enemy.png";
create_enemy(800,520,"walker","left");
function update_enemies(){
	//update the enemies location/actions.
	for(i=0;i<enemy_list.length;i++){
		if (enemy_list[i].type=="walker"){
			if (enemy_list[i].dir == "left"){
				if((enemy_list[i].x - 1) >= (player.x + current_offset_x) && (enemy_list[i].x - 1) <= ((player.x + current_offset_x) + 31) && (enemy_list[i].y < player.y + 20) && (enemy_list[i].y > (player.y - 20))){
					//console.log("hit");
					if (safe_time == 0){
						player_hurt();
					}
					safe_time = 35;
					if (safe_time > 0){
						safe_time -= 1;
					}
					player.health -= 1;
					//hit player
				}
				if(game_world[Math.floor((enemy_list[i].y+5)/40)][Math.floor(((enemy_list[i].x - 1))/40)].type ==0){
					enemy_list[i].x -=1;
				}else{enemy_list[i].dir="right";}
			}else{
				if((enemy_list[i].x + 31) >= (player.x + current_offset_x) && (enemy_list[i].x + 31) <= ((player.x + current_offset_x) + 31) && (enemy_list[i].y < player.y + 20) && (enemy_list[i].y > (player.y - 20))){
					//console.log("hit");
					if (safe_time == 0){
						player_hurt();
					}
					safe_time = 35;
					if (safe_time > 0){
						safe_time -= 1;
					}
					player.health -= 1;
					//hit player
				}
				
				if(game_world[Math.floor((enemy_list[i].y+5)/40)][Math.floor(((enemy_list[i].x + 31))/40)].type ==0){
					enemy_list[i].x +=1;
				}else{enemy_list[i].dir="left";}
			}
		}else{
			//do nothing for now, no other enemy types implemented at this stage.
		}
	}
}
function destroy_enemy(id){
	for(i=0;i<enemy_list.length;i++){
		if (enemy_list[i].id == id){
			//remove the enemy from the list.
			enemy_list.splice( i, 1 );//this should work, if any errors check this line first.
		}
	}
}
function create_enemy(zx,zy,ztype,direction){
	//create a new enemy.
	new_enemy = {}
	new_enemy.x = zx;
	new_enemy.y = zy;
	new_enemy.size_x = 30;
	new_enemy.size_y = 40;
	new_enemy.type = ztype;
	new_enemy.dir = direction;
	new_enemy.id = current_id;
	if(ztype == "walker"){
		new_enemy.current_action = "walking";
	}else{
		new_enemy.current_action = "standing";
	}
	current_id +=1;
	enemy_list.push(new_enemy);
}
function render_enemies(){
	//render the enemies.
	for (i=0;i<enemy_list.length;i++){
		if (enemy_list[i].dir == "left"){
			//facing left
			ctx.scale(-1,1);
			if(enemy_list[i].current_action == "walking"){
				ctx.drawImage(enemyc,25*Math.floor(current),1,25,43,(-enemy_list[i].x - 30)+ current_offset_x,enemy_list[i].y,30,40);
			}else{
				ctx.drawImage(enemyc,25*7,1,25,43,(-enemy_list[i].x-30) + current_offset_x,enemy_list[i].y,30,40);
			}
			ctx.scale(-1,1);
		}else{
			//facing right
			if(enemy_list[i].current_action == "walking"){
				ctx.drawImage(enemyc,25*Math.floor(current),1,25,43,enemy_list[i].x - current_offset_x,enemy_list[i].y,30,40);
			}else{
				ctx.drawImage(enemyc,25*7,1,25,43,enemy_list[i].x - current_offset_x,enemy_list[i].y,30,40);
			}
		}
	}
}
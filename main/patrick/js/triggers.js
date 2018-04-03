bg_col=1;
last_call=-1;
game_world[10][68].affect_hit=function(){switch_bg();};
game_world[12][52].affect_hit=function(){player.x+=160;};//triggers
game_world[12][56].affect_hit=function(){player.x-=160;};
game_world[12][73].affect_hit=function(){player.x+=240;};//triggers
game_world[12][79].affect_hit=function(){player.x-=240;};
game_world[11][78].affect_hit=function(){this.affect_hit=function(){};this.type=4;game_world[9][72].type=1;game_world[9][72].affect_hit=function(){score+=25;this.type=4;this.affect_hit =function(){}};game_world[9][71].type=1;game_world[9][71].affect_hit=function(){score+=25;this.type=4;this.affect_hit =function(){}};game_world[9][70].type=1;game_world[9][70].affect_hit=function(){score+=25;this.type=4;this.affect_hit =function(){}};};
function switch_bg(){
	if(last_call <-2){last_call=1;
	if(bg_col==1){document.getElementById("gameCanvas").style.backgroundColor = "lightblue";bg_col=2;
	}else{document.getElementById("gameCanvas").style.backgroundColor = "#3BB9FF";bg_col=1;
	}}
}
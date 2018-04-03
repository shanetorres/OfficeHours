bg_dir = .1;
bg_dir_c = 0;
function render_background(){//render anything meant to be displayed on the background.
	ctx.drawImage(door,2080-current_offset_x,440);
	ctx.drawImage(door,2240-current_offset_x,440);
	ctx.drawImage(door,2920-current_offset_x,440);
	ctx.drawImage(door,3160-current_offset_x,440);
	ctx.globalAlpha=0.5;//faded out for background images (non-foreground),above is anything thats not on the same level as the player,
	ctx.drawImage(tree1,660-current_offset_x,485);//but still apart of the main area, (like doors)
	ctx.drawImage(tree2,190-current_offset_x,445);
	ctx.drawImage(tree1,120-current_offset_x,445);
	ctx.drawImage(tree2,1060-current_offset_x,445);
	ctx.drawImage(tree1,2760-current_offset_x,445);
	ctx.drawImage(tree2,2425-current_offset_x,445);
	ctx.drawImage(tree1,1160-current_offset_x,445);
	ctx.drawImage(tree2,1860-current_offset_x,445);
	if (bg_dir_c > 250){bg_dir = -.1;};
	if (bg_dir_c < 0){bg_dir = .1;};
	bg_dir_c += bg_dir;
	ctx.drawImage(cloud1,(190-current_offset_x)+bg_dir_c,140,220,110);
	ctx.drawImage(cloud2,(790-current_offset_x)+bg_dir_c,185,200,100);
	ctx.drawImage(cloud3,(1090-current_offset_x)+bg_dir_c,175,280,95);
	ctx.drawImage(cloud2,(2190-current_offset_x)+bg_dir_c,200,200,100);
	ctx.drawImage(cloud1,(1790-current_offset_x)+bg_dir_c,135,220,140);
	ctx.drawImage(cloud3,(2590-current_offset_x)+bg_dir_c,90,200,100);
	ctx.globalAlpha=1;
}
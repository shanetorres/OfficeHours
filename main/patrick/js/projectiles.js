function shoot() {
if(keysDown[32]) {
 //manage projectiles
 if (paperNo == 0)
 {
    projectile = new Image();
    projectile.src = "images/paper.png";
    papers.push({shown:paperShown, x: player.x, y: player.y, direction: player.facing, image: projectile, initialX: player.x })
    paperNo++;
    delete projectile;
 }
 else if (papers[paperNo-1].x > papers[paperNo-1].initialX + 60 && papers[paperNo-1].direction == "right" )
 {
projectile = new Image();
projectile.src = "images/paper.png";
papers.push({shown:paperShown, x: player.x, y: player.y, direction: player.facing, image: projectile, initialX: player.x })
paperNo++;
delete projectile;
 }
 else if (papers[paperNo-1].x < papers[paperNo-1].initialX - 60 && papers[paperNo-1].direction == "left" )
 {
projectile = new Image();
projectile.src = "images/paper.png";
papers.push({shown:paperShown, x: player.x, y: player.y, direction: player.facing, image: projectile, initialX: player.x })
paperNo++;
delete projectile;
 }
}
}

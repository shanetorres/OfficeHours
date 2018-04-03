function sound(src) {//function to handle loading and playing of different sound effects.
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){this.sound.play();}
	this.stop = function(){this.sound.pause();}
}
myAudio = new Audio('sounds/bg.wav'); //load the background song, and play it in a loop.
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();
block_hit_sound = new sound("sounds/block_hit.mp3");//load the block hit sound, played when you jump up into a block.
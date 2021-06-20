// Phaser config
let config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	backgroundColor: 0x000000,
	scene: [Loading, Play],
	pixelArt: true,
};
// New Phaser Game
let game = new Phaser.Game(config);
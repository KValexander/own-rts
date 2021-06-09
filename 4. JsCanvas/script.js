// Объект игры
let game = {
	running: false,
	// Init method
	init: function() {
		// Initialization
		screen.init();
		
		// Check localStorage
		game.checkStorage();

		// Canvas and Context
		game.canvas = document.querySelector("canvas");
		game.context = game.canvas.getContext("2d");

		// Canvas size
		game.canvas.width = screen.canvasWidth;
		game.canvas.height = $("canvas").height();
	},

	// Check localStorage
	checkStorage: function() {
		let campaign = localStorage.getItem("campaign");
		if(campaign != null)
			game.startLoad(campaign);
	},

	loadDescription: function(campaign) {
		$("#campaigndescription h1").html(text[campaign].title);
		$("#campaigndescription div").html(text[campaign].description);
	},

	// Start load assets
	startLoad: function(campaign) {
		localStorage.setItem("campaign", campaign);
		game.loadDescription(campaign);
		screen.changeScreen('loadscreen');
	},
	// Start game
	startGame: function() {
		screen.changeScreen('gamescreen');
		game.running = true;
		game.loop();
	},
	// Game loop
	loop: function() {

		// Rendering grid
		game.drawGrid();

		if(game.running) window.requestAnimationFrame(game.loop);
	},
	// Draw grid method
	drawGrid: function() {
		// Grid variable
		let color = "#fff";
		let lineX = 32;
		let lineY = 32;
		let collsX = game.canvas.width / lineX;
		let collsY = game.canvas.height / lineX;

		// Draw grid
		game.context.beginPath();
		for(let i = 0; i < collsX * lineX; i += lineX) {
			game.context.moveTo(i, 0);
			game.context.lineTo(i, game.canvas.height);
		}
		for(let i = 0; i < collsY * lineY; i += lineY) {
			game.context.moveTo(0, i);
			game.context.lineTo(game.canvas.width, i);
		}
		game.context.strokeStyle = color;
		game.context.stroke();
	},

};
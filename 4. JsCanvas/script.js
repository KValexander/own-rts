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
		game.canvas.height = screen.canvasHeight;

	},

	// Check localStorage
	checkStorage: function() {
		let campaign = localStorage.getItem("campaign");
		if(campaign != null) game.startLoad(campaign);
	},

	// Loading a campaign description
	loadDescription: function(campaign) {
		$("#campaigndescription h1").html(description[campaign].title);
		$("#campaigndescription div").html(description[campaign].description);
		$("#loadscreen input[type=button]").addClass("disabled").val("Загрузка...");
	},

	// Start load assets
	startLoad: function(campaign) {
		// Save campaign
		localStorage.setItem("campaign", campaign);
		// Load campaign description and loadscreen
		game.loadDescription(campaign);
		screen.changeScreen('loadscreen');

		// Loading
		game.loading(campaigns[campaign], (state) => {
			if(state) {
				$("#loadscreen input[type=button]")
					.removeClass("disabled")
					.val("Начать компанию")
					.click(() => game.startGame());
			}
		});
	},

	// Load game data, assets, triggers, ect
	loading: function(data, callback) {
		game.resetArrays();
		game.mouse();

		game.background = game.loadImage("gui/bg_game.jpg");

		game.background.onload = () => callback(true);
	},

	// Reset game data array
	resetArrays: function() {
		// For UID
		game.counter = 1;

		// Game data Arrays
		game.items = [];
		// game.factions = [];
		// game.units = [];
		// game.heroes = [];
		// game.buildings = [];
		// game.factions = [];
		// game.factions[n].units;
		// game.factions[n].heroes;
		// game.factions[n].buildings;
		// game.tasks = [];
		// game.terrain = [];
		// game.selectedItems = [];
		// game.triggeredEvents = [];
	},

	// Camera method
	camera: function() {
		game.camera = {};
	},

	// Mouse method
	mouse: function() {
		game.mouse = {};
		$("canvas").mousedown((e) => {
			game.mouse = e;
			game.mouse.click = true;
			game.mouseEvents();
			game.mouse.click = false;
		});
		$("canvas").mouseup(() => game.mouse = {});
	},

	// Mouse events
	mouseEvents: function() {
		if(!game.mouse.click) return;

		switch(game.mouse.which) {
			case 1:
				console.log("left click");
				game.addItem("unit", "soldier", game.mouse.offsetX, game.mouse.offsetY, "empire");
			break;

			case 2:
				console.log("middle click");
				game.addItem("unit", "soldier", game.mouse.offsetX, game.mouse.offsetY, "neutral");
			break;
			
			case 3:
				console.log("right click");
				game.addItem("unit", "soldier", game.mouse.offsetX, game.mouse.offsetY, "decay");
			break;
		};
	},

	// Start game
	startGame: function() {
		screen.changeScreen('gamescreen');
		game.running = true;
		game.loop();
	},

	// Update game data
	update: function() {

	},

	// Rendering game assets
	rendering: function() {
		// Background
		game.context.drawImage(game.background, 0, 0, screen.canvasWidth, screen.canvasHeight);

		// Rendering grid
		game.drawGrid();

		// Rendering item
		game.items.forEach((item) => game.drawItem(item));

	},

	// Load image
	loadImage: function(src) {
		let image = new Image();
		image.src = src;
		return image;
	},

	// Add Item
	addItem: function(type, name, x, y, faction) {
		// Template variable
		let temp = {};

		// Get template
		switch(type) {
			case "unit": temp = units.list.find(unit => unit.name = name); break;
			case "building":  temp = buildings.list.find(unit => unit.name = name);break;
			case "hero":  temp = heroes.list.find(unit => unit.name = name);break;
		};

		// Writing template data to a new object
		let item = {};
		for (let key in temp) item[key] = temp[key];

		// Adding properties
		item.x = x;
		item.y = y;
		item.faction = faction;

		// Adding to an array
		game.items.push(item);
	},

	// Draw Item
	drawItem: function(item) {

	},

	// Draw grid method
	drawGrid: function() {
		// Grid variable
		let color = "#fff";
		let lineX = 32;
		let lineY = 32;
		let collsX = game.canvas.width / lineX;
		let collsY = game.canvas.height / lineX;

		// Arranging grid lines
		game.context.beginPath();
		for(let i = 0; i < collsX * lineX; i += lineX) {
			game.context.moveTo(i, 0);
			game.context.lineTo(i, game.canvas.height);
		}
		for(let i = 0; i < collsY * lineY; i += lineY) {
			game.context.moveTo(0, i);
			game.context.lineTo(game.canvas.width, i);
		}

		// Draw grid
		game.context.strokeStyle = color;
		game.context.stroke();
	},

	// Game loop
	loop: function() {

		// update gamedata
		game.update();
		// rendering assets
		game.rendering();

		if(game.running) window.requestAnimationFrame(game.loop);
	},

};
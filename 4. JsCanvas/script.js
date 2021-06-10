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
	},

	// Update canvas resolution 
	canvasSize: function() {
		// Canvas size
		game.canvas.width = $("canvas").width();
		game.canvas.height = $("canvas").height();
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
		game.sortedItems = [];
		game.selectedItems = [];
		
		// Game data Objects
		game.personallySelected = {};
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
			game.mouseClick();
			game.mouse.click = false;
			game.mouseHolding();
		});
		$("canvas").mouseup(() => game.mouse = {});
	},

	// Mouse click events
	mouseClick: function() {
		if(!game.mouse.click) return;

		// Mouse click handling
		switch(game.mouse.which) {
			// Left mouse button
			case 1:
				console.log("left click");
				game.selectItem();
			break;
			// Middle mouse button
			case 2:
				console.log("middle click");
				game.addItem("unit", "worker", game.mouse.offsetX, game.mouse.offsetY, "neutral");
			break;
			// Right mouse button
			case 3:
				console.log("right click");
				game.addItem("unit", "soldier", game.mouse.offsetX, game.mouse.offsetY, "decay");
			break;
		};
		console.log(game.items);
	},

	// Select Item
	selectItem: function() {
		for(let i = 0; i < game.items.length; i++) {
			if(game.items[i].selectable) {
				if(game.mouseCollision(game.items[i], game.mouse.offsetX, game.mouse.offsetY)) {
					game.clearSelection();
					game.items[i].selected = true;
					game.selectedItems.push(game.items[i]);
					game.personallySelected = game.items[i];
				}
			}
		}
	},

	// Clear selection
	clearSelection: function() {
		game.personallySelected = {};
		while(game.selectedItems.length > 0) {
			game.selectedItems.pop().selected = false;
		}
	},

	// Mouse collision
	mouseCollision: function(item, x, y) {
		if(	item.x < x && (item.x + item.width) > x
			&& item.y < y && (item.y + item.height) > y)
			return true;
		else return false;
	},

	// Holding mouse event
	mouseHolding() {
		// Draggable


		// Select many items
	},

	// Start game
	startGame: function() {
		screen.changeScreen('gamescreen');
		game.canvasSize();

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

		// Rendering selection for selected items
		game.selectedItems.forEach((item) => game.drawSelection(item));

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
			case "unit":
				temp = units.list[name];
				Object.assign(temp, units.defaults);
			break;
			case "building": 
				temp = buildings.list[name];
				Object.assign(temp, buildings.defaults);
			break;
			case "hero":
				temp = heroes.list[name];
				Object.assign(temp, heroes.defaults);
			break;
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
		game.context.drawImage(game.loadImage(item.src), item.x, item.y, item.width, item.height);
	},

	// Draw selection for selected items
	drawSelection: function(item) {
		game.context.strokeStyle = "green";
		game.context.strokeRect(item.x, item.y, item.width, item.height);
	},

	// Draw grid method
	drawGrid: function() {
		// Grid variable
		let color = "#fff";
		let lineX = 16;
		let lineY = 16;
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
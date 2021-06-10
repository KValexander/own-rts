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
		game.keys();

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
		game.highlightLine = {};
	},

	// Camera method
	camera: function() {
		game.camera = {};
	},

	// Keys method
	keys: function() {
		game.keyDown = {};
		// Writes a key code in keyDown
		$("body").keydown((e) => {
			game.keyDown = e.code;
			console.log(game.keyDown);
		});
		// Clear a key code in keyDown
		$("body").keyup((e) => game.keyDown = {});
	},

	// Mouse method
	mouse: function() {
		// Mouse data
		game.mouse = {};
		// Mouse coordinats
		game.mouseCoord = {};

		// Click handling
		$("canvas").mousedown((e) => {
			game.mouse = e;
			game.mouse.click = true;
			game.mouseClick();
			game.mouse.click = false;
		});
		$("canvas").mouseup(() => game.mouse = {});

		// Mouse move handling
		$("canvas").mousemove((e) => {
			game.mouseCoord.x = e.offsetX;
			game.mouseCoord.y = e.offsetY;
		});
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
				// game.selectedMove(game.mouse.offsetX, game.mouse.offsetY);
				game.selectedItems.forEach((item) => item.move = true);
				game.selectedMoveCoord = {x: game.mouse.offsetX, y: game.mouse.offsetY};
				// game.addItem("unit", "soldier", game.mouse.offsetX, game.mouse.offsetY, "decay");
			break;
			default: break;
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

	// Start game
	startGame: function() {
		screen.changeScreen('gamescreen');
		game.canvasSize();

		game.running = true;
		game.loop();
	},

	// Holding mouse event
	mouseHolding: function() {
		// Draggable, if the left mouse button is pressed and left shift
		if(game.mouse.which == 1 && game.keyDown == "ShiftLeft") {
			game.personallySelected.x = game.mouseCoord.x - game.personallySelected.width / 2;
			game.personallySelected.y = game.mouseCoord.y - game.personallySelected.height / 2;
		// State rendering hightlight line
		} else if(game.mouse.which == 1) {
			game.stateSelectLine = true;
		} else {
			game.stateSelectLine = false;
		}
	},

	// Collision for checking multiple selection
	selectCollision: function(hgl, item) {
		if( item.x > hgl.x && (item.x + item.width) < (hgl.x + hgl.width)
			&& item.y < hgl.y && (item.y + item.height) > (hgl.y + hgl.height))
			return true;
		else return false;
	},
	
	// Draw highlight line for select many items
	drawHighlightLine: function() {
		game.highlightLine = {
			x: game.mouse.offsetX,
			y: game.mouse.offsetY,
			width: game.mouseCoord.x - game.mouse.offsetX,
			height: game.mouseCoord.y - game.mouse.offsetY
		};
		game.context.strokeStyle = "green";
		game.context.lineWidth = 3;
		game.context.strokeRect(game.highlightLine.x, game.highlightLine.y, game.highlightLine.width, game.highlightLine.height);
		
	},

	// Select many items in highlight line
	selectHightlightLine: function() {
		game.selectedItems = [];
		game.personallySelected = [];
		for(let i = 0; i < game.items.length; i++) {
			if(game.selectCollision(game.highlightLine, game.items[i])) {
				game.selectedItems.push(game.items[i]);
			}
		}
	},

	// Movement selected items
	selectedMove: function(item, x, y) {
		if(item.x == x && item.y == y) item.move = false;

		if(item.x < x) item.x += item.speed;
		if(item.x > x) item.x -= item.speed;
		if(item.y < y) item.y += item.speed;
		if(item.y > y) item.y -= item.speed;
	},

	// Update game data
	update: function() {

		// Hold the mouse
		game.mouseHolding();

		// Movement selected items
		for(let i = 0; i < game.selectedItems.length; i++) {
			let item = game.selectedItems[i];
			if(item.move) game.selectedMove(item, game.selectedMoveCoord.x, game.selectedMoveCoord.y);
		}

		// Select many items in highlight line
		if(game.stateSelectLine) game.selectHightlightLine();
	
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

		// Rendering highlight line for select many items
		if(game.stateSelectLine) game.drawHighlightLine();
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
		item.x = x - item.width / 2;
		item.y = y - item.height / 2;
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
		game.context.lineWidth = 2;
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
		game.context.lineWidth = 1;
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
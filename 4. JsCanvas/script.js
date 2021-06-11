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
		game.resetData();
		game.mouse();
		game.keys();

		game.background = game.loadImage("gui/bg_game.jpg");
		game.background.onload = () => callback(true);
	},

	// Reset game data array
	resetData: function() {
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
		// Mouse events
		game.mouse.e = {};
		// Mouse coordinats
		game.mouse.coord = {};
		// Mouse move items coord
		game.mouse.moveCoord = {};

		// Click handling
		$("canvas").mousedown((e) => {
			game.mouse.e = e;
			game.mouse.click = true;
			game.mouseClick();
			game.mouse.click = false;
		});
		$("canvas").mouseup(() => game.mouse.e = {});

		// Mouse move handling
		$("canvas").mousemove((e) => {
			game.mouse.coord.x = e.offsetX;
			game.mouse.coord.y = e.offsetY;
		});
	},

	// Mouse click events
	mouseClick: function() {
		if(!game.mouse.click) return;

		// Mouse click handling
		switch(game.mouse.e.which) {
			// Left mouse button
			case 1:
			break;
			// Middle mouse button
			case 2:
				game.addItem("unit", "worker", game.mouse.e.offsetX, game.mouse.e.offsetY, "neutral");
			break;
			// Right mouse button
			case 3:
				game.selectedItems.forEach((item) => item.move = true);
				game.mouse.moveCoord = {x: game.mouse.e.offsetX - 8, y: game.mouse.e.offsetY - 8};
			break;
			default: break;
		};
		console.log(game.items);
	},

	// Select personally item from selected items in #selectitems
	selectPersonallyItem: function(id) {
		for(let i = 0; i < game.selectedItems.length; i++) {
			if(game.selectedItems[i].id == id) {
				game.personallySelect(game.selectedItems[i]);
				break;
			}
		}
		screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
	},

	// Select item from selected items in #selectitems
	selectItem: function(id) {
		for(let i = 0; i < game.selectedItems.length; i++) {
			if(game.selectedItems[i].id == id) {
				let item = game.selectedItems[i];
				game.clearSelection();
				game.selectedItems.push(item);
				game.personallySelect(item);
			}
		}
		screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
	},

	// Clear selection
	clearSelection: function() {
		screen.clearInformation();
		screen.clearSelectedItems();
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
		if(game.mouse.e.which == 1 && game.keyDown == "ShiftLeft") {
			game.personallySelected.x = game.mouse.coord.x - game.personallySelected.width / 2;
			game.personallySelected.y = game.mouse.coord.y - game.personallySelected.height / 2;
		}
		else if(game.mouse.e.which == 2 && game.keyDown == "ShiftLeft") {
			game.addItem("unit", "soldier", game.mouse.coord.x, game.mouse.coord.y, "red", "red");
		}
		// State rendering hightlight line
		else if(game.mouse.e.which == 1) {
			game.mouse.stateSelectLine = true;
		} else {
			game.mouse.stateSelectLine = false;
		}
	},

	// Collision for checking multiple selection
	selectCollision: function(hgl, item) {
		// The wonders of mathematics
		if(	// TopLeft
			hgl.x < item.x && (hgl.x + hgl.width) > (item.x + item.width)
			&& hgl.y < item.y && (hgl.y + hgl.height) > (item.y + item.height) ||
			// BottomLeft
			hgl.x < item.x && (hgl.x + hgl.width) > (item.x + item.width)
			&& hgl.y > item.y && (hgl.y + hgl.height) < (item.y + item.height) ||
			// TopRight
			hgl.x > item.x && (hgl.x + hgl.width) < (item.x + item.width)
			&& hgl.y < item.y && (hgl.y + hgl.height) > (item.y + item.height) ||
			// BottomRight
			hgl.x > item.x && (hgl.x + hgl.width) < (item.x + item.width)
			&& hgl.y > item.y && (hgl.y + hgl.height) < (item.y + item.height)
		)
			return true;
		else return false;
	},
	
	// Draw highlight line for select many items
	drawHighlightLine: function() {
		game.highlightLine = {
			x: game.mouse.e.offsetX,
			y: game.mouse.e.offsetY,
			width: game.mouse.coord.x - game.mouse.e.offsetX,
			height: game.mouse.coord.y - game.mouse.e.offsetY
		};
		game.context.strokeStyle = "green";
		game.context.lineWidth = 3;
		game.context.strokeRect(game.highlightLine.x, game.highlightLine.y, game.highlightLine.width, game.highlightLine.height);
	},

	// Select many items in highlight line
	selectHightlightLine: function() {
		game.clearSelection();
		game.mouse.moveCoord = {};
		for(let i = 0; i < game.items.length; i++) {
			if(game.selectCollision(game.highlightLine, game.items[i])) {
				game.items[i].selected = true;
				game.selectedItems.push(game.items[i]);
			}
		}
		if(game.selectedItems.length != 0)
			game.personallySelect(game.selectedItems[0]);

		screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
	},

	// Personally select
	personallySelect(item) {
		game.personallySelected = item;
		screen.setInformation(game.personallySelected);
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

		// Handling data items
		for(let i = 0; i < game.items.length; i++) {
			// Handling collision items
			for(let j = 0; j < game.items.length; j++) {
				let item1 = game.items[i];
				if(game.itemsCollision(game.items[i], game.items[j])) {
					let item2 = game.items[j];
					let acenter = {x: item1.x + item1.width / 2, y: item1.y + item1.height / 2};
					let bcenter = {x: item2.x + item2.width / 2, y: item2.y + item2.height / 2};
					let d = {x: acenter.x - bcenter.x, y: acenter.y - bcenter.y};
					if(d.x > 0) item1.x += item1.speed;
					if(d.x < 0) item1.x -= item1.speed;
					if(d.y > 0) item1.y += item1.speed;
					if(d.y < 0) item1.y -= item1.speed;
				}
			}
		}

		// Handling data selected items
		for(let i = 0; i < game.selectedItems.length; i++) {
			let item = game.selectedItems[i];
			// Movement selected items
			if(item) game.selectedMove(item, game.mouse.moveCoord.x, game.mouse.moveCoord.y);
		}

		// Select many items in highlight line
		if(game.mouse.stateSelectLine) game.selectHightlightLine();
	},

	// Check items collision
	itemsCollision: function(item1, item2) {
		if(	item1.x <= (item2.x + item2.width)
			&& item2.x <= (item1.x + item1.width)
			&& item1.y <= (item2.y + item2.height)
			&& item2.y <= (item1.y + item1.height))
		{
			return true;
		} else {
			return false;
		}
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
		if(game.mouse.stateSelectLine) game.drawHighlightLine();
	},

	// Load image
	loadImage: function(src) {
		let image = new Image();
		image.src = src;
		return image;
	},

	// Add Item
	addItem: function(type, name, x, y, faction, color, life) {
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
		item.id = game.counter++;
		item.x = x - item.width / 2;
		item.y = y - item.height / 2;
		item.faction = faction;
		item.life = item.hitPoints;

		// Color image item
		if(color != undefined) {
			item.src = item.src.split(".");
			item.src = item.src[0] + "_" + color + ".png";
		}

		// Life item
		if(life != undefined) item.life = life;

		// Adding to an array
		game.items.push(item);
	},

	// Remove Item
	removeItem(item) {
		// Remove item from selected items
		for(let i = 0; i < game.selectedItems.length; i++) {
			if(game.selectedItems[i].id == item.id) {
				game.selectedItems.splice(i, 1); break;
			}
		}

		// Remove from items array
		for(let i = 0; i < game.items.length; i++) {
			if(game.items[i].id == item.id) {
				game.items.splice(i, 1); break;
			}
		}
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
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
		game.mouseMethod();
		game.keysMethod();

		game.background = game.loadImage("gui/bg_game.jpg");
		game.background.onload = () => callback(true);
	},

	// Reset game data elements
	resetData: function() {
		// For ID
		game.counter = 1;

		// Game data Arrays
		game.items = [];
		game.sortedItems = [];
		game.selectedItems = [];
		
		// Game data Objects
		game.personallySelected = {};
		game.placementBuild = {};
		game.highlightLine = {};
		game.camera = {};
		game.mouse = {};
		game.grid = {};
		game.map = {};
		game.key = {};
	},

	// Map method
	mapMethod: function() {
		game.map = {};
	},

	// Camera method
	cameraMethod: function() {
		game.camera = {
			x: 0,
			y: 0,
			width: 100,
			height: 100,
		};
	},

	// Keys method
	keysMethod: function() {
		game.key = {};
		game.key.down = {};
		game.key.stroke = false;
		// Writes a key code in key.down
		$("body").keydown((e) => {
			game.key.down = e.code;
			game.key.stroke = true;
			game.keyStroke();
			game.key.stroke = false;
			console.log(game.key.down);
		});
		// Clear a key code in key.down
		$("body").keyup((e) => game.key.down = {});
	},

	// One-time keystroke, maybe
	keyStroke: function() {
		if(!game.key.stroke || !game.running) return;

		// Delete selected items
		if(game.key.down == "Delete") {
			let count = game.selectedItems.length;
			for(let i = 0; i < count; i++) {
				game.removeItems(game.selectedItems[i]);
			}
			game.clearSelection();
		}

		// Clear selection
		if(game.key.down == "Escape") {
			game.clearSelection();
		}

		// Stop motion items
		if(game.key.down == "KeyS") {
			game.itemMoveStop();
		}

		// Switch between selected items
		if(game.key.down == "Tab" && game.selectedItems.length != 0) {
			let id = 0, currentID = game.personallySelected.id;

			// Checking the end of the selected items
			if(++currentID > game.selectedItems[game.selectedItems.length - 1].id) id = game.selectedItems[0].id;
			else id = currentID;

			// How do you work???
			// Checking for id
			while(game.selectedItems.find(item => item.id == id) == undefined) id = id + 1;

			game.selectPersonallyItem(id);
		}
	},

	// Mouse method
	mouseMethod: function() {
		// Mouse data
		game.mouse = {};
		// Mouse events
		game.mouse.e = {};
		// Mouse coordinats
		game.mouse.coord = {};

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
				if(game.placementBuild.state) {
					game.addItem(
						game.placementBuild.type,
						game.placementBuild.name,
						game.mouse.coord.x,
						game.mouse.coord.y,
						game.placementBuild.faction,
						game.placementBuild.faction,
					);
					game.clearPickBuild();
				}
			break;
			// Middle mouse button
			case 2:
				if(game.key.down == "AltLeft") {
					game.addItem("building", "capitol", game.mouse.coord.x, game.mouse.coord.y, "neutral");
				}
			break;
			// Right mouse button
			case 3:
				if(game.placementBuild.state) game.clearPickBuild();
				else game.selectedItems.forEach((item) => item.move = {x: game.mouse.e.offsetX - 8, y: game.mouse.e.offsetY - 8});
			break;
			default: break;
		};
		console.log(game.items);
	},

	// Select personally item from selected items in #selectitems
	selectPersonallyItem: function(id) {
		let item = game.getItemById(id);
		game.personallySelect(item);
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
		screen.clearActItem();
		game.clearPickBuild();
		// game.itemMoveStop();
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
		if(game.mouse.e.which == 1 && game.key.down == "ShiftLeft") {
			game.personallySelected.x = game.mouse.coord.x - game.personallySelected.width / 2;
			game.personallySelected.y = game.mouse.coord.y - game.personallySelected.height / 2;
		}
		else if(game.mouse.e.which == 2 && game.key.down == "ShiftLeft") {
			game.addItem("unit", "worker", game.mouse.coord.x, game.mouse.coord.y, "red", "red");
		}
		else if (game.mouse.e.which == 2 && game.key.down == "ControlLeft") {
			game.addItem("unit", "worker", game.mouse.coord.x, game.mouse.coord.y, "blue", "blue");
		}
		// State rendering hightlight line
		else if(game.mouse.e.which == 1) {
			game.mouse.stateHightlightLine = true;
		} else {
			game.mouse.stateHightlightLine = false;
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
		// Enumeration and add
		for(let i = 0; i < game.items.length; i++) {
			if(game.selectCollision(game.highlightLine, game.items[i])) {
				game.items[i].selected = true;
				game.selectedItems.push(game.items[i]);
			}
		}

		// Filtration, improve
		let unitAvailability = false;
		let buildingAvailability = false;
		game.selectedItems.forEach((item, i) => {
			if(item.type == "unit") unitAvailability = true;
			if(item.type == "building") buildingAvailability = true;
		});
		if(unitAvailability && buildingAvailability) {
			game.selectedItems.forEach((it, i) => {
				if(it.type == "building") game.selectedItems.splice(i, 1);
			});
		}

		if(game.selectedItems.length != 0)
			game.personallySelect(game.selectedItems[0]);

		screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
	},

	// Personally select
	personallySelect(item) {
		screen.clearActItem();

		game.personallySelected = item;

		screen.setInformation(game.personallySelected);
		screen.setActItem(game.personallySelected);
	},

	// Movement items
	itemMove: function(item, x, y) {
		if(item.type != "unit") return;

		if(game.mouseCollision(item, x, y))
			return game.itemMoveStop();

		if(item.x < item.move.x) item.x += item.speed;
		if(item.x > item.move.x) item.x -= item.speed;
		if(item.y < item.move.y) item.y += item.speed;
		if(item.y > item.move.y) item.y -= item.speed;
	},

	// Stop motion item
	itemMoveStop: function(id) {
		game.selectedItems.forEach((it) => it.move = {});
	},

	// Update game data
	update: function() {

		// Hold the mouse
		game.mouseHolding();

		// Set information personally selected item
		screen.setInformation(game.personallySelected);

		// Handling data items
		for(let i = 0; i < game.items.length; i++) {
			// Handling collision items
			for(let j = 0; j < game.items.length; j++)
				game.itemsCollision(game.items[i], game.items[j]);

			// Movement items
			game.itemMove(game.items[i]);
		}

		// Handling data selected items
		for(let i = 0; i < game.selectedItems.length; i++) {
			let item = game.selectedItems[i];
			// Movement selected items

			// Handling selected collision items, eats a lot of RAM, not optimized
			for(let j = 0; j < game.selectedItems.length; j++)
				game.itemsCollision(game.selectedItems[i], game.selectedItems[j]);
		}

		// Select many items in highlight line
		if(game.mouse.stateHightlightLine) game.selectHightlightLine();
	},

	// Check/Handling items collision
	itemsCollision: function(item1, item2) {
		if(	item1.x <= (item2.x + item2.width)
			&& item2.x <= (item1.x + item1.width)
			&& item1.y <= (item2.y + item2.height)
			&& item2.y <= (item1.y + item1.height))
		{
			let acenter = {x: item1.x + item1.width / 2, y: item1.y + item1.height / 2};
			let bcenter = {x: item2.x + item2.width / 2, y: item2.y + item2.height / 2};
			let d = {x: acenter.x - bcenter.x, y: acenter.y - bcenter.y};
			if(d.x >= 0) item1.x += item1.repulsionSpeed;
			if(d.x <= 0) item1.x -= item1.repulsionSpeed;
			if(d.y >= 0) item1.y += item1.repulsionSpeed;
			if(d.y <= 0) item1.y -= item1.repulsionSpeed;

			// Damage
			if(item1.faction != item2.faction) {
				if(item1.type == "building") return;
				let damage = (Math.floor(Math.random() * (item1.damage[1] - item1.damage[0])) + item1.damage[0]) - item2.defense;
				if(damage <= 0) damage = 0;
				item2.hitPoints -= damage;
				if(d.x >= 0) item1.x += 10;
				if(d.x <= 0) item1.x -= 10;
				if(d.y >= 0) item1.y += 10;
				if(d.y <= 0) item1.y -= 10;
			}
		}
	},

	// Rendering game assets
	rendering: function() {
		// Background
		// game.context.drawImage(game.background, 0, 0, screen.canvasWidth, screen.canvasHeight);

		// Background blank
		game.context.fillStyle = "black";
		game.context.fillRect(0, 0, screen.canvasWidth, screen.canvasHeight);

		// Rendering map, minus RAM
		game.drawMap();

		// Rendering grid
		game.drawGrid();

		// Rendering item
		game.items.forEach((item) => game.drawItem(item));

		// Rendering selection for selected items
		game.selectedItems.forEach((item) => game.drawSelection(item));

		// Rendering placing pick building
		if(game.placementBuild.state) game.placeBuild(game.mouse.coord.x, game.mouse.coord.y);

		// Rendering highlight line for select many items
		if(game.mouse.stateHightlightLine) game.drawHighlightLine();
	},

	// Load image
	loadImage: function(src) {
		let image = new Image();
		image.src = src;
		return image;
	},

	// Pick a building to be placed on the map
	pickBuild: function(buildName, faction) {
		game.placementBuild = buildings.list[buildName];
		game.placementBuild.type = "building";
		game.placementBuild.state = true;
		game.placementBuild.faction = faction;
	},

	// Clear pick building
	clearPickBuild: function() {
		game.placementBuild = {};
	},

	// Placing the building on the map
	placeBuild: function(x, y) {
		x = x - game.placementBuild.width / 2;
		y = y - game.placementBuild.height / 2;
		game.context.drawImage(game.loadImage(game.placementBuild.src), x, y, game.placementBuild.width, game.placementBuild.height);
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
		if(color != undefined && faction != "neutral") {
			item.src = item.src.split(".");
			item.src = item.src[0] + "_" + color + ".png";
		}

		// Life item
		if(life != undefined) item.life = life;

		// Adding to an array
		game.items.push(item);
	},

	// Get Item by Id
	getItemById(id) {
		// Glory to modern programming methods!
		return game.items.find(item => item.id == id);
	},

	// Remove Item
	removeItem(item) {
		// Remove from personally select
		if(item.id == game.personallySelected.id) {
			game.personallySelected = {};
			screen.clearInformation();
		}

		// Remove from selected items array
		game.selectedItems.forEach((it, i) => {
			if(it.id == item.id)
				game.selectedItems.splice(i, 1);
		});
		screen.setSelectedItems(game.personallySelected.id, game.selectedItems);

		// Remove from items array
		for(let i = 0; i < game.items.length; i++) {
			if(game.items[i].id == item.id) {
				game.items.splice(i, 1); return;
			}
		}

	},

	// Remove items
	removeItems(item) {
		// game.items.find((it, i) => game.items.splice(i, 1));

		// Remove from items array
		for(let i = 0; i < game.items.length; i++) {
			if(game.items[i].id == item.id) {
				game.items.splice(i, 1); return;
			}
		}
	},

	// Draw Item
	drawItem: function(item) {
		if(item.hitPoints <= 0) return game.removeItem(item);
		game.context.drawImage(game.loadImage(item.src), item.x, item.y, item.width, item.height);
	},

	// Draw selection for selected items
	drawSelection: function(item) {
		if(item.hitPoints >= 100) game.context.strokeStyle = "green";
		if(item.hitPoints < 100 && item.hitPoints > 30) game.context.strokeStyle = "orange";
		if(item.hitPoints <= 30) game.context.strokeStyle = "red";
		game.context.lineWidth = 2;
		game.context.strokeRect(item.x, item.y, item.width, item.height);
	},

	// Draw grid method
	drawGrid: function() {
		// Grid variable
		game.grid.color = "#fff";
		game.grid.lineX = 16;
		game.grid.lineY = 16;
		game.grid.collsX = game.canvas.width / game.grid.lineX;
		game.grid.collsY = game.canvas.height / game.grid.lineX;

		// Arranging grid lines
		game.context.beginPath();
		game.context.lineWidth = 1;
		for(let i = 0; i < game.grid.collsX * game.grid.lineX; i += game.grid.lineX) {
			game.context.moveTo(i, 0);
			game.context.lineTo(i, game.canvas.height);
		}
		for(let i = 0; i < game.grid.collsY * game.grid.lineY; i += game.grid.lineY) {
			game.context.moveTo(0, i);
			game.context.lineTo(game.canvas.width, i);
		}

		// Draw grid
		game.context.strokeStyle = game.grid.color;
		game.context.stroke();
	},
	
	// Draw map method, Minus RAM
	drawMap: function() {
		game.context.fillStyle = "gray";
		for(let i = 0; i < game.grid.collsX * game.grid.lineX; i += game.grid.lineX) {
			for(let j = 0; j < game.grid.collsY * game.grid.lineY; j += game.grid.lineY) {
				if(j % 10 == 0 && i % 5 == 0)
					game.context.fillRect(i, j, game.grid.lineX, game.grid.lineY);
			}
		}
	},

	// Game loop
	loop: function() {

		// update gamedata
		game.update();
		// rendering assets
		game.rendering();

		if(game.running) window.requestAnimationFrame(game.loop);
	},

	// End game
	endGame: function() {
		game.resetData();
		game.running = false;
	},

};
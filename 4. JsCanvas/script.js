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
		// Reset data and handling methods
		game.resetData();
		game.mapMethod();
		game.cashMethod();
		game.gridMethod();
		game.keysMethod();
		game.mouseMethod();
		game.cameraMethod();

		// Recording the current mission
		game.map.data = data.missions[game.map.currentMission].data;

		// Cash
		game.cash.gold = game.map.data.cash.gold;
		game.cash.wood = game.map.data.cash.wood;
		game.cash.metal = game.map.data.cash.metal;
		game.cash.food = game.map.data.cash.food;

		// Adding items
		game.map.data.items.forEach((item) => {
			game.addItem(item.type, item.name, item.x, item.y, item.faction, item.color, item.life, item.id);
		});

		// Generating trees
		for(let i = 16; i <= 16 * 16; i += 16) { game.addMisc("resources", "tree", 16, i); game.addMisc("resources", "tree", 16 * 16, i); } for(let i = 16; i <= 16 * 16; i += 16) { game.addMisc("resources", "tree", i, 16); game.addMisc("resources", "tree", i, 16 * 16); }

		// Adding textures
		game.map.data.textures.forEach((texture) => {
			game.addTexture(texture.x, texture.y, texture.width, texture.height, texture.color, texture.walk);
		});

		game.background = game.loadImage("gui/bg_game.jpg");
		game.background.onload = () => callback(true);
	},

	// Reset game data elements
	resetData: function() {
		// For ID
		game.counter = 1;

		// Game data Arrays
		game.items = [];
		game.miscs = [];
		game.textures = [];
		game.sortedItems = [];
		game.selectedItems = [];
		
		// Game data Objects
		game.personallySelected = {};
		game.placementBuild = {};
		game.highlightLine = {};
		game.camera = {};
		game.mouse = {};
		game.grid = {};
		game.cash = {};
		game.map = {};
		game.key = {};
	},

	// Grid method
	gridMethod: function() {
		game.grid = {};
		game.grid.color = "#fff";
		game.grid.lineX = 16;
		game.grid.lineY = 16;
		game.grid.collsX = screen.canvasWidth / game.grid.lineX;
		game.grid.collsY = screen.canvasHeight / game.grid.lineX;
	},

	// Map method
	mapMethod: function() {
		game.map = {};
		game.map.data = {};
		game.map.currentMission = 0;
	},

	// Cash method
	cashMethod: function() {
		game.cash = {
			gold: 0,
			wood: 0,
			metal: 0,
			food: 0,
		};
	},

	// Camera method, finalize
	cameraMethod: function() {
		game.camera = {
			x: 0,
			y: 0,
			scale: 1,
		};
	},

	// Camera method
	cameraView: function() {
		game.context.setTransform(1,0,0,1,0,0);
		game.context.clearRect(0,0, game.canvas.width, game.canvas.height);
		game.context.scale(game.camera.scale,game.camera.scale);
		game.context.translate(game.camera.x, game.camera.y);
	},

	// Moving camera
	cameraMove: function(x, y) {
		if(x < game.grid.lineX) game.camera.x += 10;
		if(x > game.canvas.width - game.grid.lineX) game.camera.x -= 10;
		if(y < game.grid.lineY) game.camera.y += 10;
		if(y > game.canvas.height - game.grid.lineY) game.camera.y -= 10;
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
				game.removeItems(game.selectedItems[i].id);
			}
			game.clearSelection();
		}

		// Clear selection
		if(game.key.down == "Escape") {
			game.clearSelection();
		}

		// Stop motion items
		if(game.key.down == "KeyS") {
			game.itemsMoveStop();
		}

		// Switch between selected items
		if(game.key.down == "Tab" && game.selectedItems.length != 0) {
			let id = 0, currentID = game.personallySelected.id;

			// Checking the end of the selected items
			if(++currentID > game.selectedItems[game.selectedItems.length - 1].id) id = game.selectedItems[0].id;
			else id = currentID;

			// How do you work???
			// Checking for id
			// a very important line of code that I still don't fully understand
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
		game.mouse.camera = {};

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
			game.mouse.camera.x = e.offsetX;
			game.mouse.camera.y = e.offsetY;
			game.mouse.coord.x = e.offsetX - game.camera.x;
			game.mouse.coord.y = e.offsetY - game.camera.y;
		});
	},

	// Mouse click events
	mouseClick: function() {
		if(!game.mouse.click) return;
		let x = game.mouse.e.offsetX - game.camera.x;
		let y = game.mouse.e.offsetY - game.camera.y;

		// Mouse click handling
		switch(game.mouse.e.which) {
			// Left mouse button
			case 1:
				// Add item building
				if(game.placementBuild.state) {
					game.textures.forEach((texture) => {
						if(game.mouseCollision(texture, x, y)) if(!texture.walk) game.placementBuild.build = false;
					});
					if(game.placementBuild.build) {
						game.addItem(
							game.placementBuild.type, game.placementBuild.name, game.gridSize(game.mouse.coord.x, "x"),
							game.gridSize(game.mouse.coord.y, "y"), game.placementBuild.faction, game.placementBuild.faction
						);
					} else setNotification("Данное место недоступно для строительства");
					game.clearPickBuild();
				}

				// Selection Actions
				if(game.key.down == "ShiftLeft") game.selectionActions(x, y);
			break;
			// Middle mouse button
			case 2:
				if(game.key.down == "AltLeft") game.addMisc("resources", "goldmine", game.mouse.coord.x, game.mouse.coord.y);
				if(game.key.down == "ShiftLeft") game.addItem("unit", "worker", game.mouse.coord.x, game.mouse.coord.y, "red", "red");
				if(game.key.down == "ControlLeft") game.addItem("unit", "worker", game.mouse.coord.x, game.mouse.coord.y, "blue", "blue");
			break;
			// Right mouse button
			case 3:
				if(game.placementBuild.state) game.clearPickBuild();
				// Motion and targeting setting
				let target = null;
				game.items.forEach(item => {
					if(game.mouseCollision(item, x, y)) target = item.id;
					else { if(item.selected) { item.target = null; item.action = "move"; item.move = {x: x - item.width / 2, y: y - item.height / 2}; } };
				});
				// Targeting
				if(target != null) { game.selectedItems.forEach((item) => { item.target = target; item.action = "target"; }); }
				if(game.key.down == "AltLeft") game.addMisc("resources","metalcore", game.mouse.coord.x, game.mouse.coord.y);
			break;
			default: break;
		};
		console.log(game.items);
	},

	// Select personally item from selected items in #selectitems
	selectPersonallyItem: function(id) {
		if(game.key.down == "ShiftLeft") return game.removeFromSelection(id);
		let item = game.getItemById(id);
		game.personallySelect(item);
		screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
	},

	// Select item from selected items in #selectitems
	selectItem: function(id) {
		game.selectedItems.forEach((item) => {
			if(item.id == id) {
				game.clearSelection();
				game.selectedItems.push(item);
				game.personallySelect(item);
			}
		});
		screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
	},

	// Clear selection
	clearSelection: function() {
		screen.clearInformation();
		screen.clearSelectedItems();
		screen.clearActItem();
		game.clearPickBuild();
		// game.itemsMoveStop();
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
		// State rendering hightlight line
		if(game.mouse.e.which == 1 && game.key.down == "ShiftLeft") {
			game.mouse.stateHightlightLine = true;
		}
		else if(game.mouse.e.which == 1 && game.key.down == "AltLeft") {
			game.addMisc("resources", "tree", game.mouse.coord.x, game.mouse.coord.y);
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
			x: game.mouse.e.offsetX - game.camera.x,
			y: game.mouse.e.offsetY - game.camera.y,
			width: game.mouse.coord.x - (game.mouse.e.offsetX - game.camera.x),
			height: game.mouse.coord.y - (game.mouse.e.offsetY - game.camera.y)
		};
		game.context.strokeStyle = "green";
		game.context.lineWidth = 3;
		game.context.strokeRect(game.highlightLine.x, game.highlightLine.y, game.highlightLine.width, game.highlightLine.height);
	},

	// Select many items in highlight line
	selectHightlightLine: function() {
		// Additional addition
		if(game.key.down == "ShiftLeft") {
			game.items.forEach((item) => {
				if(item.selected == true) return;
				if(game.selectCollision(game.highlightLine, item)) {
					item.selected = true;
					game.selectedItems.push(item);
				}
			});
		// Regular addition
		} else {
			game.clearSelection();
			// Enumeration and add
			game.items.forEach((item) => {
				if(game.selectCollision(game.highlightLine, item)) {
					item.selected = true;
					game.selectedItems.push(item);
				}
			});
		}
		// Set information about misc
		game.miscs.forEach((misc) => {
			if(game.mouseCollision(misc, game.mouse.e.offsetX, game.mouse.e.offsetY))
				screen.setInformationMisc(misc);
		});

		// Filtration
		// Screening of buildings in the case of units
		let check = game.selectedItems.find((item) => item.type == "unit");
		if(check != undefined)
			game.selectedItems = game.selectedItems.filter(item => item.type != "building");

		if(game.selectedItems.length != 0)
			game.personallySelect(game.selectedItems[0]);

		screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
	},

	// Selection actions, need to optimize, finalize
	selectionActions(x, y) {
		game.items.forEach((item, i) => {
			if(game.mouseCollision(item, x, y)) {
				if(item.selected) {
					if(game.personallySelected.id == item.id) {
						game.personallySelected = {};
						screen.clearInformation();
					}
					item.selected = false;
					game.selectedItems.splice(i, 1);
					screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
				} else {
					item.selected = true;
					game.selectedItems.push(item);
					game.personallySelected = item;
					screen.setInformationItem(game.personallySelected);
					screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
				}
			}
		});
	},

	// Remove for selected
	removeFromSelection(id) {
		game.selectedItems.forEach((it, i) => {
			if(it.id == id) {
				if(game.personallySelected.id == it.id) {
					game.personallySelected = {};
					screen.clearInformation();
				}
				it.selected = false;
				game.selectedItems.splice(i, 1);
				screen.setSelectedItems(game.personallySelected.id, game.selectedItems);
			}
		});
	},

	// Personally select
	personallySelect(item) {
		screen.clearActItem();

		game.personallySelected = item;

		screen.setInformationItem(game.personallySelected);
		screen.setActItem(game.personallySelected);
	},

	// Movement items
	itemMove: function(item) {
		if(item.type == "building") return;
		if(item.action == "move" || item.action == "target") item.speed = 2;
		else item.speed = 0;

		if(game.mouseCollision(item, item.move.x, item.move.y))
			return game.itemMoveStop(item);

		if(item.x < item.move.x) item.x += item.speed;
		if(item.x > item.move.x) item.x -= item.speed;
		if(item.y < item.move.y) item.y += item.speed;
		if(item.y > item.move.y) item.y -= item.speed;
	},
	
	// Significantly modify target system
	// Movement items by target
	itemMoveTarget(item) {
		if(item.target == null || item.action != "target") return;
		let it = game.getItemById(item.target);
		if(it == undefined || game.moveCollision(item, it)) return game.itemMoveStop(item);
		item.move.x = it.x;
		item.move.y = it.y;
	},

	// Stop motion item
	itemMoveStop: function(item) {
		item.move = {};
		item.speed = 0;
		item.target = null;
		item.action = "stand";
	},

	// Stop motion items
	itemsMoveStop: function() {
		game.selectedItems.forEach((item) => { item.move = {}; item.target = null; item.action = "stand"; item.speed = 0; });
	},

	// Handling move collision
	moveCollision(item, it) {
		if(	item.x <= (it.x + it.width) && (item.x + item.width) >= it.x
			&& item.y <= (it.y + it.height) && (item.y + item.height) >= it.y)
			return true;
		else return false;
	},

	// Behavior of items when attacked
	attackOnEnemy: function(item, it) {
		if(item.type == "building" || item.faction == it.faction || item.action != "stand") return;
		if(item.x - item.sight <= (it.x + it.width) && it.x - item.sight <= (item.x + item.width)
			&& item.y - item.sight <= (it.y + it.height) && it.y - item.sight <= (item.y + item.height)){
			item.action = "target";
			item.target = it.id;
		}
	},

	// Update game data
	update: function() {
		// Hold the mouse
		game.mouseHolding();

		// Camera move
		game.cameraMove(game.mouse.camera.x, game.mouse.camera.y);
		// Camera test
		game.cameraView();

		// Set information about cash
		screen.setCash(game.cash);

		// Set information personally selected item
		screen.setInformationItem(game.personallySelected);

		// Handling data items
		game.items.forEach((item) => {
			// Handling a collision with the edges of the map
			game.edgesCollision(item);

			// Handling collision items
			game.items.forEach((it) => {
				game.itemsCollision(item, it);
				// Behavior of items when attacked
				game.attackOnEnemy(item, it);
			});

			// Handling collision items and textures
			game.textures.forEach((texture) => game.texturesCollision(item, texture));

			// Handling collision items and Misc
			game.miscs.forEach((misc) => game.miscCollision(item, misc));

			// Movement items
			game.itemMove(item);
			// Movement target items, unfinished
			game.itemMoveTarget(item);
		});

		// Select many items in highlight line
		if(game.mouse.stateHightlightLine) game.selectHightlightLine();
	},

	// Handling a collision with the edges of the map
	edgesCollision: function(el) {
		if(el.x <= 0) { el.speed = 0; el.x += el.repulsionSpeed; }
		if((el.x + el.width) >= game.canvas.width) { el.speed = 0; el.x -= el.repulsionSpeed; }
		if(el.y <= 0) { el.speed = 0; el.y += el.repulsionSpeed; }
		if((el.y + el.height) >= game.canvas.height) { el.speed = 0; el.y -= el.repulsionSpeed; }
	},

	// Handling texture collision
	texturesCollision: function(item, texture) {
		if(texture.walk) return;
		if(	item.x <= (texture.x + texture.width)
			&& texture.x <= (item.x + item.width)
			&& item.y <= (texture.y + texture.height)
			&& texture.y <= (item.y + item.height))
		{
			let acenter = {x: item.x + item.width / 2, y: item.y + item.height / 2};
			let bcenter = {x: texture.x + texture.width / 2, y: texture.y + texture.height / 2};
			let d = {x: acenter.x - bcenter.x, y: acenter.y - bcenter.y};
			if(d.x >= 0) { item.speed = 0; item.x += item.repulsionSpeed; }
			if(d.x <= 0) { item.speed = 0; item.x -= item.repulsionSpeed; }
			if(d.y >= 0) { item.speed = 0; item.y += item.repulsionSpeed; }
			if(d.y <= 0) { item.speed = 0; item.y -= item.repulsionSpeed; }
		}
	},

	// Check/Handling items collision
	itemsCollision: function(item, it) {
		if(	item.x <= (it.x + it.width + 1)
			&& it.x <= (item.x + item.width + 1)
			&& item.y <= (it.y + it.height + 1)
			&& it.y <= (item.y + item.height + 1))
		{
			let acenter = {x: item.x + item.width / 2, y: item.y + item.height / 2};
			let bcenter = {x: it.x + it.width / 2, y: it.y + it.height / 2};
			let d = {x: acenter.x - bcenter.x, y: acenter.y - bcenter.y};
			if(d.x > 0) { item.speed = 0; item.x += item.repulsionSpeed; }
			if(d.x < 0) { item.speed = 0; item.x -= item.repulsionSpeed; }
			if(d.y > 0) { item.speed = 0; item.y += item.repulsionSpeed; }
			if(d.y < 0) { item.speed = 0; item.y -= item.repulsionSpeed; }

			// Damage, move to a separate function
			if(item.faction != it.faction) {
				if(item.type == "building") return;
				let damage1 = (Math.floor(Math.random() * (item.damage[1] - item.damage[0])) + item.damage[0]) - it.defense;
				let damage2 = (Math.floor(Math.random() * (it.damage[1] - it.damage[0])) + it.damage[0]) - item.defense;
				if(damage1 <= 0) damage1 = 0;
				if(damage2 <= 0) damage2 = 0;
				it.hitPoints -= damage1;
				item.hitPoints -= damage2;
				if(d.x >= 0) item.x += 10;
				if(d.x <= 0) item.x -= 10;
				if(d.y >= 0) item.y += 10;
				if(d.y <= 0) item.y -= 10;
			}
		}
	},

	// Misc collision
	miscCollision: function(item, res) {
		if(	item.x <= (res.x + res.width)
			&& res.x <= (item.x + item.width)
			&& item.y <= (res.y + res.height)
			&& res.y <= (item.y + item.height))
		{
			let acenter = {x: item.x + item.width / 2, y: item.y + item.height / 2};
			let bcenter = {x: res.x + res.width / 2, y: res.y + res.height / 2};
			let d = {x: acenter.x - bcenter.x, y: acenter.y - bcenter.y};
			if(d.x >= 0) { item.speed = 0; item.x += item.repulsionSpeed; }
			if(d.x <= 0) { item.speed = 0; item.x -= item.repulsionSpeed; }
			if(d.y >= 0) { item.speed = 0; item.y += item.repulsionSpeed; }
			if(d.y <= 0) { item.speed = 0; item.y -= item.repulsionSpeed; }

			// Mining, move to a separate function
			if(item.name == "worker" && res.mining && res.minerals > 0) {
				switch(res.name) {
					case "tree":
						game.cash.wood += res.mining;
						res.minerals -= res.mining;
					break;
					case "goldmine":
						game.cash.gold += res.mining;
						res.minerals -= res.mining;
					break;
					case "metalcore":
						game.cash.metal += res.mining;
						res.minerals -= res.mining;
					break;
				}
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

		// Rendering textures
		game.textures.forEach((texture) => game.drawTexture(texture));

		// Rendering grid
		game.drawGrid();

		// Rendering item
		game.items.forEach((item) => game.drawItem(item));

		// Rendering misc
		game.miscs.forEach((misc) => game.drawMisc(misc));

		// Rendering selection for selected items
		game.selectedItems.forEach((item) => game.drawSelection(item));

		// Highlighting the hovering misc
		game.miscs.forEach((misc) => {
			if(game.mouseCollision(misc, game.mouse.coord.x, game.mouse.coord.y)) {
				game.context.strokeStyle = "white";
				game.context.lineWidth = 2;
				game.context.strokeRect(misc.x, misc.y, misc.width, misc.height);
			}
		});

		// Highlighting the hovering item
		game.items.forEach((item) => {
			if(item.selected) return;
			if(game.mouseCollision(item, game.mouse.coord.x, game.mouse.coord.y)) {
				if(item.hitPoints >= 100) game.context.strokeStyle = "green";
				if(item.hitPoints < 100 && item.hitPoints > 30) game.context.strokeStyle = "orange";
				if(item.hitPoints <= 30) game.context.strokeStyle = "red";
				game.context.lineWidth = 2;
				game.context.strokeRect(item.x, item.y, item.width, item.height);
			}
		});

		// Rendering placing pick building
		if(game.placementBuild.state) game.placeBuild(game.mouse.coord.x, game.mouse.coord.y);

		// Rendering fog
		game.drawFog();

		// Rendering highlight line for select many items
		if(game.mouse.stateHightlightLine) game.drawHighlightLine();

	},

	// Load image
	loadImage: function(src) {
		let image = new Image();
		image.src = src;
		return image;
	},

	// Add misc
	addMisc: function(type, name, x, y) {
		let temp = {};

		switch(type){
			case "resources":
				temp = resources.list[name];
				Object.assign(temp, resources.defaults);
			break;
		}

		let misc = {};
		for(let key in temp) misc[key] = temp[key];

		misc.x = x - misc.width / 2;
		misc.y = y - misc.height / 2;
		game.miscs.push(misc);
	},

	// Draw misc
	drawMisc: function(misc) {
		if(misc.minerals <= 0) game.removeMisc();
		game.context.drawImage(game.loadImage(misc.src), misc.x, misc.y, misc.width, misc.height);
	},

	// Remove misc
	removeMisc: function() {
		game.miscs.forEach((misc, i) => {
			if(misc.minerals <= 0) game.miscs.splice(i, 1);
		});
	},

	// Pick a building to be placed on the map
	pickBuild: function(buildName, faction) {
		game.placementBuild = buildings.list[buildName];
		game.placementBuild.type = "building";
		game.placementBuild.state = true;
		game.placementBuild.build = true;
		game.placementBuild.faction = faction;
	},

	// Clear pick building
	clearPickBuild: function() {
		game.placementBuild = {};
	},

	// Placing the building on the map
	placeBuild: function(x, y) {
		x = game.gridSize(x, "x");
		y = game.gridSize(y, "y");
		game.context.drawImage(game.loadImage(game.placementBuild.src), x, y, game.placementBuild.width, game.placementBuild.height);
	},

	// Add Item
	addItem: function(type, name, x, y, faction, color, life, id) {
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
		
		// Cleaning up what I haven't done yet
		if(type != "building") game.itemMoveStop(item);

		// Cost calculation
		if(game.cash.gold < item.cost.gold || game.cash.gold <= 0) return setNotification("Недостаточно ресурсов");
		else game.cash.gold -= item.cost.gold;
		if("wood" in item.cost) {
			if(game.cash.wood < item.cost.wood || game.cash.wood <= 0) return setNotification("Недостаточно ресурсов");
			else game.cash.wood -= item.cost.wood;
		}
		if("metal" in item.cost) {
			if(game.cash.metal < item.cost.metal || game.cash.metal <= 0) return setNotification("Недостаточно ресурсов");
			else game.cash.metal -= item.cost.metal;
		}
		if("food" in item.cost) {
			if(game.cash.food < item.cost.foor || game.cash.food <= 0) return setNotification("Недостаточно ресурсов");
			else game.cash.food -= item.cost.food;
		}

		// Increase food for building a farm
		if(item.name == "farm") game.cash.food += 5;

		// Adding properties
		item.id = id || game.counter++;
		item.x = x;
		item.y = y;
		item.faction = faction;
		item.life = life || item.hitPoints;

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
			screen.clearActItem();
		}

		// Remove from selected items array
		game.selectedItems.forEach((it, i) => {
			if(it.id == item.id) {
				it.selected = false;
				game.selectedItems.splice(i, 1);
			}
		});
		screen.setSelectedItems(game.personallySelected.id, game.selectedItems);

		if(item.name == "farm") game.cash.food -= 5;

		// Remove from items array
		for(let i = 0; i < game.items.length; i++) {
			if(game.items[i].id == item.id) {
				game.items.splice(i, 1); return;
			}
		}
	},

	// Remove items
	removeItems(id) {
		// Remove from items array
		game.items.forEach((item, i) => {
			if(item.name == "farm") game.cash.food -= 5;
			if(item.id == id) game.items.splice(i, 1);
		});
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

	// Resizing to a grid
	gridSize: function(n, t) {
		if(t == "x") n = Math.floor(n / game.grid.lineX) * game.grid.lineX;
		if(t == "y") n = Math.floor(n / game.grid.lineY) * game.grid.lineY;
		return n;
	},
	
	// Adding texture to the map
	addTexture: function(x, y, width, height, color, walkBool) {
		let texture = {
			x: x,
			y: y,
			width: width,
			height: height,
			color: color,
			walk: walkBool,
		};
		game.textures.push(texture);
	},

	// Draw texture
	drawTexture: function(texture) {
		game.context.fillStyle = texture.color;
		game.context.fillRect(texture.x, texture.y, texture.width, texture.height);
	},
	
	// Draw map method
	drawMap: function() {
		game.context.fillStyle = "gray";
		for(let i = 0; i < game.grid.collsX * game.grid.lineX; i += game.grid.lineX) {
			for(let j = 0; j < game.grid.collsY * game.grid.lineY; j += game.grid.lineY) {
				if(j % 10 == 0 && i % 5 == 0)
					game.context.fillRect(i, j, game.grid.lineX, game.grid.lineY);
			}
		}
	},

	// Draw fog, not optimized
	drawFog: function() {
		for(let i = 0; i < game.grid.collsX * game.grid.lineX; i += game.grid.lineX) {
			for(let j = 0; j < game.grid.collsY * game.grid.lineY; j += game.grid.lineY) {
				game.context.fillStyle = "rgba(0,0,0,0.8)";
				game.items.forEach((item) => {
					if(game.fogCollision(item, i, j, game.grid.lineX, game.grid.lineY))
						game.context.fillStyle = "rgba(0,0,0,0)";
				});
				game.context.fillRect(i, j, game.grid.lineX, game.grid.lineY);
			}
		}
	},

	// Handling fog collision
	fogCollision: function(item, i, j, x, y) {
		if(item.x - item.sight <= (i + x) && i - item.sight <= (item.x + item.width)
			&& item.y - item.sight <= (j + y) && j - item.sight <= (item.y + item.height))
			return true;
		else return false;
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
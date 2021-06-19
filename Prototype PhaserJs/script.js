// Game object
let game = {
	// Reset Data
	resetData: function() {
		// For ID
		game.counter = 1;

		// Game data Arrays
		game.items = [];
		game.elements = [];
		game.selectedItems = [];

		// Game data Objects
		game.mouse = {};
		game.key = {};
		game.map = {};
	},

	// Get map data using fetch, currently not used
	getMapData: async function(mapName) {
		response = await fetch("maps/" + mapName + ".json").then((res) => res.json());
		return response;
	},

	// Adding item
	addItem: function(x, y, type) {
		let item = {id: game.counter++, x: x, y: y, type: type};
		game.items.push(item);
	},

	// Preload
	preload: function() {
		// Reset data
		game.resetData();

		// Retrieving map data
		game.map.data = test; // connect

		// Recodring map data
		game.map.header = game.map.data.find((obj) => obj.type == "header");
		game.map.requirements = game.map.data.find((obj) => obj.type == "requirements").data;
		game.map.items = game.map.data.find((obj) => obj.type == "items").data;

		// Loading entities
		game.map.requirements.forEach((item) => this.load.image(item.key, item.src));

		// Adding entites
		game.map.items.forEach((item) => game.addItem(item.x, item.y, item.key));

	},
	
	// Creating the initial scene
	create: function() {
		// Adding items to the screen
		let it;
		game.items.forEach((item, i) => {
			it = this.physics.add.image(item.x, item.y, item.type).setInteractive();
			game.elements[i] = it;
		});

		game.elements.forEach((elem) => {
			game.elements.forEach((el) => {
				this.physics.add.collider(elem, el);
			});

			this.input.setDraggable(elem);
			this.input.on('drag', (p, elem, x, y) => {
				elem.x = x;
				elem.y = y;
			});
		});
	},

	// Intermediate calculations
	update: function() {
		let self = this;

		this.input.on('pointermove', (p) => {
		});

	},

};

// Phaser config
let config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		}
	},
	scene: {
		preload: game.preload,
		update: game.update,
		create: game.create,
	}
};
// New Phaser Game
let phaser = new Phaser.Game(config);
class Play extends Phaser.Scene {
	constructor(data) {
		super("play");
		
		this.counter = 1;
		this.items = [];

		this.elements = [];
		this.selectedElements = [];
	}

	// Adding item
	addItem(item) {
		item.id = this.counter++;
		this.items.push(item);
	}

	// Creating the initial scene
	create(data) {
		this.counte = data.counter;
		this.items = data.items;
		// Background
		this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
		this.background.setOrigin(0,0);

		// Creating items
		this.items.forEach((item, i) => {
			let element = this.add.sprite(item.x, item.y, item.key);
			this.elements[i] = element;
		});

		// Set interactive for elements
		this.elements.forEach(element => element.setInteractive());

		// Handling mouse clicks on elements
		this.input.on('gameobjectdown', this.deathItem, this);

		// Creating text
		this.add.text(20, 20, "Playing game", {font: "25px", fill: "yellow"});
	}

	// Movement item
	moveUnit(item, speed) {
		if(item.y >= config.height || (item.x + item.width) <= 0) this.resetUnit(item);
		item.y += speed;
		item.x -= speed / 2;
	}

	// Resetting coordinates
	resetUnit(item) {
		item.y = 0 - item.height;
		item.x = Phaser.Math.Between(0, config.width);
	}

	// Intermediate calculations
	update() {
		// Movement items
		this.elements.forEach(element => this.moveUnit(element, 3));
	}

	// Handling death item
	deathItem(pointer, gameObject) {
		gameObject.setTexture("explosionBlood");
		gameObject.play("deathItem");
	}

}
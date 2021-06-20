class Play extends Phaser.Scene {
	constructor() {
		super("play");

		this.items = [];
		this.selectedItems = [];
	}

	// Getting data from scene loading
	init(data) {
		this.counter = data.counter;
	}

	// Creating the initial scene
	create(data) {
		// Background
		// this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
		// this.background.setOrigin(0,0);

		this.tree = Phaser.Structs.RTree();

		// Creating items
		data.items.forEach((item, i) => {
			let it = this.add.sprite(item.x, item.y, item.key);
			this.items[i] = it;
			this.tree.insert({
				left: item.x,
				top: item.y,
				right: item.x + 16,
				bottom: item.y + 16,
				sprite: it,
				w: item.width,
				h: item.height,
			});
		});

		// Set interactive for elements
		this.items.forEach(item => item.setInteractive());

		// Graphics
		this.graphics = this.add.graphics({ lineStyle: {width: 2, color: 0x008000}});

		// Hightline
		this.hightline = new Phaser.Geom.Rectangle();

		// Handling mouse click
		this.input.on('pointerdown', this.mouseClick, this);
		// Handling mouse move
		this.input.on('pointermove', this.mouseMove, this);
		// Handling mouse clicks on elements
		this.input.on('gameobjectdown', this.deathItem, this);
		
		// Rendering
		this.events.on("render", this.render, this);
	}

	// Intermediate calculations
	update() {
		// Movement items
		// this.items.forEach(item => this.moveUnit(item, 3));
	}

	// Adding element 
	addItem(item, self) {
		let it = self.add.sprite(item.x, item.y, item.key);
		this.items.push(it);
		this.tree.insert({
			left: item.x,
			top: item.y,
			right: item.x + item.width,
			bottom: item.y + item.height,
			sprite: it,
			w: item.width,
			h: item.height,
		});
	}

	// Handling mouse click
	mouseClick(pointer) {
		if(pointer.rightButtonDown()) {
			this.addItem({x: pointer.x, y: pointer.y, key: "worker"}, this);
		}
	}

	// Hanling mouse move
	mouseMove(pointer) {
		this.graphics.clear();
		if(pointer.leftButtonDown()) {
			this.drawHightline(pointer.downX, pointer.downY, pointer.x, pointer.y);
			this.selectHightLine();
		}
	}

	// Draw hightline
	drawHightline(dX, dY, x, y) {
		this.hightline.x = dX;
		this.hightline.y = dY;
		this.hightline.width = x - dX;
		this.hightline.height = y - dY;
		this.graphics.strokeRectShape(this.hightline);
	}

	// Select items in hightline
	selectHightLine() {
		this.selectedItems = this.tree.search({
			minX: this.hightline.x,
			minY: this.hightline.y,
			maxX: this.hightline.x + this.hightline.width,
			maxY: this.hightline.y + this.hightline.height,
		});
	}

	// Handling death item
	deathItem(pointer, gameObject) {
		gameObject.setTexture("explosionBlood");
		gameObject.play("deathItem");
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

	// Rendering
	render() {
		let context = this.sys.game.context;
		context.strokeStyle = "rgba(0,128,0,1)";
		context.lineWidth = 2;
		this.selectedItems.forEach(item => {
			context.strokeRect(item.x, item.y, item.width, item.height);
		});
	}
}
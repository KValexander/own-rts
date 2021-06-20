class Loading extends Phaser.Scene {
	constructor() {
		super("loading");
		
		this.counter = 1;
		this.items = [];

		this.map = {};
		this.map.images = [];
		this.map.animations = [];
		this.map.spritesheets = [];
		this.map.requirements = [];
	}

	preload() {
		// Loading background image
		this.load.image("background", "gui/bg_load.jpg");

		// Get entities for loading
		this.map.data = test;

		// Recording requirements
		this.map.requirements = this.map.data.find((obj) => obj.type == "requirements").data;
		// Recording items
		this.map.items = this.map.data.find((obj) => obj.type == "items").data;

		// Getting assets
		this.map.requirements.images.forEach((image) => this.map.images.push(assets.images[image]));
		this.map.requirements.spritesheets.forEach((spritesheet) => this.map.spritesheets.push(assets.spritesheets[spritesheet]));
		// Getting animations
		this.map.requirements.animations.forEach((anim) => this.map.animations.push(assets.animations[anim]));

		// Loading images
		this.map.images.forEach(image => this.load.image(image.key, image.src));

		// Loading spritesheet
		this.map.spritesheets.forEach(spritesheet => {
			this.load.spritesheet(spritesheet.key, spritesheet.src, {
				frameWidth: spritesheet.width,
				frameHeight: spritesheet.height
			});
		});

		// Adding items
		this.map.items.forEach((item) => this.addItem(item));
	}

	// Adding item
	addItem(item) {
		item.id = this.counter++;
		this.items.push(item);
	}

	// Creating the initial scene
	create() {

		// Creating animations
		this.map.animations.forEach((anim, i) => {
			this.anims.create({
				key: anim.key,
				frames: this.anims.generateFrameNumbers(anim.frames),
				frameRate: anim.frameRate,
				repeat: anim.repeat,
				hideOnComplete: anim.hideOnComplete
			});
		});

		this.add.text(20,20, "Loading game...");
		this.scene.start("play", {"items": this.items, "counter": this.counter});
	}
}
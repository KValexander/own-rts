let units = {
	list: {
		"worker": {
			name: "worker",
			src: "images/worker.png",
			hitPoints: 80,
			width: 16,
			height: 24,
			damage: [5, 7],
			radiuse: 10,
			speed: 3,
			sight: 5,
			level: 1,
			maxLevel: 1,
			experiense: 0,
			maxExperiense: 0,
			cost: {"gold": 50},
			frames: [],
		},
		"soldier": {
			name: "soldier",
			src: "images/soldier.png",
			hitPoints: 160,
			width: 20,
			height: 24,
			damage: [11, 15],
			radiuse: 15,
			speed: 4,
			sight: 5,
			level: 1,
			maxLevel: 3,
			experiense: 0,
			maxExperiense: 500,
			cost: {"gold": 80, "metal": 10},
			frames: [],
		}
	},
	defaults: {
		type: "unit",
		animationIndex: 0,
		direction: 0,
		action: "stand",
		selected: false,
		selectable: true,
		directions: 8,
	},
};

let buildings = {}
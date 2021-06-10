let units = {
	list: [
		{
			name: "worker",
			src: "images/worker.png",
			hitPoints: 80,
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
		{
			name: "soldier",
			src: "images/soldier.png",
			hitPoints: 160,
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
	],
};

let buildings = {}
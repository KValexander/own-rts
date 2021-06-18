// Campaign data
let campaigns = {
	"training": {
		"name": "Генеральная военная академия",
		"introduction": "",

		// Global map Details
		"startX": 0,
		"startY": 0,
		"mapCampaignWidth": 5000,
		"mapCampaignHeight": 5000,
		"playerFaction": "red",
		"camera": false,

		"missions": [
			{"type": "conditional",
				"condition":() => isDead(-1),
				"action": () => game.endGame(),
				"data": {
					// Map details
					"mapMissionWidth": 1920,
					"mapMissionHeight": 1080,
					// Economy resources
					"cash": {
						"gold": 1625,
						"wood": 180,
						"metal": 270,
						"food": 27,
					},
					// Entites for add
					"items": [
						{"type": "hero", "name": "leonid", "x": 16*10, "y": 16*2, "faction": "red", "color": "red", "life": undefined, "id": -1},
						{"type": "unit", "name": "soldier", "x": 16*13, "y": 16*3, "faction": "red", "color": "red", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*7, "y": 16*3, "faction": "red", "color": "red", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*10, "y": 16*5, "faction": "red", "color": "red", "life": undefined, "id": undefined},

						{"type": "building", "name": "capitol", "x": 16*111, "y": 16*8.5, "faction": "blue", "color": "blue", "life": undefined, "id": -2},
						{"type": "unit", "name": "soldier", "x": 16*109, "y": 16*7.5, "faction": "blue", "color": "blue", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*107, "y": 16*9.25, "faction": "blue", "color": "blue", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*109, "y": 16*11.5, "faction": "blue", "color": "blue", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*105, "y": 16*7.5, "faction": "blue", "color": "blue", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*105, "y": 16*11.5, "faction": "blue", "color": "blue", "life": undefined, "id": undefined},
						
						{"type": "building", "name": "temple", "x": 16*105, "y": 16*31.5, "faction": "neutral", "color": undefined, "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*105, "y": 16*31.5, "faction": "neutral", "color": undefined, "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*105, "y": 16*31.5, "faction": "neutral", "color": undefined, "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*105, "y": 16*31.5, "faction": "neutral", "color": undefined, "life": undefined, "id": undefined},
					],
					"miscs": [
						{"type": "resources", "name": "goldmine", "x": 16*24, "y": 16 * 37},
						{"type": "resources", "name": "goldmine", "x": 16*25, "y": 16 * 39},
						{"type": "resources", "name": "goldmine", "x": 16*27, "y": 16 * 40},
						{"type": "resources", "name": "metalcore", "x": 16*24, "y": 16 * 35},
						{"type": "resources", "name": "metalcore", "x": 16*29, "y": 16 * 40},
					],
					"textures": [
						{"x": 16*17, "y": 0, "width": 16*6, "height": 16*20, "color": "#555", "walk": false},
						{"x": 16*23, "y": 0, "width": 16*97, "height": 16*3, "color": "#555", "walk": false},
						{"x": 16*23, "y": 16*3, "width": 16*76, "height": 16*2, "color": "#555", "walk": false},
						{"x": 16*117, "y": 16*3, "width": 16*3, "height": 16*51, "color": "#555", "walk": false},
						{"x": 16*5, "y": 16*34, "width": 16*18, "height": 16*7, "color": "#555", "walk": false},
						{"x": 0, "y": 0, "width": 16*3, "height": 16*54, "color": "#555", "walk": false},
						{"x": 16*3, "y": 16*17, "width": 16*2, "height": 16*24, "color": "#555", "walk": false},
						{"x": 16*15, "y": 16*17, "width": 16*2, "height": 16*3, "color": "#555", "walk": false},
						{"x": 16*3, "y": 16*41, "width": 16*114, "height": 16*13, "color": "#555", "walk": false},
						{"x": 16*99, "y": 16*17, "width": 16*18, "height": 16*8, "color": "#555", "walk": false},
						{"x": 16*97, "y": 16*15, "width": 16*2, "height": 16*10, "color": "#555", "walk": false},
						{"x": 16*108, "y": 16*25, "width": 16*9, "height": 16*16, "color": "#555", "walk": false},
					],
					// Trigger Events
					"triggers": [
						{"type": "time", "timetype": "once", "time": 1000,
							"action": () => setNotification("Для победы вам необходимо уничтожить базу противника"),
						},
						{"type": "time", "timetype": "repeat", "time": 60000,
							"action": () => {
								giveCash(240, 0, 30, 6);
								game.addItem("unit", "soldier", 16*94, 16*6, "blue", "blue", undefined, -10);
								game.addItem("unit", "soldier", 16*92, 16*7.75, "blue", "blue", undefined, -11);
								game.addItem("unit", "soldier", 16*94, 16*10, "blue", "blue", undefined, -12);
								game.items.forEach((item) => {
									if(item.id == -10 || item.id == -11 || item.id == -12) {
										item.action = "target";
										item.target = -1;
									}
								});
							},
						},
						{"type": "conditional",
							"condition": () => reachThePlace(-1, 16*5, 16*17, 16*10, 16*3),
							"action": () => {
								giveCash(50, 0, 0, 1);
								game.addItem("unit", "worker", 16*10, 16*25, "red", "red");
							},
						},
						{"type": "conditional",
							"condition": () => isHitPoints(-2, 1000),
							"action": () => {
								giveCash(320, 0, 40, 8);
								game.addItem("unit", "soldier", 16*109, 16*8.5, "blue", "blue");
								game.addItem("unit", "soldier", 16*115, 16*8.5, "blue", "blue");
								game.addItem("unit", "soldier", 16*112.5, 16*7, "blue", "blue");
								game.addItem("unit", "soldier", 16*112.5, 16*10, "blue", "blue");
							},
						},
						{"type": "conditional",
							"condition": () => isDead(-2),
							"action": () => game.endGame(),
						},

					],
				},
			}
		],

	},

	"empire": {
		"name": "Генеральная военная академия",
		"introduction": "",

		// Global map Details
		"startX": 0,
		"startY": 0,
		"mapCampaignWidth": 5000,
		"mapCampaignHeight": 5000,
		"playerFaction": "red",

		"missions": [
			{"type": "conditional",
				"condition":() => isDead(-1),
				"action": () => game.endGame(),
				"data": {
					// Map details
					"mapMissionWidth": 1920,
					"mapMissionHeight": 1080,
					// Economy resources
					"cash": {
						"gold": 405 + 325 + 240,
						"wood": 0 + 120,
						"metal": 30 + 80 + 30,
						"food": 8,
					},
					// Entites for add
					"items": [
						{"type": "hero", "name": "leonid", "x": 16*5, "y": 16*5, "faction": "red", "color": "red", "life": undefined, "id": -1},
						{"type": "unit", "name": "soldier", "x": 16*7, "y": 16*5, "faction": "red", "color": "red", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*5, "y": 16*7, "faction": "red", "color": "red", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*7, "y": 16*7, "faction": "red", "color": "red", "life": undefined, "id": undefined},
						{"type": "building", "name": "capitol", "x": 16*96, "y": 16*7, "faction": "blue", "color": "blue", "life": undefined, "id": -2},
						{"type": "unit", "name": "soldier", "x": 16*94, "y": 16*6, "faction": "blue", "color": "blue", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*92, "y": 16*7.75, "faction": "blue", "color": "blue", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 16*94, "y": 16*10, "faction": "blue", "color": "blue", "life": undefined, "id": undefined},
					],
					"textures": [],
					// Trigger Events
					"triggers": [
						{"type": "time", "timetype": "once", "time": 3000,
							"action": () => {},
						},
						{"type": "time", "timetype": "repeat", "time": 60000,
							"action": () => {},
						},
						{"type": "conditional",
							"condition": () => reachThePlace(-1, 16*4, 16*16, 16*10, 16*10),
							"action": () => {
								giveCash(50);
								game.addItem("unit", "worker", 16*5, 16*20, "red", "red");
							},
						},
						{"type": "conditional",
							"condition": () => isDead(-2),
							"action": () => game.endGame(),
						},

					],
				},
			}
		],

	},

};
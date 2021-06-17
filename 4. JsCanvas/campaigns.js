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

	"empire": {
		"name": "Безудержность империи",
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
							"condition": () => reachThePlace(),
							"action": () => {},
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
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

		"missions": [
			{"type": "conditional",
				"condition":() => {},
				"action": () => {},
				"data": {
					// Map details
					"mapMissionWidth": 1920,
					"mapMissionHeight": 1080,
					// Economy resources
					"cash": {
						"gold": 455,
						"wood": 0,
						"metal": 30,
						"food": 5,
					},
					// Entites for add
					"items": [
						{"type": "hero", "name": "leonid", "x": 64, "y": 48, "faction": "red", "color": "red", "life": undefined, "id": -1},
						{"type": "unit", "name": "soldier", "x": 64, "y": 64, "faction": "red", "color": "red", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 92, "y": 32, "faction": "red", "color": "red", "life": undefined, "id": undefined},
						{"type": "unit", "name": "soldier", "x": 64, "y": 32, "faction": "red", "color": "red", "life": undefined, "id": undefined},
					],
					"textures": [],
					// Trigger Events
					"triggers": [],
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

		"missions": [
			{"type": "conditional",
				"condition":() => {
					
				},
				"action": () => {},
				"data": {
					// Map details
					"mapMissionWidth": 1000,
					"mapMissionHeight": 1000,
					// Economy Rresources
					"resources": {
						"wood": 0,
						"gold": 0,
						"metal": 0,
						"food": 5,
					},
					// Entites for add
					"items": [
						{"type": "hero", "name": "leonid", "x": 100, "y": 500, "faction": "red", "color": "red", "life": undefined, "id": -1},
						{"type": "unit", "name": "soldier", "x": 100, "y": 530, "faction": "red", "color": "red"},
						{"type": "unit", "name": "soldier", "x": 130, "y": 500, "faction": "red", "color": "red"},
						{"type": "unit", "name": "soldier", "x": 100, "y": 470, "faction": "red", "color": "red"},
					],
					"textures": [],
					// Trigger Events
					"triggers": [],
				},
			}
		],
	},

};
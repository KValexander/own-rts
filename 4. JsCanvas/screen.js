// Экраны
let screen = {
	width: 1280,
	height: 720,
	// Инициализация
	init: function() {
		screen.changeResolution();
		screen.changeScreen("mainmenu", "startscreen");
	},

	// Выбор экрана
	changeScreen: function(game_id, menu_id) {
		$(".gamelayer").hide();
		$("#" + game_id).show();
		if(menu_id != undefined) {
			$(".menulayer").hide();
			$("#"+menu_id).show();
		}
	},

	// Изменение размера экрана
	resizible: function(width, height) {
		screen.width = width;
		screen.height = height;
		screen.changeResolution();
	},
	// Применение изменений размера экрана
	changeResolution: function() {
		// Если размеры слишком велики
		if(screen.width > window.innerWidth) screen.width = window.innerWidth;
		if(screen.height > window.innerHeight) screen.height = window.innerHeight;
		// Изменение размеров экрана
		$("#gamecontainer").css("width", screen.width + "px").css("height", screen.height + "px");
		// Центрирование окна игры
		if(screen.height < window.innerHeight)
			$("#gamecontainer").css("top", window.innerHeight / 2 - screen.height / 2 + "px");
	},
};
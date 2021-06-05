// Основной класс игры
class Game {

	// Инициализация класса
	constructor() {
		this.initSettings();
		this.initWindow();
	}

	// Настройка класса
	initSettings() {
		// Canvas и Context || .cnv, .ctx
		this.canvas = {};
		this.canvas.cnv = document.querySelector("canvas");
		this.canvas.ctx = this.canvas.cnv.getContext("2d");

		// Переменная графического интерфейса
		this.gui = new GUI(this.canvas);
	}

	// Конфигурации окна
	initWindow() {
		// Разрешение окна игры
		this.canvas.cnv.width = options.sizeWidth;
		this.canvas.cnv.height = options.sizeHeight;
		// Разрешение страницы
		document.querySelector("body").style = "width: " + options.sizeWidth + "px;";
		document.querySelector("body").style = "height: " + options.sizeHeight + "px;";
		// Центрирование окна игры
		if(options.sizeHeight < window.innerHeight) {
			let va = window.innerHeight / 2 - options.sizeHeight / 2;
			document.querySelector("canvas").style = "top: " + va + "px;";
		}
	}

	// Обработка событий
	eventHandling() {

		// Обработка событий интерфейса
		this.gui.eventHandling();

	}

	// Обновление данных
	update() {

		// Обработка событий
		this.eventHandling();

		// Обновление данных интерфейса
		this.gui.update();
		
	}

	// Отрисовка данных
	rendering() {

		// Отрисовка интерфейса
		this.gui.rendering();

	}

}
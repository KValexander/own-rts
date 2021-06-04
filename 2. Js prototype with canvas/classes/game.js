// Класс игры
class Game {

	// Инициализация класса
	constructor() {
		// Вызов метода объявления переменных
		this.initVariable();
		// Вызов метода конфигурации окна
		this.initWindow();
	}

	// Объявление переменных
	initVariable() {
		// Объет с данными экрана
		this.screen = {
			canvas: document.querySelector("#canvas"), // canvas
			width: 1920, // ширина окна
			height: 1080, // высота окна
		};
		this.screen.ctx = this.screen.canvas.getContext("2d");

		// Объект с конфигурациями настроек игры
		this.option = {};

		// Данные проверки нужны, если заданы определённые
		// параметры ширины и высоты
		// Проверка на ширину экрана
		if(this.screen.width > window.innerWidth)
			this.screen.width = window.innerWidth;

		// Проверка на высоту экрана
		if(this.screen.height > window.innerHeight)
			this.screen.height = window.innerHeight;

		// Главный экран игры
		loop_screen.main_list.main_menu = true;

		// Создание экземпляра интерфейса
		this.gui = new GUI(this.screen);

	}

	// Конфигурации окна
	initWindow() {
		// Разрешение окна
		this.screen.canvas.width = this.screen.width;
		this.screen.canvas.height = this.screen.height;
		// Разрешение страницы
		document.querySelector("body").style = "width: " + this.screen.width + "px;";
		document.querySelector("body").style = "height: " + this.screen.height + "px;";
		// Центрирование экрана игры
		if(this.screen.height < window.innerHeight) {
			let va = window.innerHeight / 2 - this.screen.height / 1.8;
			document.querySelector("#canvas").style = "top: " + va + "px;";
		}
	}

	// Обработка событий игры
	eventHandling() {

		// Обработка событий мыши интерфейса
		this.gui.eventHandling();

	}

	// Обновление данных игры
	update() {
		// Обработка событий игры
		this.eventHandling();

	}

	// Отрисовка данных игры
	rendering() {

		// Экран меню
		if(loop_screen.main_list.main_menu) {
			// Отрисовка интерфейса интерфейса меню
			this.gui.rendering_menu();
		}

		// Экран загрузки
		if(loop_screen.load) {
			// Отрисовка интерфейса экрана загрузки
			this.gui.rendering_load();
		}

		// Экран игры
		if(loop_screen.game) {
			// Отрисовка интерфейса экрана игры
			this.gui.rendering_game();
		}
		
	}

}
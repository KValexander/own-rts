// Класс работы с экраном меню
class Menu {
	// Инициализация класса
	constructor(canvas) {
		// Canvas и Context || .cnv, .ctx
		this.canvas = canvas;
	}

	// Настройка класса
	initSetting() {

	}

	// Выбор экрана меню
	changeScreen(screen) {
		// Очистка списка рендеринга
		rendering.clear();
		// Выбор заднего фона
		rendering.addBackground("data/assets/bg_menu.jpg");

		// Выбор нужного экрана
		switch(screen) {
			case "main": this.mainScreen(); break;
			case "choise": this.choiseScreen(); break;
			case "option": this.optionScreen(); break;
			case "company": this.companyScreen(); break;
		}
	}

	// Экран главного меню
	mainScreen() {

		// Добавление поверхностей
		rendering.addSurface(1, "rgba(255,255,255,0.5)", grid.lineX * 0.5, grid.lineY * 1, grid.lineX * 4, grid.lineY * 7);

		// Добавление кнопок
		rendering.addButton(1, "Начать игру", "#fff", "#050411", grid.lineX, grid.lineY * 2, grid.lineX * 3, grid.lineY);
		rendering.addButton(2, "Настройки", "#fff", "#050411", grid.lineX, grid.lineY * 4, grid.lineX * 3, grid.lineY);
		rendering.addButton(3, "Выход", "#fff", "#050411", grid.lineX, grid.lineY * 6, grid.lineX * 3, grid.lineY);

	}

	// Экран выбора между компание и сражением
	choiseScreen() {
		// Добавление поверхностей
		rendering.addSurface(1, "rgba(255,255,255,0.5)", grid.lineX * 0.5, grid.lineY * 1, grid.lineX * 4, grid.lineY * 7);

		// Добавление кнопок
		rendering.addButton(4, "Одиночная компания", "#fff", "#050411", grid.lineX, grid.lineY * 2, grid.lineX * 3, grid.lineY);
		rendering.addButton(5, "Своя битва", "#fff", "#050411", grid.lineX, grid.lineY * 4, grid.lineX * 3, grid.lineY, false);
		rendering.addButton(6, "Вернуться", "#fff", "#050411", grid.lineX, grid.lineY * 6, grid.lineX * 3, grid.lineY);
	}

	// Экран компаний
	companyScreen() {
		// Добавление поверхностей
		rendering.addSurface(1, "rgba(255,255,255,0.5)", grid.lineX * 0.5, grid.lineY * 1, grid.lineX * 15, grid.lineY * 7);
		rendering.addSurface(2, "rgba(255,255,255,0.5)", grid.lineX * 11.5, grid.lineY * 13.5, grid.lineX * 4, grid.lineY * 2);

		// Добавление кнопок
		rendering.addButton(10, "Компания Империи", "#fff", "#050411", grid.lineX, grid.lineY * 2, grid.lineX * 14, grid.lineY);
		rendering.addButton(11, "Компания Союза Рас", "#fff", "#050411", grid.lineX, grid.lineY * 4, grid.lineX * 14, grid.lineY, false);
		rendering.addButton(12, "Компания Механикусов", "#fff", "#050411", grid.lineX, grid.lineY * 6, grid.lineX * 14, grid.lineY, false);
		rendering.addButton(13, "Вернуться", "#fff", "#050411", grid.lineX * 12, grid.lineY * 14, grid.lineX * 3, grid.lineY);
	}

	// Экран настроек
	optionScreen() {

	}
}
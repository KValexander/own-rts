// Класс работы с экраном загрузки
class Load {

	// Инициализация класса
	constructor(canvas) {
		this.canvas = canvas;
	}

	// Выбор экрана
	changeScreen() {
		// Очистка списка рендеринга
		rendering.clear();
		// Выбор заднего фона
		rendering.addBackground("data/assets/bg_load.jpg");
		// Сокрытие popup окна
		popup.rendering = false;

		this.loadScreen();
	}

	// Экран загрузки
	loadScreen() {
		// Добавление поверхностей
		rendering.addSurface(3, "rgba(255,255,255,0.5)", grid.lineX * 6.5, grid.lineY * 13.5, grid.lineX * 3, grid.lineY * 2);
		// Добавление кнопок
		rendering.addButton(15, "Начать компанию", "#fff", "#050411", grid.lineX * 7, grid.lineY * 14, grid.lineX * 2, grid.lineY);
	}

}
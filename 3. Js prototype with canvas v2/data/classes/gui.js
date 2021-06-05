// Общий класс работы с графическим интерфейсом
class GUI {

	// Инициализация класса
	constructor(canvas) {
		// Canvas и Context || .cnv, .ctx
		this.canvas = canvas;

		// Настройка класса
		this.initSettings();
	}

	// Настройка класса
	initSettings() {
		// Проверка размеров окна
		options.sizeCheck();
		// Настройка сетки
		grid.config(16, 16, "#ff8080");

		// Новый экземпляр класса интерфейса меню
		this.menu = new Menu(this.canvas);
		// Новый экземпляр класса интерфейса загрузки
		this.load = new Load(this.canvas);
		// Новый экземпляр класса интерфейса игры
		this.play = new Play(this.canvas);

		// Выбор экрана меню
		this.changeScreen("menu", "main");
	}

	// Выбор экрана
	changeScreen(loop, screen) {
		// Выбор нужного экрана
		switch(loop) {
			case "menu": this.menu.changeScreen(screen); break;
			case "load": break;
			case "play": break;
		}
	}

	// Обработка событий
	eventHandling() {
		// Для обращения к this из обработчиков событий
		let self = this;

		// Коордитаны мыши e.offsetX, e.offsetY
		this.mouseClick(self); // нажатие мыши
		this.mouseMove(self); // движение мыши
	}

	// Обработка нажатия мыши
	mouseClick(self) {
		this.canvas.cnv.onclick = function(e) {
			// Сокрытие popup окна при нажатии
			eventList.hidePopup(e.offsetX, e.offsetY);

			// Действие на нажатую кнопку
			eventList.clickButton(function(btn) {
				// Переход к списку действий нажатия
				self.actionClickList(btn.id, btn.slug);
			}, e.offsetX, e.offsetY);
		}
	}

	// Обработка движения мыши
	mouseMove(self) {
		this.canvas.cnv.onmousemove = function(e) {
			// Действие на наведённую кнопку
			eventList.aimButton(function(btn) {
				// Переход к списку действий наведения
				self.actionAimList(btn.id, btn.slug);
			}, e.offsetX, e.offsetY);
		}
	}

	// Обновление данных
	update() {

	}

	// Отрисовка данных
	rendering() {

		// Отрисовка заднего фона
		this.canvas.ctx.drawImage(rendering.bg, 0, 0, options.sizeWidth, options.sizeHeight);

		// Отрисовка сетки
		grid.draw(this.canvas);

		// Отрисовка поверхностей
		if(rendering.surface.length > 0) {
			for(let i = 0; i < rendering.surface.length; i++)
				rendering.createSurface(rendering.surface[i], this.canvas);
		}

		// Отрисовка кнопок
		if(rendering.button.length > 0) {
			for(let i = 0; i < rendering.button.length; i++)
				rendering.createButton(rendering.button[i], this.canvas);
		}

		// Отрисовка справочников
		if(rendering.directory.length > 0) {
			for(let i = 0; i < rendering.directory.length; i++)
				rendering.createDirectory(rendering.directory[i], this.canvas);
		}

		// Отрисовка popup окна
		if(popup.rendering)
			popup.create(this.canvas);

	}

	// Список действий при нажатии на кнопку 
	actionClickList(btn_id, btn_slag) {
		// Перебор id
		switch(btn_id) {
			// Кнопка "Начать игру"
			case 1: this.menu.changeScreen("choise"); break;
			// Кнопка "Настройки"
			case 2: this.menu.changeScreen("option"); break;
			// Кнопка "Выход"
			case 3: window.close(); break;
			// Кнопка "Одиночная компания"
			case 4: this.menu.changeScreen("company"); break;
			// Кнопка "Игра" на экране настроек
			case 7: this.menu.changeScreen("option", "game"); break;
			// Кнопка "Графика" на экране настроек
			case 8: this.menu.changeScreen("option", "graphics"); break;
			// Кнопка "Вернуться" на экране выбора и экране настроек
			case 6: case 9: this.menu.changeScreen("main"); break;
			// Кнопка "Вернуться" на экране компании
			case 13: this.menu.changeScreen("choise"); break;
		};

		// Перебор слагов (когда лень искать id)
		switch(btn_slag) {

		};
	}

	// Список действий при наведении на кнопку
	actionAimList(btn_id, btn_slag) {
		// Перебор id
		switch(btn_id) {
			// Кнопка "Компания империи" на странице компаний
			case 10: popup.config(systemText.company.empire, this.canvas); break;
			// Кнопка "Своя битва"
			// Кнопки "Компанию сюза рас" и "Компания механикусов"
			case 11: case 12: popup.config(systemText.availability.company, this.canvas); break;
		}

		// Перебор слагов (когда лень искать id)
		switch(btn_slag) {
			// Кнопка "Своя битва" на экране выбора режима игры
			case "своя_битва": popup.config(systemText.availability.button, this.canvas); break;
		};
	}

}
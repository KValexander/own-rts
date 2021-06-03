// Класс графического интерфейса
class GUI {

	// Инициализация класса
	constructor(screen) {
		// canvas и ctx
		this.screen = screen;

		// Объявление общих данных
		this.initVariable();
	}

	// Раздел инициализации экранов
	// =================================

	// Объявление общих данных
	initVariable() {
		// Объект со всеми элементами интерфейса экрана
		this.elements = {
			button: [], // кнопки
			surface: [], // поверхности
			icon: [], // иконки
			texture: [], // текстуры
			bg: {}, // изображения заднего фона
		};

		// Объект popup окна
		this.popup = {
			rendering: false,
		};

		// Сетка
		this.grid = {
			rendering: false, // состояние отрисовки
			color: "#ff8080", // цвет сетки
			cellsX: 16, // количество ячеек по горизонтали
			cellsY: 16, // количество ячеек по вертикали
		};

		// Ширина ячеек по горизонтали
		this.grid.lineX = this.screen.width / this.grid.cellsX;
		// Ширина ячеек по вертикали
		this.grid.lineY = this.screen.height / this.grid.cellsY;

		// Одна ячейка в ширину = this.grid.lineX * 1, две ячейки * 2 и т.д
		// Одна ячейка в высоту = this.grid.lineY * 1, две ячейки * 2 и т.д

		// Вызов экрана меню
		this.changeInit("menu", "main");
	}

	// Выбор инициализации экрана
	changeInit(init, menu) {
		// Очистка массивов объект элементов
		this.elements.button = [];
		this.elements.surface = [];
		// Сокрытие popup окна
		this.popup.rendering = false;

		if(init == "menu") this.initMenu(menu); // Главное меню
		if(init == "load") this.initLoad(); // Экран загрузки
		if(init == "game") this.initGame(); // Экран игры
	}

	// Объявление данных для экрана меню
	initMenu(menu) {
		// Задний фон для меню
		this.elements.bg.menu = methods.loadImage("assets/bg_menu.jpg");
		
		// Главный экран меню
		if(menu == "main") {
			// Добавление поверхностей
			this.addSurface(1, "rgba(255,255,255,0.5)", this.grid.lineX * 0.5, this.grid.lineY * 1, this.grid.lineX * 4, this.grid.lineY * 7);

			// Добавление кнопок
			this.addButton(1, "Компания", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 3, this.grid.lineY);
			this.addButton(2, "Настройки", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 3, this.grid.lineY);
			this.addButton(3, "Выход", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 6, this.grid.lineX * 3, this.grid.lineY);
		}

		// Экран компании
		if(menu == "company") {
			// Добавление поверхностей
			this.addSurface(1, "rgba(255,255,255,0.5)", this.grid.lineX * 0.5, this.grid.lineY * 1, this.grid.lineX * 4, this.grid.lineY * 7);

			// Добавление кнопок
			this.addButton(4, "Одиночная компания", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 3, this.grid.lineY);
			this.addButton(5, "Своя битва", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 3, this.grid.lineY);
			this.addButton(6, "Вернуться", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 6, this.grid.lineX * 3, this.grid.lineY);
		}

		if(menu == "company_choise") {
			// Добавление поверхностей
			this.addSurface(1, "rgba(255,255,255,0.5)", this.grid.lineX * 0.5, this.grid.lineY * 1, this.grid.lineX * 15, this.grid.lineY * 7);
			this.addSurface(2, "rgba(255,255,255,0.5)", this.grid.lineX * 11.5, this.grid.lineY * 13.5, this.grid.lineX * 4, this.grid.lineY * 2);

			// Добавление кнопок
			this.addButton(10, "Компания Империи", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 14, this.grid.lineY);
			this.addButton(11, "Компания Союза Рас", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 14, this.grid.lineY, false);
			this.addButton(12, "Компания Механикусов", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 6, this.grid.lineX * 14, this.grid.lineY, false);
			this.addButton(13, "Вернуться", "#fff", "#050411", this.grid.lineX * 12, this.grid.lineY * 14, this.grid.lineX * 3, this.grid.lineY);
		
		}

		// Экран настроек
		if(menu == "option") {
			// Добавление поверхностей
			this.addSurface(1, "rgba(255,255,255,0.5)", this.grid.lineX * 0.5, this.grid.lineY * 1, this.grid.lineX * 4, this.grid.lineY * 7);

			// Добавление кнопок
			this.addButton(7, "Игра", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 3, this.grid.lineY);
			this.addButton(8, "Графика", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 3, this.grid.lineY);
			this.addButton(9, "Вернуться", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 6, this.grid.lineX * 3, this.grid.lineY);
		}

	}

	// Экран загрузки
	initLoad() {
		// Задний фон для экрана загрузки
		this.elements.bg.load = methods.loadImage("assets/bg_load.jpg");

	}

	// Объявление данных для экрана игры
	initGame() {
		// Ширина областей интерфейса
		this.width = this.screen.width;

		// Верхняя область интерфейса
		this.top = {
			x: 0, // стартовая позиция по горизонтали
			y: 0, // стартовая позиция по вертикали
			height: 50, // высота
			color: "#ff8080", // цвет интерфейса
		};

		// Нижняя область интерфейса
		this.bottom = {
			height: 200, // высота
			x: 0, // стартовая позиция по горизонтали
			color: "#ff8080", // цвет интерфейса
		};
		// Стартовая позиция по вертикали
		this.bottom.y = this.screen.height - this.bottom.height;
	}
	// =================================

	// Раздел всплывающего окна
	// =================================

	// Конфигурация popup окна
	configPopup(text, x, y) {
		this.popup.text = text;
		this.popup.x = x;
		this.popup.y = y;
	}

	// Вывод popup окна
	outPopup() {
		// Цвет заливки
		this.screen.ctx.fillStyle = "rgba(0,0,0,0.5)";
		this.screen.ctx.fillRect(this.popup.x - 10, this.popup.y - 14, 550, 40);
		// Цвет обводки
		this.screen.ctx.fillStyle = "#000";
		this.screen.ctx.strokeRect(this.popup.x - 10, this.popup.y - 14, 550, 40);

		// Горизонтальное позиционирование текста
		this.screen.ctx.textAlign = "start";
		// Вертикальное позиционирование
		this.screen.ctx.textBaseline = "top";
		// Цвет текста
		this.screen.ctx.fillStyle = "white";
		// Шрифт
		this.screen.ctx.font = "12pt Arial";
		// Отрисовка текста
		this.screen.ctx.fillText(this.popup.text, this.popup.x, this.popup.y);
	}

	// Раздел добавления и создания элементов экрана
	// =================================

	// Добавление иконок
	addIcon(id, src, x, y, width, height) {
		let icon = {};
		icon.id = id;
		icon.image = method.loadImage(src);
		icon.x = x;
		icon.y = y;
		icon.width = width;
		icon.height = height;
		this.elements.icon.push(icon);
	}

	// Добавление поверхностей
	addSurface(id, color, x, y, width, height) {
		// Объект поверхности
		let surface = {};
		surface.id = id; // id
		surface.color = color; // цвет
		surface.x = x; // начало по x
		surface.y = y; // начало по y
		surface.width = width; // ширина
		surface.height = height; // высота
		// surface.rendering = false; // состояние отрисовки
		// Добавление поверхности в массив поверхностей
		this.elements.surface.push(surface);
	}

	// Добавление кнопки
	addButton(id, text, color_text, color_rect, x, y, width, height, access) {
		// Объект кнопки
		let button = {}; // объект кнопки
		button.id = id; // id кнопки
		button.text = text; // надпись кнопки
		button.color_text = color_text; // цвет надписи
		button.color_rect = color_rect; // цвет области кнопки
		button.x = x; // стартовая позиция по горизонтали
		button.y = y; // стартовая позиция по вертикали
		button.width = width; // ширина
		button.height = height; // высота
		button.hover = false; // состояние наведения
		button.click = false; // состояние нажатия
		button.access = access ?? true; // состояние доступа
		// button.rendering = false; // состояние отрисовки
		// Добавление кнопки в массив кнопок
		this.elements.button.push(button);
	}

	// Создание поверхности
	createSurface(data) {
		let surface = new Path2D(); // создание экземпляра
		// область поверхности
		surface.rect(data.x, data.y, data.width, data.height);
		surface.id = data.id; // id поверхности
		// Цвет поверхности
		this.screen.ctx.fillStyle = data.color;
		// Отрисовка поверхности
		this.screen.ctx.fill(surface);
		// Рамка для поверхности
		this.screen.ctx.shadowBlur = 15; // тень
		this.screen.ctx.shadowColor = "#050411"; // цвет тени
		this.screen.ctx.strokeStyle = "#050411"; // цвет рамки
		this.screen.ctx.lineWidth = 3; // ширина линии
		this.screen.ctx.strokeRect(data.x, data.y, data.width, data.height); // рамка
		this.screen.ctx.shadowBlur = 0; // очистка тени
	}
	
	// Создание кнопки
	createButton(data) {
		// Цвет
		let color = "";

		// Выбор цвета области кнопки
		if(!data.access) color = "gray"; // в случае недоступности
		else if(data.hover) color = "#fff"; // в случае наведения
		else color = data.color_rect; // статическое состояние
		
		// Цвета области кнопки
		this.screen.ctx.fillStyle = color;
		let rect = new Path2D(); // добавление области кнопки
		rect.rect(data.x, data.y, data.width, data.height); // область кнопки
		rect.id = data.id; // для опознавания области
		this.screen.ctx.fill(rect); // отрисовка области

		// Выбор цвета текста
		if(!data.access) color = "#555"; // в случае недоступности
		else if(data.hover) color = "#050411"; // в случае наведения
		else color = data.color_text; // статическое состояние

		// Цвет текста
		this.screen.ctx.fillStyle = color;
		// Расположение текста горизонтально
		this.screen.ctx.textAlign = "center";
		// Расположение текста вертикально
		this.screen.ctx.textBaseline = "middle";

		// Шрифт и размер текста
		this.screen.ctx.font = "16pt Arial";
		// Отрисовка текста
		this.screen.ctx.fillText(data.text, data.x + data.width / 2, data.y + data.height / 2);
	}
	// =================================

	// Раздел обработки событий
	// =================================

	// Обработка событий
	eventHandling() {
		// Для обращения к this из обработчиков событий
		let self = this;
		// Обработка событий мыши
		this.mouseEventHandling(this.elements.button, self);
	}

	// Обработка событий мыши
	mouseEventHandling(el, self) {
		// Коордитаны мыши e.offsetX, e.offsetY

		// Движение мыши на окне
		this.screen.canvas.onmousemove = function(e) {
			// Цикл проверки наведения на кнопку
			for(let i = 0; i < el.length; i++) {
				// Проверка наведения на кнопку
				if(methods.collisionButton(el[i], e.offsetX, e.offsetY)) {
					// Если кнопка доступна
					if(el[i].access) {
						// Активация состояния наведения
						el[i].hover = true;
						// Перебор id кнопок
						switch(el[i].id) {
							// При наведение на кнопку "Компания Империи"
							case 10:
								self.configPopup(text_storage.company_menu.empire, e.offsetX, e.offsetY);
								self.popup.rendering = true;
								break;
						}
					} else {
						// Вывод сообщения о заблокированности кнопки
						switch(el[i].id) { // перебор id кнопок
							// Если недоступны кнопки "Компания Союза Рас" и "Компания Механикусов"
							case 11: case 12:
								self.configPopup(text_storage.error.availability.company, e.offsetX, e.offsetY);
								self.popup.rendering = true;
								break;
						}
					}
				} else {
					// Сокрытие popup окна
					// self.popup.rendering = false;
					// Деактивация состояния наведения
					el[i].hover = false;
				}
			}
		}

		// Нажатие мыши на окне
		this.screen.canvas.onclick = function(e) {
			// Цикл проверки нажатия на кнопку
			for(let i = 0; i < el.length; i++) {
				// Проверка нажатия на кнопку
				if(methods.collisionButton(el[i], e.offsetX, e.offsetY)) {
					// Если кнопка доступна
					if(el[i].access) {
						// Перебор id кнопок
						switch(el[i].id) {
							// Если нажата кнопка "Компания"
							case 1: self.changeInit("menu", "company"); break;
							// Если нажата кнопка "Настройки"
							case 2: self.changeInit("menu", "option"); break;
							// Если нажата кнопка "Одиночная компания"
							case 4: self.changeInit("menu", "company_choise"); break;
							// Если нажата кнопка "Вернуться" на экранах Настроек и Компании
							case 6: case 9: self.changeInit("menu", "main"); break;
							// Если нажата кнопка "Вернуться" в окне одиночных компаний
							case 13: self.changeInit("menu", "company"); break;
						}
					}
				}
			}
		}
	}
	// =================================

	// Раздел отрисовки экранов
	// =================================

	// Отрисовка данных главного меню
	rendering_menu() {
		// Задний фон
		this.screen.ctx.drawImage(this.elements.bg.menu, 0, 0, this.screen.width, this.screen.height);

		// Отрисовка сетки
		this.drawGrid();

		// Отрисовка поверхностей
		for(let i = 0; i < this.elements.surface.length; i++)
			this.createSurface(this.elements.surface[i]);

		// Отрисовка кнопок
		for(let i = 0; i < this.elements.button.length; i++)
			this.createButton(this.elements.button[i]);

		// Отрисовка popup окна
		if(this.popup.rendering)
			this.outPopup();
	}

	// Отрисовка данных экрана загрузки
	rendering_load() {

	}

	// Отрисовка данных экрана игры
	rendering_game() {

	}
	// =================================


	// Раздел дополнительных методов
	// =================================

	// Отрисовка сетки игры
	drawGrid() {
		// Для единоразовой отрисовки
		this.screen.ctx.beginPath();
		this.screen.ctx.lineWidth = 1; // ширина линий
		let buf = 0; // Начальная координата
		// Вертикальные линии
		for (let i = 0; i <= this.grid.cellsX; i++) {
			this.screen.ctx.moveTo(buf, 0); // Начальная точка
			this.screen.ctx.lineTo(buf, this.screen.height); // Конечная точка
			buf += this.grid.lineX;// Прибавка линий
		}
		buf = 0; // Начальная координата
		// Горизонтальные линии
		for (let i = 0; i <= this.grid.cellsY; i++) {
			this.screen.ctx.moveTo(0, buf); // Начальная точка
			this.screen.ctx.lineTo(this.screen.width, buf); // Конечная точка
			buf += this.grid.lineY; // Прибавка линий
		}
		// Цвет для сетки
		this.screen.ctx.strokeStyle = this.grid.color;
		 // Отрисовка линии
		this.screen.ctx.stroke();
	}
}
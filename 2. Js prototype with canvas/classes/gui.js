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
			bg: {}, // изображения заднего фона
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

		if(init == "menu") this.initMenu(menu); // Главное меню
		if(init == "load") this.initLoad(); // Экран загрузки
		if(init == "game") this.initGame(); // Экран игры
	}

	// Объявление данных для экрана меню
	initMenu(menu) {
		// Задний фон для меню
		this.elements.bg.menu = methods.loadImage("assets/bg_menu.jpg");

		// Добавление поверхностей
		this.addSurface(1, "rgba(255,255,255,0.5)", this.grid.lineX * 0.5, this.grid.lineY * 1, this.grid.lineX * 3, this.grid.lineY * 7);

		// Главный экран меню
		if(menu == "main") {
			// Добавление кнопок
			this.addButton(1, "Компания", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 2, this.grid.lineY);
			this.addButton(2, "Настройки", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 2, this.grid.lineY);
			this.addButton(3, "Выход", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 6, this.grid.lineX * 2, this.grid.lineY);
		}

		// Экран компании
		if(menu == "company") {
			// Добавление кнопок
			this.addButton(4, "Одиночная компания", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 2, this.grid.lineY);
			this.addButton(5, "Своя битва", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 2, this.grid.lineY);
			this.addButton(6, "Вернуться", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 6, this.grid.lineX * 2, this.grid.lineY);
		}

		// Экран настроек
		if(menu == "option") {
			// Добавление кнопок
			this.addButton(7, "Игра", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 2, this.grid.lineY);
			this.addButton(8, "Графика", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 2, this.grid.lineY);
			this.addButton(9, "Вернуться", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 6, this.grid.lineX * 2, this.grid.lineY);
		}

	}

	// Экран загрузки
	initLoad() {

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

	// Раздел добавления и создания элементов экрана
	// =================================

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

	// Добавление кнопки в массив элементов
	addButton(id, text, color_text, color_rect, x, y, width, height) {
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
		this.screen.ctx.lineWidth = 3; // ширини линии
		this.screen.ctx.strokeRect(data.x, data.y, data.width, data.height); // рамка
		this.screen.ctx.shadowBlur = 0; // очистка тени
	}
	
	// Создание кнопки
	createButton(data) {
		// Цвет области кнопки
		if(data.hover) this.screen.ctx.fillStyle = "#fff"; // в случае наведения
		else this.screen.ctx.fillStyle = data.color_rect; // статическое состояние
		let rect = new Path2D(); // добавление области кнопки
		rect.rect(data.x, data.y, data.width, data.height); // область кнопки
		rect.id = data.id; // для опознавания области
		this.screen.ctx.fill(rect); // отрисовка области

		// Цвет текста
		if(data.hover) this.screen.ctx.fillStyle = "#050411"; // в случае наведения
		else this.screen.ctx.fillStyle = data.color_text; // статическое состояние
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
		// Обработка событий мыши
		this.mouseEventHandling(this.elements.button);
	}

	// Обработка событий мыши
	mouseEventHandling(el, chIn) {
		// Коордитаны мыши e.offsetX, e.offsetY

		// Движение мыши на окне
		this.screen.canvas.onmousemove = function(e) {
			// Цикл проверки наведения на кнопку
			for(let i = 0; i < el.length; i++) {
				// Проверка наведения на кнопку
				if(methods.collisionButton(el[i], e.offsetX, e.offsetY)) el[i].hover = true;
				else el[i].hover = false;
			}
		}

		// Нажатие мыши на окне
		this.screen.canvas.onclick = function(e) {
			// Цикл проверки нажатия на кнопку
			for(let i = 0; i < el.length; i++) {
				// Проверка нажатия на кнопку
				if(methods.collisionButton(el[i], e.offsetX, e.offsetY)) {
					// Если нажата кнопка "Компания"
					if(el[i].id == 1) this.changeInit("menu", "company");
					// Если нажата кнопка "Настройки"
					if(el[i].id == 2) this.changeInit("menu", "option");
					// Если нажата кнопка "Вернуться"
					if(el[i].id == 6 || el[i].id == 9) this.changeInit("menu", "main");
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
// Класс графического интерфейса
class GUI {

	// Инициализация класса
	constructor(screen) {
		// canvas и ctx
		this.screen = screen;

		// Объявление общих данных
		this.initVariable();
	}

	// Объявление общих данных
	initVariable() {
		// Объект со всеми элементами интерфейса экрана
		this.elements = {
			button: [], // кнопки
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

		// Вызов метода объявления данных для экрана меню
		this.initMenu();
		// Вызов метода объявления данных для экрана игры
		this.initGame();
	}

	// Объявление данных для экрана меню
	initMenu() {

		// Добавление кнопок в объект всех элементов
		this.addButton(1, "New game", "#fff", "#000", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 2, this.grid.lineY);
		this.addButton(2, "Exit", "#fff", "#000", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 2, this.grid.lineY);

		// Задний фон для меню
		this.elements.bg.menu = new Image();
		this.elements.bg.menu.src = "assets/bg_menu.jpg";
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

	// Добавление кнопки в массив элементов
	addButton(id, text, color_text, color_rect, x, y, width, height) {
		// Создание объекта кнопки
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
		// Добавление кнопки в массив всех кнопок
		this.elements.button.push(button);
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
		if(data.hover) this.screen.ctx.fillStyle = "#000"; // в случае наведения
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

	// Обработка событий
	eventHandling() {
		// Обработка событий мыши
		this.mouseEventHandling(this.elements.button, this.hover);
	}

	// Обработка событий мыши
	mouseEventHandling(el, hover) {
		// Коордитаны мыши e.offsetX, e.offsetY

		// Движение мыши на окне
		this.screen.canvas.onmousemove = function(e) {
			// Цикл проверки наведения на кнопку
			for(let i = 0; i < el.length; i++) {
				// Проверка наведения на кнопку
				if(methods.collisionButton(el[i], e.offsetX, e.offsetY)) {
					el[i].hover = true;
				} else {
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
					el[i].click = true;
				} else {
					el[i].click = false;
				}
			}
		}
	}

	// Отрисовка данных экрана меню
	rendering_menu() {
		// Задний фон
		this.screen.ctx.drawImage(this.elements.bg.menu, 0, 0, this.screen.width, this.screen.height);

		// Отрисовка сетки
		if (this.grid.rendering == false)
			this.drawGrid();

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

	// Отрисовка сетки игры
	drawGrid() {
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
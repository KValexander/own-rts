// Класс графического интерфейса
class GUI {

	// Инициализация класса
	constructor(screen) {
		// canvas и ctx
		this.screen = screen;

		this.initVariable();
	}

	// Объявление общих данных
	initVariable() {
		// Объект со всеми элементами интерфейса экрана
		this.elements = {
			button: [], // кнопки
		};

		// Вызов метода объявления данных для экрана меню
		this.initMenu();
		// Вызов метода объявления данных для экрана игры
		this.initGame();
	}

	// Объявление данных для экрана меню
	initMenu() {
		// Сетка
		this.grid = {
			rendering: false, // состояние отрисовки
			cellsX: 16, // количество ячеек по горизонтали
			cellsY: 16, // количество ячеек по вертикали
		};

		// Ширина ячеек по горизонтали
		this.grid.lineX = this.screen.width / this.grid.cellsX;
		// Ширина ячеек по вертикали
		this.grid.lineY = this.screen.height / this.grid.cellsY;

		// Одна ячейка в ширину = this.grid.lineX * 1, две ячейки * 2 и т.д
		// Одна ячейка в высоту = this.grid.lineY * 1, две ячейки * 2 и т.д

		// Добавление кнопок в объект всех элементов
		this.addButton(1, "New game", "#fff", "#000", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 2, this.grid.lineY);
		this.addButton(2, "Exit", "#fff", "#000", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 2, this.grid.lineY);

		// Задний фон	
		this.bg_menu = new Image();
		this.bg_menu.src = "assets/bg_menu.jpg"; 
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
		let button = {};
		button.id = id;
		button.text = text;
		button.color_text = color_text;
		button.color_rect = color_rect;
		button.x = x;
		button.y = y;
		button.width = width;
		button.height = height;

		this.elements.button.push(button);
	}
	
	// Создание кнопки
	createButton(data) {
		// Цвет области кнопки
		this.screen.ctx.fillStyle = data.color_rect;
		let rect = new Path2D(); // добавление области кнопки
		rect.rect(data.x, data.y, data.width, data.height); // область кнопки
		rect.id = data.id; // для опознавания области
		this.screen.ctx.fill(rect); // отрисовка области

		// Цвет текста
		this.screen.ctx.fillStyle = data.color_text;
		// Расположение текста горизонтально
		this.screen.ctx.textAlign = "center";
		// Расположение текста вертикально
		this.screen.ctx.textBaseline = "middle";

		// Шрифт и размер текста
		this.screen.ctx.font = "16pt Arial";
		// Отрисовка текста
		this.screen.ctx.fillText(data.text, data.x + data.width / 2, data.y + data.height / 2);
	}

	// Изменение кнопки в случае наведения
	hoverButton() {

	}

	// Отрисовка данных экрана меню
	rendering_menu() {
		// Задний фон
		this.screen.ctx.drawImage(this.bg_menu, 0, 0, this.screen.width, this.screen.height);

		// Отрисовка сетки
		if (this.grid.rendering == false) {
			this.drawGrid();
		}

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
		this.screen.ctx.strokeStyle = "#ff8080";
		 // Отрисовка линии
		this.screen.ctx.stroke();
	}
}
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
			popup: { // popup окна
				info: {}, // информационное окно
				menu: {}, // окно меню
			}
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
		// Сокрытие popup окон
		this.elements.popup = { info: {}, menu: {} };

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

	// Конфигурация info popup окна
	configPopupInfo(text) {
		let info 			= this.elements.popup.info;
		info.id				= 1470; 									// уникальное id
		info.rendering 		= true; 									// продолжение отрисовки
		info.rendered 		= false; 									// отрисовка
		info.text 			= text; 									// текст
		info.textColor 		= "white"; 									// цвет текста
		info.fillColor 		= "rgba(0, 0, 0, 0.7)"; 					// цвет заливки
		info.strokeColor 	= "black"; 									// цвет рамки
		info.width 			= this.grid.lineX * 5.75; 					// ширина
		info.height 		= 10; 										// высота
		info.x				= this.grid.lineX * 10; 					// отступ по x
		info.y				= this.grid.lineY * 0.5; 					// отступ по y
		info.lineWidth 		= 3; 										// ширина рамки
		info.fontSize 		= 16; 										// ширина символа
		info.fontFamily 	= "Arial"; 									// шрифт
		info.margin_top		= 10;										// отступ сверху для текста
		info.margin_left	= 10;										// отступ слева для текста
		info.textWidth 		= info.width - info.margin_left; 			// ширина текста
		info.textX 			= info.x + info.margin_top; 				// отступ по x для текста
		info.textY 			= info.y + info.margin_left; 				// отступ по y для текста
		info.font 			= info.fontSize + "px " + info.fontFamily; 	// конкатинация
		info.lineHeight 	= 20; 										// отступ между линиями текста
		info.lineCount 		= 1; 										// количество линий текста
		info.textLines 		= this.processingText(info);				// массив с линиями текста
		// Вычисление высоты в зависимости от текста
		let coefficient = (info.lineCount == 1) ? 1.5 : 2;
		info.height = this.getTextHeight(info.text, info.textWidth, info.fontSize) + info.margin_top * coefficient;
	}

	// Конфигурация menu popup окна
	configPopupMenu() {

	}

	// Вывод info popup окна
	outPopupInfo(data) {
		// Цвет заливки
		this.screen.ctx.fillStyle = data.fillColor;
		this.screen.ctx.fillRect(data.x, data.y, data.width, data.height);
		// Цвет обводки
		this.screen.ctx.fillStyle = data.strokeColor;
		this.screen.ctx.strokeRect(data.x, data.y, data.width, data.height);

		// Горизонтальное позиционирование текста
		this.screen.ctx.textAlign = "start";
		// Вертикальное позиционирование
		this.screen.ctx.textBaseline = "top";
		// Цвет текста
		this.screen.ctx.fillStyle = "white";
		// Шрифт
		this.screen.ctx.font = data.font;
		// Отрисовка текста
		// this.wordProcessing(data.text, data.textWidth, data.textX, data.textY);
		this.outText(data.textLines, data.textX, data.textY, data.lineHeight);
	}

	// Вывод menu popup окна
	outPopupMenu() {

	}

	// Подсчёт количества линий текста
	// Рабочее, неоптимизированное
	processingText(data) {
		// Массив с линиями
		let lines = [];
		// Получение слов
		let words = data.text.split(" "); // получение слов из текста
		let count = words.length; // количество слов
		let line = ""; // одна линия вывода
		// Работа со словами
		for(let i = 0; i <= count; i++) {
			let testLine = line + words[i] + " "; // линия вывода
			let testWidth = this.screen.ctx.measureText(testLine).width; // ширина линии
			if(testWidth > data.textWidth) { // если больше максимальной ширины
				lines.push(line);
				data.lineCount += 1; // количество линий
				line = words[i] + " "; // начало следующей линии
			} else {
				line = testLine; // продолжение увеличения линии
			}
			if(i == count) {
				line = line.replace("undefined", " ");
				lines.push(line);
			}
		}
		// Возвращение массива с линиями
		return lines;
	}

	// Вывод текста
	// Рабочее
	outText(arr_lines, x, y, lineHeight) {
		// Цикл вывода линий текста
		for(let i = 0; i < arr_lines.length; i++) {
			this.screen.ctx.fillText(arr_lines[i], x, y); // вывод линии
			y += lineHeight;
		}
	}

	// Получение высоты текста
	getTextHeight(text, width, size) {
		let div = document.createElement("div");
		document.body.append(div);
		div.innerHTML = text;
		div.style = "width: "+ width +"px; font-size: "+ size +"px;";
		let height = div.offsetHeight;
		div.outerHTML = "";
		return height;
	}

	// Обработка и отрисовка текста
	// Рабочее, неиспользуемое, альтернатива processingText и outText
	wordProcessing(text, width, x, y) {
		// Получение слов
		let words = text.split(" "); // получение слов из текста
		let count = words.length; // количество слов
		let line = ""; // одна линия вывода
		this.elements.popup.info.lineCount = 0; // количество линий
		// Работа со словами
		for(let i = 0; i < count; i++) {
			let testLine = line + words[i] + " "; // линия вывода
			let testWidth = this.screen.ctx.measureText(testLine).width; // ширина линии
			if(testWidth > width) { // если больше максимальной
				this.screen.ctx.fillText(line, x, y); // вывод линии
				line = words[i] + " "; // начало следующей линии
				this.elements.popup.info.lineCount += 1; // количество линий
				y += this.elements.popup.info.lineHeight; // отступы между линиями
			} else {
				line = testLine; // продолжение увеличения линии
			}
		}
		// Если недостаточно текста для одной линии
		if(this.elements.popup.info.lineCount == 0)
			this.elements.popup.info.lineCount = 1;

		// Вывод текста
		this.screen.ctx.fillText(line, x, y);
	}
	// =================================


	// Раздел добавления и создания элементов экрана
	// =================================

	// Добавление иконок
	addIcon(id, src, x, y, width, height) {
		let icon 	= {};
		icon.id 	= id;
		icon.image 	= method.loadImage(src);
		icon.x 		= x;
		icon.y 		= y;
		icon.width 	= width;
		icon.height = height;
		this.elements.icon.push(icon);
	}

	// Добавление поверхностей
	addSurface(id, color, x, y, width, height) {
		// Объект поверхности
		let surface 	= {};
		surface.id 		= id; 		// id
		surface.color 	= color; 	// цвет
		surface.x 		= x; 		// начало по x
		surface.y 		= y; 		// начало по y
		surface.width 	= width; 	// ширина
		surface.height 	= height; 	// высота
		// surface.rendering = false; // состояние отрисовки
		// Добавление поверхности в массив поверхностей
		this.elements.surface.push(surface);
	}

	// Добавление кнопки
	addButton(id, text, color_text, color_rect, x, y, width, height, access) {
		// Объект кнопки
		let button 			= {}; 				// объект кнопки
		button.id 			= id; 				// id кнопки
		button.text 		= text; 			// надпись кнопки
		button.color_text 	= color_text; 		// цвет надписи
		button.color_rect 	= color_rect; 		// цвет области кнопки
		button.x 			= x; 				// стартовая позиция по горизонтали
		button.y 			= y; 				// стартовая позиция по вертикали
		button.width 		= width; 			// ширина
		button.height 		= height; 			// высота
		button.hover 		= false; 			// состояние наведения
		button.click 		= false; 			// состояние нажатия
		button.access 		= access ?? true; 	// состояние доступа
		// button.rendering 	= false; 			// состояние отрисовки
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
		// Обработка нажатия на кливиши
		this.keydownEventHandling(self)
	}

	// Обработка событий мыши
	mouseEventHandling(el, self) {
		// Коордитаны мыши e.offsetX, e.offsetY

		// Движение мыши на окне
		this.screen.canvas.onmousemove = function(e) {
			// Цикл проверки наведения на кнопку
			for(let i = 0; i < el.length; i++) {
				// Проверка наведени на info popup окна при его отображении
				if(methods.collision(self.elements.popup.info, e.offsetX, e.offsetY) && self.elements.popup.info.rendering) {
					el[i].hover = false;
					return; // отключение отрисовки
				}
				// Проверка наведения на кнопку
				if(methods.collision(el[i], e.offsetX, e.offsetY)) {
					// Если кнопка доступна
					if(el[i].access) {
						// Активация состояния наведения
						el[i].hover = true;
						// Перебор id кнопок
						switch(el[i].id) {
							// При наведение на кнопку "Компания Империи"
							case 10:
								self.configPopupInfo(text_storage.company_menu.empire);
								break;
						}
					} else {
						// Вывод сообщения о заблокированности кнопки
						switch(el[i].id) { // перебор id кнопок
							// Если недоступны кнопки "Компания Союза Рас" и "Компания Механикусов"
							case 11: case 12:
								self.configPopupInfo(text_storage.error.availability.company);
								break;
						}
					}
				} else {
					// Деактивация состояния наведения
					el[i].hover = false;
				}
			}
		}

		// Нажатие мыши на окне
		this.screen.canvas.onclick = function(e) {
			// Проверка нажатия на info popup окно
			if(methods.collision(self.elements.popup.info, e.offsetX, e.offsetY))
				self.elements.popup.info.rendering = false; // отключение отрисовки

			// Цикл проверки нажатия на кнопку
			for(let i = 0; i < el.length; i++) {
				// Проверка нажатия на кнопку
				if(methods.collision(el[i], e.offsetX, e.offsetY)) {
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

	// Обработка событий нажатия на клавиши
	keydownEventHandling(self) {
		document.onkeydown = function(e) {
			// Если нажата клавиша RrКк
			if(e.code == "KeyR") {
				self.popup.rendering = true;
				console.log(self.popup.rendering);
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
		if(this.elements.popup.info.rendering)
			this.outPopupInfo(this.elements.popup.info);
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
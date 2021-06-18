// Эту махину текста необходимо распределить по разным местам,
// улучшить логику и привести к понятному виду.
// На момент 04.06.2021 код подлежит улучшению.

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
		// Объект со всеми элементами интерфейса экрана
		this.elements = {
			surface: [], // поверхности
			texture: [], // текстуры
			button: [], // кнопки
			input: [], // текстовые поля
			icon: [], // иконки
			bg: {}, // изображения заднего фона
			popup: { // popup окна
				info: {}, // информационное окно
				menu: {}, // окно меню
				notice: {}, // окно уведомления
			},
		};

		// Настройка popup окон
		this.configPopup("info");
		this.configPopup("menu");
		this.configPopup("notice");

		// Задний фон для экрнов
		this.elements.bg.menu = methods.loadImage("assets/bg_menu.jpg");
		this.elements.bg.load = methods.loadImage("assets/bg_load.jpg");

		if(init == "menu") this.initMenu(menu); // Главное меню
		else if(init == "load") this.initLoad(); // Экран загрузки
		else if(init == "game") this.initGame(); // Экран игры
	}

	// Объявление данных для экрана меню
	initMenu(menu) {
		
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
			this.addButton(5, "Своя битва", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 3, this.grid.lineY, false);
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
		if(menu == "option" || menu == "option_game" || menu == "option_graphics") {
			// Добавление поверхностей
			this.addSurface(1, "rgba(255,255,255,0.5)", this.grid.lineX * 0.5, this.grid.lineY * 1, this.grid.lineX * 4, this.grid.lineY * 7);

			// Добавление кнопок
			this.addButton(7, "Игра", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 2, this.grid.lineX * 3, this.grid.lineY);
			this.addButton(8, "Графика", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 4, this.grid.lineX * 3, this.grid.lineY);
			this.addButton(9, "Вернуться", "#fff", "#050411", this.grid.lineX, this.grid.lineY * 6, this.grid.lineX * 3, this.grid.lineY);
			
			// Экран настроек игры
			if(menu == "option_game") {
				// Добавление поверхностей
				this.addSurface(2, "rgba(255, 255, 255, 0.5)", this.grid.lineX * 5, this.grid.lineY * 1, this.grid.lineX * 10.5, this.grid.lineY * 13);
			}
			// Экран настроек графики
			if(menu == "option_graphics") {
				// Добавление поверхностей
				this.addSurface(2, "rgba(255, 255, 255, 0.5)", this.grid.lineX * 5, this.grid.lineY * 1, this.grid.lineX * 10.5, this.grid.lineY * 13);
			}

		}

	}

	// Экран загрузки
	initLoad() {
		// Добавление поверхностей
		this.addSurface(3, "rgba(255,255,255,0.5)", this.grid.lineX * 6.5, this.grid.lineY * 13.5, this.grid.lineX * 3, this.grid.lineY * 2);
		// Добавление кнопок
		this.addButton(15, "Начать компанию", "#fff", "#050411", this.grid.lineX * 7, this.grid.lineY * 14, this.grid.lineX * 2, this.grid.lineY);
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

	// Общая конфигурация popup окон
	configPopup(type) {
		let popup = this.elements.popup[type];
		let width, x, y;

		switch(type) {
			case "info": width = 5.75; x = 10; 	y = 0.5; break;
			case "menu": break;
			case "notice": break;
		}

		popup.id			= 1470; 									// уникальное id
		popup.rendering 	= false; 									// продолжение отрисовки
		popup.rendered 		= false; 									// отрисовка
		popup.text 			= ""; 										// текст
		popup.textColor 	= "white"; 									// цвет текста
		popup.fillColor 	= "rgba(0, 0, 0, 0.7)"; 					// цвет заливки
		popup.strokeColor 	= "black"; 									// цвет рамки
		popup.width 		= this.grid.lineX * width; 					// ширина
		popup.height 		= 10; 										// высота
		popup.x				= this.grid.lineX * x; 						// отступ по x
		popup.y				= this.grid.lineY * y; 						// отступ по y
		popup.lineWidth 	= 3; 										// ширина рамки
		popup.fontSize 		= 16; 										// ширина символа
		popup.fontFamily 	= "Arial"; 									// шрифт
		popup.margin		= 10;										// отступ с краёв для текста
		popup.textWidth 	= popup.width - popup.margin; 				// ширина текста
		popup.textX 		= popup.x + popup.margin; 					// отступ по x для текста
		popup.textY 		= popup.y + popup.margin; 					// отступ по y для текста
		popup.font 			= popup.fontSize + "px " + popup.fontFamily;// конкатинация
		popup.lineHeight 	= 20; 										// отступ между линиями текста
		popup.lineCount 	= 1; 										// количество линий текста
		popup.textLines 	= "";										// массив с линиями текста
	}

	// Конфигурация info popup окна
	configPopupInfo(text) {
		let info 			= this.elements.popup.info;
		info.rendering 		= true; 						// продолжение отрисовки
		info.text 			= text; 						// текст
		info.textLines 		= this.processingText(info);	// массив с линиями текста
		// Вычисление высоты в зависимости от текста
		let coefficient = (info.lineCount == 1) ? 1.5 : 2;
		info.height = this.getTextHeight(info.text, info.textWidth, info.fontSize) + info.margin * coefficient;
	}

	// Конфигурация notice popup окна
	configPopupNotice() {
		// let notice = this.elements.
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
		this.outText(data.textLines, data.textX, data.textY, data.lineHeight);
	}

	// Вывод alert popup окна
	outPopupNotice() {

	}

	// Подсчёт количества линий текста
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

	// Добавление текстовых полей
	addInput() {
		let input = {};
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

	// Создание иконок
	createIcon(data) {

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
							case 5:
								self.configPopupInfo(text_storage.error.availability.button);
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
							// Если нажата кнопка "Выход"
							case 3: window.close(); break;
							// Если нажата кнопка "Одиночная компания"
							case 4: self.changeInit("menu", "company_choise"); break;
							// Если нажата кнопка "Игра" на экране "Настройки"
							case 7: self.changeInit("menu", "option_game"); break;
							// Если нажата кнопка "Графика" на экране "Настройки"
							case 8: self.changeInit("menu", "option_graphics"); break;

							// Если нажата кнопка "Компания империи"
							case 10:
								loop_screen.main_list.main_menu = false;
								loop_screen.load_list.load = true;
								self.changeInit("load");
								break; // косипоша, break забыл. *смех*

							// Если нажата кнопка "Начать компанию"
							case 15:
								loop_screen.main_list.main_menu = true;
								loop_screen.load_list.load = false;
								self.changeInit("menu", "main");
								self.configPopupInfo("Что-то пошло не так");
								break;

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
				self.elements.popup.info.rendering = false;
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

		// Отрисовка info popup окна
		if(this.elements.popup.info.rendering)
			this.outPopupInfo(this.elements.popup.info);
	}

	// Отрисовка данных экрана загрузки
	rendering_load() {
		// Задний фон
		this.screen.ctx.drawImage(this.elements.bg.load, 0, 0, this.screen.width, this.screen.height);

		// Отрисовка сетки
		this.drawGrid();

		// Отрисовка поверхностей
		for(let i = 0; i < this.elements.surface.length; i++)
			this.createSurface(this.elements.surface[i]);
		// Отрисовка кнопок
		for(let i = 0; i < this.elements.button.length; i++)
			this.createButton(this.elements.button[i]);


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
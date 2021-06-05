// Объект с текущими элементами отрисовки на экране
let rendering = {
	bg: "", 		// задний фон
	icon: [], 		// иконки
	button: [], 	// кнопки
	surface: [], 	// поверхности
	texture: [], 	// текстуры

	// Очистка списка рендеринга
	clear: function() {
		this.bg = "";		// задний фон
		this.icon = [];		// иконки
		this.button = [];	// кнопки
		this.surface = [];	// поверхности
		this.texture = [];	// текстуры
	},

	// Добавление заднего фона
	addBackground: function(src) {
		let image = new Image(); 	// создание изображения
		image.src = src; 			// добавление ссылки
		this.bg = image; 			// запись в свойство
	},

	// Добавление кнопки
	addButton: function(id, text, color_text, color_rect, x, y, width, height, access) {
		// Объект кнопки
		let button 			= {}; 				// объект кнопки
		button.id 			= id; 				// id кнопки
		button.screen		= "";				// принадлежность экрану
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
		this.button.push(button);
	},

	// Добавление поверхности
	addSurface: function(id, color, x, y, width, height) {
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
		this.surface.push(surface);
	},

	// Создание кнопки
	createButton: function(data, canvas) {
		let color = "";

		// Выбор цвета области кнопки
		if(!data.access) color = "gray"; // в случае недоступности
		else if(data.hover) color = "#fff"; // в случае наведения
		else color = data.color_rect; // статическое состояние

		// Цвета области кнопки
		canvas.ctx.fillStyle = color;
		let rect = new Path2D(); // добавление области кнопки
		rect.rect(data.x, data.y, data.width, data.height); // область кнопки
		rect.id = data.id; // для опознавания области
		canvas.ctx.fill(rect); // отрисовка области

		// Выбор цвета текста
		if(!data.access) color = "#555"; // в случае недоступности
		else if(data.hover) color = "#050411"; // в случае наведения
		else color = data.color_text; // статическое состояние

		// Цвет текста
		canvas.ctx.fillStyle = color;
		// Расположение текста горизонтально
		canvas.ctx.textAlign = "center";
		// Расположение текста вертикально
		canvas.ctx.textBaseline = "middle";

		// Шрифт и размер текста
		canvas.ctx.font = "16pt Arial";
		// Отрисовка текста
		canvas.ctx.fillText(data.text, data.x + data.width / 2, data.y + data.height / 2);
	},

	// Создание поверхности
	createSurface: function(data, canvas) {
		let surface = new Path2D(); // создание экземпляра
		// Область поверхности
		surface.rect(data.x, data.y, data.width, data.height);
		surface.id = data.id; // id поверхности
		canvas.ctx.fillStyle = data.color; // цвет поверхности
		canvas.ctx.fill(surface); // отрисовка поверхности
		// Рамка для поверхности
		canvas.ctx.shadowBlur = 15; // тень
		canvas.ctx.shadowColor = "#050411"; // цвет тени
		canvas.ctx.strokeStyle = "#050411"; // цвет рамки
		canvas.ctx.lineWidth = 3; // ширина линии
		canvas.ctx.strokeRect(data.x, data.y, data.width, data.height); // рамка
		canvas.ctx.shadowBlur = 0; // очистка тени
	},
};

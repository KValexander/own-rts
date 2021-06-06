// Объект с текущими элементами отрисовки на экране
let rendering = {
	bg: 		"", 	// задний фон
	icon: 		[], 	// иконки
	button: 	[], 	// кнопки
	surface: 	[], 	// поверхности
	texture: 	[], 	// текстуры
	directory: 	[], 	// справочники

	// Очистка списка рендеринга
	clear: function() {
		this.bg 		= "";	// задний фон
		this.icon 		= [];	// иконки
		this.button 	= [];	// кнопки
		this.surface 	= [];	// поверхности
		this.texture 	= [];	// текстуры
		this.directory 	= [];	// справочники
	},

	// Преобразование текста в slug
	slug: function(text) {
		let slug = text.replace(' ', '_'); 	// замена пробелов
		slug = slug.toLowerCase(); 			// переброс в нижний регистр
		return slug;
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
		button.slug 		= this.slug(text);	// slug кнопки
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

	// Добавление справочника
	addDirectory: function(id, text, list, x, y, width, height, access) {
		// Объект справочника
		let directory = {};
		directory.id = id; // id справочника
		directory.list = list; // список значений в виде объекта
		directory.text = text; // название справочника
		directory.x = x; // начало по x
		directory.y = y; // начало по y
		directory.width = width; // ширина
		directory.height = height; // высота
		directory.hover = false; // состояние наведения
		directory.click = false; // состояние нажатия
		directory.access = access ?? true; // состояние доступа
		// Добавление справочника в массив справочников
		this.directory.push(directory);
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

	// Создание справочника (это будет очень интересно)
	createDirectory: function(data, canvas) {
		// Заливка справочника
		let directory = new Path2D();
		// При нажатом справочнике
		if(data.click) directory.rect(data.x, data.y, data.width, data.height + grid.lineY * 5);
		// В иных случаях
		else directory.rect(data.x, data.y, data.width, data.height);
		directory.id = data.id; // id
		canvas.ctx.fillStyle = "rgba(0,0,0,0.7)"; // цвет
		canvas.ctx.fill(directory); // отрисовка

		// Цвет текста
		canvas.ctx.fillStyle = "white";
		// Расположение текста горизонтально
		canvas.ctx.textAlign = "center";
		// Расположение текста вертикально
		canvas.ctx.textBaseline = "middle";
		// Шрифт и размер текста
		canvas.ctx.font = "16pt Arial";
		// Отрисовка текста
		canvas.ctx.fillText(data.text, data.x + data.width / 2 - grid.lineX, data.y + data.height / 2);

		// При нажатом справочнике
		if(data.click) {
			let y = grid.lineY;
			for(let key in data.list) {
				canvas.ctx.fillText(key, data.x + data.width / 2 - grid.lineX, data.y + data.height / 2 + y);
				y += grid.lineY;
			}
		}

		// Избражение стрелки
		let image = new Image();
		image.src = "data/assets/arrow.png";
		canvas.ctx.drawImage(image, data.x + (data.x - grid.lineX * 2.5), data.y, grid.lineX * 0.5, data.height);

		// Рамка для поверхности
		canvas.ctx.strokeStyle = "#050411"; // цвет рамки
		canvas.ctx.lineWidth = 3; // ширина линии
		canvas.ctx.strokeRect(data.x, data.y, data.width, data.height); // рамка
	},
};

// Объект для работы с popup окном, возможно переделать в класс
let popup = {};

popup.id 			= 1470; 									// уникальное id
popup.rendering 	= false; 									// продолжение отрисовки
popup.rendered 		= false; 									// отрисовка
popup.text 			= "Текст"; 									// текст
popup.textColor 	= "white"; 									// цвет текста
popup.fillColor 	= "rgba(0,0,0,0.7)"; 						// цвет заливки
popup.strokeColor 	= "black"; 									// цвет рамки
popup.width 		= grid.lineX * 5.75;	 					// ширина
popup.height 		= 10; 										// высота
popup.x 			= grid.lineX * 10; 							// отступ по x
popup.y 			= grid.lineY * 0.5; 						// отступ по y
popup.lineWidth 	= 3; 										// ширина рамки
popup.fontSize 		= 16; 										// ширина символа
popup.fontFamily 	= "Arial"; 									// шрифт
popup.margin 		= 10; 										// отступ с краёв для текста
popup.textWidth 	= popup.width - popup.margin; 				// ширина текста
popup.textX 		= popup.x + popup.margin; 					// отступ по x для текста
popup.textY 		= popup.y + popup.margin; 					// отступ по y для текста
popup.font 			= popup.fontSize + "px " + popup.fontFamily;// конкатинация
popup.lineHeight 	= 20; 										// отступ между линиями текста
popup.lineCount 	= 1; 										// количество линий текста
popup.textLines 	= []; 										// массив с линиями текста

// Настройка popup окна
popup.config = function(text, canvas) {
	popup.width 	= grid.lineX * 5.75;	 		// ширина
	popup.x 		= grid.lineX * 10; 				// отступ по x
	popup.y 		= grid.lineY * 0.5; 			// отступ по y
	popup.textWidth = popup.width - popup.margin; 	// ширина текста
	popup.textX 	= popup.x + popup.margin; 		// отступ по x для текста
	popup.textY 	= popup.y + popup.margin; 		// отступ по y для текста
	popup.rendering = true; 						// продолжение отрисовки
	popup.text 		= text; 						// текст
	popup.textLines = popup.processingText(canvas);	// массив с линиями текста
	// Вычисление высоты в зависимости от текста
	let cf = (popup.textLines.length > 1) ? 10 : 0;
	popup.height = popup.getTextHeight() + popup.margin * 1.5 + cf;
};

// Вывод popup окна
popup.create = function(canvas) {
	// Цвет заливки
	canvas.ctx.fillStyle = this.fillColor;
	canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
	// Цвет обводки
	canvas.ctx.fillStyle = this.strokeColor;
	canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);

	// Горизонтальное позиционирование текста
	canvas.ctx.textAlign = "start";
	// Вертикальное позиционирование
	canvas.ctx.textBaseline = "top";
	// Цвет текста
	canvas.ctx.fillStyle = "white";
	// Шрифт
	canvas.ctx.font = this.font;
	// Отрисовка текста
	this.outText(canvas, this.textY);
};

// Подсчёт количества линий текста
popup.processingText = function(canvas) {
	// Массив с линиями
	let lines = [];
	// Получение слов
	let words = this.text.split(" "); // получение слов из текста
	let count = words.length; // количество слов
	let line = ""; // одна линия вывода
	// Работа со словами
	for(let i = 0; i <= count; i++) {
		let testLine = line + words[i] + " "; // линия вывода
		let testWidth = canvas.ctx.measureText(testLine).width; // ширина линии
		if(testWidth > this.textWidth) { // если больше максимальной ширины
			lines.push(line);
			this.lineCount += 1; // количество линий
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
};

// Вывод текста
popup.outText = function(canvas, y) {
	// Цикл вывода линий текста
	for(let i = 0; i < this.textLines.length; i++) {
		canvas.ctx.fillText(this.textLines[i], this.textX, y); // вывод линии
		y += this.lineHeight;
	}
};

// Получение высоты текста
popup.getTextHeight = function() {
	let div = document.createElement("div");
	document.body.append(div);
	div.innerHTML = this.text;
	div.style = "width: "+ this.width +"px; font-size: "+ this.fontSize +"px;";
	let height = div.offsetHeight;
	div.outerHTML = "";
	return height;
};

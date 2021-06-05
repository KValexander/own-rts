// Объект сетки экрана
let grid = {
	color: "#ff8080", // цвет сетки
	cellsX: 16, // количество ячеек по горизонтали
	cellsY: 16, // количество ячеек по вертикали
	lineX: options.sizeWidth / this.cellsX, // ширина ячеек
	lineY: options.sizeHeight / this.cellsY, // высота ячеек
	// Конфигурация сетки
	config: function(cX, cY, color) {
		this.cellsX = cX;
		this.cellsY = cY;
		this.color = color;
		this.lineX = options.sizeWidth / this.cellsX;
		this.lineY = options.sizeHeight / this.cellsY;
	},
	// Метод отрисовки сетки
	draw: function(canvas) {
		// Для единоразовой отрисовки
		canvas.ctx.beginPath();
		canvas.ctx.lineWidth = 1; // ширина линий
		let buf = 0; // Начальная координата
		// Вертикальные линии
		for (let i = 0; i <= this.cellsX; i++) {
			canvas.ctx.moveTo(buf, 0); // Начальная точка
			canvas.ctx.lineTo(buf, options.sizeHeight); // Конечная точка
			buf += this.lineX;// Прибавка линий
		}
		buf = 0; // Начальная координата
		// Горизонтальные линии
		for (let i = 0; i <= this.cellsY; i++) {
			canvas.ctx.moveTo(0, buf); // Начальная точка
			canvas.ctx.lineTo(options.sizeWidth, buf); // Конечная точка
			buf += this.lineY; // Прибавка линий
		}
		// Цвет для сетки
		canvas.ctx.strokeStyle = this.color;
		// Отрисовка линии
		canvas.ctx.stroke();
	}
};

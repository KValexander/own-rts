// Объект с настройками игры
let options = {
	sizeWidth: 1920, // ширина окна
	sizeHeight: 1080, // высота окна
	// Конфигурация настроек
	config: function(width, height) {
		this.sizeWidth = width;
		this.sizeHeight = height;
	},
	// Проверка размеров окна
	sizeCheck: function() {
		// Проверки ширины
		if(this.sizeWidth > window.innerWidth)
			this.sizeWidth = window.innerWidth;
		// Проверка высоты
		if(this.sizeHeight > window.innerHeight)
			this.sizeHeight = window.innerHeight;
	},
	// Изменение разрешения экрана
	changeResolution: function(canvas, resolution) {
		this.sizeWidth = resolution[0];
		this.sizeHeight = resolution[1];
		
		this.sizeCheck();

		canvas.width = this.sizeWidth;
		canvas.height = this.sizeHeight;

		grid.config(16, 16, "#ff8080");
	},
};
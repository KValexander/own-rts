// Объект с настройками игры
let options = {
	sizeWidth: 1280, // ширина окна
	sizeHeight: 720, // высота окна
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
};
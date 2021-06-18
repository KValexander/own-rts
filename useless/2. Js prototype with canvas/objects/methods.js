// Объект с дополнительными методами
let methods = {
	// Проверка столкновения с кнопкой
	collision: function(btn, mouse_x, mouse_y) {
		if( mouse_x > btn.x &&
			mouse_x < btn.x + btn.width &&
			mouse_y > btn.y &&
			mouse_y < btn.y + btn.height)
			return true;
		else return false;
	},
	// Функция загрузки изображения
	loadImage: function(src) {
		let image = new Image();
		image.src = src;
		return image;
	},
	// Получение рандомного числа
	randomInteger: function(min, max) {
		
	}
};
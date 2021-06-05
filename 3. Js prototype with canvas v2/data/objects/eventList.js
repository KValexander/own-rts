// Объект со списком действий к тем или иным событиям
// с теми или иными элементами, упрощение логики работы
// с событиями. Методы обратного вызова.
let eventList = {
	// Сокрытие popup окна нажатием на него
	hidePopup: function(posX, posY) {
		if(collision.collision(popup, posX, posY)) {
			popup.rendering = false;
		};
	},

	// Нажатие на кнопку
	clickButton: function(callback, posX, posY) {
		// Перебор отрисованных кнопок
		for(let i = 0; i < rendering.button.length; i++) {
			// Если мышь наведена на кнопку
			if(collision.collision(rendering.button[i], posX, posY)) {
				// Если кнопка доступна
				if(rendering.button[i].access) {
					// Возвращение нажатой кнопки
					callback(rendering.button[i]);
				}
			}
		}
	},

	// Проверка общего наведения на кнопку
	aimButton: function(callback, posX, posY) {
		// Перебор отрисованных кнопок
		for(let i = 0; i < rendering.button.length; i++) {
			// Если мышь наведена на кнопку
			if(collision.collision(rendering.button[i], posX, posY)) {
				// Если кнопка доступна
				if(rendering.button[i].access) {
					// Трушное наведение
					rendering.button[i].hover = true;
					// Возвращение наведённой кнопки
				}
					callback(rendering.button[i]);
			} else {
				rendering.button[i].hover = false;
			}
		}
	},
};
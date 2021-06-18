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
					// Возвращение данных нажатой кнопки
					callback(rendering.button[i]);
				}
			}
		}
	},

	// Нажатие на справочник
	clickDirectory: function(callback, posX, posY) {
		// Перебор справочников
		for(let i = 0; i < rendering.directory.length; i++) {
			// Проверка столкновения
			if(collision.collision(rendering.directory[i], posX, posY)) {
				// Если справочник доступен
				if(rendering.directory[i].access) {
					// Трушный клик
					rendering.directory[i].click = true;
					// Возвращение данных нажатой директории
					callback(rendering.directory[i]);
				}
			} else {
				// Нетрушный клик
				rendering.directory[i].click = false;
			}
		}
	},

	// Наведение на кнопку
	aimButton: function(callback, posX, posY) {
		// Перебор отрисованных кнопок
		for(let i = 0; i < rendering.button.length; i++) {
			// Если мышь наведена на кнопку
			if(collision.collision(rendering.button[i], posX, posY)) {
				// Если кнопка доступна
				if(rendering.button[i].access) {
					// Трушное наведение
					rendering.button[i].hover = true;
				}
				// Возвращение наведённой кнопки
				callback(rendering.button[i]);
			} else {
				// Нетрушное наведение
				rendering.button[i].hover = false;
			}
		}
	},

	// Наведение на справочник
	aimDirectory: function(callback, posX, posY) {
		// Перебор справочников
		for(let i = 0; i < rendering.directory.length; i++) {
			// Проверка столкновения
			if(collision.collision(rendering.directory[i], posX, posY)) {
				// Если справочник доступен
				if(rendering.directory[i].access) {
					// Трушное наведение
					rendering.directory[i].hover = true;
					// Возвращение данных найденного справочника
					callback(rendering.directory[i]);
				}
			} else {
				// Нетрушное наведение
				rendering.directory[i].hover = false;
			}
		}
	},
};
// Объект проверки столкновений элементов
let collision = {
	// Проверка столкновения объекта и мыши
	collision: function(obj, posX, posY) {
		if( posX > obj.x && posX < obj.x + obj.width &&
			posY > obj.y && posY < obj.y + obj.height)
			return true;
		else return false;
	}
};
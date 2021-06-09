// Когда загрузиться страница
window.onload = function() {

	// Отключение контекстного меню
	document.querySelector("canvas").oncontextmenu = function () { return false };

	// Создание экземпляра класса игры
	let game = new Game;

	// Вызов игрового цикла || 60 fps
	window.requestAnimationFrame(gameLoop);

	// Функция игрового цикла
	function gameLoop() {
		// Запись координат мыши в объект
		extra.recordMouseCoord();
		
		// Вызов метода обновления данных игры
		game.update();

		// Вызов метода отрисовки данных игры
		game.rendering();

		// Вызов игрового цикла
		window.requestAnimationFrame(gameLoop);
	}

}
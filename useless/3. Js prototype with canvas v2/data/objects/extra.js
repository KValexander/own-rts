// Объект с дополнительными методами
let extra = {
	posX: 0, // координата мыши x
	posY: 0, // координата мыши y
	// Запись координат мыши
	recordMouseCoord: function() {
		let selfEx = this;
		document.querySelector("canvas").onmousemove = function(e) {
			selfEx.posX = e.offsetX;
			selfEx.posY = e.offsetY;
		}
	},
	// Получение координат мыши
	getMouseCoord: function() {
		return {x: this.posX, y: this.posY};
	},
};
// Canvas и Context
let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
// Конфигурация
let option = {
	width: 1024,
	height: 768
};
// Размеры
canvas.width = option.width;
canvas.height = option.height;
// document.querySelector("canvas").style.margin

// Сетка
let grid = {
	state: false,
	color: "#fff",
	collsX: 32,
	collsY: 32,
	lineX: 32,
	lineY: 32,
};

// Отрисовка сетки
let drawGrid = function() {
	context.beginPath();
	for(let i = 0; i < grid.collsX * grid.lineX; i += grid.lineX) {
		context.moveTo(i, 0);
		context.lineTo(i, option.height);
	}
	for(let i = 0; i < grid.collsY * grid.lineY; i += grid.lineY) {
		context.moveTo(0, i);
		context.lineTo(option.width, i);
	}
	context.strokeStyle = grid.color;
	context.stroke();
};

// Интерфейс
let interface = {
	topHeight: grid.lineY,
	bottomHeight: grid.lineY * 3,
};

// Игровая область
option.gameX = 0;
option.gameY = interface.topHeight;
option.gameWidth = option.width;
option.gameHeight = option.height - (interface.topHeight + interface.bottomHeight);

// Отрисовка интерфейса
let drawInterface = function() {
	context.fillStyle = "rgba(0,0,0,0.7)";
	context.fillRect(0, 0, option.width, interface.topHeight);
	context.fillRect(0, option.height - interface.bottomHeight, option.width, interface.bottomHeight);
};

// Столкновение мыши
let mouseCollision = function (el, x, y) {
	if(	el.x < x && (el.x + 32) > x
		&& el.y < y && (el.y + 32) > y )
		return true;
	else return false;
};

// Столкновение с краями карты
let edgesCollision = function(el) {
	if(el.y > 0) el.y -= 1;
	if(el.y + 32 < option.height) el.y += 1;
	if(el.x > 0) el.x -= 1;
	if(el.x + 32 < option.width) el.x += 1;
}

// Сторона столкновения
let sideCollision = function(el1, el2) {
	let center1 = { x: el1.x + 16, y: el1.y + 16 };
	let center2 = { x: el2.x + 16, y: el2.y + 16 };
	let d = { x: center1.x - center2.x, y: center1.y - center2.y };
	if(d.x > 0 && d.y < 25 && d.y > -25) el1.x += 1;
	else if(d.x < 0 && d.y < 25 && d.y > -25) el1.x -= 1;
	else if(d.y < 0) el1.y -= 1;
	else if(d.y > 0) el1.y += 1;
};

// Столкновение пешек
let pawnCollision = function(el1, el2) {
	if(
		el1.x <= (el2.x + 32)
		&& el2.x <= (el1.x + 32)
		&& el1.y <= (el2.y + 32)
		&& el2.y <= (el1.y + 32)
	) {
		return true;
	} else {
		return false;
	}
};

// Массив юнитов и монстров
let units = [];
let monsters = [];

// Избранный юнит
let elect = {};

// Изображение заднего фона
let bgState = false;
let bgImage = new Image();
bgImage.src = "images/map.jpg";
bgImage.onload = () => bgState = true;

// Управление клавиатурой
let keysDown = {};
addEventListener("keydown", (e) => keysDown[e.keyCode] = true, false);
addEventListener("keyup", (e) => delete keysDown[e.keyCode], false);

// Управление мышью
let mouseClick = {};
addEventListener("mousedown", (e) => mouseClick = e, false);
addEventListener("mouseup", (e) => mouseClick = {}, false);

// Загрузка изображения
let loadImage = (src) => {
	let image = new Image();
	image.src = src;
	return image;
};

// Рандомное число
let random = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; };

// Создание юнита
let createUnit = function(id, src) {
	let unit = {
		id: id,
		speed: 5,
		x: random(interface.topHeight, option.width - 32),
		y: random(interface.topHeight, option.height - interface.bottomHeight - 32),
		select: false,
		isMove: true,
		texture: loadImage(src),
	};
	units.push(unit);
	return unit;
};

// Создание монстра
let createMonster = function(id, src) {
	let monster = {
		id: id,
		speed: 5,
		x: random(interface.topHeight, option.width - 32),
		y: random(interface.topHeight, option.height - interface.bottomHeight - 32),
		texture: loadImage(src),
	};
	monsters.push(monster);
	return monster;
};

// Начало
let start = function() {
	// Создание пешек
	for(let i = 2; i < 10; i++)
		createUnit(i, "images/unit.png");
	for(let i = 2; i < 10; i++)
		createMonster(10, "images/monster.png");
	elect = createUnit(1, "images/unit.png");
};
	
// Портрет избраного
let portrait = {
	width: 300,
	height: 300,
	state: false,
	image: loadImage("portrait.png"),
};

// Выбор избранного
let selectElect = function() {
	if(mouseClick.which == 1) {
		for (let i = 0; i < units.length; i++) {
			if(mouseCollision(units[i], mouseClick.offsetX, mouseClick.offsetY)) {
				elect = units[i];
				portrait.state = true;
			}
		}
	}
};
	
// Выбор группы
let select = function() {
	if(mouseClick.which == 1) {
		for(let i = 0; i < units.length; i++) {
			if(mouseCollision(units[i], mouseClick.offsetX, mouseClick.offsetY)) {
				units[i].select = true;
			} else {
				units[i].select = false;
			}
		}
	}
};

// Начать заного
let reset = function() {
	for(let i = 0; i < units.length; i++) {
		units[i].x = random(interface.topHeight, option.width - 32);
		units[i].y = random(interface.topHeight, option.height - interface.bottomHeight - 32);
	}
	for(let i = 0; i < monsters.length; i++) {
		monsters[i].x = random(interface.topHeight, option.width - 32);
		monsters[i].y = random(interface.topHeight, option.height - interface.bottomHeight - 32);
	}
};

// Обновление игровых объектов
let update = function() {
	// Передвижение избранного юнита
	if(elect.isMove) {
		if(38 in keysDown && elect.y > interface.topHeight) elect.y -= elect.speed;
		if(40 in keysDown && elect.y + 32 < option.height - interface.bottomHeight) elect.y += elect.speed;
		if(37 in keysDown && elect.x > 0) elect.x -= elect.speed;
		if(39 in keysDown && elect.x + 32 < option.width) elect.x += elect.speed;
	}
	
	// Выбор избранного
	selectElect();
	// Выбор любого
	select();

	// Столкновение для юнитов
	for(let i = 0; i < units.length; i++) {
		// С краями карты
		edgesCollision(units[i]);
		// С монстром
		for(let j = 0; j < monsters.length; j++) {
			if(pawnCollision(units[i], monsters[j])) {
				units[i].isMove = false;
				sideCollision(units[i], monsters[j]);
			} else {
				units[i].isMove = true;
			}
		}
	}
};

// Отрисовка
let render = function() {
	// Задний фон
	if(bgState) context.drawImage(bgImage, 0, 0, option.width, option.height);

	// Интерфейс
	drawInterface();

	// Сетка
	// drawGrid();

	// Юниты
	for(let i = 0; i < units.length; i++)
		context.drawImage(units[i].texture, units[i].x, units[i].y);

	// Монстры
	for(let i = 0; i < monsters.length; i++)
		context.drawImage(monsters[i].texture, monsters[i].x, monsters[i].y);

	// Выделение избранного
	context.strokeStyle = "black";
	context.strokeRect(elect.x, elect.y, 32, 32);
};

// Игровой цикл
let loop = function() {

	update();
	render();

	window.requestAnimationFrame(loop);
};

start();
reset();
loop();
// Код является всего лишь прототипом и оригинальная задумка
// будет выполняться на С++(SFML/OpenGL) или pyhton(Pygame/PyOpenGL).
// Прототип создаётся без использования canvas, т.к. автор в него не шарит

// Объект игры
let game = {
	// Карта
	map: [],
	// Массив фракций
	factions: [],
	// Объект взаимоотношений фракций
	relations_faction: {},
	// Фракция игрока
	player_faction: "",

	// Стартовые настройки игры
	startup_settings: function(){
		// Позиция экрана вывода элементов игры
		this.pos = this.position("center");

		// Генерация карты
		this.generate_map(99, 99);

		// Создание фракции Империя
		this.create_faction("Империя");
		// Создание юнитов для фракции
		this.create_unit("Империя", "soldier", 3);
		// Создание здания для фракции
		this.create_building("Империя", "main");

		// Создание фракции Коалиция
		this.create_faction("Коалиция");
		// Создание юнитов для фракции
		this.create_unit("Коалиция", "soldier", 3);
		// Создание здания для фракции
		this.create_building("Коалиция", "main");

		// Выбор фракции игрока
		this.player_faction = "Империя";

		// Вывод данных игры
		this.rendering();
		// Обработка событий игры
		this.event_handling();
	},
	// Вывод данных игры
	rendering: function() {
		// Вывод карты
		this.render_map();
		// Вывод построек
		this.render_buildings();
		// Вывод юнитов
		this.render_units();
	},

	// Открытие глобальной карты
	global_map_show: function() {

	},
	// Скрытие глобальной карты
	global_map_hide: function() {

	},
	// Регулирование отношений фракций
	regulation_relations: function(state) {

	},
	// Генерация локальной карты
	generate_map: function(x, y) {
		// По высоте
		for(let i = 0; i < x; i++) {
			this.map.push([]);
			// По ширине
			for (let j = 0; j < y; j++) {
				this.map[i].push(0);
			}
		}
	},
	// Рендеринг карты
	render_map: function() {

	},

	// Создание фракции
	create_faction: function(title) {
		// Создание id для фракции
		let id = this.factions.length + 1;
		// Объект фракции
		let faction = {
			faction_id: id, // id фракции
			title: title, // название фракции
			units: [], // массив юнитов фракции
			buildings: [], // массив построек фракции
			color: this.random_color(), // цвет фракции
			golds: 0, // количество золота фракции
		};
		// Добавление объекта фракций в массив фракций
		this.factions.push(faction);
	},
	// Создание постройки
	create_building: function(faction_name, type) {
		// Получение нужной фракции
		let faction = this.factions.find(faction => faction.title == faction_name);
		// Создание id для постройки фракции
		let id = faction.buildings.length + 1;
		// Объект постройки
		let building = {
			building_id: id, // id здания
			affiliation: faction_name, // принадлежность
			type: type, // тип здания
			color: faction.color,// цвет здания
			width: 100, // ширина здания
			height: 100, // высота здания
		};
		// Добавление постройки в массив построек фракции
		this.factions.find(faction => faction.title == faction_name).buildings.push(building);
	},
	// Создание юнита
	create_unit: function(faction_name, type, count) {
		// Получение нужной фракции
		let faction = this.factions.find(faction => faction.title == faction_name);
		// Создание id для юнита фракции
		// let id = faction.units.length + 1;

		// Создание нескольких юнитов
		for(let i = 0; i < count; i++) {
			// Создание id для юнита фракции
			let id = faction.units.length + 1;
			// Объект юнита
			let unit = {
				unit_id: id, // id юнита
				affiliation: faction_name, // принадлежность
				type: type, // тип юнита
				color: faction.color,// цвет юнита
				width: 50, // ширина юнита
				height: 50, // высота юнита
			};
			// Добавление юнита в массив юнитов фракции
			this.factions.find(faction => faction.title == faction_name).units.push(unit);
		}

		// // Объект юнита
		// let unit = {
		// 	unit_id: id, // id юнита
		// 	affiliation: faction_name, // принадлежность
		// 	type: type, // тип юнита
		// 	color: faction.color,// цвет юнита
		// 	width: 50, // ширина юнита
		// 	height: 50, // высота юнита
		// };
		// // Добавление юнита в массив юнитов фракции
		// this.factions.find(faction => faction.title == faction_name).units.push(unit);
	},

	// Вывод построек
	render_buildings: function() {
		// Вывод построек
		for(let i = 0; i < this.factions.length; i++) {
			// Вывод построек определённой фракции
			for(let j = 0; j < this.factions[i].buildings.length; j++) {
				let y = this.random_integer(this.pos.top, this.pos.bottom); // Отступ сверху
				let x = this.random_integer(this.pos.left, this.pos.right); // Отступ справа
				let out = `
					<div 	class="building ${ this.factions[i].buildings[j].type }"
							id="${ this.factions[i].buildings[j].building_id }"
							name="${ this.factions[i].buildings[j].affiliation }"
							style="	width: ${ this.factions[i].buildings[j].width }px;
									height: ${ this.factions[i].buildings[j].height }px;
									background-color: ${ this.factions[i].buildings[j].color };
									top: ${ y - this.factions[i].buildings[j].height }px;
									left: ${ x - this.factions[i].buildings[j].width }px;" >
					</div>
				`;
				// Вывод постройки
				$("#center").append(out);
			}
		}
	},
	// Вывод юнитов
	render_units: function() {
		// Вывод юнитов
		for(let i = 0; i < this.factions.length; i++) {
			// Вывод юнитов определённой фракции
			for(let j = 0; j < this.factions[i].units.length; j++) {
				let y = this.random_integer(this.pos.top, this.pos.bottom); // Отступ сверху
				let x = this.random_integer(this.pos.left, this.pos.right); // Отступ справа
				let out =`
					<div 	class="unit ${ this.factions[i].units[j].type }"
							id="${ this.factions[i].units[j].unit_id }"
							name="${ this.factions[i].units[j].affiliation }"
						 	style="	width: ${ this.factions[i].units[j].width }px;
									height: ${ this.factions[i].units[j].height }px;
									background-color: ${ this.factions[i].units[j].color };
									top: ${ y - this.factions[i].units[j].height }px;
									left: ${ x - this.factions[i].units[j].width }px;">
					</div>
				`;
				// Вывод юнита
				$("#center").append(out);
			}
		}
	},

	// Получение здания по id и имени фракции
	get_build: function(id, faction_name) {

	},
	// Получение юнита по id и имени фракции
	get_unit: function(id, faction_name) {
		// Получение нужной фракции
		let faction = this.factions.find(faction => faction.title == faction_name);
		// Получение нужного юнита
		let unit = faction.units.find(unit => unit.unit_id == id);
		// Возвращение нужного юнита
		return unit;
	},

	// Обработка событий игры
	event_handling: function() {
		// Отключение контекстного меню
		$(".game").on("contextmenu", false);

		// Для передвижения объектами
		$(".game").mousedown(function(e) {
			// Если нажата правая кнопка мыши
			if(e.button == 2) {
				// Проверка на фракцию игрока
				if($(".selected").attr("name") == game.player_faction) {
					// Передвижение выбранного элемента
					$(".selected").animate({
						top: game.posY - 50 + "px",
						left: game.posX - 25 + "px"
					}, 300);
				} else {
					console.log("Вы не можете управлять юнитом чужой фракции");
				}
			}
		});

		// Наведение и отведение мыши на юнита
		$(".unit").hover(function() {
			// Подсветка выбранного юнита
			$(this).css("box-shadow", "0 0 5px rgba(0,0,0,0.5)");
		}, function() {
			// Удаление подсветки
			$(this).css("box-shadow", "0 0 0 0");
		});

		// Нажатие на юнита
		$(".unit").mousedown(function(e) {
			// Не помню зачем, но вещь полезня
			e.preventDefault();
			// Если нажата левая кнопка мыши
			if(e.button == 0) {
				// Убрать выделение у остальных
				$(".unit").css("border", "none").removeClass("selected");
				// Оставить у нужного
				$(this).css("border", "solid 3px black").addClass("selected");
				// Проверка на фракцию игрока
				if($(this).attr("name") == game.player_faction) {
					// Получение информации юнита
					let information = game.get_unit($(this).attr("id"), $(this).attr("name"));
					console.log(information);
				} else {
					console.log("Чужая фракция");
				}
			}
		});

		// Передвижение юнита на jquery ui
		$(".unit").draggable();

		// Нажатие на здание
		$(".building").mousedown(function() {
			$(".building").css("border", "none");
			$(this).css("border", "solid 3px black");
		});

		// Передвижение здания на jquery ui
		$(".building").draggable();
	},
	// Обработка столкновений
	collision_handling: function() {

	},

	// Генерация рандомного цвета
	random_color: function() {
		r = Math.floor(Math.random() * (256)); // красный
		g = Math.floor(Math.random() * (256)); // зелёный
		b = Math.floor(Math.random() * (256)); // синий
		// Возвращение цвета в 16тиричной кодировке
		return color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
	},
	// Получение рандомного числа от одного до другого
	random_integer: function(min, max) {
		// Промежуток от (min + 0.5) до (max - 0.5)
		let rand = min - 1 + Math.random() * (max - min + 1);
		return Math.floor(rand);
	},
	// Получение позиции элемента
	position: function(id) {
		let obj = document.getElementById(id); // Получение элемента
		let rect = obj.getBoundingClientRect(); // Характеристики элемента
		return rect; // Возвращение данных
	}
};

$(function() {
	game.startup_settings();
	console.log(game);
});

// Положение мыши на странице
$(document).mousemove(function(e) {
	game.posX = e.pageX; // по координате X
	game.posY = e.pageY; // по координате Y
});
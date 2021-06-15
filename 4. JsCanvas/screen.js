// Экраны
let screen = {
	width: 1920,
	height: 1080,

	// Инициализация
	init: function() {
		// Размеры canvas
		screen.canvasWidth = $("canvas").width();
		screen.canvasHeight = $("canvas").height();

		// Отключение контекстного меню
		$("body").contextmenu(() => false);
		$("input").attr("tabindex", "-1");

		screen.checkStorage();
		screen.changeResolution();
	},

	// Проверка хранилища
	checkStorage: function() {
		// localStorage.clear();
		let resolution = JSON.parse(localStorage.getItem("resolution"));
		let sc = JSON.parse(localStorage.getItem("screen"));
		if(resolution != null) {
			screen.width = resolution.width;
			screen.height = resolution.height;
		}
		if(localStorage.getItem('screen') != null)
			screen.changeScreen(sc.game_id, sc.menu_id);
		else screen.changeScreen("mainmenu", "startscreen");
	},

	// Выбор экрана
	changeScreen: function(game_id, menu_id) {
		$(".gamelayer").hide();
		$("#" + game_id).show();
		if(menu_id != undefined) {
			$(".menulayer").hide(); $(".optionlayer").hide();
			$("#"+menu_id).show();
		}
		localStorage.setItem("screen", JSON.stringify({game_id: game_id, menu_id: menu_id}));
	},

	// Изменение размера экрана
	resizible: function(width, height) {
		screen.width = width;
		screen.height = height;
		screen.changeResolution();
		localStorage.setItem("resolution", JSON.stringify({width: width, height: height}));
	},

	// Применение изменений размера экрана
	changeResolution: function() {
		screen.clearInformation();
		// Если размеры слишком велики
		if(screen.width > window.innerWidth) screen.width = window.innerWidth;
		if(screen.height > window.innerHeight) screen.height = window.innerHeight;
		// Изменение размеров экрана
		$("#gamecontainer").css("width", screen.width + "px").css("height", screen.height + "px");
		// Размеры внутренних экранов
		$(".layer").css("width", screen.width + "px").css("height", screen.height + "px");
		// Центрирование окна игры
		if(screen.height < window.innerHeight)
			$("#gamecontainer").css("top", window.innerHeight / 2 - screen.height / 2 + "px");
	},
	// Вывод информации выбранной единицы
	setInformationItem: function(item) {
		if(Object.keys(item).length == 0) return;
		$("#portrait").css("background-image", "url('" + item.src + "')");
		$("#lifebar").html(item.hitPoints + " / " + item.life);
		if(item.hitPoints >= 100) $("#lifebar").css("color", "green");
		if(item.hitPoints < 100 && item.hitPoints > 30) $("#lifebar").css("color", "orange");
		if(item.hitPoints <= 30) $("#lifebar").css("color", "red");
		
		$("#selectedinformation").html(`
			<h2> ${ item.iname } </h2>
			<p>Атака: ${item.damage[0]} - ${item.damage[1]}</p>
			<p>Защита: ${item.defense}</p>
		`);
	},
	// Вывод информации о Разном
	setInformationMisc: function(misc) {
		screen.clearInformation();
		$("#portrait").css("background-image", "url('"+ misc.src +"')");
		$("#selectedinformation").html(`
			<h2>${misc.iname}</h2>
			<p>Ресурс: ${misc.minerals}</p>
		`);
	},
	// Вывод действий в панель действий
	setActItem: function(item) {
		switch(item.type) {
			case "unit": // если юнит
				if(item.name == "worker")
					$("td#a31").html(`<img id="build" src='gui/build.png' onclick='screen.setBuildActItem("${item.faction}")'></img>`).addClass("aBuild");
				$("td#a11").html(`<img id="stop" src='gui/stop.png' onclick='game.itemMoveStop()'></img>`).addClass("aStop");
			break;
			case "building": // если здание
				let color = "";
				switch(item.name) {
					case "capitol": // капитолий
						$("td#a11").html(`<img src='images/worker.png' onclick='game.addItem("unit", "worker", ${item.x + item.width / 2}, ${item.y + item.height + 16}, "${item.faction}", "${item.faction}")' />`).addClass("aWorker");
						$("td#a12").html(`<img src='images/soldier.png' onclick='game.addItem("unit", "soldier", ${item.x + item.width / 2}, ${item.y + item.height + 16}, "${item.faction}", "${item.faction}")' />`).addClass("aSoldier");
						$("td#a13").html(`<img src='images/hero.png' onclick='game.addItem("hero", "leonid", ${item.x + item.width / 2}, ${item.y + item.height + 16}, "${item.faction}", "${item.faction}")' />`).addClass("aHero");
					break;
				}
			break;
			case "hero": // если герой

			break;
		}
	},
	// Вывод возможных построек в панель действий
	setBuildActItem: function(faction) {
		screen.clearActItem();
		$("td#a11").html(`<img src='images/capitol.png' onclick="game.pickBuild('capitol', '${faction}')">`).addClass("aCapitol");
		$("td#a12").html(`<img src='images/temple.png' onclick="game.pickBuild('temple', '${faction}')">`).addClass("aTemple");
	},
	// Вывод выделенных юнитов на панельный блок
	setSelectedItems: function(id, items) {
		let out = "", cl = "";
		for (let i = 0; i < items.length; i++) {
			if(id == items[i].id) cl = "class = 'selected'";
			else cl = ""; 
			out += `<div ${cl} onclick="game.selectPersonallyItem(${items[i].id})" ondblclick="game.selectItem(${items[i].id})"><img src="${ items[i].src }"></div>`;
		}
		$("#selecteditems").html(out);
	},
	// Вывод информации о ресурсах
	setCash: function(cash) {
		$("#gold").html(cash.gold);
		$("#tree").html(cash.tree);
		$("#metal").html(cash.metal);
		$("#food").html(cash.food);
	},
	// Очистка информации о выбранной единице
	clearInformation: function() {
		$("#portrait").attr("style", "");
		$("#lifebar").html("");
		$("#selectedinformation").html("");
	},
	// Очистка панели действий
	clearActItem: function() {
		let clearCells = document.querySelectorAll("#actioncells table tr td");
		for(let i = 0; i < clearCells.length; i++) clearCells[i].innerHTML = "";
		$("td").removeClass();
	},
	// Очистка окна выделеннывх юнитов
	clearSelectedItems: function() {
		$("#selecteditems").html("");
	},
};

// Текст внутри pop-up окна
let description = {
	training: {
		popup: "Вы - молодой выпускник генеральной военной академии должны пройти заключительный тест для становления квалифицированным офицером...",
		title: "Кампания \"Генеральная военная академия\"",
		description: "Вы - молодой выпускник генеральной военной академии должны пройти заключительный тест для становления офицером третьего звена. Для этого вам потребуется доказать квалификационную пригодность, пройдя через весь перечень испытаний, военных учений, проверок личного мастерства и знаний военного дела империи. От этого испытания зависит ваше дальнейшее военное будущее и у вас не будет права на ошибку.",
	},
	empire: {
		popup: "Вам предстоит сыграть роль молодого генерала Империи, посланного на помощь союзным силам острова среднего размера в северо-восточных частях восточного парящего континента. Фракция группы \"Разложение\" была замечена на острове...",
		title: "Кампания \"Безудержность империи\"",
		description: "Вам предстоит сыграть роль молодого генерала Империи, посланного на помощь союзным силам на острова среднего размера в северо-восточных частях восточного парящего континента. Фракция группы \"Разложение\" была замечена на острове и ваша цель с остальными отправленными генералами империи уничтожить каждого представителя этой фракции.<br><br>Спустя длительный полёт вы почти прибываете на остров, но ваш дирижабль терпит крушение от паровых зенитных орудий противника. Связь с остальными генералами и частью вашей армии утеряна. Вам предстоит отыскать выживших членов экипажа, пробиться сквозь орды противников, и воссоединиться с основной частью вашей армии. После чего объединив силы с остальными генералами и союзными силами уничтожить фракцию группы \"Разложение\"."
	},
	union: "",
	order: "",
};

// Pop-up окно
$(function() {
	// Hover на кнопки
	$("input[type=button]").hover(function() {
		// Если кнопка деактивирована
		if($(this).hasClass("disabled")) {
			$("#popup").html("На данный момент недоступно").show();
		// Если рабочая
		} else {
			// Кнопка "Генеральная военная академия"
			if($(this).is("#generalyAcademy")) $("#popup").html(description.training.popup).show();
			// Кнопка "Безудержность империи"
			if($(this).is("#rampantEmpire")) $("#popup").html(description.empire.popup).show();
		}
	}, function() {
		// Сокрытие pop-up окна
		$("#popup").hide().html("");
	});
	// Hover на pop-up окно
	$("#popup").hover(function() { $(this).show() }, function() { $(this).hide() });
});

// Pop-up play окно
$(function() {
	// Hover на кнопки
	$("td").hover(function() {
		// $("#popupplay").html("На данный момент недоступно").show();

		// Здания
		if($(this).is(".aCapitol")) $("#popupplay").html(buildings.list["capitol"].description + "<br> Стоимость: " + JSON.stringify(buildings.list["capitol"].cost)).show();
		if($(this).is(".aTemple")) $("#popupplay").html(buildings.list["temple"].description + "<br> Стоимость: " + JSON.stringify(buildings.list["temple"].cost)).show();

		// Юниты
		if($(this).is(".aWorker")) $("#popupplay").html(units.list["worker"].description + "<br> Стоимость: " + JSON.stringify(units.list["worker"].cost)).show();
		if($(this).is(".aSoldier")) $("#popupplay").html(units.list["soldier"].description + "<br> Стоимость: " + JSON.stringify(units.list["soldier"].cost)).show();
		if($(this).is(".aHero")) $("#popupplay").html(heroes.list["leonid"].description + "<br> Стоимость: " + JSON.stringify(heroes.list["leonid"].cost)).show();

		// Действия
		if($(this).is(".aStop")) $("#popupplay").html("Остановить юнита, S").show();
		if($(this).is(".aBuild")) $("#popupplay").html("Построить здание, B").show();

	}, function() {
		$("#popupplay").hide().html("");
	});
	// Hover на pop-up окно
	$("#popupplay").hover(function() { $(this).show() }, function() { $(this).hide() });
});

// Вывод небольшого уведомления
function setNotification(text) {
	$("#popupplay").html(text).show();	
	setTimeout(() => $("#popupplay").hide(), 1000);
};
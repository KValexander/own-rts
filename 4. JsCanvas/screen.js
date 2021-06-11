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
		$("canvas").contextmenu(() => false);

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
	setInformation: function(item) {
		$("#portrait").css("background-image", "url('" + item.src + "')");
		$("#lifebar").html(item.life + " / " + item.hitPoints);
		$("#selectedinformation").html(`
			<h2> ${ item.iname } </h2>
			<p>Атака: ${item.damage[0]} - ${item.damage[1]}</p>
			<p>Защита: ${item.defense}</p>
		`);
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
	// Очистка информации о выбранной единице
	clearInformation: function() {
		$("#portrait").attr("style", "");
		$("#lifebar").html("");
		$("#selectedinformation").html("");
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
			// Кнопка "Генеральная военна академия"
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
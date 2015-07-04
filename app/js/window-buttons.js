var nw = require("nw.gui");
var win = nw.Window.get();

$(window).on("load", function () {

	win.isMaximixed = true;

	$("#show-dev-tools").on("click", devTools);
	$("#minimize").on("click", minimize);
	$("#maximize").on("click", maximize);
	$("#close").on("click", close);

	win.on("maximize", function () {

		$("#maximize span").removeClass("ion-arrow-expand").addClass("ion-arrow-shrink");
		win.isMaximixed = true; 
	});

	win.on("unmaximize", function () {

		$("#maximize span").removeClass("ion-arrow-shrink").addClass("ion-arrow-expand");
		win.isMaximixed = false; 
	});

	function devTools () 		{ win.showDevTools(); }

	function minimize () 		{ win.minimize(); }

	function close () 			{ win.close(); }

	function maximize () {

		if (win.isMaximixed) 	{ win.unmaximize(); }
		else 									{ win.maximize(); }
	}
});
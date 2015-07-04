var gui = require("nw.gui");
var enableDebug = gui.App.argv[0];

if (enableDebug === "--debug") {

	setTimeout(function () {

		gui.Window.get().showDevTools();
	}, 1000);
}
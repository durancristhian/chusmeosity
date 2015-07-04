var gui = require("nw.gui");
var versionNumber = gui.App.manifest.version;

$(window).on("load", function () {

	$("#version-number").text(versionNumber);
});
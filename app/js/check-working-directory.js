var fs = require("fs");
var os = require("os");
var path = require("path");
var tmpDir = path.join(os.tmpDir(), "chusmeosity");

if(!fs.existsSync(tmpDir)) { 

	fs.mkdirSync(tmpDir);

	var dbPath = path.format({
		dir : tmpDir,
		base : "bd.json"
	});

	fs.writeFile(dbPath, "");
}
$(window).on("load", function() {

	$(".tooltip").tooltipster({
		debug: false,
		position: "bottom",
		theme: "tooltipster-noir"
	});

	var bs = require("browser-sync");
	var workingDir = require("path").join(require("os").tmpDir(), "chusmeosity");
	var dbPath = path.format({
		dir : tmpDir,
		base : "bd.json"
	});
	var db = getProjectsList();
	var uuid = require("node-uuid");
	var _ = require("lodash");

	renderProjectsList();

	function renderProjectsList() {

		$("#loading").fadeIn("slow");
		$("#add-project button[type=submit").attr("disabled", true);

		setTimeout(function() {

			$.get("templates/project.tpl", function(template) {

				Mustache.parse(template);

				var rendered = Mustache.render(template, {
					project: db
				});

				$("#loading").fadeOut("fast", function() {

					$("#projects").html(rendered).hide().fadeIn("slow");
					$("#add-project button[type=submit").attr("disabled", false);
				});
			});
		}, 3000);
	};

	function getProjectsList() {

		var db = fs.readFileSync(dbPath, "utf8");
		db = JSON.parse(db || "[]");
		return db;
	};

	function saveProjectsList() {

		fs.writeFile(dbPath, JSON.stringify(db), "utf8", function (err) {

			if (err) throw err;
		});
	};

	$("#projects").on("click", ".project--init", function () {
		var currentProject = $(event.target).closest(".project");
		startProject(currentProject);
	});

	function startProject (currentProject) {
		var directory = path.format({
			dir : currentProject.data("project-directory"),
			base : "**\\*.*"
		});
		var externalURL = currentProject.find(".project--external-url");
		var deleteButton = currentProject.find(".project--delete");
		var initButton = currentProject.find(".project--init");
		var localURL = currentProject.find(".project--local-url");
		var projectInfo = currentProject.find(".project--info");
		var spinner = currentProject.find(".project--spinner");
		var stopButton = currentProject.find(".project--stop");

		deleteButton.attr("disabled", true);
		initButton.hide();
		spinner.fadeIn("slow");


		if (currentProject.data("project-status") === "stopped") {

			var project = bs.create(currentProject.data("project-name"));

			project.init({
				logLevel: "silent", // output NOTHING to the commandline
				proxy: currentProject.data("project-url") // Using a vhost-based url
			});

			project.emitter.on("service:running", function(data) {

				project.watch(directory, function () {
					setTimeout(function () {
						project.reload();
					}, 3000);
				});

				localURL.text(data.urls.local);
				externalURL.text(data.urls.external);
				projectInfo.slideDown("slow");

				currentProject.data("project-status", "active");

				spinner.hide();
				stopButton.fadeIn("slow");
			});
		} else {

			var project = bs.get(currentProject.data("project-name"));
			project.resume();

			project.watch(directory, function () {
				setTimeout(function () {
					project.reload();
				}, 3000);
			});

			projectInfo.slideDown("slow");

			currentProject.data("project-status", "active");

			spinner.hide();
			stopButton.fadeIn("slow");
		}
	};

	$("#projects").on("click", ".project--stop", function () {

		var currentProject = $(event.target).closest(".project");
		stopProject(currentProject);
	});

	function stopProject (currentProject) {

		var deleteButton = currentProject.find(".project--delete");
		var initButton = currentProject.find(".project--init");
		var projectInfo = currentProject.find(".project--info");
		var stopButton = currentProject.find(".project--stop");

		bs.get(currentProject.data("project-name")).pause();

		currentProject.data("project-status", "paused");

		projectInfo.slideUp("slow");
		deleteButton.attr("disabled", false);
		stopButton.hide();
		initButton.fadeIn("slow");
	};

	$("#add-project").on("submit", function (event) {

		event.preventDefault();
		var directory = $(this).find(".input--directory").val();
		var name = $(this).find(".input--name").val();
		var url = $(this).find(".input--url").val();

		var isValid = directory && name && url && true || false;

		if (isValid) {

			db.push({
				directory: directory,
				id: uuid.v1(),
				name: name,
				url: url
			});

			$(this).trigger("reset");

			saveProjectsList();
			renderProjectsList();
		}
	});

	$("#projects").on("click", ".project--delete", function () {

		var idToRemove = $(this).data("project-id");

		_.remove(db, function(item) {
			return item.id === idToRemove;
		});

		saveProjectsList();
		renderProjectsList();
	});
});
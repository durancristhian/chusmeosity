$(window).on("load", function () {

	$(".tooltip").tooltipster({
		debug: false,
		position: "bottom",
		theme: "tooltipster-noir"
	});

	var bs = require("browser-sync");

	setTimeout(function () {

		renderProjectsList();
	}, 3000);

	function renderProjectsList() {
		var projectsList = getProjectsList();
		$.get("templates/project.tpl", function (template) {
			Mustache.parse(template);
			var rendered = Mustache.render(template, { project: projectsList });
			$("#loading").fadeOut("fast", function () {
				$("#projects").html(rendered).hide().fadeIn("slow");
			});
		});
	};

	function getProjectsList() {
		return [{
			directory: "D:\\Websites\\21co72.dev\\Website",
			name: "21co",
			url: "http://21co72.dev/"
		}, {
			directory: "D:\Websites\keynote71.dev\Website",
			name: "Keynote",
			url: "keynote71.dev"
		}];
	};

	$("#projects").on("click", ".project--init", function (event) {
		event.preventDefault();
		var currentProject = $(event.currentTarget).closest(".project");
		startProject(currentProject);
	});

	function startProject (currentProject) {
		var project = bs.create(currentProject.data("project-name"));
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

		project.init({
			logLevel: "silent", // output NOTHING to the commandline
			proxy: currentProject.data("project-url") // Using a vhost-based url
		});

		project.emitter.on("service:running", function(data) {
			localURL.text(data.urls.local);
			externalURL.text(data.urls.external);
			projectInfo.slideDown("slow");

			spinner.hide();
			stopButton.fadeIn("slow");
		});
	};

	$("#projects").on("click", ".project--stop", function (event) {
		event.preventDefault();
		var currentProject = $(event.currentTarget).closest(".project");
		stopProject(currentProject);
	});

	function stopProject (currentProject) {
		var deleteButton = currentProject.find(".project--delete");
		var initButton = currentProject.find(".project--init");
		var projectInfo = currentProject.find(".project--info");
		var stopButton = currentProject.find(".project--stop");

		bs.get(currentProject.data("project-name")).pause();
		projectInfo.slideUp("slow");
		deleteButton.attr("disabled", false);
		stopButton.hide();
		initButton.fadeIn("slow");
	};
});
$(window).on("load", function() {

	setTimeout(function () {

		renderProjectsList();
	}, 3000);

	function getProjectsList() {
		return [{
			directory: "D:\\Websites\\21co72.dev\\Website",
			name: "21co",
			url: "http://21co72.dev/",
		}];
	};

	function renderProjectsList() {
		var projectsList = getProjectsList();
		$.get("templates/project.tpl", function(template) {
			Mustache.parse(template);
			var rendered = Mustache.render(template, { project: projectsList });
			$("#projects").html(rendered).hide().fadeIn("slow");
		});
	};

	$(".project").on("click", ".project--init", function(event) {
		event.preventDefault();
		var currentProject = $(event.currentTarget).closest(".project");
		startProject(currentProject);
	});

	function startProject (currentProject) {
		var bs = require("browser-sync").create(currentProject.data("project-name"));
		var externalURL = currentProject.find(".project--external-url");
		var initButton = currentProject.find(".project--init");
		var localURL = currentProject.find(".project--local-url");
		var projectInfo = currentProject.find(".project--info");
		var spinner = currentProject.find(".project--spinning");
		var stopButton = currentProject.find(".project--stop");

		initButton.hide();
		spinner.fadeIn("slow");

		bs.init({
			logLevel: "silent", // output NOTHING to the commandline
			proxy: currentProject.data("project-url") // Using a vhost-based url
		});

		bs.emitter.on("service:running", function(data) {
			spinner.hide();
			stopButton.fadeIn("slow");
			localURL.val(data.urls.local);
			externalURL.val(data.urls.external);
			projectInfo.slideDown("slow");
		});
	};
});
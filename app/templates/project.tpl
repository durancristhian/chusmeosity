{{#project}}
	<div class="project mt2 rounded bg-white" data-project-name="{{name}}" data-project-url="{{url}}" data-project-status="stopped" data-project-directory="{{directory}}">
		<h2 class="project--name m0 py2 px2">{{name}}</h2>
		<div class="m2">
			<div class="clearfix">
				<div class="col col-3">
					<p class="mb0">URL</p>
					<p class="mb0">Monitoreando</p>
				</div>
				<div class="col col-4">
					<p class="mb0 bold">{{url}}</p>
					<p class="mb0 bold">{{directory}}</p>
				</div>
			</div>
		</div>
		<div class="project--info mb2 px2">
			<div class="clearfix">
				<div class="col col-3">
					<p class="mb0">Local URL</p>
					<p class="mb0">External URL</p>
				</div>
				<div class="col col-4">
					<p class="project--local-url mb0 bold olive"></p>
					<p class="project--external-url mb0 bold olive"></p>
				</div>
			</div>
		</div>
		<div class="ml2 mr2 mb1">
			<div class="clearfix">
				<div class="col col-6">
					<button class="project--delete btn btn-primary border bg-red" data-project-id="{{id}}">
						<span class="ion-trash-a"></span>
						Eliminar
					</button>
				</div>
				<div class="col col-6">
					<div class="right-align">
						<button class="project--init btn btn-primary border bg-olive">
							<span class="ion-play"></span>
							Iniciar
						</button>
						<button class="project--spinner btn btn-primary border bg-orange" disabled>
							<span class="ion-load-c spinner"></span>
							Iniciando...
						</button>
						<button class="project--stop btn btn-primary border bg-maroon">
							<span class="ion-stop"></span>
							Parar
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{{/project}}
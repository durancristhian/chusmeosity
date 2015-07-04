{{#project}}
	<div class="project mt2 p2 rounded bg-white">
		<div class="clearfix">
			<div class="col col-9">
				<h2 class="m0">{{name}}</h2>
			</div>
			<div class="col col-3">
				<button class="project--init btn btn-primary border bg-olive col-12">
					<span class="ion-play"></span>
					Iniciar
				</button>
				<!-- <button class="project--spinning btn btn-primary border bg-yellow col-12">
					<span class="ion-load-c spinner"></span>
					Iniciando...
				</button>
				<button class="project--stop btn btn-primary border bg-red col-12">
					<span class="ion-stop"></span>
					Parar
				</button> -->
				<button class="project--delete btn btn-primary border bg-red col-12">
					<span class="ion-close"></span>
					Parar
				</button>
			</div>
		</div>
		<p class="mx0 mt2 mb1">
			URL:
			<span class="bold">{{url}}</span>
		</p>
		<p class="m0">
			Monitoreando:
			<span class="bold">{{directory}}</span>
		</p>
	</div>
{{/project}}
{{#project}}
	<div class="project mt2 py1 px2 border rounded" data-project-url="{{url}}" data-project-name="{{name}}">
		<div class="clearfix">
			<div class="col col-8">
				<h2 class="project--name m0">{{name}}</h2>
			</div>
			<div class="col col-4">
				<button class="project--init btn btn-primary border stretch bg-olive">Iniciar</button>
				<button class="project--spinning btn btn-primary border stretch bg-yellow">Iniciando...</button>
				<button class="project--stop btn btn-primary border stretch bg-red">Parar</button>
			</div>
		</div>
		<div class="project--info mt1 py1">
			<form>
				<label for="local-url" class="project--label inline-block">Local: </label>
				<input id="local-url" type="text" class="project--input project--local-url field" disabled>
			</form>
			<form class="mt1">
				<label for="external-url" class="project--label inline-block">Externa: </label>
				<input id="external-url" type="text" class="project--input project--external-url field" disabled>
			</form>
		</div>
	</div>
{{/project}}
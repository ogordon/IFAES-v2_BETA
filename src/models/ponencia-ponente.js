window.PonenciaPonente = StackMob.Model.extend({
	schemaName: 'ponencia_ponente'    
});

window.ListaPonenciasPonentes = StackMob.Collection.extend({
	model: window.PonenciaPonente   
});
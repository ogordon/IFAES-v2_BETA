window.Patrocinador = StackMob.Model.extend({
	schemaName: 'patrocinador'    
});

window.ListaPatrocinadores = StackMob.Collection.extend({
	model: window.Patrocinador   
});
window.Agenda = StackMob.Model.extend({
	schemaName: 'agenda'    
});

window.ListaAgendas = StackMob.Collection.extend({
	model: window.Agenda   
});
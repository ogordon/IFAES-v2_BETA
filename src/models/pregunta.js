window.Pregunta = StackMob.Model.extend({
	schemaName: 'pregunta'    
});

window.ListaPreguntas = StackMob.Collection.extend({
	model: window.Pregunta   
});

window.Respuesta = StackMob.Model.extend({
	schemaName: 'respuesta'    
});

window.ListaRespuestas = StackMob.Collection.extend({
	model: window.Respuesta   
});
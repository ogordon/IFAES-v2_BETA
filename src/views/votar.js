/*
 *
 * View Class to manage Votar Page
 *
 */

window.VotarView = Backbone.View.extend({
  initialize:function () {
    //seleccionar el template apropiado
    //en funcion del número de respuestas de la pregunta
    this.op1 = this.model.get('opcion_1');
  	this.op2 = this.model.get('opcion_2');
  	this.op3 = this.model.get('opcion_3');
  	this.op4 = this.model.get('opcion_4');
  	this.op5 = this.model.get('opcion_5');
  	
  	if (this.op5 != '')
  	     this.template = _.template(tpl.get('votar'));
  	else
  	 if (this.op4 != '')
  	     this.template = _.template(tpl.get('votar-4'));
  	 else
  	     if (this.op3 != '')
  	         this.template = _.template(tpl.get('votar-3'));
  	     else
  	         if(this.op2 != '')
  	             this.template = _.template(tpl.get('votar-2'));
  	 
  	 
  	this.pregunta_id = this.model.get('pregunta_id');
  	// almacenar las posibles opciones (maximo 5)


  	/*if(!app.user.get('logado')) {
	  	app.navigate("#login", {trigger: true});	
  	} */ 	    
  },
  
  // Events from the View's DOM 
  
  events: {
		"click #votar_pulsado": "votar",
		"click #volver_pulsado" : "volver" 	 	
  },
  
  /*
   * Shows the Sign-in dialog
   */
    
  votar: function(e) {

		// Prevent to launch the routing engine
		
		e.preventDefault(); 
		
		// Cambiar a la página de condiciones de uso
		
		var radio_respuesta = $("input[name=respuesta]:radio:checked").attr("value");	
		
		// Comprobar que se ha seleccionado una opción
		
		if (radio_respuesta) {

			$.mobile.loading( 'show', {
				text: '',
				textVisible: false,
				theme: 'c',
				html: ""
			});	
			
			// Crear un objeto con las respuesta
			
			var respuesta = new window.Respuesta({
				respuesta: radio_respuesta,
				pregunta_id: this.pregunta_id
			});
			
			// Crear la respuesta en StackMob
				
			respuesta.create({
				success: function(model, result, options) {	      
				
						// Todo OK, mostrar un mensaje y volver a Home
				
			      $('#votar_pulsado').toggle("show");
			      $('#msg_votacion_ok').toggle("show", function() {
							_.delay(function() {
									
									// Registrar que se ha votado
									
							    StackMob.getLoggedInUser({
										success: function(username) {
										
											if (username) {
							
												// An user is already logged, so override login process
												
												var user = new StackMob.User({username: username});
												user.incrementOnSave('votos', 1);
												user.save();
												
												$.mobile.loading( 'hide', {
													text: '',
													textVisible: false,
													theme: 'c',
													html: ""
												});	
												
												app.navigate("#votar-thx", {trigger: true});		
											} 
											else {
												$.mobile.loading( 'hide', {
													text: '',
													textVisible: false,
													theme: 'c',
													html: ""
												});	

												// Nobody is logged, so start the login process
											
												app.navigate("#login", {trigger: true});
											}				
										},
										error: function(model, response, options){
											$.mobile.loading( 'hide', {
												text: '',
												textVisible: false,
												theme: 'c',
												html: ""
											});	

											$('#msg_votacion_ok').toggle("show");
											$('#votar_pulsado').toggle("show");									
							
											// Nobody is logged, so start the login process
											
											alert("Error al registrar el voto");								
										}
									});										
									
									// Volver a página principal

									//app.navigate("#home", {trigger: true});																
								},
								2000
							);
						});
			    },
			    error: function(model, result, options) {
			    
						$.mobile.loading( 'hide', {
							text: '',
							textVisible: false,
							theme: 'c',
							html: ""
						});	
				
						// Error, mostrar un error y no hacer nada
							    
			      $('#votar_pulsado').toggle("show");
			      $('#msg_votacion_fail').toggle("show", function(){
							_.delay(function(){
									$('#msg_votacion_fail').toggle("show");
									$('#votar_pulsado').toggle("show");
								},
								2000
							);
						});
			    }			
			});			
		} 
		else {
					
			// Sin elegir opción, avisar que debe seleccionar una opcion				

		  $('#votar_pulsado').toggle("show");
		  $('#sin_elegir').toggle("show", function(){
				_.delay(function() {
					$('#sin_elegir').toggle("show");
					$('#votar_pulsado').toggle("show");	
				},
				2000);
			});			
		}
  },

  /*
   * Shows the Sign-in dialog
   */
    
  volver : function(e) {

		// Prevent to launch the routing engine
		
		e.preventDefault(); 		
		window.history.back();		
  },

  render:function (e) {
  	var el = this.$el;
  	 
  	var attributes = this.model.toJSON();
  	$(this.el).html(this.template(attributes));  		
  	
  	//append footer
     var footer = new window.FooterView();
        footer.render();                
        $(this.el).append($(footer.el));
                
    return this;
  }
});
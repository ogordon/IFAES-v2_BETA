/*
 *
 * View Class to manage Registro Page
 *
 */


window.RegistrarView = Backbone.View.extend({
  initialize:function () {
  	this.template = _.template(tpl.get('registro'));
  },
  
  // Events from the View's DOM 
  
  events: {
		"click #registrarse_pulsado": "registrarse"
  },

  /*
   * Shows the Sign-in dialog
   */
    
  registrarse: function(e) {  
	  var username = $('#username').val();
		var password = 'ifaes13';	
		var nombre = $('#nombre').val();
		var empresa = $('#empresa').val();
		var cargo = $('#cargo').val();
		
		
		// Prevent to launch the routing engine
		
		e.preventDefault(); 
		
		var username_ok = this.email_validate();
		var nombre_ok = !(nombre==null || nombre=="");
		var empresa_ok = !(empresa==null || empresa=="");
		var cargo_ok = !(cargo==null || cargo=="");
		
		
		if (!(username_ok && nombre_ok && empresa_ok && cargo_ok)) {
			$('#registro_error').toggle("show", function(){
				_.delay(function(){
						$('#registro_error').toggle("show");
					},
					2000
				);
			});
		} 
		else {
	  	$.mobile.loading( 'show', {
				text: '',
				textVisible: false,
				theme: 'c',
				html: ""
			});	

			// Create the user in StackMob
			
			var user = new StackMob.User({
				username: username, 
				password: password, 
				nombre: nombre,
				empresa: empresa,
				cargo: cargo,
				votos: 0
			});
	  
			user.create({
		    success: function(model, result, options) {	
		    
		    	user.login(false, {
						success: function(model) {
						
					  	$.mobile.loading( 'hide', {
								text: '',
								textVisible: false,
								theme: 'c',
								html: ""
							});	
						
							// If login is correct, go next page
							
							app.user.set({logado: true}); 
							app.navigate("#home", {trigger: true});
							//app.changePage(new window.HomeView());
						},
						error: function(model, response) {
						
					  	$.mobile.loading( 'hide', {
								text: '',
								textVisible: false,
								theme: 'c',
								html: ""
							});	

							alert('Usuario registrado, pero no podemos hacer login');						
						}  	
			    });	 
		    },
		    error: function(model, result, options) {
		    
		    	// En caso de error, el usuario ya existia por lo que hacemos login
		    
					user.login(true, {
						success: function(model) {
						
					  	$.mobile.loading( 'hide', {
								text: '',
								textVisible: false,
								theme: 'c',
								html: ""
							});	
						
							// If login is correct, go next page
							
							app.user.set({logado: true}); 
							app.navigate("#home", {trigger: true});
							//app.changePage(new window.HomeView());
						},
						error: function(model, response) {

					  	$.mobile.loading( 'hide', {
								text: '',
								textVisible: false,
								theme: 'c',
								html: ""
							});	

							alert('No podemos registrarle, lo sentimos.');						
						}  	
			    });	    	    	    
		    }
		  });					
		}	
  },
  
  email_validate: function () {  
		var x = $('#username').val();
		var atpos = x.indexOf("@");
		var dotpos = x.lastIndexOf(".");
		
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length)
		{
		  return false;
		} 
		else {
			return true;  	
		}		
  },

  render:function (e) {
  	
  	// Pass the model data to the template
  	
  	var attributes = this.model.toJSON();
  	
    $(this.el).html(this.template(attributes));	
    return this;
  }
});
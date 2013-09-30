/*
 *
 * View Class to manage Login Page
 *
 */

window.LoginView = Backbone.View.extend({
  initialize:function () {
  	this.template = _.template(tpl.get('login'));
  },
  
  // Events from the View's DOM 
  
  events: {
		"click #login_pulsado": "login",
		"keypress #username":  "onEnter"
  },

  /*
   * Shows the Sign-in dialog
   */
    
  login: function(e) {	
	  var username = $('#username').val();
		var password = 'ifaes13';		
		
		// Prevent to launch the routing engine
		
		e.preventDefault(); 
		
		// Validate if username is a valid e-mail address		
		
		if (! this.email_validate()) {
			$('#email_error').toggle("show", function(){
				_.delay(function(){
						$('#email_error').toggle("show");
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
			
			// Trying StackMob login process
			
			var user = new StackMob.User({username: username, password: password}); 
			app.user.set({username: username});
			
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
					
					
				},
				error: function(model, response) {
				
			  	$.mobile.loading( 'hide', {
						text: '',
						textVisible: false,
						theme: 'c',
						html: ""
					});	
				
					// If login fails, show an error message
					
					$('#login_error').toggle("show", function(){
						_.delay(function(){
								$('#login_error').toggle("show");
								$('#show_registrar').show();
																
								app.navigate("#registro", {trigger: true});
							},
							2000
						);
					});				
				}  	
	    });
	  }
  },
  
  onEnter: function(e) {	
  	if (e.keyCode == 13) {
      this.login(e); 
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
    $(this.el).html(this.template());	
    return this;
  }
});
/*
 *
 * View Class to manage MarcoPatrocinador Page
 *
 */


window.MarcoPatrocinadorView = Backbone.View.extend({

  initialize:function () {  
  	
  	this.template = _.template(tpl.get('marco_patrocinador'));	  	
  		
  	
  	/*if(!app.user.get('logado')) {
	  	app.navigate("#login", {trigger: true});	
  	}*/
  },
  
  // Events from the View's DOM 
  
  events: {
		"click #panel_pulsado" : "showPanel",
		"click #logout" : "logout"
  },
  
 /*
  * Mostrar el panel lateral
  */
  
  showPanel: function(e) {
	  e.preventDefault();   
	  $('#panellateral').panel("toggle");							  
  }, 

  /*
   * Shows the Sign-in dialog
   */
    
  logout: function(e) {

		// Prevent to launch the routing engine
		
		e.preventDefault(); 
		
  	$.mobile.loading( 'show', {
			text: '',
			textVisible: false,
			theme: 'c',
			html: ""
		});	
		
		// Si el usuario está logado, deslogar		

		StackMob.getLoggedInUser( {
		  success: function(username) {
				var user = new StackMob.User({ username: username});
	
				user.logout({
					success: function(model){
					
				  	$.mobile.loading( 'hide', {
							text: '',
							textVisible: false,
							theme: 'c',
							html: ""
						});						
					
						app.user.set({logado: false}); 
						app.navigate("#login", {trigger: true});
				},
					error: function(model){
					
				  	$.mobile.loading( 'hide', {
							text: '',
							textVisible: false,
							theme: 'c',
							html: ""
						});	

						console.log("Logout error!");					   							   				   		
					}					   
				});
		  },
		  error: function(username){

		  	$.mobile.loading( 'hide', {
					text: '',
					textVisible: false,
					theme: 'c',
					html: ""
				});	

				console.log("IsLoggedInUser Error!");				  
		  }
		}); 				
  },

  /*
   * Render the page
   */
     	 
  render:function (e) {
    $(this.el).html(this.template());
    
    //append lateral panel
    var lateral_panel = new window.Panel_lateralView();
    lateral_panel.render();                
    $(this.el).append($(lateral_panel.el));	
    
    $(document).ready(function() {
        console.log("document ready");
                    $('#external_url').load("www.avaya.es");
                     $('#external_url').appendTo('body');
                    
                    //$("#external_url").attr("src", "www.avaya.es");
                  });
    return this;
  }
});
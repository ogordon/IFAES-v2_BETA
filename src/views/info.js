/*
 *
 * View Class to manage Konecta Page
 *
 */


window.InfoView = Backbone.View.extend({
  initialize:function () {
  	this.template = _.template(tpl.get('info'));
  	
  	/*if(!app.user.get('logado')) {
  		app.navigate("#login", {trigger: true});	
  	}*/
  },
  
  // Events from the View's DOM 
  
  events: {
		"click #volver_pulsado" : "volver" 		
  },
    
  volver : function(e) {
    // Prevent to launch the routing engine
		
		e.preventDefault(); 		
		window.history.back();
  },
    	 
  render:function (e) {
    $(this.el).html(this.template());	
    return this;
  }
});
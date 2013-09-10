/*
 *
 * View Class to manage Konecta Page
 *
 */


window.KonectaView = Backbone.View.extend({
  initialize:function () {
  	this.template = _.template(tpl.get('konecta'));
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
/*
 *
 * View Class to manage Votar-thx Page
 *
 */

window.Votar_thxView = Backbone.View.extend({
  initialize:function () {
  	this.template = _.template(tpl.get('votar-thx'));

  	/*if(!app.user.get('logado')) {
	  	app.navigate("#login", {trigger: true});	
  	} */ 	    
  },
  
  // Events from the View's DOM 
  
  events: {
		"click #panel_pulsado": "showPanel",
		"click #volver_pulsado" : "volver" 	 	
  },
  
   /*
  * Mostrar el panel lateral
  */
  
  showPanel: function(e) {
      e.preventDefault();   
      $('#panel').panel("toggle");                            
  }, 
    
  volver : function(e) {

		// Prevent to launch the routing engine
		
		e.preventDefault(); 		
		window.history.back();		
  },

    render:function (e) {
    $(this.el).html(this.template());
    
    //append lateral panel
    var lateral_panel = new window.Panel_lateralView();
    lateral_panel.render();                
    $(this.el).append($(lateral_panel.el)); 
    
    return this;
  }
});
/*
 *
 * View Class to manage Patrocinadores Page
 *
 */

window.PatrocinadoresView = Backbone.View.extend({
  initialize:function () {
  	this.template = _.template(tpl.get('patrocinadores'));
  	
  	/*if(!app.user.get('logado')) {
	  	app.navigate("#login", {trigger: true});	
  	} */ 	
  },
  
  // Events from the View's DOM 
  
  events: {
		"click #volver_pulsado" : "volver",
		"click #panel_pulsado" : "showPanel" 		
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
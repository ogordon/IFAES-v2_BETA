/*
 *
 * View Class to manage Imelius Page
 *
 */

window.ImeliusView = Backbone.View.extend({
  initialize:function () {
  	this.template = _.template(tpl.get('imelius'));
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
    
    //append lateral panel
    var lateral_panel = new window.Panel_lateralView();
    lateral_panel.render();                
    $(this.el).append($(lateral_panel.el));
    	
    return this;
  }
});
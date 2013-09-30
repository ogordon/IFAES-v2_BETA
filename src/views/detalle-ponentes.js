/*
 *
 * View Class to manage Detalle de Ponentes Page
 *
 */

window.DetallePonentesView = Backbone.View.extend({
  initialize:function () {
  
		this.template = _.template(tpl.get('detalle_ponentes'));	  		
	  
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
      $('#panellateral').panel("toggle");                            
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
    
  	// Pass the model data to the template and render
  	
  	var attributes = this.model.toJSON();
  	  	
  	$(this.el).html(this.template(attributes));
  	
  	//append lateral panel
  	var lateral_panel = new window.Panel_lateralView();
        lateral_panel.render();                
        $(this.el).append($(lateral_panel.el));   	
  	  		        
    return this;
  }
});
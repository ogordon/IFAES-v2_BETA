/*
 *
 * View Class to manage Condiciones Page
 *
 */

window.CondicionesView = Backbone.View.extend({
  initialize:function () {
  	this.template = _.template(tpl.get('condiciones'));
  },
  
  // Events from the View's DOM 
  
  events: {
		"click #volver_pulsado": "volver"
  },

  /*
   * Shows the Sign-in dialog
   */
    
  volver: function(e) {

		// Prevent to launch the routing engine
		
		e.preventDefault(); 		
		window.history.back();
  },

  render:function (e) {
    $(this.el).html(this.template());	
    return this;
  }
});
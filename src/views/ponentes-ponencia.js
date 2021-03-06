/*
 *
 * View Class to manage Ponentes-Ponencia Page
 *
 */

window.PonentesPonenciaView = Backbone.View.extend({
  initialize:function () {
	 // this.template = _.template(tpl.get('ponentes_ponencia'));
	 this.template = _.template($('#ponentes_ponencia').html());	  		  
  
  	/*if(!app.user.get('logado')) {
	  	app.navigate("#login", {trigger: true});	
  	} */ 	  
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
  	var el = this.$el;
 
 		// Render the Page
 		  	  	
    el.html(this.template());

 		// Render the Ponentes lists from StackMob
            
    var celdaView = new Celda_PonenteView({collection : app.listaPonentesPonencia});
    el.find('#lista_ponentes_ponencia').append(celdaView.render().el);
    
    return this;
  }
});

window.Celda_PonenteView = Backbone.View.extend({
  tagName: 'ul',
  attributes: {
  	'data-role' : 'listview', 
  	'data-inset' : 'false', 
  	'data-theme' : 'a',
  	'data-filter' : 'true'
  }, 
  
  initialize:function () {
  	//this.template = _.template(tpl.get('celda_ponentes'));
  	this.template = _.template($('#celda_ponentes').html());
  },

  render:function (e) {
  	var template 		= this.template;
  	var el 					= this.$el;
  	var collection	= this.collection;
  	  
  	// Pass the model data to the template
  	                
    collection.each(function (ponente) {    	
    	el.append(template(ponente.attributes));
    });
  	
    return this;
  }
});

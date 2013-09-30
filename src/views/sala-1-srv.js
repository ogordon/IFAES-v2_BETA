/*
 *
 * View Class to manage Sala-1 Page, getting schedule from StackMob
 *
 */


window.Sala_1_srvView = Backbone.View.extend({
  initialize:function () { 	
		this.template = _.template(tpl.get('sala_1_srv'));

  	/*if(!app.user.get('logado')) {
	  	app.navigate("#login", {trigger: true});	
  	}*/
  },
  
  // Events from the View's DOM 
  
  events: {
		"click #volver_pulsado" : "volver",
		"click #panel_pulsado" : "showPanel",
  },
    
  /*
  * Mostrar el panel lateral
  */
  
  showPanel: function(e) {
      e.preventDefault();   
      $('#panellateral').panel("toggle");                            
  },
    
  volver : function(e) {

		// Prevent to launch the routing engine
		
		e.preventDefault(); 		
		window.history.back();
  },

  render:function (e) {
      var el = this.$el;
      el.html(this.template());
      //$(this.el).html(this.template());	
    
    
    //render tramo1 de agenda desde StackMob    
    var eAgendaView1 = new Entrada_Agenda1View({collection : app.Agenda1Tramo1});
    el.find('#lista_tramo1').append(eAgendaView1.render().el);
    
    //render tramo2 de agenda desde StackMob    
    var eAgendaView2 = new Entrada_Agenda1View({collection : app.Agenda1Tramo2});
    el.find('#lista_tramo2').append(eAgendaView2.render().el);
    
    //render tramo3 de agenda desde StackMob    
    var eAgendaView3 = new Entrada_Agenda1View({collection : app.Agenda1Tramo3});
    el.find('#lista_tramo3').append(eAgendaView3.render().el);
    
    //render tramo4 de agenda desde StackMob    
    var eAgendaView4 = new Entrada_Agenda1View({collection : app.Agenda1Tramo4});
    el.find('#lista_tramo4').append(eAgendaView4.render().el);
    
    //render tramo5 de agenda desde StackMob    
    var eAgendaView5 = new Entrada_Agenda1View({collection : app.Agenda1Tramo5});
    el.find('#lista_tramo5').append(eAgendaView5.render().el);
    
    
    //append lateral panel
    var lateral_panel = new window.Panel_lateralView();
    lateral_panel.render();                
    $(this.el).append($(lateral_panel.el));
    
    return this;
  }
});

window.Entrada_Agenda1View = Backbone.View.extend({
  tagName: 'ul',
  attributes: {
    'data-role' : 'listview', 
    'data-inset' : 'false', 
    'data-theme' : 'a',
    'data-filter' : 'false'
  }, 
  
  initialize:function () {
    this.template = _.template(tpl.get('entrada_agenda'));
  },

  render:function (e) {
    var template        = this.template;
    var el                  = this.$el;
    var collection  = this.collection;
      
    // Pass the model data to the template
                    
    collection.each(function (ponente) {        
        el.append(template(ponente.attributes));
    });
    
    return this;
  }
});
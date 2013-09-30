/*
 *
 * View Class to manage Panel-lateral
 *
 */


window.Panel_lateralView = Backbone.View.extend({
  initialize:function () {
     //seleccionamos la plantilla 
  	 this.template = _.template(tpl.get('panel_lateral'));
  },
  
  // Events from the View's DOM 
  
  events: {
  
  },
  	 
  render:function (e) {
    $(this.el).html(this.template());	
    return this;
  }
});
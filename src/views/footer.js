/*
 *
 * View Class to manage Footer
 *
 */


window.FooterView = Backbone.View.extend({
  initialize:function () {
     //seleccionamos la plantilla 
  	 this.template = _.template(tpl.get('footer'));
  },
  
  // Events from the View's DOM 
  
  events: {
  
  },
  	 
  render:function (e) {
    $(this.el).html(this.template());	
    return this;
  }
});
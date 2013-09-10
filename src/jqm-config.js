$(document).bind("mobileinit", function () {
    
    // Desactivate jQuery Mobile routing engine (to use Backbone.js routing)
    
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;

    // Remove page from DOM when it's being replaced
    
    $('div[data-role="page"]').live('pagehide', function (event, ui) {
        $(event.currentTarget).remove();
    });
    
    // Setting default Loading message

    $( document ).on( 'mobileinit', function(){
		  $.mobile.loader.prototype.options.text = "Cargando";
		  $.mobile.loader.prototype.options.textVisible = false;
		  $.mobile.loader.prototype.options.theme = "a";
		  $.mobile.loader.prototype.options.html = "";		  
	  });
});
(function($){  

	console.log("Load Document");	
	
	// Views
	
	HomeView = Backbone.View.extend({
    className:"span8",
    tagName: "div",
    el: "#pad-wrapper",

    events: {
       "click #addBtn": "add"
    },

    initialize: function() {
      this.template = _.template($('#home').html());
      this.render();
    },

    render: function() {
      $(this.el).html(this.template());
      $('.row').append(this.el);
      return this;
    },

    add: function(e) {
    	e.preventDefault();
    	
    	alert("Add");
    	      
      return this;
    }
  });

	AddView = Backbone.View.extend({
    className:"span8",
    tagName: "div",
    el: "#pad-wrapper",

    events: {
       "click #cargar_preguntas": "load"
    },

    initialize: function() {
      this.template = _.template($('#add_question').html());
      this.render();
    },

    render: function() {
      $(this.el).html(this.template());
      $('.row').append(this.el);
      return this;
    },

    load: function(e) {
    	e.preventDefault();
    	
    	var pregunta = $("#pregunta").val();
	    var resp_1 	= $("#resp_1").val();
	    var resp_2 = $("#resp_2").val();
	    var resp_3 = $("#resp_3").val();
	    var resp_4 = $("#resp_4").val();
	    var resp_5 = $("#resp_5").val();
	    	    	
	    var pregSubir = new PreguntaModel({
		  	titulo 		: pregunta,
		  	opcion_1 	: resp_1,
		  	opcion_2 	: resp_2,
		  	opcion_3 	: resp_3,
		  	opcion_4 	: resp_4,
		  	opcion_5 	: resp_5,	
		  	activa		: false	  			  			  	 
	    });
	    
			pregSubir.create({
				success: function(model, result, options) {
					expoApp.navigate("", {trigger : true});
					
					// Eliminar contenido por evitar duplicidad
				},
				error: function(model, result, options) {
					alert("Error al grabar");				
				}
			});

      return this;
    }
  });

	Celda_PreguntaView = Backbone.View.extend({
    tagName: "div",

    initialize: function() {
      this.template = _.template($('#show_question').html());
      this.render();
    },

    render: function() {
	  	var template 		= this.template;
	  	var el 					= this.$el;
	  	var collection	= this.collection;
	  	  
	  	// Pass the model data to the template
	  	
	  	el.html("");
	  	                
	    collection.each(function (pregunta) {    	
	    	el.append(template(pregunta.attributes));
	    });
	  	
	    return this;
    }
  });

	ActivateView = Backbone.View.extend({
    className:"span8",
    tagName: "div",
    el: "#pad-wrapper",

    events: {
       "click #activar_preguntas": "activate"
    },

    initialize: function() {
    	this.template = _.template($('#activate_question').html());
    	var view = this;
    	// Load StackMob questions
    	
    	var q = new StackMob.Collection.Query();
			q.orderAsc('titulo');
        	
	    expoApp.listaPreguntas.query(q, {   
				success: function(model, results, options) {
		      view.render();
				},
				error: function(model, results, options) {  
					alert("No puedo cargar la lista de preguntas");
				}	        
			});    	
    
    },

    render: function() {
      $(this.el).html(this.template());


	 		// Render the Preguntas lists from StackMob
	            
	    var celdaView = new Celda_PreguntaView({collection : expoApp.listaPreguntas});
	    $(this.el).find('#lista_preguntas').append(celdaView.render().el);

      $('.row').append(this.el);
      return this;
    },

    activate: function(e) {
    	e.preventDefault();
    	
    	var radio_respuesta = $("input[name=pregunta]:radio:checked").attr("value");	
		
    	// Comprobar que se ha seleccionado una opción
		
    	if (radio_respuesta) {

	    	// Buscar la lista que tienen true
	    	
	    	var activas = expoApp.listaPreguntas.where({activa : true});
	    	
	    	if (activas.length > 0) {
		    	
		    	_.each(activas, function(pregunta) {
		    		var id = pregunta.get("pregunta_id");
		    	
		    		var preg = new window.PreguntaModel({
			    		pregunta_id : id,
			    		activa			: false	
		    		});
		    		
		    		//preg.set({activa : false});
		    		console.log(preg.toJSON());
		    				    		
						preg.save({
						  success: function(model, result, options) {						  							  	
								var newActiva = new window.PreguntaModel({
									pregunta_id : radio_respuesta,
									activa : true	
								});
								
								newActiva.save({
									success: function(model, result, options) {
									
									expoApp.listaPreguntas.fetch({   
											success: function(model, results, options) {
												expoApp.navigate("", {trigger : true});
									      //alert("Pregunta activada correctamente");
											},
											error: function(model, results, options) {  
												alert("No puedo cargar la lista de preguntas");
											}	        
										}); 									
									},
									error: function(model, result, options) {
										alert("Pregunta NO activada correctamente");
									}		
								});							  								  												  
						  },
						  error: function(model, result, options) {
								alert("Sin desactivar pregunta anterior");  
						  },							
						});			    	
		    	});
	    	}
	    	else {
		    	console.log("No hay preguntas activas que cambiar estado");
		    	var newActiva = new window.PreguntaModel({
						pregunta_id : radio_respuesta,
						activa : true	
					});
					
					newActiva.save({
						success: function(model, result, options) {
							//alert("Pregunta activada correctamente");
							expoApp.navigate("", {trigger : true});
						},
						error: function(model, result, options) {
							alert("Pregunta NO activada correctamente");
						}		
					});
	    	}   		
     	}
    	else {
	    	alert("No has activado ninguna pregunta");
    	}
    	    	      
      return this;
    }
  });
  
  // Mostrar la gráfica

	ShowView = Backbone.View.extend({
    className:"span8",
    tagName: "div",
    el: "#pad-wrapper",

    events: {
       "click #refresh": "refresh"
    },

    initialize: function() {
    
    	var pregunta_id,
    			titulo,
    			opcion_1,
    			opcion_2,
    			opcion_3,
    			opcion_4,
    			opcion_5;
    
      this.template = _.template($('#show_graph').html());
      this.render();
      
      // Buscar la pregunta activa
      
			var q = new StackMob.Collection.Query();
			q.equals('activa', true);

      expoApp.listaPreguntas.query(q, {   
				success: function(collection, results, options) {
		      
		      // Escribir las variables de titulo y valores
		      
		      console.log(collection.toJSON());
		      
		      var pregunta_id = collection.at(0).get("pregunta_id");
		      var titulo 			= collection.at(0).get("titulo");
		      var opcion_1 		= collection.at(0).get("opcion_1");
		      var opcion_2 		= collection.at(0).get("opcion_2");
		      var opcion_3 		= collection.at(0).get("opcion_3");
		      var opcion_4 		= collection.at(0).get("opcion_4");
		      var opcion_5 		= collection.at(0).get("opcion_5");	
		      
      		var valor_opc1 = 0;
					var valor_opc2 = 0;
					var valor_opc3 = 0;
					var valor_opc4 = 0;
					var valor_opc5 = 0;
					
					$("#title_chart").html(titulo);
		      
		      var qr = new StackMob.Collection.Query();
		      qr.equals('pregunta_id', pregunta_id);
		      
		      var respGrafica = new window.RespuestasCollection();
		      
		      respGrafica.query(qr, {   
			      success: function(collection, results, options) {
			      
			      	console.log(collection.toJSON());
			      	
			      	collection.each(function(model) {
				      	console.log(model.toJSON());
				      	
				      	var respuesta = model.get("respuesta");
							  
							  switch (respuesta) {
								  case '1':
								  	valor_opc1++;
								  	break;
								  case '2':
								  	valor_opc2++;
								  	break;
								  case '3':
								  	valor_opc3++;
								  	break;
								  case '4':
								  	valor_opc4++;
								  	break;
								  case '5':
								  	valor_opc5++;
								  	break;
								  default:
								  	console.log("Valor incorrecto"); 	
								}
			      	});
							
				      var grafica = new Morris.Bar({
							  // ID of the element in which to draw the chart.
							  element: 'expo_chart',
							  // Chart data records -- each entry in this array corresponds to a point on
							  // the chart.
							  data: [
									{ columna: opcion_1,   value: valor_opc1 },
									{ columna: opcion_2,   value: valor_opc2 },
									{ columna: opcion_3,   value: valor_opc3 },
									{ columna: opcion_4,   value: valor_opc4 },
									{ columna: opcion_5,   value: valor_opc5 }
								],
							  // The name of the data record attribute that contains x-values.
							  xkey: 'columna',
							  // A list of names of data record attributes that contain y-values.
							  ykeys: ['value'],
							  // Labels for the ykeys -- will be displayed when you hover over the
							  // chart.
							  labels: ['Votos']
							});
							
							$("#title_chart").show();
							//$("#refresh").hide(); 													
			      
			      },
			      error: function(model, results, options) {  
				      alert("No puedo cargar la lista de respuestas");
				    }	
		      });	      		      		      			
				},
				error: function(model, results, options) {  
					alert("No puedo cargar la lista de preguntas");
				}	        
			});   
    },

    render: function() {
      $(this.el).html(this.template());
      $('.row').append(this.el);
      return this;
    },

    refresh: function(e) {
    	e.preventDefault();
			    	      
      return this;
    }
  });
  
  // Router 
  
  AppRouter = Backbone.Router.extend({

    routes:{
    	"":"home",
      "nueva":"nueva",
      "activar":"activar",
      "resultados":"grafica",
      "logout":"logout",
      "*path":  "logout"
    },
    
    initialize:function () {
    	this.listaPreguntas = new window.PreguntasCollection();
    	console.log("Router initialize...");
    },
    
    updateCounters:function() {
	    
	    var usuarios = new window.UsuariosCollection();
	    
	    var q = new StackMob.Collection.Query();
			q.isNotNull('username');
			 
			//call count
			usuarios.count(q, {
			  success: function(count) {
			    console.log('count is:' + count );
			    
			    $("#usuarios_counter").html(count);
			  }
			});    

	    var preguntas = new window.PreguntasCollection();
	    
	    var q = new StackMob.Collection.Query();
			q.isNotNull('titulo');
			 
			//call count
			preguntas.count(q, {
			  success: function(count) {
			    console.log('count is:' + count );
			    
			    $("#preguntas_counter").html(count);
			  }
			});   

	    var respuestas = new window.RespuestasCollection();
	    
	    var q = new StackMob.Collection.Query();
			q.isNotNull('respuesta');
			 
			//call count
			respuestas.count(q, {
			  success: function(count) {
			    console.log('count is:' + count );
			    
			    $("#respuestas_counter").html(count);
			  }
			}); 
	    
    },
    
    home:function() {
    	if(StackMob.isUserLoggedIn('admin')) {		    	
	    	$("#home_menu").attr("class","active");
	    	$("#add_menu").attr("class","");
	    	$("#activate_menu").attr("class","");
	    	$("#graph_menu").attr("class","");
	
	    	$("#pointer_div1").show();
	    	$("#pointer_div2").hide();
	    	$("#pointer_div3").hide();
	    	$("#pointer_div4").hide();
	
	      console.log('Home');
	      
	      // test if an user is logged     
	      
	      this.updateCounters();
	      
	      new HomeView();				  				  
			}
			else {
				console.log("No había usuario logado");		
				window.location.assign("index.html");					
			}     
    },   

    nueva:function() {
    	if(StackMob.isUserLoggedIn('admin')) {		    	
	    	$("#home_menu").attr("class","");
	    	$("#add_menu").attr("class","active");
	    	$("#activate_menu").attr("class","");
	    	$("#graph_menu").attr("class","");
	
	    	$("#pointer_div1").hide(); 	
	    	$("#pointer_div2").show();
	    	$("#pointer_div3").hide();
	    	$("#pointer_div4").hide();
	
	      console.log('Add question');
	      
				this.updateCounters();
	      
	      new AddView();			  				  
			}
			else {
				console.log("No había usuario logado");		
				window.location.assign("index.html");					
			}      
    },

    activar:function() {
    	if(StackMob.isUserLoggedIn('admin')) {		    	
	    	$("#home_menu").attr("class","");
	    	$("#add_menu").attr("class","");
	    	$("#activate_menu").attr("class","active");
	    	$("#graph_menu").attr("class","");
	    	
	     	$("#pointer_div1").hide(); 	
	    	$("#pointer_div2").hide();
	    	$("#pointer_div3").show();
	    	$("#pointer_div4").hide();
	    
	      console.log('Activate Question');
	      
	      this.updateCounters();
	      
	      new ActivateView();			  				  
			}
			else {
				console.log("No había usuario logado");		
				window.location.assign("index.html");					
			}      
    },    

    grafica:function() {
    	if(StackMob.isUserLoggedIn('admin')) {		    	
	    	$("#home_menu").attr("class","");
	    	$("#add_menu").attr("class","");
	    	$("#activate_menu").attr("class","");
	    	$("#graph_menu").attr("class","active");   
	 
	      $("#pointer_div1").hide(); 	
	    	$("#pointer_div2").hide();
	    	$("#pointer_div3").hide(); 
	    	$("#pointer_div4").show();
	    
	      console.log('Show Graph');
	      
	      this.updateCounters();
	      
	      new ShowView();		  				  
			}
			else {
				console.log("No había usuario logado");		
				window.location.assign("index.html");					
			}      
    },
    
    logout:function() {  
      if(StackMob.isUserLoggedIn('admin')) {	  
			 	var user = new StackMob.User({ username: 'admin'});						
				user.logout();
				window.location.assign("index.html");
		  }
			else {
				console.log("No había usuario logado");		
				window.location.assign("index.html");					
			}  		       	    
    }
  });

}(jQuery));

$(document).ready(function () {

		// Models
	
		window.PreguntaModel = StackMob.Model.extend({
			schemaName: 'pregunta'    
		});
		
		window.PreguntasCollection = StackMob.Collection.extend({
			model:	window.PreguntaModel    
		});

		window.RespuestaModel = StackMob.Model.extend({
			schemaName: 'respuesta'    
		});
		
		window.RespuestasCollection = StackMob.Collection.extend({
			model:	window.RespuestaModel    
		});
		
		window.UsuarioModel = StackMob.Model.extend({
			schemaName: 'user'    
		});
		
		window.UsuariosCollection = StackMob.Collection.extend({
			model:	window.UsuarioModel    
		});

		console.log('Routing init...');
		
		// Router start
		
    expoApp = new AppRouter();
    Backbone.history.start();
});

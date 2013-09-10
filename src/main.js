/*
 * IFAES Mobile App
 * Creada por imelius - www.imelius.com
 * Backbone Router App
 */


/* Push notification functions */

function tokenHandler(msg) {
    //alert("tokenHandler function");
    console.log("Token Handler " + msg);
    app.device_token=msg;
}
    
function errorHandler(error) {
    //alert("errorHandler function");
    console.log("Error Handler  " + error);
    //alert(error);
}

function successHandler(result) {
    alert('Success! Result = '+result);
    console.log("Success Result  " + result);
}

//IOS
function onNotificationAPN(event) {
    var pushNotification = window.plugins.pushNotification;
    console.log("Received a notification! " + event.alert);
    console.log("event sound " + event.sound);
    console.log("event badge " + event.badge);
    console.log("event " + event);
    if (event.alert) {
            navigator.notification.alert(event.alert);
    }
    if (event.badge) {
            console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
    }
    if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
    }
}

//ANDROID
function onNotificationGCM(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    alert('registration id = '+e.regid);
                }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model
              // of the intermediary push server which must also be reflected in GCMIntentService.java
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;

            case 'error':
              alert('GCM error = '+e.msg);
            break;

            default:
              alert('An unknown GCM event has occurred');
              break;
        }
}


/* Backbone router */

var AppRouter = Backbone.Router.extend({

	// Router listen by Backbone.js

  routes:{
    "":"init",
    "home":"home",
    "login":"login",
    "registro":"registro",
    "condiciones":"condiciones",
    "sala-1":"sala_1",
    "sala-2":"sala_2",
    "sala-p":"sala_p",
    "otras-act":"otras_act",
    "ponentes":"ponentes",
    "votar":"votar",
    "votar-thx":"votar_thx",
    "ponentes/:id":"ponentes_id",
    "ponentesponencia/:id":"ponentes_ponencia_id",
    "imelius":"imelius",
    "ifaes":"ifaes",
    "patrocinadores":"patrocinadores",
    "info":"info",
    "infoexpo":"infoexpo",
    "programa":"programa"
  },

  initialize:function () {
    
    // Flag para impedir animación en página inicial
    
    this.firstPage = true;    
    this.user = new window.User({username: '', logado: false});
    this.listaPonentes = new window.ListaPonentes();
    this.listaPonentesPonencia  = new window.ListaPonentes();
    
    console.log("Inicializando Router ...");
    
    //PhoneGap 
    this.bindEvents();
  },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {
        //alert("Device Ready:"+ device.model);        
        pushNotification = window.plugins.pushNotification;
        
        if (device.platform == 'android' || device.platform == 'Android') {
                pushNotification.registerDevice({ alert:true, badge:true, sound:true,  projectid: "...your GCM project number...", appid : "CDAPP-00000" },
                                    function(status) {
                                        var pushToken = status;
                                        showStatusMsg('push token: ' + JSON.stringify(pushToken));
                                    },
                                    function(status) {
                                        showStatusMsg(JSON.stringify(['failed to register', status]));
                                    });


        } else {
            console.log("ios device");
            pushNotification.registerDevice({ alert:true, badge:true, sound:true,  appname: "ifaesBETA", pw_appid : "ABF08-7738C" },
                                    function(status) {
                                        var pushToken = status;
                                        console.log("success, TOKEN:"+ pushToken);
                                        //showStatusMsg('push token: ' + JSON.stringify(pushToken));                                        
                                    },
                                    function(status) {
                                        console.log("TOKEN:"+ pushToken);
                                        //showStatusMsg(JSON.stringify(['failed to register', status]));
                                        
                                    });

        }
                    
    },
    

  init:function () {
  
  	$.mobile.loading( 'show', {
			text: '',
			textVisible: false,
			theme: 'c',
			html: ""
		});	
    
		//app.navigate("#home", {trigger: true});
		app.navigate("#login", {trigger: true});	
  },

  home:function() {
      // TEST de momento no verificamos el login de usuario --> 
	  StackMob.getLoggedInUser({
			success: function(username) {
			  if (username) {
			  	localStorage.page="#home";  		
			  	//app.navigate("#home", {trigger: true});	
				  app.changePage(new window.HomeView());	
				} 
				else {
			  	localStorage.page = "#login"; 		   		
			  	app.navigate("#login", {trigger: true});	
				  //app.changePage(new window.LoginView());
				}				
			},
			error: function(model, response, options){
		  	localStorage.page = "#login"; 		   		
		  	app.navigate("#login", {trigger: true});	
			  //app.changePage(new window.LoginView());
			}
		});	 
		//<-- TEST */
		//app.changePage(new window.HomeView());  // mostramos directamente la home   						
  },
  
  // funciones nuevas
  
  infoexpo:function(){
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                localStorage.page="#infoexpo";          
                //app.navigate("#home", {trigger: true});   
                  app.changePage(new window.InfoexpoView());    
                } 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            },
            error: function(model, response, options){
            localStorage.page = "#login";               
            app.navigate("#login", {trigger: true});    
              //app.changePage(new window.LoginView());
            }
        });
      //app.changePage(new window.InfoexpoView());
  },
  
  sala_1:function(){
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                localStorage.page="#sala-1";          
                //app.navigate("#home", {trigger: true});   
                  app.changePage(new window.Sala_1View());    
                } 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            },
            error: function(model, response, options){
            localStorage.page = "#login";               
            app.navigate("#login", {trigger: true});    
              //app.changePage(new window.LoginView());
            }
        });
      //app.changePage(new window.Sala_1View());
  },
  
  sala_2:function(){
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                localStorage.page="#sala-2";          
                //app.navigate("#home", {trigger: true});   
                  app.changePage(new window.Sala_2View());    
                } 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            },
            error: function(model, response, options){
            localStorage.page = "#login";               
            app.navigate("#login", {trigger: true});    
              //app.changePage(new window.LoginView());
            }
        });
      //app.changePage(new window.Sala_2View());
  },
  
  sala_p:function(){
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                localStorage.page="#sala-p";          
                //app.navigate("#home", {trigger: true});   
                  app.changePage(new window.Sala_pView());    
                } 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            },
            error: function(model, response, options){
            localStorage.page = "#login";               
            app.navigate("#login", {trigger: true});    
              //app.changePage(new window.LoginView());
            }
        });
      //app.changePage(new window.Sala_pView());
  },
  
  otras_act:function(){
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                localStorage.page="#otras-act";          
                //app.navigate("#home", {trigger: true});   
                  app.changePage(new window.Otras_actView());    
                } 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            },
            error: function(model, response, options){
            localStorage.page = "#login";               
            app.navigate("#login", {trigger: true});    
              //app.changePage(new window.LoginView());
            }
        });
      //app.changePage(new window.Otras_actView());
  },
  
  programa:function(){
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                localStorage.page="#programa";          
                //app.navigate("#home", {trigger: true});   
                  app.changePage(new window.ProgramaView());    
                } 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            },
            error: function(model, response, options){
            localStorage.page = "#login";               
            app.navigate("#login", {trigger: true});    
              //app.changePage(new window.LoginView());
            }
        });
      //app.changePage(new window.ProgramaView());
  },
  
  votar_thx:function(){
      app.changePage(new window.Votar_thxView());
  },
    
    
  login:function() { 

	  StackMob.getLoggedInUser({
			success: function(username) {
			
				if (username) {
				
					var page = localStorage.page;
					
					if (page == "" || page==null || page==undefined) {				
						localStorage.page = "#login";
					  app.changePage(new window.LoginView());
					}
					else {
				  	$.mobile.loading( 'hide', {
							text: '',
							textVisible: false,
							theme: 'c',
							html: ""
						});	
	
						// An user is already logged, so override login process
						
						app.user.set({username: username});
						app.user.set({logado: true});						
						app.navigate(page, {trigger: true});											
					}				
				} 
				else {

			  	$.mobile.loading( 'hide', {
						text: '',
						textVisible: false,
						theme: 'c',
						html: ""
					});	

					// Nobody is logged, so start the login process
				
					//localStorage.page = "#login";
					//app.navigate("#login", {trigger: true});
					
			  	localStorage.page = "#login"; 		   		
				  app.changePage(new window.LoginView());
				}				
			},
			error: function(model, response, options){

		  	$.mobile.loading( 'hide', {
					text: '',
					textVisible: false,
					theme: 'c',
					html: ""
				});	

				// Nobody is logged, so start the login process
				
		  	localStorage.page = "#login"; 		   		
			  app.changePage(new window.LoginView());
			}
		});	      					
  },
  
  registro:function() {
	  localStorage.page = "#registro";  		
	  app.changePage(new window.RegistrarView({model: app.user}));  
  },
 
  condiciones:function() {
  		
		// Cambiar a la página de condiciones de uso
		
		var condiciones = new window.Condiciones({origen : 'login'});
		localStorage.page = "#condiciones";
		app.changePage(new window.CondicionesView({model: condiciones}));		  
  },


  ponentes:function () {			
    var listaPonentes = this.listaPonentes;
  
		StackMob.getLoggedInUser({
			success: function(username) {		
				if (username) {	
			    $.mobile.loading( 'show', {text: '', textVisible: false, theme: 'c', html: ""});		
						
			    if(listaPonentes.isEmpty()) {    
				    listaPonentes.fetch({   
					    success: function(model, results, options) {
						    $.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});			 	
					     	localStorage.page="#ponentes";  		
					     	app.changePage(new window.PonentesView());
					    },
					    error: function(model, results, options) {  
						    $.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});			 						    
					     	alert("No hemos podido cargar la lista de ponentes");
					     	localStorage.page="#home";
					     	app.navigate("#home", {trigger: false});				
					    }	        
				    });
				  }
				  else {
					  $.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});			 	
			     	localStorage.page="#ponentes";
						app.changePage(new window.PonentesView());  
				  }    	
				} 
				else {
			  	localStorage.page = "#login"; 		   		
				  app.navigate("#login", {trigger: true});	
				  //app.changePage(new window.LoginView());
				}				
			},
			error: function(model, response, options){
		  	localStorage.page = "#login"; 		 
		  	app.navigate("#login", {trigger: true});	  		
			  //app.changePage(new window.LoginView());
			}
		});	      						    
  },
  
  votar : function () {  
		StackMob.getLoggedInUser({
			success: function(username) {		
				if (username) {		  			
					$.mobile.loading( 'show', {text: '', textVisible: false, theme: 'c', html: ""});					
					
					var preguntas = new window.ListaPreguntas();
					var q = new StackMob.Collection.Query();
					q.equals('activa', true);
					
					preguntas.query(q, {
						success: function (collection, response, options) {							
							if (collection.length > 0) {
								var pregunta = collection.at(0);
								var respuestas = new window.ListaRespuestas();					
								var q = new StackMob.Collection.Query();
								
								// Ver si este usuario ya tiene una respuesta para esta pregunta					
								var owner = 'user/' + app.user.get('username');
								var preg_id = collection.at(0).get('pregunta_id');										
								q.equals('sm_owner', owner);
								q.equals('pregunta_id', preg_id);
								
								respuestas.query(q, {
									success: function (collection, response, options) {
										if (collection.length > 0) {
											$.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});							
											alert('Ya has votado esta pregunta!!!');
											localStorage.page="#home";
											app.navigate("#home", {trigger: false});
										}
										else {						
											$.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});
											localStorage.page="#votar";
											app.changePage(new window.VotarView({model: pregunta}));										
										}	
									},
									error: function (collection, response, options) {						
										$.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});
										
										// TODO: Mostar dialogo
										alert('Error al comprobar votación');
										localStorage.page="#home";
										app.navigate("#home", {trigger: false});
									},
								})										
							} 
							else {				
								$.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});
								alert('No hay pregunta activa');	
								localStorage.page="#home";
								app.navigate("#home", {trigger: false});
							}
						},
						error: function (collection, response, options) {			
							$.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});							
							alert('Error al cargar la pregunta');
							localStorage.page="#home";
							app.navigate("#home", {trigger: false});
						},			
					});  						
				} 
				else {
					localStorage.page = "#login"; 		   		
					app.navigate("#login", {trigger: true});	
					//app.changePage(new window.LoginView());
				}				
			},
			error: function(model, response, options) {
				localStorage.page = "#login"; 		   		
				app.navigate("#login", {trigger: true});	
				//app.changePage(new window.LoginView());
			}
		});														
  },
  
  ponentes_id:function (id) {
    var listaPonentes = this.listaPonentes;
  
	  StackMob.getLoggedInUser({
			success: function(username) {		
				if (username) {	
			    $.mobile.loading( 'show', {text: '', textVisible: false, theme: 'c', html: ""	});		
					
			    if(listaPonentes.isEmpty()) {    
				    listaPonentes.fetch({   					    
					    success: function(model, results, options) {    
						    $.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""	});	 	
								
					     	var ponente = app.listaPonentes.findWhere({ponente_id : id});	
					     	localStorage.page="#ponentes/"+id;
					     	app.changePage(new window.DetallePonentesView({model: ponente}));  	
					    },
					    error: function(model, results, options) {  
					      $.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""	});	 	
					    
					     	alert("No hemos podido cargar el ponente");
					     	localStorage.page="#home";
					     	app.navigate("#home", {trigger: true});				
					    }	        
				    });
				  }
				  else {
				    $.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""	});	 				
						
						var ponente = app.listaPonentes.findWhere({ponente_id : id});	
						localStorage.page="#ponentes/"+id;
			     	app.changePage(new window.DetallePonentesView({model: ponente}));  	
				  }
				} 
				else {
			  	localStorage.page = "#login"; 		   		
			  	app.navigate("#login", {trigger: true});	
				}				
			},
			error: function(model, response, options){
		  	localStorage.page = "#login"; 		   		
		  	app.navigate("#login", {trigger: true});	
			}
		});				  				  				  
  },
  
  ponentes_ponencia_id:function (id) {
    var listaPonentes = this.listaPonentes;
      
	  StackMob.getLoggedInUser({
			success: function(username) {		
				if (username) {					
			  	var id_ponencia = id;  
			  	
			  	$.mobile.loading( 'show', {
						text: '',
						textVisible: false,
						theme: 'c',
						html: ""
					});		
			  
			    if(listaPonentes.isEmpty()) {    
				    listaPonentes.fetch({   
					    success: function(model, results, options) {
					      
						    // Search for Ponentes en Ponencia
						    
						    var arrayponentes = app.listaPonentes.where({ponencia_id: id_ponencia});
						    app.listaPonentesPonencia.reset(arrayponentes); 
						    
						    console.log(app.listaPonentesPonencia.toJSON());
						    
						    $.mobile.loading( 'hide', {
									text: '',
									textVisible: false,
									theme: 'c',
									html: ""
								});	 				
								
					     	localStorage.page="#ponentesponencia/"+id;
					     	app.changePage(new window.PonentesPonenciaView());
				
					    },
					    error: function(model, results, options) {  
					    
						    $.mobile.loading( 'hide', {
									text: '',
									textVisible: false,
									theme: 'c',
									html: ""
								});	 	
					    
					     	alert("No hemos podido cargar la lista de ponentes");
					     	localStorage.page="#home";
					     	app.navigate("#home", {trigger: true});
				
					    }	        
				    });
				  }
				  else {
				  
				    $.mobile.loading( 'hide', {
							text: '',
							textVisible: false,
							theme: 'c',
							html: ""
						});	 	
						
				    var arrayponentes = app.listaPonentes.where({ponencia_id: id_ponencia});
				    app.listaPonentesPonencia.reset(arrayponentes); 
				    
						console.log(app.listaPonentesPonencia.toJSON());
				    
				    $.mobile.loading( 'hide', {
							text: '',
							textVisible: false,
							theme: 'c',
							html: ""
						});	 				
						
				   	localStorage.page="#ponentesponencia/"+id;
				   	app.changePage(new window.PonentesPonenciaView());
				  }

				} 
				else {
			  	localStorage.page = "#login"; 		   		
			  	app.navigate("#login", {trigger: true});	
				  //app.changePage(new window.LoginView());
				}				
			},
			error: function(model, response, options){
		  	localStorage.page = "#login"; 		   		
		  	app.navigate("#login", {trigger: true});	
			  //app.changePage(new window.LoginView());
			}
		});	     
  },
  
  imelius:function () {
  	localStorage.page="#imelius";  
		app.changePage(new window.ImeliusView());  				
  },
  
  ifaes:function () {  

    /* TEST ---> De momento no verificamos el usuario en Stackmob 
	  StackMob.getLoggedInUser({
			success: function(username) {		
				if (username) {					
			  	localStorage.page="#konecta";    
					app.changePage(new window.KonectaView());  
				} 
				else {
			  	localStorage.page = "#login"; 	
			  	app.navigate("#login", {trigger: true});		   		
				  //app.changePage(new window.LoginView());
				}				
			},
			error: function(model, response, options){
		  	localStorage.page = "#login"; 		   		
		  	app.navigate("#login", {trigger: true});	
			  //app.changePage(new window.LoginView());
			}
		});	 
	   <-- TEST */
	  	app.changePage(new window.IFAESView());   	
  },
  
  patrocinadores:function () {  
      // TEST ---> De momento no verificamos el login en stackmob		
	  StackMob.getLoggedInUser({
			success: function(username) {		
				if (username) {					
					localStorage.page="#patrocinadores"; 
					app.changePage(new window.PatrocinadoresView()); 
				} 
				else {
			  	localStorage.page = "#login"; 
			  	app.navigate("#login", {trigger: true});			   		
				  //app.changePage(new window.LoginView());
				}				
			},
			error: function(model, response, options){
		  	localStorage.page = "#login"; 		   		
		  	app.navigate("#login", {trigger: true});	
			  //app.changePage(new window.LoginView());
			}
		});	
		//<--- TEST */
		//app.changePage(new window.PatrocinadoresView()); // Cargamos directamente la página de patrocinadores  	
  },

  info:function () {  
    // TEST ---> De momento no verificamos el login en stackmob 
	  StackMob.getLoggedInUser({
			success: function(username) {		
				if (username) {					
				  localStorage.page="#info"; 
					app.changePage(new window.InfoView());  
				} 
				else {
			  	localStorage.page = "#login"; 		   		
				  app.navigate("#login", {trigger: true});	
				  //app.changePage(new window.LoginView());
				}				
			},
			error: function(model, response, options){
		  	localStorage.page = "#login"; 		   		
		  	app.navigate("#login", {trigger: true});	
			  //app.changePage(new window.LoginView());
			}
		});	  	
		//<--- TEST */
		//app.changePage(new window.InfoView()); // Cargamos directamente la página de Info
  },
    
  changePage:function (page) {
  	
  	// Add the Page attribute for jQM visualitation
  	
    $(page.el).attr('data-role', 'page');
    $(page.el).attr('data-theme', 'd');

    // Tell the View to render itself the HTML content
    
    page.render();
    
    // Add the rendered page to the body content
    
    $('body').append($(page.el));
    
    // Add the footer to everypage
    
    var footer = new window.FooterView();
		footer.render();				
		$($(page.el)).append($(footer.el));  
		
    
    // Define the page transition 
    
    var transition = "flow"; 
    
    // We don't want to slide the first page
    
    if (this.firstPage) {
      transition = 'none';
      this.firstPage = false;
    }
    
    // Tell jQM to show our new page
    
    $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
  }
});

$(document).ready(function () {

	$.mobile.loading( 'show', {
		text: '',
		textVisible: false,
		theme: 'c',
		html: ""
	});	
            
  // Load HTML View templates
  // Same name than tpl/<file> without .html
  
  tpl.loadTemplates([
  	'footer',
  	'infoexpo',
  	'programa',
  	'login',
  	'registro',
  	'condiciones', 
  	'home', 
  	'sala-1',
  	'sala-2',
  	'sala-p',
  	'otras-act', 
  	'panel-lateral',
  	'ponentes', 
  	'detalle-ponentes',
  	'ponentes-ponencia', 
  	'celda_ponentes', 
  	'votar',
  	'votar-2',
  	'votar-3',
  	'votar-4',
  	'votar-thx',
  	'imelius', 
  	'konecta',
  	'patrocinadores',
  	'info'], function () {

       // After template loading we start the backbone routing engine
      app = new AppRouter();
      // Allow to use Back browser button      
      Backbone.history.start();
    });
});
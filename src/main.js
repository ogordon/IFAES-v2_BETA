/*
 * IFAES Mobile App
 * Creada por imelius - www.imelius.com
 * Backbone Router App
 */


/* Push notification functions */
// comento todo lo relativo a notificaciones push
/*
function tokenHandler(msg) {
    alert("tokenHandler function");
    console.log("Token Handler " + msg);
    app.device_token=msg;
    PushWoosh.appCode = "ABF08-7738C";
    PushWoosh.register(msg, function(data) {
                        alert("PushWoosh register success: " + JSON.stringify(data));
                    }, function(errorregistration) {
                        alert("Couldn't register with PushWoosh" +  errorregistration);
                    });
}
    
function errorHandler(error) {
    alert("errorHandler function");
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
                    console.debug("REGISTRATION_ID: "+ e.regid);
                    console.log("REGISTRATION_ID: "+ e.regid);
                    PushWoosh.appCode = "ABF08-7738C";
                    PushWoosh.register(e.regid, function(data) {
                         alert("PushWoosh register success: " + JSON.stringify(data));
                     }, function(errorregistration) {
                         alert("Couldn't register with PushWoosh" +  errorregistration);
                     });
                }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model
              // of the intermediary push server which must also be reflected in GCMIntentService.java
              alert('IFAES Informa: '+e.message);
            break;

            case 'error':
              alert('GCM error = '+e.msg);
            break;

            default:
              alert('An unknown GCM event has occurred');
              break;
        }
}
*/ // fin comentario de funciones push
/* END OF PUSH FUNCTIONS */


/* Backbone router */

var AppRouter = Backbone.Router.extend({

	// Router listen by Backbone.js

  routes:{
    "":"init",
    "home":"home",
    "login":"login",
    "registro":"registro",
    "condiciones":"condiciones",
    "sala-1":"sala_1_srv",
    "sala-2":"sala_2_srv",
    "sala-p":"sala_p_srv",
    "otras-act":"otras_act_srv",
    "ponentes":"ponentes",
    "votar":"votar",
    "votar-thx":"votar_thx",
    "ponentes/:id":"ponentes_id",
    "ponentesponencia/:id":"ponentes_ponencia_id",
    "imelius":"imelius",
    "ifaes":"ifaes",
    "patrocinadores":"patrocinadores",
    "patrocinadores/:id":"patrocinadores_id",
    "info":"info",
    "infoexpo":"infoexpo",
    "programa":"programa",
    "marco-patrocinador/:id":"marco_patrocinador"
  },

  initialize:function () {
    
    // Flag para impedir animación en página inicial
    
    this.firstPage = true;    
    this.user = new window.User({username: '', logado: false});
    this.listaPonentes = new window.ListaPonentes();
    
    // Variables para gestionar la carga dinámica de las agendas desde Stackmob
    this.listaAgendas = new window.ListaAgendas();
    
    this.Agenda1Tramo1 = new window.ListaAgendas();
    this.Agenda1Tramo2 = new window.ListaAgendas();
    this.Agenda1Tramo3 = new window.ListaAgendas();
    this.Agenda1Tramo4 = new window.ListaAgendas();
    this.Agenda1Tramo5 = new window.ListaAgendas();
    
    this.Agenda2Tramo1 = new window.ListaAgendas();
    this.Agenda2Tramo2 = new window.ListaAgendas();
    this.Agenda2Tramo3 = new window.ListaAgendas();
    this.Agenda2Tramo4 = new window.ListaAgendas();
    this.Agenda2Tramo5 = new window.ListaAgendas();
    
    this.Agenda3Tramo1 = new window.ListaAgendas();
    this.Agenda3Tramo2 = new window.ListaAgendas();
    this.Agenda3Tramo3 = new window.ListaAgendas();
    this.Agenda3Tramo4 = new window.ListaAgendas();
    this.Agenda3Tramo5 = new window.ListaAgendas();
    
    this.Agenda4Tramo1 = new window.ListaAgendas();
    this.Agenda4Tramo2 = new window.ListaAgendas();
    this.Agenda4Tramo3 = new window.ListaAgendas();
    this.Agenda4Tramo4 = new window.ListaAgendas();
    this.Agenda4Tramo5 = new window.ListaAgendas();
    
    this.listaPonentesPonencia  = new window.ListaPonentes();
    
    console.log("Inicializando Router ...");
    
    //comento todo lo referente a PhoneGap
    //PhoneGap 
    //this.bindEvents();
  },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    //Comento todo lo referente a PhoneGap
    
    /*
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {
        alert("Device Ready:"+ device.model);
        alert("Device Platform:"+ device.platform);
        console.log("Device Ready");
        console.debug("Debug: Device Ready"+ device.platform);        
        pushNotification = window.plugins.pushNotification;
        
        
        if (device.platform == 'android' || device.platform == 'Android') {
            alert("Android device"+ device.model);
            console.log("Android Device");
            console.debug("Debug: Android Device"); 
            //Change GCM sender ID 
            pushNotification.register(successHandler, errorHandler,{"senderID":"176955130145","ecb":"onNotificationGCM"});
        }
        else {
            alert("IOS device:"+ device.platform);
            console.log("iOS Device");
            console.debug("Debug: iOS Device");
            pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"}); 
        }
                    
    },
    */
    

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
  
    marco_patrocinador:function(id) {
      // TEST de momento no verificamos el login de usuario -->
      console.log("marco_patrocinador function"); 
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                localStorage.page="#marco_patrocinador/"+id;          
                       
                  app.changePage(new window.MarcoPatrocinadorView());
                  $(document).ready(function() {
                    $('#external_url').load('www.avaya.es');
                  }); 
                  
                    
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

/* ----- Método antiguo. Sala con información estática ------ */
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
/*-----------------      END  --------------------*/
  sala_1_srv:function(){
      var listaAgendas = this.listaAgendas;
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                if(listaAgendas.isEmpty()) {    
                    listaAgendas.fetch({   
                        success: function(model, results, options) {                          
                            // Search for schedule entries                            
                            var ag1_tramo1 = app.listaAgendas.where({n_sala: "001", n_tramo: "001"});
                            var ag1_tramo2 = app.listaAgendas.where({n_sala: "001", n_tramo: "002"});
                            var ag1_tramo3 = app.listaAgendas.where({n_sala: "001", n_tramo: "003"});
                            var ag1_tramo4 = app.listaAgendas.where({n_sala: "001", n_tramo: "004"});
                            var ag1_tramo5 = app.listaAgendas.where({n_sala: "001", n_tramo: "005"});
                            
                            app.Agenda1Tramo1.reset(ag1_tramo1);
                            app.Agenda1Tramo2.reset(ag1_tramo2);
                            app.Agenda1Tramo3.reset(ag1_tramo3);
                            app.Agenda1Tramo4.reset(ag1_tramo4);
                            app.Agenda1Tramo5.reset(ag1_tramo5);
                            
                            $.mobile.loading( 'hide', {
                                    text: '',
                                    textVisible: false,
                                    theme: 'c',
                                    html: ""
                                });                            
                            
                            localStorage.page="#sala-1";          
                            //app.navigate("#home", {trigger: true});   
                            app.changePage(new window.Sala_1_srvView());    
                        }, //end of success function
                        error: function(model, results, options) {  
                        
                            $.mobile.loading( 'hide', {
                                    text: '',
                                    textVisible: false,
                                    theme: 'c',
                                    html: ""
                                });     
                        
                            alert("No hemos podido cargar la agenda de la sala 1");
                            localStorage.page="#home";
                            app.navigate("#home", {trigger: true});
                
                        } //end of error function
                    }); //end of fetch
                } //end IF listaAgendas is Empty
                else{ // listaAgendas IS NOT EMPTY
                    
                            var ag1_tramo1 = app.listaAgendas.where({n_sala: "001", n_tramo: "001"});
                            var ag1_tramo2 = app.listaAgendas.where({n_sala: "001", n_tramo: "002"});
                            var ag1_tramo3 = app.listaAgendas.where({n_sala: "001", n_tramo: "003"});
                            var ag1_tramo4 = app.listaAgendas.where({n_sala: "001", n_tramo: "004"});
                            var ag1_tramo5 = app.listaAgendas.where({n_sala: "001", n_tramo: "005"});
                            
                            app.Agenda1Tramo1.reset(ag1_tramo1);
                            app.Agenda1Tramo2.reset(ag1_tramo2);
                            app.Agenda1Tramo3.reset(ag1_tramo3);
                            app.Agenda1Tramo4.reset(ag1_tramo4);
                            app.Agenda1Tramo5.reset(ag1_tramo5);
                    
                            $.mobile.loading( 'hide', {
                                text: '',
                                textVisible: false,
                                theme: 'c',
                                html: ""
                            });
                            
                            localStorage.page="#sala-1";          
                            //app.navigate("#home", {trigger: true});   
                            app.changePage(new window.Sala_1_srvView());                        
                } //end of else not empty
                } // end of IF username 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            }, //end of stackmob login success function
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
  
  sala_2_srv:function(){
      var listaAgendas = this.listaAgendas;
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                if(listaAgendas.isEmpty()) {    
                    listaAgendas.fetch({   
                        success: function(model, results, options) {                          
                            // Search for schedule entries                            
                            var ag2_tramo1 = app.listaAgendas.where({n_sala: "002", n_tramo: "001"});
                            var ag2_tramo2 = app.listaAgendas.where({n_sala: "002", n_tramo: "002"});
                            var ag2_tramo3 = app.listaAgendas.where({n_sala: "002", n_tramo: "003"});
                            var ag2_tramo4 = app.listaAgendas.where({n_sala: "002", n_tramo: "004"});
                            var ag2_tramo5 = app.listaAgendas.where({n_sala: "002", n_tramo: "005"});
                            
                            app.Agenda2Tramo1.reset(ag2_tramo1);
                            app.Agenda2Tramo2.reset(ag2_tramo2);
                            app.Agenda2Tramo3.reset(ag2_tramo3);
                            app.Agenda2Tramo4.reset(ag2_tramo4);
                            app.Agenda2Tramo5.reset(ag2_tramo5);
                            
                            $.mobile.loading( 'hide', {
                                    text: '',
                                    textVisible: false,
                                    theme: 'c',
                                    html: ""
                                });                            
                            
                            localStorage.page="#sala-2";          
                            //app.navigate("#home", {trigger: true});   
                            app.changePage(new window.Sala_2_srvView());    
                        }, //end of success function
                        error: function(model, results, options) {  
                        
                            $.mobile.loading( 'hide', {
                                    text: '',
                                    textVisible: false,
                                    theme: 'c',
                                    html: ""
                                });     
                        
                            alert("No hemos podido cargar la agenda de la sala 2");
                            localStorage.page="#home";
                            app.navigate("#home", {trigger: true});
                
                        } //end of error function
                    }); //end of fetch
                } //end IF listaAgendas is Empty
                else{ // listaAgendas IS NOT EMPTY
                    
                            var ag2_tramo1 = app.listaAgendas.where({n_sala: "002", n_tramo: "001"});
                            var ag2_tramo2 = app.listaAgendas.where({n_sala: "002", n_tramo: "002"});
                            var ag2_tramo3 = app.listaAgendas.where({n_sala: "002", n_tramo: "003"});
                            var ag2_tramo4 = app.listaAgendas.where({n_sala: "002", n_tramo: "004"});
                            var ag2_tramo5 = app.listaAgendas.where({n_sala: "002", n_tramo: "005"});
                            
                            app.Agenda2Tramo1.reset(ag2_tramo1);
                            app.Agenda2Tramo2.reset(ag2_tramo2);
                            app.Agenda2Tramo3.reset(ag2_tramo3);
                            app.Agenda2Tramo4.reset(ag2_tramo4);
                            app.Agenda2Tramo5.reset(ag2_tramo5);
                    
                            $.mobile.loading( 'hide', {
                                text: '',
                                textVisible: false,
                                theme: 'c',
                                html: ""
                            });
                            
                            localStorage.page="#sala-2";          
                            //app.navigate("#home", {trigger: true});   
                            app.changePage(new window.Sala_2_srvView());                        
                } //end of else not empty
                } // end of IF username 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            }, //end of stackmob login success function
            error: function(model, response, options){
            localStorage.page = "#login";               
            app.navigate("#login", {trigger: true});    
              //app.changePage(new window.LoginView());
            }
        });
      
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
  
  sala_p_srv:function(){
      var listaAgendas = this.listaAgendas;
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                if(listaAgendas.isEmpty()) {    
                    listaAgendas.fetch({   
                        success: function(model, results, options) {                          
                            // Search for schedule entries                            
                            var ag3_tramo1 = app.listaAgendas.where({n_sala: "003", n_tramo: "001"});
                            var ag3_tramo2 = app.listaAgendas.where({n_sala: "003", n_tramo: "002"});
                            var ag3_tramo3 = app.listaAgendas.where({n_sala: "003", n_tramo: "003"});
                            var ag3_tramo4 = app.listaAgendas.where({n_sala: "003", n_tramo: "004"});
                            var ag3_tramo5 = app.listaAgendas.where({n_sala: "003", n_tramo: "005"});
                            
                            app.Agenda3Tramo1.reset(ag3_tramo1);
                            app.Agenda3Tramo2.reset(ag3_tramo2);
                            app.Agenda3Tramo3.reset(ag3_tramo3);
                            app.Agenda3Tramo4.reset(ag3_tramo4);
                            app.Agenda3Tramo5.reset(ag3_tramo5);
                            
                            $.mobile.loading( 'hide', {
                                    text: '',
                                    textVisible: false,
                                    theme: 'c',
                                    html: ""
                                });                            
                            
                            localStorage.page="#sala-p";          
                            //app.navigate("#home", {trigger: true});   
                            app.changePage(new window.Sala_p_srvView());    
                        }, //end of success function
                        error: function(model, results, options) {  
                        
                            $.mobile.loading( 'hide', {
                                    text: '',
                                    textVisible: false,
                                    theme: 'c',
                                    html: ""
                                });     
                        
                            alert("No hemos podido cargar la agenda de la sala paralela");
                            localStorage.page="#home";
                            app.navigate("#home", {trigger: true});
                
                        } //end of error function
                    }); //end of fetch
                } //end IF listaAgendas is Empty
                else{ // listaAgendas IS NOT EMPTY
                    
                            var ag3_tramo1 = app.listaAgendas.where({n_sala: "003", n_tramo: "001"});
                            var ag3_tramo2 = app.listaAgendas.where({n_sala: "003", n_tramo: "002"});
                            var ag3_tramo3 = app.listaAgendas.where({n_sala: "003", n_tramo: "003"});
                            var ag3_tramo4 = app.listaAgendas.where({n_sala: "003", n_tramo: "004"});
                            var ag3_tramo5 = app.listaAgendas.where({n_sala: "003", n_tramo: "005"});
                            
                            app.Agenda3Tramo1.reset(ag3_tramo1);
                            app.Agenda3Tramo2.reset(ag3_tramo2);
                            app.Agenda3Tramo3.reset(ag3_tramo3);
                            app.Agenda3Tramo4.reset(ag3_tramo4);
                            app.Agenda3Tramo5.reset(ag3_tramo5);
                    
                            $.mobile.loading( 'hide', {
                                text: '',
                                textVisible: false,
                                theme: 'c',
                                html: ""
                            });
                            
                            localStorage.page="#sala-p";          
                            //app.navigate("#home", {trigger: true});   
                            app.changePage(new window.Sala_p_srvView());                        
                } //end of else not empty
                } // end of IF username 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            }, //end of stackmob login success function
            error: function(model, response, options){
            localStorage.page = "#login";               
            app.navigate("#login", {trigger: true});    
              //app.changePage(new window.LoginView());
            }
        });
      
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
  
  otras_act_srv:function(){
      var listaAgendas = this.listaAgendas;
      StackMob.getLoggedInUser({
            success: function(username) {
              if (username) {
                if(listaAgendas.isEmpty()) {    
                    listaAgendas.fetch({   
                        success: function(model, results, options) {                          
                            // Search for schedule entries                            
                            var ag4_tramo1 = app.listaAgendas.where({n_sala: "004", n_tramo: "001"});
                            var ag4_tramo2 = app.listaAgendas.where({n_sala: "004", n_tramo: "002"});
                            var ag4_tramo3 = app.listaAgendas.where({n_sala: "004", n_tramo: "003"});
                            var ag4_tramo4 = app.listaAgendas.where({n_sala: "004", n_tramo: "004"});
                            var ag4_tramo5 = app.listaAgendas.where({n_sala: "004", n_tramo: "005"});
                            
                            app.Agenda4Tramo1.reset(ag4_tramo1);
                            app.Agenda4Tramo2.reset(ag4_tramo2);
                            app.Agenda4Tramo3.reset(ag4_tramo3);
                            app.Agenda4Tramo4.reset(ag4_tramo4);
                            app.Agenda4Tramo5.reset(ag4_tramo5);
                            
                            $.mobile.loading( 'hide', {
                                    text: '',
                                    textVisible: false,
                                    theme: 'c',
                                    html: ""
                                });                            
                            
                            localStorage.page="#otras-act";          
                            //app.navigate("#home", {trigger: true});   
                            app.changePage(new window.Otras_act_srvView());    
                        }, //end of success function
                        error: function(model, results, options) {  
                        
                            $.mobile.loading( 'hide', {
                                    text: '',
                                    textVisible: false,
                                    theme: 'c',
                                    html: ""
                                });     
                        
                            alert("No hemos podido cargar la agenda de la sala otras actividades");
                            localStorage.page="#home";
                            app.navigate("#home", {trigger: true});
                
                        } //end of error function
                    }); //end of fetch
                } //end IF listaAgendas is Empty
                else{ // listaAgendas IS NOT EMPTY
                    
                            var ag4_tramo1 = app.listaAgendas.where({n_sala: "004", n_tramo: "001"});
                            var ag4_tramo2 = app.listaAgendas.where({n_sala: "004", n_tramo: "002"});
                            var ag4_tramo3 = app.listaAgendas.where({n_sala: "004", n_tramo: "003"});
                            var ag4_tramo4 = app.listaAgendas.where({n_sala: "004", n_tramo: "004"});
                            var ag4_tramo5 = app.listaAgendas.where({n_sala: "004", n_tramo: "005"});
                            
                            app.Agenda4Tramo1.reset(ag4_tramo1);
                            app.Agenda4Tramo2.reset(ag4_tramo2);
                            app.Agenda4Tramo3.reset(ag4_tramo3);
                            app.Agenda4Tramo4.reset(ag4_tramo4);
                            app.Agenda4Tramo5.reset(ag4_tramo5);
                    
                            $.mobile.loading( 'hide', {
                                text: '',
                                textVisible: false,
                                theme: 'c',
                                html: ""
                            });
                            
                            localStorage.page="#otras-act";          
                            //app.navigate("#home", {trigger: true});   
                            app.changePage(new window.Otras_act_srvView());                        
                } //end of else not empty
                } // end of IF username 
                else {
                localStorage.page = "#login";               
                app.navigate("#login", {trigger: true});    
                  //app.changePage(new window.LoginView());
                }               
            }, //end of stackmob login success function
            error: function(model, response, options){
            localStorage.page = "#login";               
            app.navigate("#login", {trigger: true});    
              //app.changePage(new window.LoginView());
            }
        });
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
    console.log("Ponentes_id fuction");
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
  
 
 patrocinadores_id: function (id) {  
        StackMob.getLoggedInUser({
            success: function(username) {       
                if (username) {                 
                    $.mobile.loading( 'show', {text: '', textVisible: false, theme: 'c', html: ""});                    
                    
                    var patrocinadores = new window.ListaPatrocinadores();
                    var q = new StackMob.Collection.Query();
                    q.equals('clave', id);
                    
                    patrocinadores.query(q, {
                        success: function (collection, response, options) {                         
                            if (collection.length > 0) {
                                var patrocinador = collection.at(0);
                                                                
                                $.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});
                                localStorage.page="#patrocinadores/"+id;
                                app.changePage(new window.DetallePatrocinadoresView({model: patrocinador}));
                                                                                                
                            } 
                            else {              
                                $.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});
                                alert('No hay información del patrocinador');    
                                localStorage.page="#home";
                                app.navigate("#home", {trigger: false});
                            }
                        },
                        error: function (collection, response, options) {           
                            $.mobile.loading( 'hide', {text: '', textVisible: false, theme: 'c', html: ""});                            
                            alert('Error al cargar la información del patrocinador');
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
						    
						    var arrayponentes1 = app.listaPonentes.where({ponencia1: id_ponencia});
						    var arrayponentes2 = app.listaPonentes.where({ponencia2: id_ponencia});
						    var arrayponentes3 = app.listaPonentes.where({ponencia3: id_ponencia});
						    var arrayponentes4 = app.listaPonentes.where({ponencia4: id_ponencia});
						    var arrayponentes5 = app.listaPonentes.where({ponencia5: id_ponencia});
						    
						    var arrayponentes = _.union(arrayponentes1,arrayponentes2,arrayponentes3,arrayponentes4,arrayponentes5);
						    
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
					
					var arrayponentes1 = app.listaPonentes.where({ponencia1: id_ponencia});
                    var arrayponentes2 = app.listaPonentes.where({ponencia2: id_ponencia});
                    var arrayponentes3 = app.listaPonentes.where({ponencia3: id_ponencia});
                    var arrayponentes4 = app.listaPonentes.where({ponencia4: id_ponencia});
                    var arrayponentes5 = app.listaPonentes.where({ponencia5: id_ponencia});
                            
                    var arrayponentes = _.union(arrayponentes1,arrayponentes2,arrayponentes3,arrayponentes4,arrayponentes5);	 	
						
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
    // OGordon. 17/09/2013 --> Comment this section. Footer will be available only for Home and Vote pages, as per approved mockup.
    
    /*
    var footer = new window.FooterView();
		footer.render();				
		$($(page.el)).append($(footer.el));  
		
    */
   
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
  	'sala-1-srv',
  	'entrada_agenda',
  	'entrada_agenda2',
  	'sala-2',
  	'sala-2-srv',
  	'sala-p',
  	'sala-p-srv',
  	'otras-act',
  	'otras-act-srv', 
  	'panel-lateral',
  	'ponentes', 
  	'detalle-ponentes',
  	'detalle-patrocinadores',
  	'ponentes-ponencia', 
  	'celda_ponentes', 
  	'votar',
  	'votar-2',
  	'votar-3',
  	'votar-4',
  	'votar-thx',
  	'imelius',
  	'patrocinadores',
  	'info'], function () {

       // After template loading we start the backbone routing engine
      app = new AppRouter();
      // Allow to use Back browser button      
      Backbone.history.start();
    });
});
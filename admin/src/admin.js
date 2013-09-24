        (function($){    

          HomeView = Backbone.View.extend({
           
            el: 'body',

            initialize: function() {
              this.template = _.template($('#item-home').html());
              this.render();
            },

            render: function() {

              var el = this.$el

              el.empty();
              el.append(this.template());

              return this;
            }
   
          });   
  
          ImportUsersView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #addBtn": "add"
            },

            initialize: function() {
              this.template = _.template($('#users_import').html());
              this.render();
            },

            render: function() {
              $(this.el).html(this.template());
              $('.row').append(this.el);
              return this;
            },

            add: function(e) {
            	e.preventDefault();
            	
            	var usersJSON = jQuery.parseJSON($('#users_json').val());
              
              var User  = StackMob.Model.extend({ 
              	schemaName: 'user', 
              	defaults: {
              		"password": "ifaes13",
              		"votos" : 0 
              	} 
              });
              var Users = StackMob.Collection.extend({ model: User });
              
              var usersToCreate = new Users(usersJSON);
              console.log(usersToCreate.toJSON());
              
              
							//Create all of the books in one API call
							
							usersToCreate.createAll({
							  success: function(model) {
							    console.log(model);
							  },
							  error: function(model, response) {
							    console.log(response);
							  }
							});
              
              return this;
            }

          });

          ImportPonentesView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #addBtn": "add"
            },

            initialize: function() {
              this.template = _.template($('#ponentes_import').html());
              this.render();
            },

            render: function() {
              $(this.el).html(this.template());
              $('.row').append(this.el);
              return this;
            },

            add: function(e) {
            	e.preventDefault();
            	
            	alert("Importar...(1)");
            	
            	var ponentesJSON = jQuery.parseJSON($('#ponentes_json').val());

            	alert("Importar...(2)");
            	            	              
              var Ponente  = StackMob.Model.extend({ 
              	schemaName: 'ponente', 
              	defaults: {
              	} 
              });
              var Ponentes = StackMob.Collection.extend({ model: Ponente });
              
              var ponentesToCreate = new Ponentes(ponentesJSON);
              console.log(ponentesToCreate.toJSON());
              
              
							//Create all of the books in one API call
							
							ponentesToCreate.createAll({
							  success: function(model) {
							    console.log(model);
							  },
							  error: function(model, response) {
							    console.log(response);
							  }
							});
              
              return this;
            }

          });
          
    ImportAgendasView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #addBtn": "add"
            },

            initialize: function() {
              this.template = _.template($('#agendas_import').html());
              this.render();
            },

            render: function() {
              $(this.el).html(this.template());
              $('.row').append(this.el);
              return this;
            },

            add: function(e) {
                e.preventDefault();
                
                alert("Importar...(1)");
                
                var agendasJSON = jQuery.parseJSON($('#agendas_json').val());

                alert("Importar...(2)");
                                              
              var Agenda  = StackMob.Model.extend({ 
                schemaName: 'agenda', 
                defaults: {
                } 
              });
              var Agendas = StackMob.Collection.extend({ model: Agenda });
              
              var agendasToCreate = new Agendas(agendasJSON);
              console.log(agendasToCreate.toJSON());
              
              
                            //Create all of the books in one API call
                            
                            agendasToCreate.createAll({
                              success: function(model) {
                                console.log(model);
                              },
                              error: function(model, response) {
                                console.log(response);
                              }
                            });
              
              return this;
            }

          });


    ImportPatrocinadoresView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #addBtn": "add"
            },

            initialize: function() {
              this.template = _.template($('#patrocinadores_import').html());
              this.render();
            },

            render: function() {
              $(this.el).html(this.template());
              $('.row').append(this.el);
              return this;
            },

            add: function(e) {
                e.preventDefault();
                
                alert("Importar...(1)");
                
                var patrocinadoresJSON = jQuery.parseJSON($('#patrocinadores_json').val());

                alert("Importar...(2)");
                                              
              var Patrocinador  = StackMob.Model.extend({ 
                schemaName: 'patrocinador', 
                defaults: {
                } 
              });
              var Patrocinadores = StackMob.Collection.extend({ model: Patrocinador });
              
              var patrocinadoresToCreate = new Patrocinadores(patrocinadoresJSON);
              console.log(patrocinadoresToCreate.toJSON());
              
              
                            //Create all of the books in one API call
                            
                            patrocinadoresToCreate.createAll({
                              success: function(model) {
                                console.log(model);
                              },
                              error: function(model, response) {
                                console.log(response);
                              }
                            });
              
              return this;
            }

          });


          ImportPreguntasView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #addBtn": "add"
            },

            initialize: function() {
              this.template = _.template($('#preguntas_import').html());
              this.render();
            },

            render: function() {
              $(this.el).html(this.template());
              $('.row').append(this.el);
              return this;
            },

            add: function(e) {
            	e.preventDefault();
            	
            	var preguntasJSON = jQuery.parseJSON($('#preguntas_json').val());
              
              var Pregunta  = StackMob.Model.extend({ 
              	schemaName: 'preguntas', 
              	defaults: {
              	} 
              });
              var Preguntas = StackMob.Collection.extend({ model: Pregunta });
              
              var preguntasToCreate = new Preguntas(preguntasJSON);
              console.log(preguntasToCreate.toJSON());
              
              
							//Create all of the books in one API call
							
							preguntasToCreate.createAll({
							  success: function(model) {
							    console.log(model);
							  },
							  error: function(model, response) {
							    console.log(response);
							  }
							});
              
              return this;
            }

          });

          ExportarRespuestasView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #AnswersBtn": "getAnswers"
            },

            initialize: function() {
              this.template = _.template($('#respuestas_export').html());
              this.render();
            },

            render: function() {
              $(this.el).html(this.template());
              $('.row').append(this.el);
              return this;
            },

            getAnswers: function(e) {
            	e.preventDefault();
            	
            	alert("Hola");
            	
            	var Respuesta  = StackMob.Model.extend({ 
              	schemaName: 'respuesta', 
              	defaults: {
              	} 
              });
              
              var Respuestas = StackMob.Collection.extend({
              	model: Respuesta 
              });
              
              var answers = new Respuestas();
              
              //Create all of the books in one API call
							
							var q = new StackMob.Collection.Query();
							q.isNotNull('respuesta_id');

							answers.query(q, {
							  success: function(model) {
							    //console.log(model);
						    
							    $('#respuestas_json').val(JSON.stringify(model));
							  },
							  error: function(model, response) {
							    console.log(response);
							  }
							});
            	              
              return this;
            }

          });

          
          AppRouter = Backbone.Router.extend({

            routes:{
              "":"home",
              "login":"login",
              "importarusuarios":"imp_users",
              "importarponentes":"imp_ponentes",
              "importaragendas":"imp_agendas",
              "importarpatrocinadores":"imp_patrocinadores",
              "importarpreguntas":"imp_preguntas",
              "exportarrespuestas":"exp_respuestas"
            },

            home:function() {
              console.log('home');
              new HomeView();
            },
            
            login:function() {
	            var username = "admin";
		        	var password = "ifaes2013";

		        	var user = new StackMob.User({username: username, password: password}); 
							
							user.login(true, {
								success: function(model) {																	
									alert("Login OK");
								},
								error: function(model, response) {
									alert("Error: Usuario o password incorrecto");
								}  	
							});	
						},	        	

            imp_users:function() {
              console.log('Importar usuarios');
              new ImportUsersView();
            },

            imp_ponentes:function() {
              console.log('Importar ponentes');
              new ImportPonentesView();
            },

            imp_preguntas:function() {
              console.log('Importar preguntas');
              new ImportPreguntasView();
            },
            
            imp_agendas:function() {
              console.log('Importar agendas');
              new ImportAgendasView();
            },

            imp_patrocinadores:function() {
              console.log('Importar patrocinadores');
              new ImportPatrocinadoresView();
            },

            exp_respuestas:function() {
              console.log('Exportar respuestas');
              new ExportarRespuestasView();
            }

          });

        }(jQuery));

        $(document).ready(function () {
            wineApp = new AppRouter();
            Backbone.history.start();
        });

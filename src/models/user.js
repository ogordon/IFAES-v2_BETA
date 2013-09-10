window.User = StackMob.Model.extend({
    schemaName: 'user'    
});

window.ListaUsuarios = StackMob.Collection.extend({
    model: window.User   
});

const {validationResult} = require('express-validator')

module.exports.formulario_inclusao_noticia = function(app, req, res){
    res.render("admin/form_add_noticia", {errors : {}, noticia : {}});
}

module.exports.noticias_salvar = function(app, req, res){
    
    var noticia = req.body;
        const errors = validationResult(req).formatWith(({msg}) => msg);
        
        console.log(errors.array())
        if (!errors.isEmpty()){
            
            res.render("admin/form_add_noticia", {errors : errors.array(), noticia: noticia});
            console.log(errors.array())
            return;
        }
        var connection = app.config.dbConnection();
        var NoticiasDAO = new app.app.models.NoticiasDAO(connection);

        NoticiasDAO.salvarNoticia(noticia, function(error, result){
            console.log(noticia)
            res.redirect("/noticias");
        });      

}
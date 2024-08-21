const {validationResult} = require('express-validator')

module.exports.formulario_inclusao_noticia = function(app, req, res){
    
    //var noticiaid = Object.keys(req.query).length
    //console.log(noticiaid)
    //console.log(req)
    if (req._parsedOriginalUrl.query != null)  {
        console.log("sem ID");
        var connection = app.config.dbConnection();
        var NoticiasDAO = new app.app.models.NoticiasDAO(connection);
        var id_noticia = req.query;
        NoticiasDAO.getNoticia(id_noticia, function(error, result,){
            res.render("admin/form_add_noticia", {errors : {}, noticia : result});
            console.log(result)
        });  
    }   
    else{
        res.render("admin/form_add_noticia", {errors : {}, noticia : [{}]});
    }
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
 
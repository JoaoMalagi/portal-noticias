module.exports.noticias = function(app, req, res){
    var connection = app.config.dbConnection();
        var NoticiasDAO = new app.app.models.NoticiasDAO(connection);

        NoticiasDAO.getNoticias(function(error, result){
            res.render("noticias/noticias", {noticias : result});
        });      
}
module.exports.noticia = function(app, req, res){
    var connection = app.config.dbConnection();
        var NoticiasDAO = new app.app.models.NoticiasDAO(connection);

        NoticiasDAO.getNoticia(function(error, result){
            res.render("noticias/noticia", {noticia : result});
        });  
}
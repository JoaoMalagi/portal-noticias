const {body, validationResult} = require('express-validator')

module.exports = function(app){
    app.get('/formulario_inclusao_noticia', function(req, res){
        res.render("admin/form_add_noticia", {errors : {}, noticia : {}});   
    })
    app.post('/noticias/salvar',[body("titulo").notEmpty().withMessage("TItulo nao pode ser vazio"),
        body('noticia').notEmpty().withMessage("Noticia não pode ser vazia")
    ], function(req, res){
          
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

    })
}

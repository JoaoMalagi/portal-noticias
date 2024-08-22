const {body} = require('express-validator')

module.exports = function(app){
    app.get('/formulario_inclusao_noticia', function(req, res){
       app.app.controllers.admin.formulario_inclusao_noticia(app, req, res);
    })


    app.post('/noticias/salvar',[body("titulo").notEmpty().withMessage("TItulo nao pode ser vazio"),
        body('noticia').notEmpty().withMessage("Noticia não pode ser vazia")
    ], function(req, res){
        app.app.controllers.admin.noticias_salvar(app, req, res);
        })
}

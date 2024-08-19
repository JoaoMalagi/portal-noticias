var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({extended: true}));

//detecta todas as rotas e inclue elas no app, evitando fazer requires no proprio app.js
//Ele executa tudo que esta no exports
consign()
    .include('app/routes')
    //Dessa maneira nós indicamos o modulo especifico para ser executado pelo consign, assim ele so executa aquele arquivo da pasta config
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);


module.exports = app;
var mysql = require('mysql');

//criando uma variavel que recebe uma funcão, para evitar criar conexoes com o banco sem necessidade

var connMySQL = function(){
    console.log("Conexao BD")
   return mysql.createConnection({
        host: 'localhost',
        user:'root',
        password: 'admin',
        database: 'portal_noticias'
    });
}
module.exports = function() {
    console.log("conexao autoload")
    return connMySQL;
} 

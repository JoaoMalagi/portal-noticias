function NoticiasDAO(connection){
    this._connection = connection
}
NoticiasDAO.prototype.getNoticias = function(callback){

    this._connection.query('select * from noticias order by data_criacao DESC', callback)
}

NoticiasDAO.prototype.getNoticia = function(id_noticia, callback)
{
    this._connection.query('select * from noticias where id_noticias = ' + id_noticia.id_noticias, callback)
}

NoticiasDAO.prototype.salvarNoticia = function(id_noticia, noticia, callback)
{
    var noticiadados = noticia
    if(id_noticia.id_noticia)
    {
        const sql = `
                UPDATE noticias 
                SET titulo = ?, noticia = ?, resumo = ?, autor = ?, data_noticia = ? 
                WHERE id_noticias = ?`;
        this._connection.query(sql, [noticiadados.titulo, 
                                    noticiadados.noticia, 
                                    noticiadados.resumo, 
                                    noticiadados.autor, 
                                    noticiadados.data_noticia, 
                                    id_noticia.id_noticia], callback)
        //this._connection.query('update noticias SET ? where id_noticias = ' + id_noticia.id_noticias, noticia, callback)
    }
    else{
        console.log("cadastro")
        console.log(noticia)
        this._connection.query('insert into noticias set ?', noticia, callback)
    }
}
NoticiasDAO.prototype.get5UltimasNoticias = function(callback)
{
    this._connection.query('select * from noticias ORDER BY data_criacao DESC LIMIT 5', callback)
}
module.exports = function(){  
    return NoticiasDAO;
}
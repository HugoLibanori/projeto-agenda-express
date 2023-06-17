exports.paginaInicial = (req, resp) => {
    resp.render('index', {
        titulo: 'Este será o titulo da pagina',
        numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    })
    return
}

exports.trataPost = (req, resp) => {
    resp.send(req.body)
    return
}
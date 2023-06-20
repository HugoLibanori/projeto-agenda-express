const Contato = require('../models/ContatoModels')

exports.index = async(req, resp) => {
    const contatos = await Contato.buscaContatos()
    resp.render('index', {contatos})
}

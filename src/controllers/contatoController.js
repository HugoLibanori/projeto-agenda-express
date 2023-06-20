const { async } = require('regenerator-runtime')
const Contato = require('../models/ContatoModels')

exports.index = (req, resp) => {
    resp.render('contato', {
        contato: {}
    })
}

exports.register = async (req, resp) => {
    try {
        const contato = new Contato(req.body)
        await contato.register()
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => resp.redirect('/contato/index'))
            return
        }
        req.flash('success', 'Contato registrado com sucesso!')
        req.session.save(() => resp.redirect(`/contato/index/${contato.contato._id}`))
        return

    } catch (e) {
        console.log(e)
        return resp.render('404')
    }
}

exports.editIndex = async function (req, resp) {
    if (!req.params.id) return resp.render('404')

    const contato = await Contato.buscaPorId(req.params.id)
    if (!contato) return resp.render('404')

    resp.render('contato', { contato })
}

exports.edit = async (req, resp) => {
    try {
        if (!req.params.id) return resp.render('404')
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => resp.redirect('/contato/index'))
            return
        }
        req.flash('success', 'Contato editado com sucesso!')
        req.session.save(() => resp.redirect(`/contato/index/${contato.contato._id}`))
        return

    } catch (e) {
        console.log(e)
        return resp.render('404')
    }
}
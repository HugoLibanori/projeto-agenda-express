const Login = require('../models/LoginModels')

exports.index = (req, resp) => {
    if (req.session.user) return resp.render('login-logado')
    return resp.render('login')
}

exports.register = async (req, resp) => {
    try {
        const login = new Login(req.body)
        await login.register()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return resp.redirect('/login/index')
            })
            return
        }
        req.flash('success', 'Seu usuário foi criado com sucesso.')
        req.session.save(function () {
            return resp.redirect('/login/index')
        })
    } catch (e) {
        console.log(e)
        return resp.render('404')
    }
}

exports.login = async (req, resp) => {
    try {
        const login = new Login(req.body)
        await login.login()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return resp.redirect('/login/index')
            })
            return
        }

        req.flash('success', 'Você logou no sistema.')
        req.session.user = login.user
        req.session.save(function () {
            return resp.redirect('/login/index')
        })
    } catch (e) {
        console.log(e)
        return resp.render('404')
    }
}

exports.logout = (req, resp) => {
    req.session.destroy()
    resp.redirect('/')
}
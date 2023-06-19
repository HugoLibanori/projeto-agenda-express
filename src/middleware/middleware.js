exports.meuMiddleware = (req, resp, next) => {
    resp.locals.errors = req.flash('errors')
    resp.locals.success = req.flash('success')
    resp.locals.user = req.session.user
    
    next()
}

exports.checkCsfrError = (err, req, resp, next) => {
    if(err) {
        return resp.render('404')
    }

    next()
}

exports.csrfMiddleware = (req, resp, next) => {
    resp.locals.csrfToken = req.csrfToken()
    next()
}
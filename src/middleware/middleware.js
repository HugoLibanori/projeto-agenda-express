exports.meuMiddleware = (req, resp, next) => {
    resp.locals.umaVaraiavelLocal = 'Este é o valor da variavel local.'
    next()
}

exports.checkCsfrError = (err, req, resp, next) => {
    if(err && 'EBADCSRFTOKEN' === err.code) {
        return resp.send('BAD CSRF')
    }
}

exports.csrfMiddleware = (req, resp, next) => {
    resp.locals.csrfToken = req.csrfToken()
    next()
}
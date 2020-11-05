module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/cocktails', require('./cocktails.routes.js'))
    app.use('/admin', require('./admin.routes.js'))
}
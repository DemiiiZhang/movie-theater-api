const { usersRouter } = require('../routes/users.js')
const { showsRouter } = require('../routes/shows.js')
const express = require('express')
const app = express()

app.use(express.json())
app.use('/shows', showsRouter)
app.use('/users', usersRouter)

module.exports = app
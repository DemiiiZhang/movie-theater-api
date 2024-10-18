const express = require('express')
const showsRouter = express.Router()
const { Show, User } = require('../models/index.js')
const app = require('../src/app.js')
const { check, validationResult } = require('express-validator')

// add a new show with name <=25 characters
showsRouter.post('/',
    [check('title')
        .isLength({ max: 25 })
        .withMessage('Title must be at most 25 characters long')],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({ errors: errors.array() })
        } else {
            await Show.create(req.body)
            const newList = await Show.findAll()
            res.json(newList)
        }
    })

//get all shows
showsRouter.get('/', async (req, res) => {
    const allShows = await Show.findAll()
    res.json(allShows)
})

//get one show
showsRouter.get('/:id', async (req, res) => {
    const number = req.params.id
    const found = await Show.findByPk(number)
    res.json(found)
})

//get all users for a show
showsRouter.get('/:id/users', async (req, res) => {
    const number = req.params.id
    const found = await Show.findByPk(number, { include: User })
    res.json(found)
})

//update available property
showsRouter.put('/:id/available', async (req, res) => {
    const number = req.params.id
    const found = await Show.findByPk(number)
    if (found.available === true) {
        found.available = false
    } else {
        found.available = true
    }
    res.json(found)
})

//delete a show
showsRouter.delete('/:id', async (req, res) => {
    const number = req.params.id
    const deleted = await Show.destroy({ where: { id: number } })
    const after = await Show.findAll()
    res.json(after)
})

//get all shows of one genre
showsRouter.get('/', async (req, res) => {
    const genre = req.query.genre
    const found = await Show.findAll({ where: { genre: genre } })
    res.json(found)
})

module.exports = { showsRouter, app }



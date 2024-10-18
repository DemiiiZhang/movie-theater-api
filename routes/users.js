const express = require('express')
const usersRouter = express.Router()
const { Show, User } = require('../models/index.js')
const app = require('../src/app.js')
const { check, validationResult } = require('express-validator')

//username should be an email
// usersRouter.post('/', [check('username').isEmail()], async (req, res) => {
//     console.log(req.body, 'users.post')
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         res.json({ errors: errors.array() })
//     } else {
//         await User.create(req.body)
//         const newAll = User.findAll()
//         res.json(newAll)
//     }
// })

usersRouter.post("/", [check("username").isEmail()], async (req, res) => {
    let err = validationResult(req);
    console.log(req.body)
    if (!err.isEmpty()) {
        res.json({ error: err.array() });
    } else {
        let data = req.body;
        let newUser = await User.create(data);
        res.send(newUser);
    }
});

//find all users
usersRouter.get('/', async (req, res) => {
    const allUsers = await User.findAll()
    res.json(allUsers)
})

//find one user
usersRouter.get('/:id', async (req, res) => {
    const number = req.params.id
    const found = await User.findByPk(number)
    res.json(found)
})

//find one user's all shows
usersRouter.get('/:id/shows', async (req, res) => {
    const number = req.params.id
    const found = await User.findByPk(number, {
        include: Show
    })
    res.json(found)
})

//associate a user with a show
usersRouter.put('/:id/shows/:showId', async (req, res) => {
    const number1 = req.params.id
    const number2 = req.params.showId
    const foundUser = await User.findByPk(number1)
    const foundShow = await Show.findByPk(number2)

    await foundUser.addShow(foundShow)
    const result = await User.findByPk(number1, { include: Show })
    res.json(result)
})

module.exports = { usersRouter, app }
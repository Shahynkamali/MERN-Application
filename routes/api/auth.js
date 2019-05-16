const express = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../../models/User')


router.post('/', (req, res) => {
    const {
        email,
        password
    } = req.body
    if ( !email || !password) {
        return res.status(400).json({
            message: 'please enter all fields!'
        })
    }
    User.findOne({
            email
        })
        .then(user => {
            if (!user) return res.status(400).json({
                message: 'user does not exists'
            })

        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({message:"invalid credentials"})
            jwt.sign({
                    id: user.id
                },
                config.get('jwtSecret'), {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw new Error('error')
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            )
        })
    })
})



module.exports = router
const express = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../../models/User')


router.post('/', (req, res) => {
    const {name, email, password } = req.body
    if(!name || !email || !password){
        return res.status(400).json({message:'please enter all fields!'})
    }
    User.findOne({email})
    .then(user =>{
        if(user) return res.status(400).json({message:'user already exists!'})

        const newUser = new User({
            name,
            email,
            password
        })
    bcrypt.genSalt(8, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw new Error('Error!')
            newUser.password = hash
            newUser.save()
                .then(user=>{
                jwt.sign(
                    {id:user.id},
                    config.get('jwtSecret'),
                    {expiresIn:3600},
                    (err, token) =>{
                        if(err) throw new Error('error')
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
    })
})



module.exports = router
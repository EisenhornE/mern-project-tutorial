const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')


const CreateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login user
const LoginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.LoginUser(email, password)

    // create a token
        const token = CreateToken(user._id)

        res.status(200).json({email, token})
    }catch (err){
        res.status(400).json({error: err.message})
    }
}

// signup user
const SignUp = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.SignUp(email, password)

    // create a token
        const token = CreateToken(user._id)

        res.status(200).json({email, token})
    }catch (err){
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    LoginUser,
    SignUp
}
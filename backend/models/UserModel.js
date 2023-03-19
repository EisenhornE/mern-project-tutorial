const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const UserSchemas = new Schema({
    email:{
        type: String,   
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    }
})

// static signup method
UserSchemas.statics.SignUp = async function(email, password) {

    // validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Not valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is weak.")
    }

    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already taken')
    }

    const salt = await bcrpyt.genSalt(10)
    const hash = await bcrpyt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

// static login method
UserSchemas.statics.LoginUser = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')
    }
    const match = await bcrpyt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User', UserSchemas)
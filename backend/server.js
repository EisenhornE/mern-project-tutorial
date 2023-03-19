require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const UserRoutes = require('./routes/User')
const mongoose = require('mongoose')

//express app
const app = express()

//middleware

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', UserRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    //listen for requests
    app.listen(process.env.PORT, () =>{
    console.log('Connected to DB and listening to port', process.env.PORT)
})
    })
    .catch((err)=>{
        console.log(err)
    })
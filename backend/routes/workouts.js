const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    delWorkout,
    upWorkout
} = require("../controllers/workoutController")
const RequireAuth = require('../middleware/RequireAuth')

// require auth for all workout routes
const router = express.Router()

router.use(RequireAuth)

//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST new workout
router.post('/', createWorkout)

//DELETE workout
router.delete('/:id', delWorkout)

//UPDATE workout
router.patch('/:id', upWorkout)

module.exports = router
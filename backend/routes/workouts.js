const express = require('express');
const {createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')
 
const router = express.Router();

router.use(requireAuth)

//require auth for all workout routes
const Workout = require('../models/workoutModel')

// get all workouts
router.get('/',getWorkouts);

// get single workouts
router.get('/:id',getWorkout);

// post new workout
router.post('/',createWorkout);

//delete workout
router.delete('/:id',deleteWorkout);

//patch the workout

router.patch('/:id',updateWorkout);

module.exports= router
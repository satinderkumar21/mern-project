const Workout = require('../models/workoutModel');
const mongoose = require('mongoose')


// Get workout
const getWorkouts = async(req, res) =>{
    const user_id = req.user._id
    const workouts =  await Workout.find({user_id}).sort({createdAt:-1})
    res.status(200).json(workouts)
}


// Get single workout
const getWorkout = async(req, res) =>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }

    const workout = await Workout.findById(id);
    console.log("workout", workout);

    if(!workout){
        return response.status(404).json({error:'no such workout found'})
    }
     
    return res.status(200).json(workout);
}


// create the workout

const createWorkout = async(req, res) =>{
    
    const{title,load, reps} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')  
    }
    if(!reps){
        emptyFields.push('reps')
    }
    
    if(emptyFields.length > 0) {
        
        return res.status(400).json({error:'Please fill in the all empty fields', emptyFields})
    }
    



try {
    const user_id = req.user._id
    const workout = await Workout.create({title, load, reps, user_id});
    console.log("workout post", workout);
    res.status(200).json(workout)

} catch (error) {
 res.status(400).json({error:error.message})
    
}
}


// Delete the workout

const deleteWorkout = async(req, res) =>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }

    const workout = await Workout.findByIdAndDelete({_id:id})

    if(!workout){
        return res.status(404).json({error:'no such workout find'})
    }

    res.status(200).json(workout)


}

//Update workout 


const updateWorkout = async(req, res) =>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error:'no such workout find'})
    }

    res.status(200).json(workout)


}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout

}
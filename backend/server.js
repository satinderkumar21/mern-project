require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');


//express app
const app = express();
  
// MIDDLEWARE 
app.use(express.json())

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({ msg: 'hello welcome on homepage' })
})

// routes
app.use('/api/workouts', workRoutes)
app.use('/api/user', userRoutes)

// connect to db

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen routes
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & running on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })





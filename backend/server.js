require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileRoute = require('./route/fileRoute')
const userRoutes = require('./route/userRoute')

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

// express app
const app = express()

// middleware

app.use(cors(corsOptions))

app.use(express.json({limit: '50mb'}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/file', fileRoute)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    //app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    //})
  })
  .catch((error) => {
    console.log(error)
  })
const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/admin/adminRoutes')



const app = express();

app.use(bodyParser.json())


// morgan middleware
if(process.env.NODE_ENV==='development'){
  const morgan = require('morgan')
}
  

// creating a middleware
// app.use((req, res, next)=>{
//   console.log('hello from here')
//   next();

// })


app.use((req, res, next)=>{
  req.requestTime = new Date().toISOString()
  next();

})

// this act as a middleware
// app.use(express.json());

// this exposes the static files since hey have no routes
app.use(express.static(`${__dirname}/public`))


// mouting Multiple router
app.use('/api/users', userRouter)
app.use('/api/admin',adminRouter)


 
// listen to particular port and server
module.exports = app

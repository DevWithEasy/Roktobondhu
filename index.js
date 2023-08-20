require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const dbConnection = require('./config/dbConnection');
const applyRouter = require('./routers/routes');
const applyMidleware = require('./middlewares/middlewares');


//serve client side file path
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname, './client/dist')));

//apply midflewares
applyMidleware(app)

//apply routes
applyRouter(app)

//database connection
dbConnection()

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname, './client/dist/index.html'))
// })

app.listen(process.env.PORT || 8080,()=>{
    console.log('listening on port 8080')
})
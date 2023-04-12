require('express-async-errors')
require('dotenv').config();

const cors = require('cors');

//swagger
const swagger = require('swagger-ui-express')
const yaml =  require('yamljs')
const swaggerDocs = yaml.load('./apime-docs.yaml')

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const DBconnect = require('./MongoDB/dbconnection');

//import routes
const movieRoutes = require('./routes/movieRoute')
const userRoutes = require('./routes/userRoute')
const reviewRoutes = require('./routes/reviewRoute')
const watchlistRoutes = require('./routes/watchlistRoute')
const actorRoutes = require('./routes/actorRoute')

const middlewareNotFound = require('./middleware/not-found-middleware')
const middlewareExceptionHandling = require('./middleware/exception-handling-middleware')

const path = require('path')

//get server ip
const os = require('os')
const netInterface = os.networkInterfaces()
//flatten into single array all array netInterfaces
//find all netInterfaces that have ipv4 value, not internal and not 127.0.0.1(loopback address)
const IPv4s = Object.values(netInterface).flatMap(netInterface => {
    return netInterface.filter(a => a.family === 'IPv4' && !a.internal && a.address !== '127.0.0.1')
})
//.find((i)=>i.family === 'IPv4' && !i.internal && i.address !== '127.0.0.1')
//const ip = interface ? interface.address : undefined

app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT;

app.use(express.json())
app.use(cookieParser(process.env.TOKEN_SECRET))
app.use(fileUpload({limits:{fileSize: 1024 * 512}}))

app.use(cors());

//swagger route
app.use('/swagger-docs', swagger.serve, swagger.setup(swaggerDocs))

//use routes
app.use('/apime/movies', movieRoutes)
app.use('/apime/user', userRoutes)
app.use('/apime/reviews', reviewRoutes)
app.use('/apime/watchlist', watchlistRoutes)
app.use('/apime/actors', actorRoutes)

app.get('/client/*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.use(middlewareNotFound)
app.use(middlewareExceptionHandling)

const initialize = async () => {
    try{
        await DBconnect(process.env.DB_URI);
        app.listen(port, ()=>{
            console.log(`Listening on port ${port}`);
            console.log('')
            console.log('Please try the urls below to access the front-end application:')
            IPv4s.forEach(i => {
                console.log(`${process.env.PROTOCOL}://${i.address}:${port}/client/`)
            })
        });
    }
    catch(error){
        console.log(error);
    }
};
initialize();
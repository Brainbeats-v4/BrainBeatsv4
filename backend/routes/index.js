var express = require('express');
var app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require('swagger-ui-express')
const YAML = require("yamljs");
const cors = require("cors")
require("dotenv").config();
bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({limit: '3mb', extended: true}));


const PORT = process.env.PORT || 2000;

const corsOptions ={
    origin: '*', 
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

var router = express.Router();
var loginRouter = require('./login');

app.use('/login', loginRouter);

 /* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
 });

// SwaggerHub documentation
// For more info: https://swagger.io/specification/#infoObject
// To test API's, use the SwaggerHub UI by going to http://localhost:2000/api-docs/ after running the application with "nodemon ./backend/routes/index"
const swaggerJSDocs = YAML.load("./routes/api.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

app.use(express.json())
app.use('/api/users', require('./users/users')); 
app.use('/api/posts', require('./posts/posts')); 
app.use('/api/playlists', require('./playlists/playlists')); 
app.use('/api/music', require('./music/music')); 
app.use('/api/likes', require('./likes/likes')); 
app.use('/api/images', require('./images/images'));
app.use('/api/authentication', require('./authentication/authentication')); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = router;
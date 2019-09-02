let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;

let config = require('config'); //we load the db location from the JSON files

//db connection      
mongoose.connect(config.DBHost);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// adding allow access controll
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/json'
}));

// route
let user = require('./app/routes/user');
let product = require('./app/routes/product');
let question = require('./app/routes/question');

app.get("/", (req, res) => res.json({
    message: "Welcome to our Demo"
}));

/* routes for user */
app.route("/user")
    .get(user.getUsers)
    .post(user.postUser)
    .put(user.editUser)
    .delete(user.deleteUser);

app.get('/userbyid/:id', user.userbyid);

/* routes for product  */
app.route("/product")
.get(product.getProducts)
.post(product.postProduct)
.put(product.editProduct)
.delete(product.deleteProduct);

app.get('/productbyid/:id', product.productbyid);

app.route("/question")
.get(question.getQuestions)
.post(question.postQuestion)
.put(question.editQuestion)
.delete(question.deleteQuestion)

;
app.get('/questionbyid/:id', question.Questionbyid);


app.route("/login")
    .post(user.login);

app.route("/register")
    .post(user.register);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
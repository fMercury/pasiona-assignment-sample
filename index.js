require('dotenv').config()

const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

///////////////////////////////////////////////////////////////////////////////////////////////////////APP
let express = require('express'),
    hostname = '127.0.0.1',
    port = process.env.NODE_PORT || 5001,
    app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: process.env.JWT_SECRET, cookie: { maxAge: 60 * 60 * 1000 * 24 } })); // // expires in 24 hour
app.set('secret', process.env.JWT_SECRET);


app.use(express.static(path.join(__dirname, './public')));

//////////////////////////////////////////////////////////////////////////////////////////////////////////    

let clientRoutes = require('./interface/routes/client/index');
clientRoutes(app);

let policyRoutes = require('./interface/routes/policy/index');
policyRoutes(app);

let authRoutes = require('./interface/routes/authRoute');
authRoutes(app);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + 'NOT FOUND' })
});

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).send('Error code: E01');
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

module.exports = app;
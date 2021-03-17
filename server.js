// Import packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const products = require('./routs/products.js');
const users = require('./routs/users.js')


// Create a server object
const server = express();

// Connect to the database using mongoose
// Note: make sure to put your connection string!
const connectionString = "mongodb+srv://Black:blackpanthers007@cluster0.2aszp.mongodb.net/blackpanthers?retryWrites=true&w=majority"
const connectionConfig = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
};

mongoose
    .connect(connectionString, connectionConfig)
    .then(
        () => {
            console.log('DB is connected')
        }
    )
    .catch(
        (error) => {
            console.log('error occured', error)
        }
    )

// Tell express how to use body-parser
server.use( bodyParser.urlencoded({ extended: false }) );

// Also tell express to recognize JSON
server.use( bodyParser.json() );


// Create a Route
server.get(
    '/',                                // http://localhost:3001/
    (req, res) => {
        res.send("<h1>Welcome to Home Page</h1>");
    }
);

server.use(
    '/users', 
    users
)

server.use(
    '/products', 
    products
)



server.listen(
    3001, 
    () => {
        console.log('server is running on http://localhost:3001')
    }
);
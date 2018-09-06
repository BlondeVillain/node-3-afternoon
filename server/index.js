const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require( './controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');
const app = express();

app.use( bodyParser.json() );
app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use( checkForSession );
app.use( express.static( `${__dirname}/build` ) );
app.post( '/api/login', auth_controller.login );
app.post( '/api/register', auth_controller.register );
app.post( '/api/signout', auth_controller.signout );
app.post( '/api/cart', cart_controller.add );
app.post( '/api/cart/checkout', cart_controller.checkout );
app.get( '/api/user', auth_controller.getUser );
app.get( '/api/swag', swag_controller.read );
app.get( '/api/search', search_controller.search );
app.delete( '/api/cart', cart_controller.delete );

const port = process.env.SERVER_PORT || 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );

//POTENTIAL CONFLICT 
//  /src/server/index.js deleted
// restore from current file if disfunctional.
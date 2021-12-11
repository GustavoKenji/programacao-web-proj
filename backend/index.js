const express = require('express');
const session = require('express-session');
const app = express();
const routes = require('./routes');
const PORT = 3000;
const cors = require('cors');

//  middlewares
app.use(cors());
app.use(express.json());
app.use(session({
	secret: 'projeto3',
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false},
}));

app.use(routes);

app.listen(PORT);
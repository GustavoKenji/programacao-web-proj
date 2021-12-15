const express = require('express');
const session = require('express-session');
const app = express();
const routes = require('./routes');
const PORT = 3000;
const cors = require('cors');
const MongoStore = require('connect-mongo');
const { mongoURL } = require('./config');

//  middlewares
app.use(cors());
app.use(express.json());
app.use(session({
	secret: 'projeto3',
	resave: false,
	store: MongoStore.create({mongoUrl: mongoURL}),
	saveUninitialized: true,
	cookie: {secure: false},
}));

app.use(routes);

app.listen(process.env.PORT || 3000);
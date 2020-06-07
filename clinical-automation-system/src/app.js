import express, { urlencoded, json } from 'express';
import session from 'express-session';
import { join } from 'path';
import { serverConfig } from 'config';
import router from './routes';
import { passportSetup } from './lib/passport';

const app = express();
const port = serverConfig.port;

// setup for parsing data
app.use(urlencoded({ extended: true }));
app.use(json());

// Set options for cookie
const cookieObject = {
  secure: false,
  httpOnly: true,
  maxAge: serverConfig.cookieTime
};

// express session middleware setup
app.use(session({
  secret: serverConfig.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: cookieObject
}));

// setup for passport module
passportSetup(app);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '../views'));
app.use(express.static(join(__dirname, '../views/styles')));

app.use('/', router);

app.locals.loginFailure = false;
app.locals.userType = null;

app.listen(port, () => console.log(`Server is running on port ${port}`));

export default app;

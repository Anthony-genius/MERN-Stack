import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

const indexRoute = require('./routes/index');
const { getConfig } = require('./config/config');
const { applyMiddleware } = require('./middleware/initializeMiddleware');
const { mailCron } = require('./middleware/mailCron');
const { initializeSwagger } = require('./swagger');
const cors = require('cors');

mongoose.connect(getConfig('connectionString'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}); // connect to database
mongoose.Promise = global.Promise;

const app = express();

app.use(cors(getConfig('cors')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '500kb' }));

app.use(morgan('dev'));

mailCron(app);

initializeSwagger(app);

applyMiddleware(app);

app.use('/', indexRoute);

app.listen(getConfig('port'));

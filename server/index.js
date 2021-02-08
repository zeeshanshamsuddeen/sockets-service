require('dotenv').config();

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const Prometheus = require('./prometheus');

const routes = require('./routes');
const { acceptClientConnection } = require('./core/connections');

const app = express();
const middlewares = require('./middlewares');


const port = process.env.PORT;


app.options('*', cors());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(compression());


/**
 * The below arguments start the counter functions
 */
app.use(Prometheus.requestCounters);
app.use(Prometheus.responseCounters);

/**
 * Enable metrics endpoint
 */
Prometheus.injectMetricsRoute(app);

/**
 * Enable collection of default metrics
 */
Prometheus.startCollection();


app.use('/api/update', middlewares.apiAuthenticator, routes.updates);

const server = http.createServer(app);

const io = socketIO(server);

global.socketIO = io;

io.use(middlewares.clientAuthenticator);

io.on('connection', acceptClientConnection);

server.listen(port, () => console.log(`Running on localhost:${port}`));
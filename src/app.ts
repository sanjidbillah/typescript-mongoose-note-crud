import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import noteRoute from './routes/note_routes'
import logging from './config/logger';
const NAMESPACE = 'Server';
const app = express();
app.use(express.json())
mongoose.connect(config.mongo.url, config.mongo.options).then((e) => {
  logging.info(NAMESPACE, 'Mongo Connected');
}).catch((error) => {
  logging.error(NAMESPACE, error.message, error);
});
app.use('/api/', noteRoute);

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => {
  logging.info(NAMESPACE, 'Server is running');
})



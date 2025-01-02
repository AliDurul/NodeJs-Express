import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './routes';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


const server = http.createServer(app);

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});

const MONGO_URI = 'mongodb://127.0.0.1:27017/blogAPI';


mongoose.Promise = Promise
mongoose.connect(MONGO_URI);
mongoose.connection.on('error', (error) => {
    console.log(error);
    process.exit(1);
});

app.use('/api', router());
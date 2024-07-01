import app from './app.js'
import socketIo from './socketIo.js'
import dotenv from 'dotenv'
dotenv.config();

const port = process.env.APP_PORT;
const portIO = process.env.SOCKKET_PORT;

app.listen(port, () => 
    console.log('app listening port :' + port)
);

socketIo.listen(portIO, () => {
    console.log(`socket listening port : ${portIO}`);
});
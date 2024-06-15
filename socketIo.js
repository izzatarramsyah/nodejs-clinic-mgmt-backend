import { Server } from "socket.io";
import http from "http";
import express from "express";
import mongoose from "mongoose";

// import Message from './models/message.js';

const dbConnection = process.env.MONGURI;
const app = express();

// mongoose.connect(dbConnection, {useNewUrlParser : true});
// const db = mongoose.connection;
// db.on('error', (error) => console.log(error));
// db.on('open', ()=> console.log("Database Connected "));

const socketIo = http.createServer(app);
const io = new Server(socketIo, {
    cors: {origin : 'http://localhost:3000'}
});

// const Message = mongoose.model('message', {
//   user: String,
//   message: String,
//   timestamp: { type: Date, default: Date.now },
// }, 'message');

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected.`);

    // Load initial messages from the database
    // const messages = await Message.find().sort({ timestamp: -1 }).limit(50).exec();
    // socket.emit('initial messages', messages.reverse());

    socket.on('chat message', (msg) => {
       console.log(msg);
      // const message = new Message(msg);
      // message.save().then(() => {
        io.emit('chat message', msg);
      // });
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected.`);
    });

});

export default socketIo;
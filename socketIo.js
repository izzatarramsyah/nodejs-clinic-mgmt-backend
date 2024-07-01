import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import queue from './models/queue.js';

const dbConnection = process.env.MONGURI;
const app = express();

mongoose.connect(dbConnection, {useNewUrlParser : true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.on('open', ()=> console.log("Database Connected "));

const socketIo = http.createServer(app);
const io = new Server(socketIo, {
    cors: {origin : 'http://localhost:3000'}
});

// io.use(function(socket, next){
//   console.log(socket.handshake.auth.token);
  // if (socket.handshake.query && socket.handshake.query.token){
  //   jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function(err, decoded) {
  //     if (err) return next(new Error('Authentication error'));
      // socket.token = decoded;
  //     next();
  //   });
  // }
  // else {
  //   next(new Error('Authentication error'));
  // }    
// });

io.on('connection', async  (socket) => {
    console.log(`Socket ${socket.id} connected `);

    // Load initial messages from the database
    const queueGeneral = await queue.findOne({poli : 'UMUM', status : 'IDLE'}).sort({ date: 1 });
    socket.emit('queue_general', queueGeneral);

    const queueDentist = await queue.findOne({poli : 'GIGI', status : 'IDLE'}).sort({ date: 1 });
    socket.emit('queue_dentist', queueDentist);

    const queuePediatric = await queue.findOne({poli : 'IBU DAN ABAK', status : 'IDLE'}).sort({ date: 1 });
    socket.emit('queue_pediatric', queuePediatric);
    
    socket.on('add_to_general', (param) => {
      const data = new queue(param);
      data.save().then(response => {
        io.emit('queue_general', response);
      });
    });

    socket.on('add_to_dentist', (param) => {
      const data = new queue(param);
      data.save().then(response => {
        io.emit('queue_dentist', response);
      });
    });

    socket.on('add_to_pediatric', (param) => {
      const data = new queue(param);
      data.save().then(response => {
        console.log(response)
        io.emit('queue_pediatric', response);
      });
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected.`);
    });

});

export default socketIo;